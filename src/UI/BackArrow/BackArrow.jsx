import React from 'react';

import classes from './backArrow.module.scss';

const BackArrow = ({children, onClick, ...props}) => {
    return (
        <div className={classes["container"]}>
            <a className={`${classes["back"]} header__back`} href={props.link} onClick={onClick}>
                <svg width="10" height="8" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3H3.5L5.1 1L3.2 0L0 3.9V4.1L3.2 8L5.1 7L3.5 5H9C9.6 5 10 4.6 10 4C10 3.5 9.5 3 9 3Z" />
                </svg>
                {children}
            </a>
        </div>
    );
};

export default BackArrow;