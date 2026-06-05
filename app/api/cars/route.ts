import { fetchCars } from '@/lib/keystone'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const q = searchParams.get('q') ?? ''
	const cursor = searchParams.get('cursor') ?? ''
	const limit = 10

	// const data = fetchCars()

	// console.log(data)

	// const hasMore = data.brands?.length > limit

	// return Response.json({ items: data.brands, nextCursor: 4 })

	return Response.json({ items: [], nextCursor: 4 })

}