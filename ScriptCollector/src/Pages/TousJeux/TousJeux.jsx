import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TousJeux.module.scss";

import { getAllGames, getAllGameTags } from "../../api/game";

const TousJeux = () => {
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesData = await getAllGames();
        setGames(gamesData.sort((a, b) => a.NomJeu.localeCompare(b.NomJeu)));

        const tagsData = await getAllGameTags();
        setTags(tagsData.sort((a, b) => a.localeCompare(b)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTagChange = (e) => {
    const selectedTag = e.target.value.toLowerCase();
    navigate(`/jeuxcategories/${selectedTag}`);
  };

  return (
    <div className={styles.tousJeux}>
      <h1>Tous les jeux</h1>
      <select onChange={handleTagChange} defaultValue="">
        <option value="" disabled>
          Select a tag
        </option>
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <ul>
        {games.map((jeu, index) => (
          <li key={index} className={styles.gameItem}>
            <Link to={`/jeu/${jeu.idJeu}`} className={styles.gameName}>
              {jeu.NomJeu}
            </Link>
            <div className={styles.gameDescription}>{jeu.DescJeu}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TousJeux;
