import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = (await cookies()).get('keystonejs-session')

	if (session) {
		redirect('/account')
	}

	return children
}