import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopUp from '../../Components/ConfirmationPopUp/ConfirmationPopUp';
import styles from './MonCompte.module.scss';

const MonCompte = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userScenarios, setUserScenarios] = useState([]);
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);

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

    const handleEdit = (scenarioId) => {
        navigate(`/ScenarioEdit/${scenarioId}`);
    };

    const promptDelete = (scenarioId) => {
        setSelectedScenarioId(scenarioId);
        setPopUpOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/deleteScenario/${selectedScenarioId}`, { method: 'DELETE' });
            if (response.ok) {
                fetchScenariosByUserId(user.idUser);
            } else {
                console.error("Failed to delete scenario");
            }
        } catch (error) {
            console.error("Error deleting scenario", error);
        }
        setPopUpOpen(false);
    };

    return (
        <div className={styles.monCompte}>
            <h1>Bienvenu, {user && user.name}</h1>
            <h2>Vos scénarios publiés:</h2>
            <ul>
                {userScenarios.map((scenario, index) => (
                    <li key={index}>
                        {scenario.NomScenario}
                        <button onClick={() => handleEdit(scenario.idScenario)}>Modifier</button>
                        <button onClick={() => promptDelete(scenario.idScenario)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <ConfirmationPopUp 
                isOpen={isPopUpOpen} 
                onClose={() => setPopUpOpen(false)} 
                onConfirm={handleConfirmDelete}
                message="Êtes-vous sûr de vouloir supprimer ce scénario ?" 
            />
        </div>
    );
};

export default MonCompte;
