import {useEffect, useState} from "react";


export const useFetch = (url = '', initialState = null, options = null) => {
	const [data, setData] = useState( initialState)
	const [error, setError] = useState( null )
	const [loading, setLoading] = useState( false )
	useEffect( () => {
		let isMounted = true
		
		setLoading( true )
		
		fetch( url, options )
			.then( res => res.json() )
			.then( data => {
				if (isMounted) {
					setData( data )
					setError( null )
				}
			} )
			.catch( error => {
				if (isMounted) {
					setError( error )
					console.log('fetching data error')
					setData( null )
				}
			} )
			.finally( () => isMounted && setLoading( false ) )
		
		 return () => isMounted = false
	}, [url, options] )
	
	return {data, error, loading}
}

