import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/keystone'
import { UserProvider } from './context'

export const dynamic = 'force-dynamic'

export default async function ProtectedLayout({ children }) {
	const user = await getCurrentUser()
	console.log('user from protected layout', user)
	if (!user) redirect('/login')

	return (
		<UserProvider user={user}>
			{children}
		</UserProvider>
	)
}