import React from 'react'

export default function CustomSelect(options) {
	return (
		<select>
			{ options.map(o => (
				<option value={o}>{o}</option>
			))}
		</select>
	)
}