import { cookies } from 'next/headers'
import Logout from './Logout'
import AddCar from '@/components/AddCar'
import { getCurrentUser } from '@/lib/keystone'
import styles from './page.module.css'

export default async function AccountPage() {
	const user = await getCurrentUser()
	
	return (
		<div className={styles.Wrapper}>
			<h1>{user?.name}</h1>
			{/*<p>{user.email}</p>*/}
			<Logout/>
			<AddCar/>
		</div>
	)
}