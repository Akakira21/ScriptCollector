import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext/AuthContext';
import styles from './MonCompte.module.scss';

const MonCompte = () => {
    const { user } = useAuth();
    const [userScenarios, setUserScenarios] = useState([]);

    useEffect(() => {
        if (user) {
            fetchScenariosByUserId(user.idUser);
        }
    }, [user]);

    const fetchScenariosByUserId = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/getScenariosByUserId/${userId}`);
            if (response.ok) {
                const scenarios = await response.json();
                setUserScenarios(scenarios);
            } else {
                console.error("Failed to fetch scenarios");
            }
        } catch (error) {
            console.error("Error fetching scenarios", error);
        }
    };

    return (
        <div className={styles.monCompte}>
            <h1>Bienvenu, {user && user.name}</h1>
            <h2>Vos scénarios publiés:</h2>
            <ul>
                {userScenarios.map((scenario, index) => (
                    <li key={index}>{scenario.NomScenario}</li>
                ))}
            </ul>
        </div>
    );
};

export default MonCompte;
