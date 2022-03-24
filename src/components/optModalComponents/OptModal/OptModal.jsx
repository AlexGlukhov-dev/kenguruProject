import {useEffect, useState, useRef} from "react"

import {useDispatch, useSelector} from "react-redux";

import OrgsList from "../orgsList/orgsList";

import Modal from "../../../UI/ModalM/Modal";
import InputM from "../../../UI/InputM/InputM";
import SearchPreloader from "../../../UI/SearchPreloader/SearchPreloader";

import {
    fetchOptModalOrgs,
    fetchOptModalInn,
    showOptModal,
    getInn,
    noResults,
		clearResults,
    showPreloader
} from "../../../redux/slices/optModalSlice";

import classes from "./optModal.module.scss";
import {useStopScrollJump} from "../../../hooks/useStopScrollJump";

const OptModal = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.optModal)
    const [searchBtnDisabled, setSearchBtnDisabled] = useState(false)
    const preloader = state.preloader
    const orgs = state.orgs
    const inn = state.inn
    const searchResults = state.noResults
    // const showPreloader = true
	
	// useEffect(() => {
	// 	const body = document.querySelector('body')
	// 	// let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
	//
	// 	if (showOptModal) {
	// 		body.style.overflow = 'hidden'
	// 		// body.style.overflow = paddingOffset
	// 	}
	// 	return () => {
	// 		body.style.overflow = 'auto'
	// 		// body.style.overflow = '0'
	// 	}
	//
	// }, [])
	// useEffect( () => {
	// 	const body = document.querySelector( 'body' );
	// 	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	// 	body.style.overflow = 'hidden'
	// 	body.style.paddingRight = paddingOffset
	//
	// 	return () => {
	// 		body.style.overflow = 'auto';
	// 		body.removeAttribute('style')
	// 	}
	// }, [showOptModal] );
	
	useStopScrollJump(showOptModal)
	
    useEffect(() => {
        if (inn.length === 9 || inn.length === 10 || inn.length === 12) {
            setSearchBtnDisabled(false)
        } else {
            setSearchBtnDisabled(true)
        }
    }, [inn, searchBtnDisabled])

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const inputRef = useRef()

    const inputHandler = e => {
        const {value} = e.target;
        dispatch(getInn(value))
    };

    const clearInputField = e => {
        dispatch(getInn(''))
        inputRef.current.focus()
        dispatch(noResults(false))
				dispatch(clearResults())
    };


    const searchBtnHandler = () => {
        dispatch(showPreloader(true))
        dispatch(fetchOptModalInn(inn))
        // if (!searchResults) {
        //     dispatch(noResults(true))
        // } else {
        //     dispatch(noResults(false))
        // }
    }

    const chooseOrgHandler = (org) => {

        dispatch(fetchOptModalOrgs(org))
        dispatch(showOptModal(false))
        window.location.reload();
    }

    const onEnterPressed = e => {
        if (e.key === 'Enter') {
            if (e.target.value.length === 9
                || e.target.value.length === 10
                || e.target.value.length === 12) {
                searchBtnHandler()
            }
        }
    }

    const hideOptModalHandler = () => {
        dispatch(showOptModal(false))
    }

    return (
        <Modal onClose={hideOptModalHandler}>
            <div className={classes['opt-modal']}>
                <h3 className={classes['opt-modal__title']}>Режим оптовых цен</h3>
                <p className={classes['opt-modal__descr']}>Поиск компаний по ИНН и номеру карты в нашей базе оптовых
                    клиентов</p>
                <div className={classes['opt-modal__inputBlock']}>
                    <div className={classes['opt-modal__input']}>
                        <InputM
                            name='inn'
                            type='text'
                            label='ИНН или номер карты'
                            value={state.inn}
                            onChange={inputHandler}
                            clear={clearInputField}
                            mask='999999999999'
                            maskChar=''
                            ref={inputRef}
                            onKeyPress={onEnterPressed}
                        />
                    </div>
                    <button
                        className={classes['opt-modal__btn']}
                        onClick={searchBtnHandler}
                        disabled={searchBtnDisabled}>
                        Поиск
                    </button>
                </div>
                <div className={classes['opt-modal__suggestion']}>
                    У организаций в ИНН 10 цифр, у ИП 12 цифр, номер карты 9 цифр
                </div>
                {preloader ? <SearchPreloader/> : null}
            </div>
            {orgs.length ? <OrgsList orgs={orgs} onChoose={chooseOrgHandler}/> : null}
            {searchResults && <div className={classes['opt-modal__noresult']}>Клиент не найден в базе</div>}
        </Modal>
    )
}

export default OptModal;