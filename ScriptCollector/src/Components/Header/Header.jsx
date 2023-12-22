import Navbar from "./Navbar/Navbar"
import styles from "./Header.module.scss"
import Logo from "./Logo/Logo"

function Header (){
    return(
        <div className={styles.header}>
        <Logo/>
        <Navbar/>
        </div>
    )
}

export default Header