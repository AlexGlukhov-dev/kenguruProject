import React, { useRef } from 'react';
import classes from './regions.module.scss'
import { useDispatch } from "react-redux";
import {citiesPush, showCitiesForMobile, showRegionMobile} from "../../../redux/slices/selectCitySlice";

const Regions = ({regions, cts}) => {
    const target = useRef(null);
    const dispatch = useDispatch();


    const showRegionModal = () => {
       const currentCities = target.current.getAttribute('data-cities').split(',');
       const currentRegion = target.current.getAttribute('data-region');
       dispatch(citiesPush({
           currentRegion: currentRegion,
           currentCities: currentCities
       }));
       dispatch(showCitiesForMobile());
    }

    return (
        <div onClick={showRegionModal} ref={target} data-cities={cts} data-region={regions} className={classes['region-item']}>
            <div className={classes['region-item__caption']}>
                {regions}
            </div>
        </div>
    );
};

export default Regions;