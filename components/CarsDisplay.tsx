'use client'

import styles from './CarsDisplay.module.css'

export default function CarsDisplay({ cars }) {
	return (
		<div className={styles.Grid}>
			{cars?.map(({ id, brand, model, year, images, price }) => (
				<div key={id} className={styles.Card}>
					<div className={styles.imageWrapper}>
						<img src={images?.[0]?.image?.url} alt={''} />
					</div>
					<h3>{brand.name} {model.name} {year}</h3>
					<span>${price}</span>
				</div>
			))}
		</div>
	)
}