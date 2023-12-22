import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './JeuxCategories.module.scss';

const JeuxCategories = () => {
  const { tag } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = tag === 'all' 
                  ? `http://localhost:8000/getAllGames` 
                  : `http://localhost:8000/getGamesByTag/${tag}`;
  
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error("Erreur de récupération des jeux");
        }
      } catch (error) {
        console.error("Erreur de récupération", error);
      }
    };
  
    fetchGames();
  }, [tag]);
  
  return (
    <div className={styles.jeuxCategories}>
      <h1>Jeux par catégories</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={`/jeu/${game.idJeu}`}>{game.NomJeu}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JeuxCategories;
