import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import styles from './Scenario.module.scss';

const Scenario = () => {
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getScenarioById/${scenarioId}`);
        if (response.ok) {
          const data = await response.json();
          setScenario(data);
        } else {
          console.error("Erreur de récupération du scénario");
        }
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
