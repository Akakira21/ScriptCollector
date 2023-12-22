import { Link } from "react-router-dom"
import styles from "./Footer.module.scss"

function Footer (){
    return(
        <div className={styles.footerAll}>
            <nav className={styles.footer}>
                <Link to ="/apropos" className={styles.button}>A Propos</Link>
                <Link to ="/mentionslegales" className={styles.button}>Mentions Légales</Link>
                <Link to ="/contact" className={styles.button}>Contact</Link>
            </nav>
        </div>
    )
}

export default Footer