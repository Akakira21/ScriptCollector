import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ScenariosCategories.module.scss';

const ScenariosCategories = () => {
  const { tag } = useParams();
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        let url = tag === 'all' 
                  ? `http://localhost:8000/getAllScenarios` 
                  : `http://localhost:8000/getScenariosByTag/${tag}`;
  
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setScenarios(data);
        } else {
          console.error("Erreur de récupération des scénarios");
        }
      } catch (error) {
        console.error("Erreur de récupération", error);
      }
    };
  
    fetchScenarios();
  }, [tag]);
  
  return (
    <div className={styles.scenariosCategories}>
      <h1>Catégories de Scénarios</h1>
      <ul>
        {scenarios.map((scenario, index) => (
          <li key={index}>
            <Link to={`/scenario/${scenario.idScenario}`}>{scenario.NomScenario}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScenariosCategories;
