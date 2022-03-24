import React from 'react';
import classes from "./buttonSecondary.module.scss";

const ButtonSecondary = ({children, className, ...props}) => {
    return (
        <button {...props} className={`${classes['btn-reset']} ${classes['btn--secondary']} ${classes['btn']} ${className}`}>
            {children}
        </button>
    );
};

export default ButtonSecondary;