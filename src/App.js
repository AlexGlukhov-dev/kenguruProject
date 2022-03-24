import {useDispatch, useSelector} from "react-redux";
import CartModal from "./components/cartModalComponents/CartModal";
import OptModal from './components/optModalComponents/OptModal/OptModal'
import ReserveModal from "./components/reserveModalComponents/ReserveModal/ReserveModal";
import StoryModal from "./components/storiesComponents/StoryModal/StoryModal";
import CookieAlert from "./components/CookieAlert/CookieAlert"
import LiteHeader from "./components/LiteHeader/LiteHeader";
import LiteFooter from "./components/LiteFooter/LiteFooter";
import {useEffect} from "react";
import {fetchAppData} from "./redux/slices/appSlice";
import {useWindowSize} from "./hooks/useWindowSize";
import {useLocation} from "react-router-dom";
import SelectCity from "./components/SelectCity/SelectCity";
import CitiesMobileModal from "./components/SelectCity/CitiesMobileModal/CitiesMobileModal";
import {IndivPage} from "./pages/IndivPage/IndivPage";


function App() {
    const {showCartModal} = useSelector(state => state.cartModal)
    const {showOptModal} = useSelector(state => state.optModal)
    const {showReserveModal} = useSelector(state => state.reserveModal)
    const {showStoryModal} = useSelector(state => state.storyModal)
    const {showLiteLayout} = useSelector(state => state.globalApp.appData)
    const {showCityChoose, showCitiesMobile} = useSelector(state => state.selectCity)


    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() => {
        dispatch(fetchAppData(location.pathname))
    }, [dispatch, location.pathname])

    const {width} = useWindowSize();

    return (
        <div className="App">
            <LiteHeader/>
            <IndivPage/>
            {showCartModal && <CartModal/>}
            {showOptModal && <OptModal/>}
            {showReserveModal && <ReserveModal/>}
            {showStoryModal && <StoryModal/>}
            <CookieAlert/>
            {/*showLiteLayout && width > 767 &&*/}{ <LiteFooter/>}
            {showCityChoose && <SelectCity />}
            {showCitiesMobile && <CitiesMobileModal />}
        </div>
    );
}

export default App;