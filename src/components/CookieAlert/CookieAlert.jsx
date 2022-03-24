import React, {useEffect, useState} from 'react';
import axios from "axios";


import ButtonClose from "../../UI/ButtonClose/ButtonClose";
import classes from './cookieAlert.module.scss';
import {useCookies} from "react-cookie";



const CookieAlert = () => {
    const [showModal, setShowModal] = useState(false);
    const [globalVar, setGlobalVar] = useState({});

    useEffect(() =>{
            const getGlobalVar = async () => {
                try{
                    const response = await axios.get('api_public/showCookie.php');
                    const data = await response.data;
                    setGlobalVar({...data})
                }catch (e){
                    console.log(e)
                }
            }
            getGlobalVar();
        },[]
    )

    const cookieName = globalVar.prefix + '_COOKIE_INFO';
    const [cookies, setCookie] = useCookies([cookieName])

    const someDate = new Date();
    const numberOfDaysToAdd = 180;
    const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    const arHostName = window.location.hostname.split('.');
    const hostName = (arr) => arr.slice(-2).join('.');

    const cookieWarn = () => {
        setCookie(cookieName, 1, {
            path: '/',
            expires: new Date(result),
            domain: hostName(arHostName),
        })
    }

    useEffect(()=>{
        if(!cookies[cookieName] && (globalVar.prefix !== undefined)){
            setShowModal(true)
            cookieWarn();
        }
    },[globalVar.prefix, cookieName, cookies])

    const closeAlert = () => {
        setShowModal(false)
    }

    return (
        <div className={`${classes["cookie-warn"]} ${!cookies[cookieName] && showModal && classes["cookie-warn--visible"]}` } >
            <div className={classes["cookie-warn__content"]}>
                Находясь на {globalVar.serverName}, вы соглашаетесь
                с тем, что мы используем куки-файлы и принимаете <a
                href="http://gluhov.kengurutest.ru/info/cookie.php" rel="nofollow noreferrer" target="_blank">условия
                обработки
                перcональных данных</a>
                <ButtonClose onClick={closeAlert}/>
            </div>
        </div>
    );
};

export default CookieAlert;