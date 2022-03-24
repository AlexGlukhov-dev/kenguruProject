import React from 'react';

import classes from './buttonBurger.module.scss';

const ButtonBurger = ({children, ...props}) => {
    return (
        <button className={`${classes["burger"]} btn-reset`}>
            <span className={classes["burger__line"]} />
            <span className={classes["burger__el"]} />
        </button>
    );
};

export default ButtonBurger;