import {configureStore} from '@reduxjs/toolkit'
import cartModalReducer from './slices/cartModalSlice'
import optModalReducer from "./slices/optModalSlice";
import reserveModalReducer from "./slices/reserveModalSlice";
import selectCityReducer from "./slices/selectCitySlice";
import indivOrdersReducer from "./slices/indivOrdersSlice";
// import storyModalSlice from "./slices/storyModalSlice";
import storyModalSliceNew from "./slices/storyModalSlice";
import appDataReducer from "./slices/appSlice";

export default configureStore( {
	reducer: {
		selectCity: selectCityReducer,
		cartModal: cartModalReducer,
		optModal: optModalReducer,
		globalApp: appDataReducer,
		indivOrders: indivOrdersReducer,
		// storyModal: storyModalSlice,
		storyModal: storyModalSliceNew,
		reserveModal: reserveModalReducer,
	}
})