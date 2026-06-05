'use client'

import { createContext, useContext } from 'react'

const UserContext = createContext(null)

export function UserProvider({ user, children }) {
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}

export default function useUser() {
	const user = useContext(UserContext)
	if (!user) throw new Error ('useUser must be used inside ProtectedLayout')
	return user
}                                                                                                