import React from 'react';
import classes from './mobileS.module.scss';

const MobileS = () => {
    return (
        <div className={classes['wrapper']}>
            <div className={classes['grid-container']}>
                <div className={classes['grid-item']}></div>
                <div className={classes['grid-item']}></div>
                <div className={classes['grid-item']}></div>
                <div className={classes['grid-item']}></div>
            </div>
        </div>
    );
};

export default MobileS;