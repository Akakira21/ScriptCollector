import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Jeu = () => {
  const { gameId } = useParams();
  const [jeu, setJeu] = useState(null);
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const fetchJeu = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getGameById/${gameId}`);
        if (response.ok) {
          const data = await response.json();
          setJeu(data);
        } else {
          console.error("Erreur de récupération du jeu");
        }
      } catch (error) {
        console.error("Erreur récupération du jeu", error);
      }
    };

    const fetchScenarios = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getScenariosByGameId/${gameId}`);
        if (response.ok) {
          const data = await response.json();
          setScenarios(data);
        } else {
          console.error("Erreur de récupération des scénarios");
        }
      } catch (error) {
        console.error("Erreur récupération des scénarios", error);
      }
    };

    fetchJeu();
    fetchScenarios();
  }, [gameId]);

  return (
    <div>
      {jeu ? (
        <>
          <h1>{jeu.NomJeu}</h1>
          <h2>{jeu.DescJeu}</h2>
          <h3>Tags:</h3>
          <ul>
            {jeu.CategorieJeu.split(',')
              .map(tag => tag.trim())
              .filter(tag => tag.length > 0)
              .map((tag, index) => (
                <li key={index}>{tag}</li>
            ))}
          </ul>
          <h3>Scénarios:</h3>
          <ul>
            {scenarios.map((scenario, index) => (
              <li key={index}>
                <Link to={`/scenario/${scenario.idScenario}`}>{scenario.NomScenario}</Link>
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
