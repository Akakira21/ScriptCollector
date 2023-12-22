import styles from './Logo.module.scss'
import LogoIMG from "../../../assets/Images/LogoSimpleSVG.svg"
import { Link } from 'react-router-dom'

function Logo (){
    return(
        <div className={styles.logoAll}>
            <Link to ="/"><img className={styles.logo} src={LogoIMG} alt="Logo ScriptCollector" /></Link>
        </div>
    )
}

export default Logo