'use client'

import { useState, useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { ChevronDown, ChevronUp, X } from 'lucide-react'
import styles from './Select.module.css'

export default function Select() {
	const [addMode, setAddMode] = useState(false)
	const [selected, setSelected] = useState(false)
	const [dropDown, setDropDown] = useState(false)
	const [input, setInput] = useState('')
	const [selectedBrand, setSelectedBrand] = useState({
		id: '',
		name: ''
	})
	const [newBrandName, setNewBrandName] = useState('')

	const loadMoreRef = useRef<HTMLDivElement>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['brands', input],
		initialPageParam: null as string | null,
		queryFn: async ({ pageParam }) => {

			const params = new URLSearchParams({
				q: input
			})

			if (pageParam) {
				params.set('cursor', pageParam)
			}

			const res = await fetch(`/api/brands?${params}`)

			// console.log('r q res', await res.json())

			if (!res.ok) {
				throw new Error('Failed to load brands')
			}

			return res.json() as Promise<Response>
		},
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	// console.log(data)

	useEffect(() => {
		const node = loadMoreRef.current

		if (!node) return

		const observer = new IntersectionObserver(entries => {
			const first = entries[0]

			if (first.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage()
		}, {
			rootMargin: '200px'
		})

		observer.observe(node)

		return () => observer.disconnect
	},[fetchNextPage, hasNextPage, isFetchingNextPage])

	const brands = data?.pages.flatMap(page => page.items) ?? []


	return (
		<div className={styles.Select}>

			{ dropDown || addMode ? (
				<input type="text" name="modelName" value={input} placeholder={addMode ? "Add New Brand" : "Search Brand"} onChange={e => setInput(e.target.value)} autoFocus={true}/>
			) : (
				<span>{selected ? selectedBrand.name : 'Select Brand' }</span>
			)}



			
			<div className={styles.SVGWrapper}>


				{ dropDown ? (
					<ChevronUp size={27} strokeWidth={1} onClick={() => setDropDown(false)}/>
				) : addMode || selected ? (
					<X
						size={25}
						strokeWidth={1}
						onClick={() => {
							setSelectedBrand({
								id: '',
								name: ''
							})
							setSelected(false)
							setAddMode(false)
							setDropDown(false)
						}}
					/>
				) : (
					<ChevronDown size={25} strokeWidth={1} onClick={() => setDropDown(true)}/>
				)}

			</div>

			{ dropDown && (
				<div className={styles.DropDown}>
					<div className={styles.List}>
						{brands.map(({ id, name }) => (
							<span
								key={id}
								onClick={() => {
									setSelectedBrand({ id, name })
									setSelected(true)
									setDropDown(false)
								}}
							>
								{name}
							</span>
						))}

						<div ref={loadMoreRef}/>
					</div>
					<button
						onClick={() => {
							setDropDown(false)
							setAddMode(true)
						}}
					>
						Add New Brand
					</button>
				</div>
			)}
		</div>
	)
}