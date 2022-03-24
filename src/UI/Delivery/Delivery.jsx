import React from 'react';

const Delivery = ({children, ...props}) => {
    return (
        <span {...props}>
            {children}
        </span>
    );
};

export default Delivery;