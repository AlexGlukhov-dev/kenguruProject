import React, {useEffect, useRef} from 'react';
import cn from "classnames";

import classes from './inputSearch.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {clearCitySearch, addCitySearch, showCitysObls} from "../../../redux/slices/selectCitySlice";
import {fetchInputCitySearch} from "../../../redux/slices/selectCitySlice";

const InputSearch = () => {
    const { inputCitySearchText } = useSelector(state => state.selectCity)
    const ref = useRef(null)

    const dispatch = useDispatch();
    const inputChange = e => dispatch(addCitySearch(e.target.value));
    const clearSearch = () =>{
        dispatch(clearCitySearch());
        dispatch(showCitysObls());
        ref.current.focus();
    }

    useEffect(() => {
        inputCitySearchText.length >= 3 && dispatch(fetchInputCitySearch());
    }, [inputCitySearchText])



    return (
        <div className="city-search city-modal__search">
            <div className={classes["field"]}>
                <input ref={ref} onChange={inputChange} value={inputCitySearchText} type="search" className={cn(classes["city-search__input"], classes["field__input"])} placeholder="Введите название города"/>

                {   inputCitySearchText === '' ?
                    <button className={cn(classes["btn-reset"], classes["city-search__btn"], classes["field__btn"], classes["field__loupe"])} tabIndex="-1">
                        <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.7 16.7C16.3 17.1 15.7 17.1 15.3 16.7L12.9 14.3C11.5 15.4 9.8 16 8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 9.8 15.4 11.5 14.3 12.9L16.7 15.3C17.1 15.7 17.1 16.3 16.7 16.7ZM8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2Z" />
                        </svg>
                    </button>
                    :
                    <button className={cn(classes["btn-reset"], classes["city-search__btn"], classes["field__clear"], classes["field__btn"])} onClick={clearSearch}>
                        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.4 5L9.7 8.3C10.1 8.7 10.1 9.3 9.7 9.7C9.3 10.1 8.7 10.1 8.3 9.7L5 6.4L1.7 9.7C1.3 10.1 0.7 10.1 0.3 9.7C-0.1 9.3 -0.1 8.7 0.3 8.3L3.6 5L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L5 3.6L8.3 0.3C8.7 -0.1 9.3 -0.1 9.7 0.3C10.1 0.7 10.1 1.3 9.7 1.7L6.4 5Z" />
                        </svg>
                    </button>
                }
            </div>
        </div>
    );
};

export default InputSearch;