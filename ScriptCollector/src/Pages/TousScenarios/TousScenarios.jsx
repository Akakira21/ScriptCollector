import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TousScenarios.module.scss";

import { getAllScenarios, getAllScenarioTags } from "../../api/scenario";

const TousScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenariosData = await getAllScenarios();
        setScenarios(
          scenariosData.sort((a, b) =>
            a.NomScenario.localeCompare(b.NomScenario)
          )
        );

        const tagsData = await getAllScenarioTags();
        setTags(tagsData.sort((a, b) => a.localeCompare(b)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTagChange = (e) => {
    const selectedTag = e.target.value.toLowerCase();
    navigate(`/scenarioscategories/${selectedTag}`);
  };

  return (
    <div className={styles.tousScenarios}>
      <h1>Tous les scénarios</h1>
      <select onChange={handleTagChange} defaultValue="">
        <option value="" disabled>
          Select a tag
        </option>
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <ul>
        {scenarios.map((scenario, index) => (
          <li key={index} className={styles.scenarioItem}>
            <Link
              to={`/scenario/${scenario.idScenario}`}
              className={styles.scenarioName}
            >
              {scenario.NomScenario}
            </Link>
            <Link
              to={`/jeu/${scenario.JeuScenario}`}
              className={styles.gameName}
            >
              <div>Jeu : {scenario.GameName}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TousScenarios;
