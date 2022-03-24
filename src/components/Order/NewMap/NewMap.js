import React from "react";

import {YMaps, Map,/* Clusterer, Placemark,*/ ObjectManager, ZoomControl} from "react-yandex-maps";

// import shopsPoints from "./shopsPoints.js";
// import myIcon from "./pin.png";


window.balloonHandler = (text) => {
	// const point = document.querySelector('input[value="37_02"]')
	// point.setAttribute('checked', true)
	alert(text)
}

const NewMap = ({points, icon, clusterColor}) => {
	const mapState = {
		center: [56.995468, 40.978222],
		zoom: 12,
		controls: [],
		behaviors: ["default", "scrollZoom"]
	};
	
 // const  balloonHandler1 = (text) => {
 // 	alert(text)
 // }
	return (
		<>
			<YMaps query={{apikey: "ac684a05-e3c8-4777-a071-fcc67be621b8",
				lang: "ru_RU", load: "package.full" }}>
				<Map
					defaultState={mapState}
					modules={["control.ZoomControl", "control.FullscreenControl"]}
					height="100%"
					width="100%"
				>
					<ZoomControl />
					<ObjectManager
						options={{
							clusterize: true,
							gridSize: 48,
							maxZoom: 12,
							minClusterSize: 3
							
						}}
						objects={{
							openBalloonOnClick: true,
							iconLayout: 'default#image',
							iconImageHref: icon
							// preset: "islands#greenDotIcon"
						}}
						clusters={{
							preset: `islands#inverted${clusterColor}ClusterIcons`
						}}
						defaultFeatures={{
							"type": "FeatureCollection",
							"features": points,
						} }
						modules={[
							"objectManager.addon.objectsBalloon",
							"objectManager.addon.objectsHint"
						]}
					/>
				</Map>
			</YMaps>
			</>
	)
}

// class NewMap extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selectedPoint: null
// 		};
// 	}
	
	// onPlacemarkClick = point => () => {
	// 	this.setState({ selectedPoint: point });
	// };
	
	// render() {
		// const { selectedPoint } = this.state;
		//
		//  window.myFunc = function() {
		// 	console.log("click");
		// };
		
		// return (
		// 	<>
		// 		<YMaps query={{apikey: "ac684a05-e3c8-4777-a071-fcc67be621b8",
		// 			lang: "ru_RU", load: "package.full" }}>
		// 			<Map
		// 				defaultState={mapState}
		// 				modules={["control.ZoomControl", "control.FullscreenControl"]}
		// 				height="100%"
		// 				width="100%"
		// 			>
		// 				<ZoomControl />
		// 				<ObjectManager
		// 				options={{
		// 					clusterize: true,
		// 					gridSize: 48,
		// 					maxZoom: 12,
		// 					minClusterSize: 3
		//
		// 				}}
		// 				objects={{
		// 					openBalloonOnClick: true,
		// 					iconLayout: 'default#image',
		// 					iconImageHref: myIcon
		// 					// preset: "islands#greenDotIcon"
		// 				}}
		// 				clusters={{
		// 					preset: "islands#invertedOrangeClusterIcons"
		// 				}}
		// 				defaultFeatures={{
		// 					"type": "FeatureCollection",
		// 					"features": shopsPoints
		// 				} }
		// 				modules={[
		// 					"objectManager.addon.objectsBalloon",
		// 					"objectManager.addon.objectsHint"
		// 				]}
		// 			/>
		// 			{/*	<Clusterer*/}
		// 			{/*		options={{*/}
		// 			{/*			preset: "islands#invertedVioletClusterIcons",*/}
		// 			{/*			groupByCoordinates: false,*/}
		// 			{/*			balloonPanelMaxMapArea: Infinity*/}
		// 			{/*		}}*/}
		// 			{/*	>*/}
		// 			{/*		{POINTS.map((point, index) => (*/}
		// 			{/*			<Placemark*/}
		// 			{/*				modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}*/}
		// 			{/*				key={index}*/}
		// 			{/*				geometry={point.coords}*/}
		// 			{/*				onClick={this.onPlacemarkClick(point)}*/}
		// 			{/*				properties={{*/}
		// 			{/*					item: index,*/}
		// 			{/*					balloonContentHeader: "Заголовок элемента X",*/}
		// 			{/*					balloonContentBody: "Тело элемента",*/}
		// 			{/*					balloonContentFooter: `<input type="button" onclick="window.myFunc(${index});"value="Считать кроликов!"/>`*/}
		// 			{/*				}}*/}
		// 			{/*				options={{*/}
		// 			{/*					balloonPanelMaxMapArea: Infinity*/}
		// 			{/*				}}*/}
		// 			{/*			/>*/}
		// 			{/*		))}*/}
		// 			{/*	</Clusterer>*/}

				// 	</Map>
				// </YMaps>
				// {/*{selectedPoint && (*/}
				// {/*	<div>*/}
				// {/*		<h1 style={{fontSize: '12px'}}>Selected point: {selectedPoint.title}</h1>*/}
				// {/*		<p style={{fontSize: '12px'}}>{selectedPoint.descr}</p>*/}
				// {/*	</div>*/}
				// {/*)}*/}
// 			</>
// 		);
// 	}
// }

export default NewMap;