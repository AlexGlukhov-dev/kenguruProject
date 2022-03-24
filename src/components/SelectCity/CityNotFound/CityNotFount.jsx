import React from 'react';
import classes from './cityNotFount.module.scss'

const CityNotFount = () => {
    return (
        <div className={classes["city-notfound"]}>
            <div className={classes["city-notfound__caption"]}>Данный населенный пункт не найден</div>
            <div className={classes["city-notfound__descr"]}>Проверьте, правильно ли вы указали название населенного пункта</div>
        </div>
    );
};

export default CityNotFount;