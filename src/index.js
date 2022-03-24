import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store';
import {showOptModal} from "./redux/slices/optModalSlice";
import {fetchCartModalData} from './redux/slices/cartModalSlice'
import {fetchReserveModalData} from "./redux/slices/reserveModalSlice";
import {fetchStoryModalData} from "./redux/slices/storyModalSlice";
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

/************** OPT SECTION ***************************************************/
const onCloseOptSection = async () => {
	try {
		const response = await fetch( `/local/rest/closeOptClient.php`,
			{
				credentials: 'same-origin'
			} )

		window.location.reload();

		if (!response.ok) {
			throw new Error( 'Ошибка отправки данных' )
		}

	} catch (error) {
		console.log( 'Ошибка отправки данных!' )
	}
}

/******************* CART MODAL, STORIES MODAL, RESERVE MODAL  ********************************/
document.addEventListener( 'click', e => {
	if (e.target.classList.contains( 'product__btn' )) {
		const id = encodeURIComponent( e.target.getAttribute( 'data-xmlid' ).toString() );
		store.dispatch( fetchCartModalData( id ) )
	}
	
	if (e.target.id === 'opt-section') {
		store.dispatch( showOptModal( true ) )
	}
	
	if (e.target.id === 'opt-section-close') {
		onCloseOptSection()
	}
	
	if (e.target.classList.contains('on-shop-btn')) {
		const id = encodeURIComponent( e.target.getAttribute( 'data-xmlid' ) );
		store.dispatch( fetchReserveModalData( id ) )
	}
	
	/************************ STORIES ***********************************************/
	const story = e.target.closest('.story-article')
	
	if (story) {
		const id = story.dataset.id
		const sectionid= story.dataset.sectionid
	
	/************** STORIES TEST REQUESTS *********************************************/
		  // const id = '.././DB/storiesDataArticle.json'
		  // const id = '.././DB/storiesDataVideo.json'
		
		const data ={id, sectionid}

		 store.dispatch(fetchStoryModalData(data))
	}
} );

//****************** RESERVE MODAL *******************************************/
// const btns = document.querySelectorAll( '.on-shop-btn' );
//
// btns.forEach( btn => btn.addEventListener( 'click', e => {
//
// 		// const id = e.target.attributes['data-xmlid'].nodeValue;
// 	const id = encodeURIComponent( e.target.getAttribute( 'data-xmlid' ) );
//
//
// 		store.dispatch( fetchReserveModalData( id ) )
// 	} )
// )
/*ReactDOM.render(
	<React.StrictMode>
		<LiteHeader />
	</React.StrictMode>,
	document.getElementById( 'header' )
);*/

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<Provider store={store}>
				<App/>
			</Provider>
		</React.StrictMode>
	</Router>,
	document.getElementById( 'root' )
);

/*ReactDOM.render(
	<React.StrictMode>
			<LiteFooter />
	</React.StrictMode>,
	document.getElementById( 'footer' )
);*/
