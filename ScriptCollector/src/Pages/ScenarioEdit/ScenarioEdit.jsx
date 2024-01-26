import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationPopUp from '../../Components/ConfirmationPopUp/ConfirmationPopUp';
import styles from "./ScenarioEdit.module.scss";

const ScenarioEdit = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState({ NomScenario: '', DescScenario: '', NomJeu: '', CategorieScenario: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getScenarioById/${scenarioId}`);
        if (response.ok) {
          const data = await response.json();
          setScenario(data);
        } else {
          console.error("Erreur de récupération du scénario");
        }
      } catch (error) {
        console.error("Erreur récupération du scénario", error);
      }
    };

    fetchScenario();
  }, [scenarioId]);

  const handleChange = (e) => {
    setScenario({ ...scenario, [e.target.name]: e.target.value });
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/updateScenario/${scenarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenario),
      });
  
      if (response.ok) {
        navigate(`/scenario/${scenarioId}`);
      } else {
        console.error("Failed to update scenario");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du scénario", error);
    }
  };

  const confirmationMessage = (
    <div>
      <p>Vous êtes sur le point de modifier le scénario avec les détails suivants :</p>
      <ul>
        <li>Nom du scénario: {scenario.NomScenario}</li>
        <li>Description: {scenario.DescScenario}</li>
        <li>Jeu: {scenario.NomJeu}</li>
        <li>Tags: {scenario.CategorieScenario}</li>
      </ul>
    </div>
  );

  return (
    <div className={styles.scenarioEdit}>
      <form onSubmit={handleShowConfirmation}>
        <h1>Modification du scénario</h1>
        <label>
          Nom du scénario:
          <input type="text" name="NomScenario" value={scenario.NomScenario} onChange={handleChange} />
        </label>
        <label>
          Description du scénario:
          <textarea name="DescScenario" value={scenario.DescScenario} onChange={handleChange} />
        </label>
        <label>
          Jeu:
          <input type="text" name="NomJeu" value={scenario.NomJeu} onChange={handleChange} />
        </label>
        <label>
          Tags:
          <input type="text" name="CategorieScenario" value={scenario.CategorieScenario} onChange={handleChange} />
        </label>
        <button type="submit">Modifier</button>
      </form>

      <ConfirmationPopUp
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleSubmit}
        message={confirmationMessage}
      />
    </div>
  );
};

export default ScenarioEdit;
