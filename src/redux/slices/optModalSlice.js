import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchOptModalInn = createAsyncThunk(
    'optModal/fetchOptModalInn',
    async (inn, {rejectWithValue, dispatch}) => {

        try {
                const response = await axios.get(`/local/rest/searchOptClient.php?number=${inn}`)
                // const response = await axios.get(`.././DB/orgs.json`)

                const data = await response.data
									if (!data.length) dispatch(noResults( true))
                return data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchOptModalOrgs = createAsyncThunk(
    'optModal/fetchOptModalOrgs',
    async (org, {rejectWithValue, dispatch}) => {

        try {
                const response = await fetch(`/local/rest/chooseOptClient.php?company=${org.orgName}&inn=${org.orgInn}&kpp=${org.orgKpp}`,
                {
                 credentials: 'same-origin'
                  })
                 // const response = await axios.get(`.././DB/orgs.json`)

                 // const data = await response.data//axios
                const data = await response.json()

                return data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const optModalSlice = createSlice({
    name: 'optModal',
    initialState: {
        orgs: [],
        showOptModal: false,
        preloader: false,
        inn: '',
        noResults: false,
        status: null,
        error: null
    },
    reducers: {
        clearOptModalData(state) {
            state.optModallData = []
        },
        showOptModal(state, action) {
            state.showOptModal = action.payload
        },
        getInn(state, action) {
            state.inn = action.payload
        },
        noResults(state, action) {
            state.noResults = action.payload
        },
        showPreloader(state) {
            state.preloader = true
        },
        hidePreloader(state) {
				state.preloader = false
        },
				clearResults(state) {
					state.orgs = []
				}
    },
    extraReducers: {
        [fetchOptModalInn.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchOptModalInn.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.orgs = action.payload
            state.preloader = false
            // state.showOptModal = true
        },
        [fetchOptModalInn.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        [fetchOptModalOrgs.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchOptModalOrgs.fulfilled]: (state, action) => {
            state.status = 'resolved'

            // state.showOptModal = true
        },
        [fetchOptModalOrgs.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export const {clearResults, clearOptModalData, showOptModal, hideOptModal, getInn, showPreloader, hidePreloader, noResults} = optModalSlice.actions

export default optModalSlice.reducer