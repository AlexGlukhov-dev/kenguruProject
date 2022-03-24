import React from 'react';
import classes from "./isRegion.module.scss"
import ButtonClose from "../../UI/ButtonClose/ButtonClose";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import {useSelector} from "react-redux";


const IsRegion = ({showModal, setShowIsRegion, className, showIsRegion}) => {
    const {city} = useSelector(state => state.globalApp.appData)
    const hideModal = () => setShowIsRegion(false);
    const handleOutsideClick = e => e.target.classList.contains('outsideClick') && setShowIsRegion(false)

    return (
        <div className={showIsRegion && classes['overlay'] + ' outsideClick'}  onClick={handleOutsideClick}>
            <div className={`${classes['city-choice__window']} ${className ?? ''}`}>
                <ButtonClose onClick={hideModal} className={classes['btn-close']}/>
                <strong className={classes['city-choice__caption']}>Ваш город {city} ?</strong>
                <p className={classes['city-choice__descr']}>
                    От выбора населенного пункта зависит наличие товаров в магазинах и их стоимость, а также способы доставки.
                </p>
                <div className={classes['city-choice__btns']}>
                    <ButtonPrimary onClick={hideModal} className={classes['city-choice__btn']}>Да, верно</ButtonPrimary>
                    <ButtonSecondary onClick={showModal} className={classes['city-choice__btn']}>
                        <span className={classes['icon-btn']}>
                            <svg className={classes['icon-btn__svg']} width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9834 11.6L7.74339 15.7C7.53656 15.9 7.22631 16 7.01948 16C6.70924 16 6.50241 15.9 6.29558 15.7L2.05556 11.6C-0.73665 8.9 -0.633234 4.6 2.05556 2C3.39995 0.7 5.26143 0 7.01948 0C8.77754 0 10.639 0.7 11.9834 2C14.6722 4.6 14.6722 8.9 11.9834 11.6ZM10.3288 3.6C9.39803 2.7 8.26046 2.3 7.01948 2.3C5.7785 2.3 4.53752 2.8 3.7102 3.6C1.84873 5.4 1.84873 8.2 3.7102 10L7.01948 13.2L10.3288 10C12.1902 8.2 12.1902 5.4 10.3288 3.6ZM7.01948 8.6C5.98533 8.6 5.15801 7.8 5.15801 6.8C5.15801 5.8 5.98533 5 7.01948 5C8.05363 5 8.88095 5.8 8.88095 6.8C8.88095 7.8 8.05363 8.6 7.01948 8.6Z" />
                            </svg>
                            Выбрать другой
                        </span>
                    </ButtonSecondary>
                </div>
            </div>
        </div>
    );
};

export default IsRegion;