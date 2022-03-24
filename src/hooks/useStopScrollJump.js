import {useEffect} from "react";

export const useStopScrollJump = (modal = null) => {
	useEffect( () => {
		const body = document.querySelector( 'body' );
		let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
		body.style.overflow = 'hidden'
		body.style.paddingRight = paddingOffset
		
		return () => {
			body.style.overflow = 'auto';
			body.removeAttribute('style')
		}
	}, [modal] );
}
