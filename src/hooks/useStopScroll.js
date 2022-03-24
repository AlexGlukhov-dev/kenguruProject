import {useEffect} from 'react'

const useStopScroll =  (trigger = null) => {
	
	useEffect(() => {
		const body = document.querySelector('body')
		body.style.overflow = 'hidden'
		
		return () => {
			body.removeAttribute('style')
		}
	}, [trigger])
}

export {useStopScroll}