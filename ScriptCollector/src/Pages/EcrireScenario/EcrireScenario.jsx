import React from "react";
import { Link } from "react-router-dom";
import styles from "./EcrireScenario.module.scss";

const EcrireScenario = () => {
  return (
    <div className={styles.ecritureAll}>
      <h1>Ecrire son propre scénario</h1>
      <div className={styles.textEcriture}>
        <br></br>
        <p>
          <br></br>
          Pour garantir un environnement respectueux et inclusif sur notre
          plateforme, nous vous prions de suivre certaines règles lors de la
          soumission de vos scénarios. Tout d'abord, assurez-vous que le contenu
          de votre scénario exclut tout langage grossier, offensant,
          discriminant ou inapproprié qui n'a pas sa place dans le contexte de
          l'histoire. Nous encourageons des interactions positives et
          enrichissantes entre les joueurs et les maîtres de jeu. De plus,
          veillez à respecter les droits d'auteur en ne soumettant que des
          contenus originaux ou en obtenant les autorisations nécessaires si
          vous utilisez des éléments protégés par des droits d'auteur tiers.
          Enfin, assurez-vous que votre scénario est clairement structuré et
          bien formaté pour faciliter la compréhension et la jouabilité.
          <br></br>
          <br></br>
          Nous apprécions votre contribution à notre communauté de jeux de rôle
          et nous sommes impatients de découvrir vos scénarios passionnants. En
          suivant ces règles simples, vous contribuez à créer un espace où tous
          les amateurs de jeux de rôle peuvent s'épanouir et partager des
          aventures mémorables. Veuillez prendre le temps de réviser vos
          scénarios avant de les soumettre, car cela garantira une expérience de
          jeu positive pour tous.
        </p>
        <br></br>
        <br></br>
      </div>

    <Link to ='/creationScenario' className={styles.lienEcriture}>Je comprend et je suivrais ces règles</Link>

    </div>
  );
};

export default EcrireScenario;
