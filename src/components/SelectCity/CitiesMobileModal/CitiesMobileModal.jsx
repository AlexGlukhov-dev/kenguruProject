import React, {useState} from 'react';
import Modal from "../../../UI/Modal/Modal";
import classes from './citiesMobileModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {hideCitiesForMobile} from "../../../redux/slices/selectCitySlice";

const CitiesMobileModal = () => {
    const [ closeAnimation, setCloseAnimation ] = useState('')
    const dispatch = useDispatch()
    const { citiesForMobile } = useSelector(state => state.selectCity )
    const { currentRegion, currentCities } = citiesForMobile.payload;

    const hideModalRegion = () => {
        setCloseAnimation('modal--hide');
        setTimeout(() => {
            dispatch(hideCitiesForMobile())
        }, 100)
    };


    return (
       <Modal className={cn(classes['modal'], classes[closeAnimation])}>
            <div className={classes['modal--top']}>
                <div className={classes['modal--left']}>
                    <div onClick={hideModalRegion} className={classes['modal--back']}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 5.29289L5.29289 0.292892L6.70711 1.70711L2.41421 6L6.70711 10.2929L5.29289 11.7071L0.292893 6.70711C-0.0976311 6.31658 -0.0976311 5.68342 0.292893 5.29289Z" fill="#333333"/>
                        </svg>
                    </div>
                    <div className={classes['modal--title']}>
                        {currentRegion}
                    </div>
                </div>
                <div onClick={hideModalRegion} className={classes['modal--close']}>
                    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.41855 5.00501L9.70677 1.71679C10.0977 1.32581 10.0977 0.694236 9.70677 0.303258C9.31579 -0.0877193 8.68421 -0.0877193 8.29323 0.303258L5.00501 3.58145L1.71679 0.293233C1.32581 -0.0977444 0.694236 -0.0977444 0.303258 0.293233C-0.0877193 0.68421 -0.0877193 1.31579 0.303258 1.70677L3.59148 4.99499L0.293233 8.29323C-0.0977444 8.68421 -0.0977444 9.31579 0.293233 9.70677C0.68421 10.0977 1.31579 10.0977 1.70677 9.70677L5.00501 6.41855L8.29323 9.70677C8.68421 10.0977 9.31579 10.0977 9.70677 9.70677C10.0977 9.31579 10.0977 8.68421 9.70677 8.29323L6.41855 5.00501Z"/>
                    </svg>
                </div>
            </div>
           <div className={classes['modal--cities-links']}>
               {currentCities.map(city => <a className={classes['modal--city-link']} href="#" key={city}>{city}</a>)}
           </div>
       </Modal>
    );
};

export default CitiesMobileModal;