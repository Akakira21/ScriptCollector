import { Link } from "react-router-dom"
import styles from "./Acceuil.module.scss"


function Accueil(){
    return (
        <div className={styles.Accueil}>
            <div className={styles.AccueilMain}>
                <div className={styles.AccueilText}>
                    <h1>Bienvenue sur ScriptCollector !</h1>
                    <br /><br />
                    <p>
                    Ici, vous avez trouvé un trésor précieux de scénarios soigneusement sélectionnés, tous conçus pour enrichir vos expériences de jeu de rôle traditionnel. Que vous soyez un maître de jeu expérimenté ou un novice curieux, ScriptCollector est votre portail vers des mondes imaginaires remplis de mystère, d'intrigue, et d'émotions.
                    <br /><br />
                    Explorez nos catégories variées, que ce soit la fantasy, la science-fiction, l'horreur, l'histoire, ou bien d'autres encore, et plongez dans des mondes où se mêlent des personnages fascinants, des intrigues tordues, et des choix cruciaux. Que vous soyez maître de jeu ou joueur, ce site est votre trésor, où vous pouvez partager vos créations, découvrir de nouveaux récits, et tisser des liens avec d'autres conteurs d'histoires.
                    <br /><br />
                    Notre communauté de passionnés du jeu de rôle traditionnel est un lieu où vous pouvez non seulement découvrir des récits captivants, mais aussi partager vos propres créations, discuter de stratégies, et tisser des liens avec d'autres aventuriers intrépides.
                    </p>
                </div>
                <div className={styles.NavButton}>
                    <Link to ="/recemmentajoutes" className={styles.link}>Récemment Ajoutés</Link>
                    <Link to ="/mieuxnotes" className={styles.link}>Les Mieux Notés</Link>
                    <Link to ="/creationscenario" className={styles.link}>Création de scénarios</Link>
                </div>
            </div>
        </div>
    )
}

export default Accueil