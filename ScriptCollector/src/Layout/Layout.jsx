import {useLocation, Outlet, ScrollRestoration} from 'react-router-dom'
import styles from "./Layout.module.scss"
import Home from "../Pages/Accueil/Acceuil"
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function Layout (){
    const {pathname} = useLocation();
    return(
        <div className={styles.layoutFull}>
            <Header/>
                <div className={styles.layoutCenterFooter}>
                    <div className={styles.main}>
                        {pathname === "/" ? <Home/> : <Outlet/>}
                    </div>
                    <Footer/>
                    <ScrollRestoration />
                </div>
        </div>
    )
}

export default Layout