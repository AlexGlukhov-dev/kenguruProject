import React from 'react';
import classes from "./buttonPrimary.module.scss";

const ButtonPrimary = ({children, className, ...props}) => {
    return (
        <button {...props} className={`${classes['btn-reset']} ${classes['btn--primary']} ${classes['btn']} ${className}`}>
            {children}
        </button>
    );
};

export default ButtonPrimary;