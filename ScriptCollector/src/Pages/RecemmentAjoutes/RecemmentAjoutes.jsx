import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./RecemmentAjoutes.module.scss";

import { getRecentScenarios } from "../../api/scenario";

const RecemmentAjoutes = () => {
  const [recentScenarios, setRecentScenarios] = useState([]);

  useEffect(() => {
    const fetchRecentScenarios = async () => {
      try {
        const data = await getRecentScenarios();
        setRecentScenarios(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des scénarios récents", error);
      }
    };

    fetchRecentScenarios();
  }, []);

  return (
    <div className={styles.recemmentAjoutes}>
      <h1>Récemment Ajoutés</h1>
      <ul>
        {recentScenarios.map((scenario, index) => (
          <li key={index} className={styles.scenarioItem}>
            <Link to={`/scenario/${scenario.idScenario}`} className={styles.scenarioName}>
              {scenario.NomScenario}
            </Link>
            <Link to={`/jeu/${scenario.JeuScenario}`} className={styles.gameName}>
              <div>Jeu : {scenario.GameName}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecemmentAjoutes;
