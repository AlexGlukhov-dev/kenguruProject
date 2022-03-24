import React from 'react';
import {createPortal} from "react-dom";
import cn from 'classnames';

import master from '../../assets/images/master.svg';
import visa from '../../assets/images/visa.svg';
import mir from '../../assets/images/mir.svg';
import maestro from '../../assets/images/maestro.svg';

import classes from './footer.module.scss';



const LiteFooter = () => {
    const portalElement = document.getElementById('liteFooter')

    return createPortal(
        <footer className={cn(classes["footer"], classes["footer--basket"])}>
            <div className={cn("containerLite",  classes["footer__container"], "grid")}>
                <small className={classes["footer__copyright"]}>© Компания «Кенгуру». Все права защищены. Все цены указаны в
                    рублях.</small>
                <div className={classes["footer__payment"]}>
                    <img src={master} alt="Лого Мастеркард" className="footer__payment-img" />
                    <img src={maestro} alt="Лого Маэстро" className="footer__payment-img" />
                    <img src={visa} alt="Лого Виза" className="footer__payment-img" />
                    <img src={mir} alt="Лого Мир" className="footer__payment-img" />
                </div>
            </div>
        </footer>,
        portalElement
    );
};


export default LiteFooter;