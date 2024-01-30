import React, { useState, useEffect } from "react";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmationPopUp from "../../Components/ConfirmationPopUp/ConfirmationPopUp";
import styles from "./MonCompte.module.scss";

import { getScenariosByUserId, deleteScenario } from "../../api/scenario";

const MonCompte = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userScenarios, setUserScenarios] = useState([]);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserScenarios(user.idUser);
    }
  }, [user]);

  const fetchUserScenarios = async (userId) => {
    try {
      const scenarios = await getScenariosByUserId(userId);
      setUserScenarios(scenarios);
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
      await deleteScenario(selectedScenarioId);
      fetchUserScenarios(user.idUser);
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
            <button onClick={() => handleEdit(scenario.idScenario)}>
              Modifier
            </button>
            <button onClick={() => promptDelete(scenario.idScenario)}>
              Supprimer
            </button>
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
