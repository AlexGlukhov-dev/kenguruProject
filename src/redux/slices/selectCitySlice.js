import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchSelectCityData = createAsyncThunk(
    'selectCity/fetchSelectCityData',
    async (id, {rejectWithValue}) => {
        try {
           // const response = await axios.get( `http://ivanovo.gluhov.kengurutest.ru/api_public/cityChoise.php` )
            const response = await axios.get( `./DB/cityChoiceData.json` )
            return await response.data
        } catch (error) {
            return rejectWithValue( error.message )
        }
    }
)

export const fetchInputCitySearch = createAsyncThunk(
    'selectCity/fetchInputCitySearch',
    async (value , {rejectWithValue}) => {
        try {
            const response = await axios.get( `./DB/inputCitySearchData.json?value=${value}` )
            return await response.data
        } catch (error) {
            return rejectWithValue( error.message )
        }
    }
)

const selectCitySlice = createSlice( {
    name: 'selectCity',
    initialState: {
        selectCityData: [],
        inputCitySearch: [],
        inputCitySearchText: '',
        citiesForMobile: {},
        showCitiesMobile: false,
        showCityChoose: false,
        showCityObls: true,
        showCityResult: false ,
        showCityNotFound: false,
        status: null,
        error: null
    },
    reducers: {
        showCitiesForMobile(state) {
            state.showCitiesMobile = true;
        },

        hideCitiesForMobile(state) {
            state.showCitiesMobile = false;
        },

        showCityChoose(state) {
            state.showCityChoose = true
        },

        citiesPush(state, action) {
            state.citiesForMobile = action;
        },

        hideCityChoose(state) {
            state.showCityChoose = false
        },

        addCitySearch(state, action) {
            state.inputCitySearchText = action.payload;
        },

        clearCitySearch(state) {
            state.inputCitySearchText = '';
        },

        showCitysResults(state) {
            state.showCityResult = true;
            state.showCityObls = false;
            state.showCityNotFound = false;
        },

        showCitysNotFound(state) {
            state.showCityNotFound = true;
            state.showCityObls = false;
            state.showCityResult = false;
        },

        showCitysObls(state) {
            state.showCityObls = true;
            state.showCityNotFound = false;
            state.showCityResult = false;
        },

    },
    extraReducers: {
        [fetchSelectCityData.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchSelectCityData.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.selectCityData = action.payload
        },
        [fetchSelectCityData.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        [fetchInputCitySearch.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchInputCitySearch.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.inputCitySearch = action.payload
        },
        [fetchInputCitySearch.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
} )

export const {showCityChoose, hideCityChoose, clearCitySearch, addCitySearch, showCitysObls, showCitysNotFound, showCitysResults, citiesPush, showCitiesForMobile, hideCitiesForMobile} = selectCitySlice.actions

export default selectCitySlice.reducer