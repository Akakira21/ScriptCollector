import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./JeuxCategories.module.scss";

import { getAllGames, getGamesByTag } from "../../api/game";

const JeuxCategories = () => {
  const { tag } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData =
          tag === "all" ? await getAllGames() : await getGamesByTag(tag);
        setGames(gamesData);
      } catch (error) {
        console.error("Erreur de récupération des jeux:", error);
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
