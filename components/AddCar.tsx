'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import addCar from '@/actions/addCar'
// import SelectBrand from './SelectBrand'
// import SelectModel from './SelectModel'
// import SelectFuelType from './SelectFuelType'
import MultipleImageUpload from '@/components/MultipleImageUpload'
import styles from './AddCar.module.css'

export default function AddCar() {
	const [state, action, isPending] = useActionState(addCar, { success: false, error: null })


	return (
		<div className={styles.wrapper}>
			<form action={action}>
			{/*	<SelectBrand/>
				<SelectModel/> 
				<SelectFuelType/> */}
				{/*<input type="text" name="brandName"/>                             */}
				{/*<input type="text" name="modelName"/>*/}
				<input type="number" name="mileage"/>
				<input type="number" name="year"/>
				<input type="number" name="price"/>
				<MultipleImageUpload/>
				{/*<input type="text" name="fuelTypeName"/>*/}
				<button type="submit">Add Car</button>
			</form>
			
		</div>
	)
}