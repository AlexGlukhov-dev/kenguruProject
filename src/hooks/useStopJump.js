import {useEffect} from 'react'

const useStopJump =  (trigger = null) => {
	
	useEffect(() => {
		const body = document.querySelector('body')
		body.style.overflow = 'hidden'
		
		body.style.marginLeft = 'calc(100vw - 100%)'
		
		return () => {
			body.removeAttribute('style')
		}
	}, [trigger])
}

export {useStopJump}