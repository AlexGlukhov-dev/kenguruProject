import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchReserveModalData = createAsyncThunk(
	'reserveModal/fetchReserveModalData',
	async (id, {rejectWithValue}) => {
		try {
			const response = await axios.get( `/local/rest/getRest.php?xmlid=${id}` )
			
			// ******** ON USING fetch() API **********************
			// if (!response.ok) {
			// 	throw new Error('An error occurred!')
			// }
			
			//*************** TEST REQUESTS *********************
			//  const response = await axios.get('https://60eebf3aeb4c0a0017bf45e8.mockapi.io/shops')
			
			   // const response = await axios.get('./DB/reserveData.json')
			//***************************************************
			
			return await response.data
			
		} catch (error) {
			console.log(error)
			return rejectWithValue( error.message )
		}
	}
)

export const fetchReserveAmount = createAsyncThunk(
	'reserveModal/fetchReserveAmount',
	async (data, {rejectWithValue}) => {
		try {
			const {id, shop} = data
			
			const response = await axios.get( `/local/rest/addReserve.php?xmlid=${id}&shop=${shop}` )
			
			//*************** TEST REQUEST ******************************
			// const response = await axios.get('./DB/reserveAmount.json')
			
			// console.log('response data:', response.data[0].amount);
			// 		return await response.data[0].amount
			//***********************************************************
			
			return await response.data.amountInReserve
			
		} catch (error) {
			console.log(error)
			return rejectWithValue( error.message )
		}
	}
)

const reserveModalSlice = createSlice( {
	name: 'reserveModal',
	initialState: {
		reserveModalData: [],
		reserveModalAmount: 0,
		showReserveModal: false,
		status: null,
		error: null
	},
	reducers: {
		clearReserveModalData(state) {
			state.reserveModalData = []
		},
		showReserveModal(state) {
			state.showReserveModal = true
		},
		hideReserveModal(state) {
			state.showReserveModal = false
			state.reserveModalData = []
		},
		clearReserveModalAmount(state) {
			state.reserveModalAmount = 0
		}
	},
	extraReducers: {
		[fetchReserveModalData.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchReserveModalData.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.reserveModalData = action.payload
			state.showReserveModal = true
		},
		[fetchReserveModalData.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		},
		[fetchReserveAmount.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchReserveAmount.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.reserveModalAmount = action.payload
		},
		[fetchReserveAmount.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
} )

export const {clearReserveModalData, showReserveModal, hideReserveModal, clearReserveModalAmount} = reserveModalSlice.actions

export default reserveModalSlice.reducer