import React, { useState, useEffect } from "react";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      const response = await fetch(
        "http://localhost:8000/controllers/scenarioController.jsx/getAllScenariosWithDetails"
      );
      if (response.ok) {
        const data = await response.json();
        setScenarios(data);
      }
    };

    const fetchGames = async () => {
      const response = await fetch("http://localhost:8000/getAllGames");
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    };

    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8000/getAllUsers");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    };

    fetchScenarios();
    fetchGames();
    fetchUsers();
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
