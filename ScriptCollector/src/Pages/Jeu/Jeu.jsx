import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Jeu.module.scss";

import { getGameById } from "../../api/game";
import { getScenariosByGameId } from "../../api/scenario";

const Jeu = () => {
  const { gameId } = useParams();
  const [jeu, setJeu] = useState(null);
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const fetchJeuData = async () => {
      try {
        const gameData = await getGameById(gameId);
        setJeu(gameData);
      } catch (error) {
        console.error("Erreur de récupération du jeu:", error);
      }
    };

    const fetchScenariosData = async () => {
      try {
        const scenariosData = await getScenariosByGameId(gameId);
        setScenarios(scenariosData);
      } catch (error) {
        console.error("Erreur de récupération des scénarios:", error);
      }
    };

    fetchJeuData();
    fetchScenariosData();
  }, [gameId]);

  return (
    <div className={styles.Jeu}>
      {jeu ? (
        <>
          <h1>{jeu.NomJeu}</h1>
          <h2>{jeu.DescJeu}</h2>
          <h3>Tags:</h3>
          <ul className={styles.tags_list}>
            {jeu.CategorieJeu.split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
              .map((tag, index) => (
                <li key={index}>
                  <Link to={`/jeuxcategories/${tag.toLowerCase()}`}>
                    <div>{tag}</div>
                  </Link>
                </li>
              ))}
          </ul>
          <h3>Scénarios:</h3>
          <ul className={styles.scenarios_list}>
            {scenarios.map((scenario, index) => (
              <li key={index}>
                <Link to={`/scenario/${scenario.idScenario}`}>
                  <div>{scenario.NomScenario}</div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Jeu;
