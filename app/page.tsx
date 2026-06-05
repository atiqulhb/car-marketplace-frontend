import { Suspense } from 'react'
import Image from "next/image";
import { fetchCars } from '@/lib/keystone'
import { buildWhere } from '@/lib/buildWhere'
import Filters from '@/components/Filters'
import CarsDisplay from '@/components/CarsDisplay'

export default async function Home({ searchParams }) {
  const params = await searchParams
  const where = buildWhere(params)
  // const cars = await fetchCars(where)
  return (
    <div>
      <Suspense>
        <Filters/>
      </Suspense>
      <Suspense>
        {/* <CarsDisplay cars={cars}/> */}
      </Suspense>
    </div>
  )
}
