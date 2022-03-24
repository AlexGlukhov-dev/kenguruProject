import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchCartModalData = createAsyncThunk(
	'cartModal/fetchCartModalData',
	async (id, {rejectWithValue}) => {
		try {
			const response = await axios.get( `/local/rest/basket.php?xmlId=${id}` )
			// const response = await axios.get( `.././DB/cartData.json` )
			
			const data = await response.data
			
			return data
			
		} catch (error) {
			return rejectWithValue( error.message )
		}
	}
)

const cartModalSlice = createSlice( {
	name: 'cartModal',
	initialState: {
		cartModalData: [],
		showCartModal: false,
		status: null,
		error: null
	},
	reducers: {
		clearCartModalData(state) {
			state.cartModalData = []
		},
		showCartModal(state) {
			state.showCartModal = true
		},
		hideCartModal(state) {
			state.showCartModal = false
			state.cartModalData = []
		}
	},
	extraReducers: {
		[fetchCartModalData.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchCartModalData.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.cartModalData = action.payload
			state.showCartModal = true
		},
		[fetchCartModalData.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
} )

export const {clearCartModalData, showCartModal, hideCartModal} = cartModalSlice.actions

export default cartModalSlice.reducer