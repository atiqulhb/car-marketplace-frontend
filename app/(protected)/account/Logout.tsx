'use client'

import { logoutAction } from '@/actions/logout'

export default function Logout() {
	return (
		<div>
			<button onClick={() => logoutAction()}>Log out</button>
		</div>
	)
}