import React, {useEffect, useState} from 'react';
import {hideCityChoose, showCitysNotFound, showCitysResults, showCitysObls} from "../../redux/slices/selectCitySlice";
import {useDispatch, useSelector} from "react-redux";

import InputSearch from "./InputSearch/InputSearch";
import CitySlider from "./CitySlider/CitySlider";
import CityObls from "./CityObls/CityObls";
import CityResult from "./CityResult/CityResult";
import CityNotFount from "./CityNotFound/CityNotFount";
import Modal from "../../UI/Modal/Modal";
import SimpleBar from "simplebar-react";

import './_modals.scss';
import 'simplebar/dist/simplebar.min.css';
import ButtonClose from "../../UI/ButtonClose/ButtonClose";
import {useWindowSize} from "../../hooks/useWindowSize";





const SelectCity = () => {
    const {showCityChoose, showCityObls, showCityResult, showCityNotFound, inputCitySearch, inputCitySearchText} = useSelector(state => state.selectCity)
    const {width} = useWindowSize();
    const dispatch = useDispatch();

    const handleOutsideClick = e => {
        if(e.target.classList.contains('modal')){
            showCityChoose && dispatch(hideCityChoose());
        }
    }
    const closeModal = () => dispatch(hideCityChoose())

    const {cts} = inputCitySearch

    useEffect(() => {
        cts !== [] && inputCitySearchText.length >= 3 && dispatch(showCitysResults())
        cts === [] && inputCitySearchText.length >= 3 && dispatch(showCitysNotFound())
        inputCitySearchText.length < 3 && dispatch(showCitysObls())

    }, [inputCitySearchText, cts])

    return (
        <Modal onClick={handleOutsideClick} className="modal cty-modal is-open modal-layout">
            <div className="modal__container city-modal" role="dialog" aria-modal="true" data-graph-target="city-modal">
                <div className="city-modal__wrapper">
                    <div className="city-modal__pretop for-mobile">
                        <h2 className="city-modal__title for-mobile">Укажите ваш город</h2>
                    </div>
                    <ButtonClose onClick={closeModal} className="select-city-modal-close__btn"/>
                    <div className="city-modal__content">
                        <div className="city-modal__top">
                            <InputSearch />
                            <CitySlider />
                        </div>
                        <SimpleBar className={`custom-scrollbar custom-scrollbar-city-result`} style={{maxHeight: '536px'}}>
                            <div className="city-modal__bottom">
                                {showCityObls && <CityObls/>}
                                {cts && showCityResult && cts.map(city =>  <CityResult key={city.id} props={city}/> )}
                                {showCityNotFound && <CityNotFount/>}
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SelectCity;