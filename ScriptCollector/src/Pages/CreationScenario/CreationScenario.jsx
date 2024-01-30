import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import styles from "./CreationScenario.module.scss";

import { getAllGames } from "../../api/game";
import { createScenario } from "../../api/scenario";

const CreationScenario = () => {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getAllGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const onSubmit = async (data) => {
    const scenarioData = {
      ...data,
      idUserScenario: user.idUser,
    };

    try {
      const result = await createScenario(scenarioData);
      setFeedback("Scénario créé avec succès, vous allez être redirigé");

      reset();

      setTimeout(() => {
        navigate(`/scenario/${result.idScenario}`);
      }, 1250);
    } catch (error) {
      console.error("Erreur de soumission:", error);
      setFeedback("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className={styles.creationScenario}>
      <h1>Création de scénarios</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom du scénario:</label>
          <input type="text" {...register("NomScenario", { required: true })} />
          {errors.NomScenario && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Description du scénario:</label>
          <textarea
            {...register("DescScenario", { required: true })}
          ></textarea>
          {errors.DescScenario && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Catégories du scénario:</label>
          <input
            type="text"
            {...register("CategorieScenario", { required: true })}
          />
          {errors.CategorieScenario && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Jeu du scénario:</label>
          <select
            {...register("JeuScenario", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              --Choisir un jeu--
            </option>
            {games.map((game) => (
              <option key={game.idJeu} value={game.idJeu}>
                {game.NomJeu}
              </option>
            ))}
          </select>
          {errors.JeuScenario && <span>Ce champ est requis</span>}
        </div>

        <div>
          <label>Contenu:</label>
          <textarea
            {...register("ContenuScenario", { required: true })}
          ></textarea>
          {errors.Contenu && <span>Ce champ est requis</span>}
        </div>
        {feedback && <p className={styles.feedbackMessage}>{feedback}</p>}
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreationScenario;
