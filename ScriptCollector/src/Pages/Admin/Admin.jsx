import React, { useState, useEffect } from "react";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

import { getAllGames } from '../../api/game';
import { getAllScenariosWithDetails } from '../../api/scenario';
import { getAllUsers } from '../../api/user';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenarioData = await getAllScenariosWithDetails();
        setScenarios(scenarioData);
  
        const gameData = await getAllGames();
        setGames(gameData);
  
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  return (
    <div>
      {!user || user.rangUser !== 1 ? (
        <>
          <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
          <button onClick={() => navigate("/")}>Retour à l'accueil</button>
        </>
      ) : (
        <>
          <h2>Scénarios</h2>
          <ul>
            {scenarios.map((scenario, index) => (
              <li key={index}>
                {scenario.NomScenario} - {scenario.NomJeu} - Mis en ligne par:{" "}
                {scenario.PostedBy}
                <button>Supprimer</button>
              </li>
            ))}
          </ul>
          <h2>Jeux</h2>
          <ul>
            {games.map((game, index) => (
              <li key={index}>{game.NomJeu} <button>Supprimer</button> </li>
            ))}
          </ul>
          <h2>Utilisateurs</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                Nom: {user.username} - Email: {user.email} - Rang:{" "}
                {user.rangUser === 1 ? "Admin" : "Utilisateur"} - Date de
                création: {user.date}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Admin;
