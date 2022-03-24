import React from 'react';
import classes from "./cityResult.module.scss";
import DeliveryBox from "./DeliveryBox";
import DeliveryCdek from "./DeliveryCdek";

const Delivery = ({pickUp, id}) => {
    const deliveryText = pickUp.length >= 1 ? 'Доставим в пункты выдачи' : 'Доставка в населенный пункт невозможна';

    return (
        <div className={classes["city-result__delivery"]}>
            <span className={classes["city-result__txt"]}>{deliveryText}</span>
            {pickUp.map(delivery => delivery === 'cdek' ? <DeliveryCdek key={Math.random() + id}/> : <DeliveryBox  key={Math.random() + id}/>)}
        </div>
    );
};

export default Delivery;