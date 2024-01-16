import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./RecemmentAjoutes.module.scss";

const RecemmentAjoutes = () => {
  const [recentScenarios, setRecentScenarios] = useState([]);

  useEffect(() => {
    const fetchRecentScenarios = async () => {
      const response = await fetch("http://localhost:8000/getRecentScenarios");
      if (response.ok) {
        const data = await response.json();
        setRecentScenarios(data);
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
