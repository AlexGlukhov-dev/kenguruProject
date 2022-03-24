import {createPortal} from "react-dom";

import BackArrow from "../../UI/BackArrow/BackArrow";
import cn from 'classnames';

import classes from "./header.module.scss";
import logo from "../../assets/images/logo.svg";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchAppData} from "../../redux/slices/appSlice";

import {showCityChoose} from "../../redux/slices/selectCitySlice";
import IsRegion from "../isRegion/IsRegion";
import {useState} from "react";

const LiteHeader = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [showIsRegion, setShowIsRegion] = useState(true);
    const nameLink = location.pathname === '/personal/make/' ? 'Вернуться в корзину' : 'Вернуться к покупкам'
    const handleClick = () => {
        dispatch(fetchAppData(location.pathname));
    }

    const link = nameLink === 'Вернуться в корзину' ? '/personal/cart1/' : '/';

    const {city, phone, schedule} = useSelector(state => state.globalApp.appData)

    const portalElement = document.getElementById('liteHeader')
    document.body.style.display = 'block';

    const showModal = () => {
        setShowIsRegion(false);
        dispatch(showCityChoose());
    }

    return createPortal(
        <header className={cn(classes["header"], classes["header-small"])}>
            <div className={cn(classes["header-mobile"], classes["for-mobile"])}>
                <div className={cn(classes["container"], "containerLite", "grid")}>
                    <div className={classes["header-mobile__column"]}>
                        <button onClick={showModal} className={cn(classes["btn-reset"], "icon-btn", classes["header-mobile__geo"])} data-toggle="modal" >
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04968 4.3999C6.03736 4.3999 4.4275 5.9999 4.4275 7.8999C4.4275 9.7999 6.03736 11.3999 8.04968 11.3999C10.062 11.3999 11.6719 9.7999 11.6719 7.8999C11.6719 5.9999 10.062 4.3999 8.04968 4.3999ZM8.04968 9.6999C7.04352 9.6999 6.23859 8.8999 6.23859 7.8999C6.23859 6.8999 7.04352 6.0999 8.04968 6.0999C9.05584 6.0999 9.86077 6.8999 9.86077 7.8999C9.86077 8.8999 9.05584 9.6999 8.04968 9.6999Z" fill="#808080"/>
                                <path d="M8.04928 0C3.62218 0 0 3.5 0 7.9C0 10.9 1.71047 13.4 3.52156 15.1C4.42711 16 5.33265 16.7 6.03696 17.2C6.43943 17.4 6.74128 17.6 7.04312 17.8C7.14374 17.9 7.34497 17.9 7.44559 18C7.64682 18 7.84805 18 8.04928 18C8.25052 18 8.45175 18 8.55237 17.9C8.65298 17.9 8.85421 17.8 8.95483 17.7C9.25668 17.6 9.65914 17.4 9.96099 17.1C10.7659 16.6 11.6715 15.9 12.4764 15C14.1869 13.3 15.998 10.8 15.998 7.8C16.0986 3.5 12.4764 0 8.04928 0ZM11.3696 13.9C10.5647 14.7 9.75976 15.3 9.05545 15.7C8.7536 15.9 8.45175 16.1 8.25052 16.2C8.1499 16.2 8.1499 16.3 8.04928 16.3C8.04928 16.3 7.94867 16.3 7.84805 16.2C7.64682 16 7.34497 15.9 7.04312 15.7C6.33881 15.3 5.53388 14.7 4.72895 13.9C3.1191 12.3 1.71047 10.2 1.71047 7.9C1.71047 4.5 4.52772 1.8 7.94867 1.8C11.3696 1.8 14.1869 4.6 14.1869 7.9C14.2875 10.2 12.9795 12.3 11.3696 13.9Z" fill="#808080"/>
                            </svg>
                        </button>
                        {showIsRegion && <IsRegion className={'isRegion-open'} showIsRegion={showIsRegion} showModal={showModal} setShowIsRegion={setShowIsRegion}/>}
                    </div>
                    <div className={classes["header-mobile__column"]}>
                        <a href="/" className={cn(classes["logo"], classes["header__logo"])}>
                            <img src={logo} alt="Логотип Кенгуру" />
                        </a>
                    </div>
                </div>
            </div>
            <div className={classes["header__middle"]}>
                <div className={cn(classes["container"], "containerLite", "grid")}>
                    <a href="/" className={cn(classes["logo"], classes["header__logo"])}>
                        <img src={logo} alt="Логотип Кенгуру" />
                    </a>
                    <div className={classes["header__center"]}>
                        <div className={classes["city-choice"]} data-city-choice>
                            <button onClick={showModal} className={cn(classes["btn-reset"], "icon-btn", classes["geo__btn"], classes["geo__btn--choice"])} data-toggle="modal">
                                <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9834 11.6L7.74339 15.7C7.53656 15.9 7.22631 16 7.01948 16C6.70924 16 6.50241 15.9 6.29558 15.7L2.05556 11.6C-0.73665 8.9 -0.633234 4.6 2.05556 2C3.39995 0.7 5.26143 0 7.01948 0C8.77754 0 10.639 0.7 11.9834 2C14.6722 4.6 14.6722 8.9 11.9834 11.6ZM10.3288 3.6C9.39803 2.7 8.26046 2.3 7.01948 2.3C5.7785 2.3 4.53752 2.8 3.7102 3.6C1.84873 5.4 1.84873 8.2 3.7102 10L7.01948 13.2L10.3288 10C12.1902 8.2 12.1902 5.4 10.3288 3.6ZM7.01948 8.6C5.98533 8.6 5.15801 7.8 5.15801 6.8C5.15801 5.8 5.98533 5 7.01948 5C8.05363 5 8.88095 5.8 8.88095 6.8C8.88095 7.8 8.05363 8.6 7.01948 8.6Z" />
                                </svg>
                                <span className={classes["city-choice__text"]}>{city}</span>
                            </button>
                            {showIsRegion && <IsRegion showModal={showModal} setShowIsRegion={setShowIsRegion}/>}
                        </div>
                    </div>
                    <div className={cn(classes["header__phone"], classes["phone"])}>
                        <a href="tel:88001003312 " className={classes["phone__link"]}>{phone}</a> <span className={classes["phone__schedule"]}>{schedule}</span>
                    </div>
                </div>
            </div>
            <BackArrow link={link} onClick={handleClick}>{nameLink}</BackArrow>
        </header>,
        portalElement
    )
}

export default LiteHeader;