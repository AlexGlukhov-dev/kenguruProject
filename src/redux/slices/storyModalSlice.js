import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios"

export const fetchStoryModalData = createAsyncThunk(
	'storyModal/fetchStoryModalDataNew',
	async (data, {rejectWithValue}) => {
				const {id, sectionid} = data
		try {
			const response = await axios.get( `/local/rest/getArticle.php?id=${id}&sectionid=${sectionid}` )
		
		/***************************** TEST REQUEST ***********************************************************/
			  // const response = await axios.get( id )
		/***************************** eof TEST REQUEST *******************************************************/
		
			const data = await response.data
			
			return data
			
		} catch (error) {
			console.log(error.message)
			return rejectWithValue( error.message )
		}
	}
)

const storyModalSlice = createSlice( {
	name: 'storyModal',
	initialState: {
		storyModalData: [],
		showStoryModal: false,

		status: null,
		error: null
	},
	reducers: {
		clearStoryModalData(state) {
			state.storyModalData = []
		},
		showStoryModal(state) {
			state.showStoryModal = true
		},
		hideStoryModal(state) {
			state.showStoryModal = false
			state.storyModalData = []
		}
	},
	extraReducers: {
		[fetchStoryModalData.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchStoryModalData.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.storyModalData = action.payload
			state.showStoryModal = true
		},
		[fetchStoryModalData.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
} )

export const {clearStoryModalData, showStoryModal, hideStoryModal} = storyModalSlice.actions

export default storyModalSlice.reducer