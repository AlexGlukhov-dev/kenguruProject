import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchShops = createAsyncThunk(
	'indivOrders/fetchShops',
	async function(_, {rejectWithValue}) {
		try {
			const response = await fetch( './DB/SHOPS_DATA.json' )
			// const response = await fetch( 'https://60eebf3aeb4c0a0017bf45e8.mockapi.io/shops' )
			if (!response.ok) {
				throw new Error( 'Ошибка загрузки данных' )
			}
			const data = await response.json()
			return data
			
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const fetchPickups = createAsyncThunk(
	'indivOrders/fetchPickups',
	async function(_ , {rejectWithValue}) {
		try {
			const response = await fetch( './DB/PICKUPS_DATA.json' )
			// const response = await fetch( 'https://60eebf3aeb4c0a0017bf45e8.mockapi.io/shops' )
			if (!response.ok) {
				throw new Error( 'Ошибка загрузки данных' )
			}
			const data = await response.json()
			return data
			
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

const indivOrdersSlice = createSlice({
	name: 'indivOrders',
	initialState: {
		order: {
			fiz: true,
			ur: false,
			email: '',
			phone: '+7 (999) 123-45-67',
			codeSms: '1112',
			rightCodeSms: Date.now(),
			name: 'Иван',
			lastName: 'Иванов',
			consigneeName: '',
			consigneeLastName: '',
			consigneePhone: '',
			change: '',
			paymentEmail: '',
			// paymentCash: '',
			payment: "Оплата картой",
			isSamovivoz: true,
			isDelivery: false,
			samovivoz: 'from_Kenguru',
			samovivozShop: '',
			samovivozShopAddress: '',
			samovivozDateKenguru: '',
			samovivozDatePickup: '',
			samovivozPickupAddress: '',
			// samovivozPlace: '',
			pickup: '',
			pickupSamovivozPrice: null,
			pickupDeliveryPrice: 800,
			kenguruDeliveryPrice: null,
			minKenguruDeliveryPrice: 400,
			minPickupDeliveryPrice: 600,
			comments: '',
			isPromocode: true,
			receiveLetters: false,
			inn: '',
			kpp: '',
			validInn: false,
			orgName: '',
			orgAddress: '119146, город Москва, Комсомольский проспект, дом 25 корпус 3, помещение V ком.2',
			orgPostAddress: '',
			contactName: '',
			contactPhone: '',
			contactEmail: '',
			delivery: 'from_Kenguru',
			deliveryDate: '',
			deliveryTime: '',
			takeByParts: '',
			loadIntoCar: '',
			loadItoCarPrice: 100,
			loadersService: 500,
			takeByConsignee: '',
			addressesIsEqual: '',
			deliveryKenguruDates: ["23.08 Пн", "24.08 Вт", "25.08 Ср", "26.08 Чт", "27.08 Пт", "28.08 Сб", "29.08 Вс"],
			deliveryKenguruTimes: ["08:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"],
			deliveryPickupDates: ["23.09 Пн", "24.09 Вт", "25.09 Ср", "26.09 Чт", "27.09 Пт", "28.09 Сб", "29.09 Вс"],
			deliveryPickupTimes: ["08:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"],
			orderWeight: '50',
			// deliveryStatusLetters: true,
			privateHouse: false,
			deliveryAddress: '',
			flatNumber: '',
			deliveryToFlat: 'Доставить до подъезда',
			deliveryToHouse: 'Привезти к дому',
			flatOrOffice: '',
			floor: '',
			entrance: '',
			doorPhone: '',
			isElevator: false,
			typeOfElevator: 'Пассажирский',
			deliveryToTime: false,
			hours: null,
			minutes: null,
			cartSum: null,
			deliveryTCname: 'from_cdek',
			deliveryTCDate: '08.08',
			deliveryTCHours_from: 8,
			deliveryTCHours_until: 12
		},
		status: null,
		error: null,
		shops: [],
		pickups: []
	},
	reducers: {
		addData(state, action) {
			state.order[action.payload.key] = action.payload.value
		},
		inputHandler(state, action) {
			state.order[action.payload.key] = action.payload.value
		},
		checkBoxHandler(state, action) {
			state.order[action.payload.key] = action.payload.value
		},
		inputMaskHandler(state, action) {
			if (action.payload.value.indexOf( '8' ) === 4) return
				state.order[action.payload.key] = action.payload.value
		},
		clearInputField(state, action) {
			state.order[action.payload.key] = action.payload.value
		}
	},
	extraReducers: {
		[fetchShops.pending]: (state) => {
			state.status = 'loading'
			state.error = false
		},
		[fetchShops.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.shops = action.payload
		},
		[fetchShops.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		},
		[fetchPickups.pending]: (state) => {
			state.status = 'loading'
			state.error = false
		},
		[fetchPickups.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.pickups = action.payload
		},
		[fetchPickups.rejected]: (state, action) => {
			state.status = 'rejected'
			state.error = action.payload
		}
	}
})

export const {addData, clearInputField, checkBoxHandler, inputMaskHandler, inputHandler} = indivOrdersSlice.actions

export default indivOrdersSlice.reducer