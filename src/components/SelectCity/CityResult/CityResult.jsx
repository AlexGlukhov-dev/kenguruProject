import React from 'react';
import cn from 'classnames';
import classes from './cityResult.module.scss';
import cdek from "../../../assets/images/cdek.svg";
import box from "../../../assets/images/boxberry.svg";
import DeliveryPickUp from "./DeliveryBox";
import Delivery from "./Delivery";


const CityResult = (props) => {

    const {city, region, area, pickUp, id} = props.props

    return (
        <div className={classes["city-result"]} data-result={city}>
            <div className={classes["city-result__left"]}>
                <a href="#" className={classes["city-result__caption"]}>{city}</a>
                <div className={classes["city-result__district"]}> {region}, {area}</div>
                <Delivery pickUp={pickUp} id={id}/>
            </div>
            <a href="#" className={cn(classes["city-result__link"], classes["btn"], classes["btn--primary"])}>Выбрать</a>
        </div>
    );
};

export default CityResult;