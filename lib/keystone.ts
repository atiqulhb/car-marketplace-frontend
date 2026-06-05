import "server-only"

import { cache } from 'react'
import { cookies } from 'next/headers'
import { env } from '@/config/env'

export async function getSessionHeader() {
  const session = (await cookies()).get('keystonejs-session')
  return session ? { Cookie: `${session.name}=${session.value}` } : {}
}

export async function keystoneFetch(query: string, variables?: Record<string, unknown>) {
  const sessionHeader = await getSessionHeader()

  
  const res = await fetch(env.BACKEND_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apollo-require-preflight": 'true',
      ...sessionHeader
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store'
  })
  

 if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${res.statusText} — ${text}`)
  }

  const json = await res.json().catch(() => {
    throw new Error('Invalid JSON response from server')
  })
  
  if (json.errors?.length) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join(', ')
    )
  }

  return json.data
}

export const getCurrentUser = cache(async () => {
  try {
    const data = await keystoneFetch(`
      query AuthenticatedItem {
        authenticatedItem {
          ... on User {
            id
            name
          }
        }
      }
    `)

    console.log('data from auth user query', data)
    return data.authenticatedItem
  } catch {
    return null
  }
})

export async function fetchCars(where, skip = 0, cursor ) {
  const res = await fetch(env.BACKEND_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query Cars(
        $where: CarWhereInput!,
        $orderBy: [CarOrderByInput!]!,
        $take: Int,
        $skip: Int!,
        $cursor: CarWhereUniqueInput
      ) {
        cars(
          where: $where,
          orderBy: $orderBy,
          take: $take,
          skip: $skip,
          cursor: $cursor
        ) {
          brand {
            name
          }
          model {
            name
          }
          mileage
          year
          price
          id
          images {
            image {
              url
            }
          }
          fuelType {
            name
          }
        }
      }
    `,
      variables: {
        where,
        take: 12,
        skip,
        orderBy: [{ id: "asc" }],
        cursor: cursor ? { id: cursor } : undefined,
      },
    }),
  });


  

  const { data, errors } = await res.json();

  if (errors?.length) {
    throw new Error(
      errors.map((e: { message: string }) => e.message).join(', ')
    )
  }

  return data.cars;
}

// export async function getSingleProduct(id) {
//   const res = await fetch('http://localhost:3000/api/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: `
//         query Product($where: ProductWhereUniqueInput!) {
//           product(where: $where) {
//             id
//             title
//             brand {
//               name
//             }
//             categories {
//               name
//             }
//             price
//             images {
//               id
//               source {
//                 id
//                 url
//               }
//             }
//             shortDescription
//             fullDescription
//             rating
//             slug
//             createdAt
//           }
//         }
//       `,
//       variables: { where: { id }}
//     }),
//     next: {
//       revalidate: 30,
//       tags: [`products-${id}`]
//     }
//   })

//   const { data, error } = await res.json()

//     if (error) {
//     console.error("Graphql Errors", error);
//     throw new Error("Failed to fetch single product")
//   }

//   return data.product
// }

// export async function getPriceRange() {
//   const res = await fetch('http://localhost:3000/api/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: `
//         query PriceRange {
//           priceRange {
//             min
//             max
//           }
//         }
//       `,
//     }),
//     next: { revalidate: 60 }
//   })

//   const { data, error } = await res.json()

//   if (error) {
//     console.error("Graphql Errors", error);
//     throw new Error("Failed to fetch price range")
//   }
    
//   return data.priceRange
// }