import React, {useEffect} from 'react';



const CityObl = ({obl, citys}) => {


    return (
        <div className="city-obl">
            <div className="city-obl__caption">{obl}</div>
            <div className="city-obl__links">
                <div className="city-obl__top for-mobile">
                    <button className="city-obl__back btn-reset"></button>
                    <div className="city-obl__caption-mobile">{obl}</div>
                    <button className="btn-reset modal__close" aria-label="Закрыть модальное окно">
                        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M6.4 5L9.7 8.3C10.1 8.7 10.1 9.3 9.7 9.7C9.3 10.1 8.7 10.1 8.3 9.7L5 6.4L1.7 9.7C1.3 10.1 0.7 10.1 0.3 9.7C-0.1 9.3 -0.1 8.7 0.3 8.3L3.6 5L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L5 3.6L8.3 0.3C8.7 -0.1 9.3 -0.1 9.7 0.3C10.1 0.7 10.1 1.3 9.7 1.7L6.4 5Z"/>
                        </svg>
                    </button>
                </div>
                <div className="city-obl__wrap">
                    {citys.map( (city, i) => <a href="#" key={city + i} className="city-obl__link">{city}</a> )}
                </div>
            </div>
        </div>
    );
};

export default CityObl;