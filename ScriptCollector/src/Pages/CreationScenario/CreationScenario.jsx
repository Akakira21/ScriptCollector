import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreationScenario.module.scss";

const CreationScenario = () => {
  const {
    register,
    handleSubmit,
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
    try {
      const response = await fetch("http://localhost:8000/createScenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Scénario créé avec succès");
      } else {
        alert("Erreur lors de la création du scénario");
      }
    } catch (error) {
      console.error("Erreur de soumission:", error);
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
          <textarea {...register("Contenu", { required: true })}></textarea>
          {errors.Contenu && <span>Ce champ est requis</span>}
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreationScenario;
