import { keystoneFetch } from '@/lib/keystone'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const q = searchParams.get('q') ?? ''
	const cursor = searchParams.get('cursor') ?? ''
	const limit = 10

	const data = await keystoneFetch(`
		query Brands(
			$where: BrandWhereInput!,
			$cursor: BrandWhereUniqueInput,
			$take: Int,
			$skip: Int!,
			$orderBy: [BrandOrderByInput!]!
		) {
  			brands(
  				where: $where,
  				cursor: $cursor,
  				take: $take,
				skip: $skip,
  				orderBy: $orderBy
  			) {
    			id
    			name
  			}
		}
	`, {
		  "where": {
		    "name": {
		    	"contains": q,
		      "mode": 'insensitive'
		    }
		  },
		  ...(cursor ? {
		  		"cursor": {
		    		"id": cursor
		  		},
		  		"skip": 1
		  	} : {
		  		"skip": 0
		  	}),
		  "take": limit + 1,
		  "orderBy": [
		    {
		      "name": 'asc'
		    }
		  ]
		}
	)

	// console.log(data)

	const brands = data.brands ?? []

	const hasMore = brands.length > limit

	const items = hasMore ? brands.slice(0,limit) : brands

	const nextCursor = hasMore ? items[items.length - 1].id : null

	return Response.json({ items: data.brands, nextCursor: 4 })

}