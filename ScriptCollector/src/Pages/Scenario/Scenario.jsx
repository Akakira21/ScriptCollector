import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScenarioById } from '../../api/scenario';
import styles from './Scenario.module.scss';

const Scenario = () => {
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const data = await getScenarioById(scenarioId);
        setScenario(data);
      } catch (error) {
        console.error("Erreur récupération du scénario", error);
      }
    };

    fetchScenario();
  }, [scenarioId]);

  return (
    <div className={styles.scenario}>
      {scenario ? (
        <>
          <h1>{scenario.NomScenario}</h1>
          <h2>{scenario.DescScenario}</h2>
          <h3>Jeu :</h3>
          <Link to={`/jeu/${scenario.JeuScenario}`}>{scenario.NomJeu}</Link>
          <h3>Tags:</h3>
          <ul>
            {scenario.CategorieScenario.split(',')
              .map(tag => tag.trim())
              .filter(tag => tag.length > 0)
              .map((tag, index) => (
                <li key={index}>
                  <Link to={`/scenarioscategories/${tag}`}>{tag}</Link>
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

export default Scenario;
