import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import styles from "./CreationScenario.module.scss";

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
      const response = await fetch("http://localhost:8000/getAllGames");
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    };

    fetchGames();
  }, []);

  const onSubmit = async (data) => {
    const scenarioData = {
      ...data,
      idUserScenario: user.idUser,
    };

    console.log("User ID: ", user?.Id);
    console.log("Scenario Data: ", scenarioData);

    try {
      const response = await fetch("http://localhost:8000/createScenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scenarioData),
      });

      if (response.ok) {
        const result = await response.json();
        setFeedback("Scénario créé avec succès, vous allez être redirigé");

        reset();

        setTimeout(() => {
          navigate(`/scenario/${result.idScenario}`);
        }, 1250);
      } else {
        setFeedback("Erreur lors de la création du scénario");
      }
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