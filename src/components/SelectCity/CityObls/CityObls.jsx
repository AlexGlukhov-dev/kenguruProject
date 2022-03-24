import React, {useEffect} from 'react';
import CityObl from "./CityObl";
import {useDispatch, useSelector} from "react-redux";
import {fetchSelectCityData} from "../../../redux/slices/selectCitySlice";
import classes from "./regions.module.scss";
import Regions from "./Regions";
import {useWindowSize} from "../../../hooks/useWindowSize";

const CityObls = () => {
    const dispatch = useDispatch();
    const cityData = useSelector(state => state.selectCity.selectCityData)

    useEffect(() => {
        dispatch(fetchSelectCityData());
    }, [])


    let isMobile = useWindowSize().width <= 768;
    return (
        <>
            {
                !isMobile ?
                    <div className="city-obls">
                        {cityData.map((obl, i) => <CityObl key={Object.keys(obl)[0]} obl={Object.keys(obl)[0]} citys={obl[Object.keys(obl)[0]]}/>)}
                    </div>
                :
                    <div className={classes['region-wrapper']}>
                        {cityData.map(region => <Regions key={Object.keys(region)[0]} regions={Object.keys(region)[0]} cts={region[Object.keys(region)[0]]}/>)}
                    </div>
            }
        </>
    );
};

export default CityObls;