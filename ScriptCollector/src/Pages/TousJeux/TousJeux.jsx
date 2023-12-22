import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TousJeux.module.scss';

const TousJeux = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch("http://localhost:8000/getAllGames");
            const data = await response.json();
            setGames(data);
        };

        fetchGames();
    }, []);

    return (
        <div className={styles.tousJeux}>
            <h1>Tous les jeux</h1>
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
