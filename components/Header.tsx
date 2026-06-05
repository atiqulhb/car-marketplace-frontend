import Link from 'next/link'

export default function Header() {
	return (
		<nav>
			<Link style={{ margin: '0 5px'}} href="/">Home</Link>
			<Link style={{ margin: '0 5px'}} href="/account">Account</Link>
		</nav>
	)
}