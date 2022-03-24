import React from 'react';
import cn from "classnames";
import classes from "./cityResult.module.scss";
import box from "../../../assets/images/boxberry.svg";

const DeliveryBox = () => {
    return (
        <span className={cn(classes["city-result__img"], classes[`city-result__img--box`])}>
              <img src={box} alt="box"/>
        </span>
    );
};

export default DeliveryBox;
