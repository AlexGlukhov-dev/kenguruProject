import { YMaps, Map, Placemark, /*GeoObject, FullscreenControl */} from 'react-yandex-maps';



const MyMap = () => {
	return (
		
			<YMaps>
				<Map
					style={{
						width: '100%',
						height: '100%' }}
					
					defaultState={
						{
							center: [56.995468, 40.978222],
							zoom: 12,
							
						}
					} >
					
					<Placemark geometry={[56.995468, 40.978222]} draggable={true}/>
					<Placemark geometry={[56.999, 40.999]} />
					<Placemark geometry={[56.98, 40.978222]} />
					
					{/*<GeoObject
					geometry={{
						type: 'LineString',
						coordinates: [
						[56.99, 40.98],
						[58.0, 41.00],
						]
					}}
						options={{
						geodesic: true,
						strokeWidth: 3,
						strokeColor: '#f68819'
					}}
					/>
					<FullscreenControl options={{
						float: 'left'
					}} />*/}
				
				</Map>
			</YMaps>

	);
}

export default MyMap;