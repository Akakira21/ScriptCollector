import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TousJeux.module.scss';

const TousJeux = () => {
    const [games, setGames] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch("http://localhost:8000/getAllGames");
            if (response.ok) {
                const data = await response.json();
                setGames(data.sort((a, b) => a.NomJeu.localeCompare(b.NomJeu)));
            }
        };

        const fetchGameTags = async () => {
            const response = await fetch("http://localhost:8000/getAllGameTags");
            if (response.ok) {
                const data = await response.json();
                setTags(data.sort((a, b) => a.localeCompare(b)));
            }
        };

        fetchGames();
        fetchGameTags();
    }, []);

    const handleTagChange = (e) => {
        const selectedTag = e.target.value.toLowerCase();
        navigate(`/jeuxcategories/${selectedTag}`);
    };

    return (
        <div className={styles.tousJeux}>
            <h1>Tous les jeux</h1>
            <select onChange={handleTagChange} defaultValue="">
                <option value="" disabled>Select a tag</option>
                {tags.map((tag, index) => (
                    <option key={index} value={tag}>{tag}</option>
                ))}
            </select>
            <ul>
                {games.map((jeu, index) => (
                    <li key={index}>
                        <Link to={`/jeu/${jeu.idJeu}`}>{jeu.NomJeu}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TousJeux;
