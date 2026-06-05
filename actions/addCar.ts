'use server'

import { getSessionHeader } from '@/lib/keystone'
import { env } from '../config/env'

export default async function addCar( prevState: any, formData: FormData) {
  const sessionHeader = await getSessionHeader()

  let brandId
  let modelId
  let fuelTypeId
  
  // const brandId = formData.get('brandId') as string
  const brandName = formData.get('brandName') as string
  console.log()
  const modelName = formData.get('modelName') as string
  const mileage = formData.get('mileage') as string
  const year = formData.get('year') as string
  const price = formData.get('price') as string
  const fuelTypeName = formData.get('fuelTypeName') as string
  const images = formData.getAll('images') as File[]

  console.log(images)

  // const operations = JSON.stringify({
  //   query: `
  //     mutation Mutation($data: CarCreateInput!) {
  //       createCar(data: $data) {
  //         id
  //         brand {
  //           name
  //         }
  //         model {
  //           name
  //         }
  //         year
  //         mileage
  //         price
  //         images {
  //           image {
  //             url
  //           }
  //         }
  //         fuelType {
  //           name
  //         }
  //         dealer {
  //           name
  //         }
  //       }
  //     }
  //   `,
  //   variables: {
  //       "data": {
  //         "brand": brandId ? {
  //           "connect": {
  //             "id": brandId
  //           }
  //         } : {
  //           "create": {
  //             "name": brandName
  //           }
  //         },
  //         "model": modelId ? {
  //           "connect": {
  //             "id": modelId
  //           }
  //         } : {
  //           "create": {
  //             "name": modelName
  //           }
  //         },
  //         "year": parseInt(year),
  //         "images": {
  //           "create": images.map(() => ({ image: { upload: null }}))
  //         },
  //         "mileage": parseInt(mileage),
  //         "price": price,
  //         "fuelType": fuelTypeId ? {
  //           "connect": {
  //             "id": fuelTypeId
  //           }
  //         } : {
  //           "create": {
  //             "name": fuelTypeName
  //           }
  //         }
  //       }
  //     }
  // })

  // const map = JSON.stringify(
  //   Object.fromEntries(
  //     images.map((_,i) => [String(i), [`variables.data.images.create.${i}.image.upload`]])
  //   )
  // )

  // const body = new FormData()
  // body.append("operations", operations)
  // body.append("map", map)
  // images.forEach((file, i) => body.append(String(i), file))

  // const res = await fetch(env.BACKEND_URL!, {
  //   method: "POST",
  //   headers: {
  //     'apollo-require-preflight': 'true',
  //     ...sessionHeader
  //   },
  //   body
  // })


  // if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  //   const json = await res.json()

  // if (json.errors?.length) throw new Error(json.errors[0].message)

  //   console.log(json)

  // return {
  //   success: true,
  //   data: json.data.createCar
  // }
}