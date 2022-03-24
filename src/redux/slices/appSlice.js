import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import axios from "axios";

export const fetchAppData = createAsyncThunk(
'app/fetchAppData',
	async (path, {rejectWithValue}) => {
		try {
			const response = await axios.get( `https://kengurutest.ru/api_public/get_name.php?path=${path}` )
			return  await response.data
		} catch (error) {
			return rejectWithValue( error.message )
		}
	}
)

const appSlice = createSlice({
	name: 'app',
	initialState: {
		appData: {
			city: '',
			phone: '',
			schedule: '',
			showLiteLayout: false,
		},
		status: null,
		error: null
	},
	extraReducers: {
		[fetchAppData.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchAppData.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.appData = action.payload
		},
		[fetchAppData.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
} )

export default appSlice.reducer