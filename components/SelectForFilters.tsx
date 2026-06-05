'use client'

import { useState, useEffect, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function SelectForFilters() {
	const [input, setInput] = useState('')

	const searchParams = useSearchParams()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const newParams = new URLSearchParams(searchParams)


	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['brands', input],
		initialPageParam: null as string | null,
		queryFn: async ({ pageParam }) => {

			const params = new URLSearchParams()

			if (input.trim()) {
				params.set('q', input)
			}

			if (pageParam) {
				params.set('cursor', pageParam)
			}

			const res = await fetch(`/api/brands?${params.toString()}`)

			// console.log('r q res', await res.json())

			if (!res.ok) {
				throw new Error('Failed to load brands')
			}

			return res.json() as Promise<Response>
		},
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	// console.log('data from brand react query', data)

	const brands = data?.pages.flatMap((page) => page.items) ?? []

	// console.log(brands)

	function handleBrandSelection(e) {
		newParams.set('brand', e.target.value)

		startTransition(() => {
			router.replace(`/?${newParams.toString()}`)
		})
	}

	return (
		<select name="" id="" onChange={handleBrandSelection}>
			<option value="">Choose Brand</option>
			{brands.map(({ id, name }) => (
				<option key={id} value={id}>{name}</option>
			))}
		</select>
	)
}