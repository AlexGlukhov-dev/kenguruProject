import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addData, checkBoxHandler, inputHandler, fetchShops, fetchPickups} from "../../../redux/slices/indivOrdersSlice";

import {Radio} from "../../../UI/ordersUI/Radio/radio"
import {Button} from "../../../UI/ordersUI/Button/Button"
import {Toggle} from "../../../UI/ordersUI/Toggle/Toggle"
import {ChooseShop} from "../ChooseShop/ChooseShop"
import {ChoosePickup} from "../ChoosePickup/ChoosePickup"
import {minDate} from "../../../utils/utils"
import {formatData} from "../../../utils/utils"
import {arrMinValue} from "../../../utils/utils"

import kengLogo from "../../../assets/images/logo-shop.svg"
import cdekLogo from "../../../assets/images/cdek-logo.svg"
import boxberryLogo from "../../../assets/images/boxberry-logo-76.svg"
import classes from './takeFrom.module.scss'
// import {useStopJump} from "../../hooks/useStopJump"
// import {createAsyncThunk} from "@reduxjs/toolkit";


export const TakeFrom = () => {
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(fetchShops())
		dispatch(fetchPickups())
	}, [dispatch])
	
    const order = useSelector(state => state.indivOrders.order)
		const shops = useSelector(state => state.indivOrders.shops)
		const pickups = useSelector(state => state.indivOrders.pickups)


	
		const [shopsModal, setShopsModal] = useState(false);
		const [pickupsModal, setPickupsModal] = useState(false);
		
		const showShopsModal = () => setShopsModal(true);
		const closeShopsModal = () => setShopsModal(false);
		const showPickupsModal = () => setPickupsModal(true);
		const closePickupsModal = () => setPickupsModal(false);
		
    //TODO create createAsyncThunk
    // const {data: shops} = useFetch( './DATA/SHOPS_DATA.json', [] )
    // const {data: pickups} = useFetch( './DATA/PICKUPS_DATA.json', [] )

    // const shops = [
    //     {
    //         "code": "37_01",
    //         "address": "ул. Куконковых, 104",
		// 				"samovivozPrice": 100,
		// 				"deliveryPrice": 200,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 77",
    //         "takeFrom": "2021/04/26"
    //     },
    //     {
    //         "code": "37_02",
    //         "address": "ул. Спартака, 22",
		// 				"samovivozPrice": 200,
		// 				"deliveryPrice": 300,
    //         "schedule": "Пн-Вс с 8 до 21",
    //         "shopPhone": "8 915 832 60 80",
    //         "takeFrom": "2021/04/27"
    //     },
    //     {
    //         "code": "37_03",
    //         "address": "ул. Каравайковой, 101",
		// 				"samovivozPrice": 300,
		// 				"deliveryPrice": 400,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 90",
    //         "takeFrom": "2021/03/28"
    //     },
    //     {
    //         "code": "37_04",
    //         "address": "ул. Ташкентская, 86Б (Студия Цвета)",
		// 				"samovivozPrice": 400,
		// 				"deliveryPrice": 500,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 77",
    //         "takeFrom": "2021/04/26"
    //     },
    //     {
    //         "code": "37_05",
    //         "address": "ул. Спартака, 22",
		// 				"samovivozPrice": 500,
		// 				"deliveryPrice": 600,
    //         "schedule": "Пн-Вс с 8 до 21",
    //         "shopPhone": "8 915 832 60 80",
    //         "takeFrom": "2021/04/27"
    //     },
    //     {
    //         "code": "37_06",
    //         "address": "ул. Каравайковой, 101",
		// 				"samovivozPrice": 600,
		// 				"deliveryPrice": 700,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 90",
    //         "takeFrom": "2021/03/28"
    //     },
    //     {
    //         "code": "37_07",
    //         "address": "ул. Куконковых, 104",
		// 				"samovivozPrice": 700,
		// 				"deliveryPrice": 800,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 77",
    //         "takeFrom": "2021/04/26"
    //     },
    //     {
    //         "code": "37_08",
    //         "address": "ул. Спартака, 22",
		// 				"samovivozPrice": 800,
		// 				"deliveryPrice": 900,
    //         "schedule": "Пн-Вс с 8 до 21",
    //         "shopPhone": "8 915 832 60 80",
    //         "takeFrom": "2021/04/27"
    //     },
    //     {
    //         "code": "37_09",
    //         "address": "ул. Каравайковой, 101",
    //         "samovivozPrice": 900,
		// 				"deliveryPrice": 1000,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "shopPhone": "8 915 832 60 90",
    //         "takeFrom": "2021/03/28"
    //     }
    // ]
	
    // const pickups = [
    //     {
    //         "name": "CDEK",
    //         "code": "123",
    //         "address": "ул. Громобоя, 16/50",
		// 				"samovivozPrice": 100,
		// 				"deliveryPrice": 200,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "pickupPhone": "8 915 832 60 77",
    //         "takeFrom": "2021/04/20"
    //     },
    //     {
    //         "name": "Boxberry",
    //         "code": "456",
    //         "address": "ул. Велижская, 10",
		// 				"samovivozPrice": 200,
		// 				"deliveryPrice": 300,
    //         "schedule": "Пн-Вс с 8 до 21",
    //         "pickupPhone": "8 915 832 60 80",
    //         "takeFrom": "2021/04/01"
    //     },
    //     {
    //         "name": "CDEK",
    //         "code": "7894",
    //         "address": "ул. Лежневскя, 124",
		// 				"samovivozPrice": 300,
		// 				"deliveryPrice": 400,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "pickupPhone": "8 915 832 60 90",
    //         "takeFrom": "2021/03/27"
    //     },
    //     {
    //         "name": "Boxberry",
    //         "code": "1123",
    //         "address": "ул. Громобоя, 16/50",
		// 				"samovivozPrice": 100,
		// 				"deliveryPrice": 500,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "pickupPhone": "8 915 832 60 77",
    //         "takeFrom": "2021/04/20"
    //     },
    //     {
    //         "name": "CDEK",
    //         "code": "1456",
    //         "address": "ул. Велижская, 10",
		// 				"samovivozPrice": 200,
		// 				"deliveryPrice": 600,
    //         "schedule": "Пн-Вс с 8 до 21",
    //         "pickupPhone": "8 915 832 60 80",
    //         "takeFrom": "2021/04/01"
    //     },
    //     {
    //         "name": "Boxberry",
    //         "code": "1789",
    //         "address": "ул. Лежневскя, 124",
		// 				"samovivozPrice": 400,
		// 				"deliveryPrice": 700,
    //         "schedule": "Пн-Пт с 8 до 21 Сб-Вс с 8 до 20",
    //         "pickupPhone": "8 915 832 60 90",
    //         "takeFrom": "2021/03/27"
    //     }
    // ]
		
		let minPickupSamovivozPrice = arrMinValue(pickups, 'samovivozPrice')
		
	
    // useStopJump(shopsModal)

    // useEffect( () => {
    // 	const body = document.querySelector( 'body' );
    // 	// let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    // 	body.style.overflow = shopsModal ? 'hidden' : 'auto';
    // 	body.style.paddingRight = shopsModal ? '17px' : '0px';
    // }, [shopsModal] );


    const choosenShop = shops && shops.filter(shop => shop.code === order.samovivozShop);
    const shopDates = shops.map(shop => new Date(shop.takeFrom));
    const shopMinDate = shops.length && minDate(shopDates)
    const {/*code: shopCode,*/
        address: shopAddress,
        cost: shopCost,
        shopPhone,
        schedule: shopSchedule,
        takeFrom: takeFromShop = shopMinDate
    } = choosenShop[0] || [];
    const shopDate1 = formatData(takeFromShop)
    const choosenPickup = pickups.filter(pickup => pickup.code === order.samovivozPickup);
    const pickupDates = (pickups.map(pickup => new Date(pickup.takeFrom)));
    const pickupMinDate = pickups.length && minDate(pickupDates)
    const {/*code: pickupCode,*/
        name: pickupName,
        address: pickupAddress,
        samovivozPrice: pickupCost,
        pickupPhone,
        schedule: pickupSchedule,
        takeFrom: takeFromPickup = pickupMinDate
    } = choosenPickup[0] || [];
		
    const pickupDate1 = formatData(takeFromPickup)

    let tkLogo

    switch (pickupName) {
        case 'CDEK':
            tkLogo = cdekLogo
            break;
        case 'Boxberry':
            tkLogo = boxberryLogo
            break;
        default:
            tkLogo = ''
    }

    useEffect(() => {
            dispatch(addData({key: 'samovivozDateKenguru', value: shopDate1}))
            dispatch(addData({key: 'samovivozShopAddress', value: shopAddress}))
            // setState(prev => ({...prev, samovivozDateKenguru: shopDate1, samovivozShopAddress: shopAddress}))

        }, [shopDate1, shopAddress, dispatch]
    )

    useEffect(() => {
            dispatch(addData({key: 'samovivozDatePickup', value: pickupDate1}))
            dispatch(addData({key: 'samovivozPickupAddress', value: pickupAddress}))
            dispatch(addData({key: 'pickupSamovivozPrice', value: pickupCost}))
            dispatch(addData({key: 'pickup', value: pickupName}))
            // setState(prev => (
            // 	{...prev,
            // 		samovivozDatePickup: pickupDate1,
            // 		samovivozPickupAddress: pickupAddress,
            // 		pickupDeliveryPrice: pickupCost,
            // 		pickup: pickupName
            // 	}))

        }, [pickupAddress, pickupDate1, dispatch, pickupCost, pickupName]
    )

    return <>
        <div className={classes['receive-section']}>
            <div className={classes['receive-section-inner']}>
                <div className={classes['receive-section__top']}>
                    <div className={classes['shop-info']}>
                        <div className={classes['receive-place']}>
                            <Radio
                                labelParams={[shopAddress || 'Из магазинов Кенгуру']}
                                name='samovivoz'
                                handler={e => dispatch(inputHandler({key: 'samovivoz', value: e.target.value}))}
                                // id={shopCode}
                                id={'from_Kenguru'}
                                state={order}
                            />
                            {shopAddress &&
                            <img className={classes['receive-place__logo']} src={kengLogo} alt='logotype'/>}
                        </div>

                        <p className={classes['delivery']}>{shopCost || 'Бесплатно'}{shopCost && ' ₽'}</p>
                        <p className={classes['delivery']}>{shopSchedule}</p>
                        <p className={classes['delivery']}>{shopPhone}</p>
                        <p className={classes['delivery-day']}>Можно забрать с <span>{shopDate1 || shopMinDate}</span>
                        </p>
                    </div>

											<Button
												type='secondary'
												text={shopAddress ? 'Поменять магазин' : 'Выбрать магазин'}
												handler={showShopsModal}
											/>

                </div>
                <div className={classes['receive-section__bottom']}>
                    <div className={classes['toggle__group']}>
                        <div className={classes['toggle__by-parts']}>
                            <Toggle
                                label={'Получить заказ частями по мере поступления в магазин'}
                                name='takeByParts'
                                val='Заберет частями'
                                state={order}
                                handler={e => dispatch(checkBoxHandler({key: 'takeByParts', value: e.target.checked}))}
                            />
                        </div>
                        <div className={classes['toggle__loading']}>
                            <Toggle
                                label={<span>Погрузить товар в автомобиль <span style={{color: '#808080'}}>{`+${order.loadItoCarPrice} ₽`}</span></span>}
                                name='loadIntoCar'
                                val='Погрузить в автомобиль'
                                state={order}
                                handler={e => dispatch(checkBoxHandler({key: 'loadIntoCar', value: e.target.checked}))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {shopsModal &&
            <ChooseShop
                text='Укажите магазин'
                close={closeShopsModal}
                shops={shops}
                /*state={order}
                shops={shops}
             inputHandler={inputHandler}*//>}
        </div>
        <div className={classes['receive-section']}>
            <div className={classes['receive-section-inner']}>
                <div className={classes['receive-section__top']}>
                    <div className={classes['shop-info']}>
                        <div className={classes['receive-place']}>
                            <Radio
                                labelParams={[pickupAddress || 'Из пунктов выдачи']}
                                name='samovivoz'
                                handler={e => dispatch(inputHandler({key: 'samovivoz', value: e.target.value}))}
                                // id={pickupCode}
                                id='from_pickup'
                                state={order}
                            />
                            {pickupAddress &&
                            <img className={classes['receive-place__logo']} src={tkLogo} alt='logotype'/>}
                        </div>
                        <p className={classes['delivery']}>{pickupCost || `от ${minPickupSamovivozPrice} ₽`}{pickupCost && ' ₽'}</p>
                        <p className={classes['delivery']}>{pickupSchedule}</p>
                        <p className={classes['delivery']}>{pickupPhone}</p>
                        <p className={classes['delivery-day']}>Можно забрать
                            с <span>{pickupDate1 || pickupMinDate}</span></p>
                    </div>

                    <Button type='secondary' text={pickupAddress ? 'Поменять пункт выдачи' : 'Выбрать пункт выдачи'}
                            handler={showPickupsModal}/>

                    {pickupsModal && <ChoosePickup
                        text='Карта пунктов выдачи'
                        close={closePickupsModal}
                        state={order}
                        pickups={pickups}
                        inputHandler={inputHandler}/>
                    }
                </div>
            </div>
        </div>
    </>
}