import { useState, useEffect } from 'react'

export const useMousePosition = () => {
	const [deg, setDeg] = useState(null)

	useEffect(() => {
		const updateMousePosition = e => {
			const mouseX = e.clientX
			const mouseY = e.clientY

			const anchor = document.getElementById('anchor')
			const rect = anchor.getBoundingClientRect()

			const anchorX = rect.left + rect.width / 2
			const anchorY = rect.top + rect.height / 2

			const angleDeg = angle(mouseX, mouseY, anchorX, anchorY)

			setDeg(angleDeg)
		}

		window.addEventListener('mousemove', updateMousePosition)

		return () => {
			window.removeEventListener('mousemove', updateMousePosition)
		}
	}, [])

	return deg
}

const angle = (cx, cy, ex, ey) => {
	const dy = ey - cy
	const dx = ex - cx

	const rad = Math.atan2(dy, dx)
	const deg = (rad / 180) * Math.PI

	return deg
}
