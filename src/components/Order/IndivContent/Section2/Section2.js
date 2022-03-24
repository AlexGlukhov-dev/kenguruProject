import React from 'react'
import {useDispatch} from "react-redux";

import {Samovivoz} from "./Samovivoz/Samovivoz";
import {Delivery} from "./Delivery/Delivery";
import {Tabs} from '../../../../UI/ordersUI/Tabs/Tabs'
import WeightWarning from "../../../../UI/ordersUI/Weight-warning/Weight-warning";

import samovivoz from '../../../../assets/images/samovivoz.svg'
import samovivozDis from '../../../../assets/images/samovivozDis.svg'
import delivery from '../../../../assets/images/delivery.svg'
import deliveryDisabled from '../../../../assets/images/deliveryDisabled.svg'
// import DateSelect from '../../../UI/DateSelect/DateSelect'

export const Section2 = () => {
    const dispatch = useDispatch()
// const {setState} = useContext(IndivContext)
//const tabOneContent = <Samovivoz
    // state={state}
    // inputHandler={inputHandler}
    // shops={shops}
    // pickups={pickups}
///>

//const tabTwoContent = <Delivery
    // state={state}
    // inputHandler={inputHandler}
    // clearInputField={clearInputField}
    // shops={shops}
    // pickups={pickups}
    // sendData={sendData}
//>
    return (
        <>
            <WeightWarning/>
            <Tabs
                title1='Самовывоз'
                title2='Доставка'
                content1={<Samovivoz/>}
                content2={<Delivery/>}
                iconTab1={samovivoz}
                iconTab1Dis={samovivozDis}
                iconTab2={delivery}
                iconTab2Dis={deliveryDisabled}
                dispatch={dispatch}
                name1='isSamovivoz'
                name2='isDelivery'
            />
        </>
    )
}