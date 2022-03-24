import React from 'react';
import cn from "classnames";
import classes from "./cityResult.module.scss";
import cdek from "../../../assets/images/cdek.svg";

const DeliveryCdek = () => {
    return (
        <span className={cn(classes["city-result__img"], classes[`city-result__img--cdek`])}>
              <img src={cdek} alt="box"/>
        </span>
    );
};

export default DeliveryCdek;
