import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TousScenarios.module.scss";

const TousScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      const response = await fetch("http://localhost:8000/getAllScenarios");
      if (response.ok) {
        const data = await response.json();
        setScenarios(
          data.sort((a, b) => a.NomScenario.localeCompare(b.NomScenario))
        );
      }
    };

    const fetchTags = async () => {
      const response = await fetch("http://localhost:8000/getAllScenarioTags");
      if (response.ok) {
        const data = await response.json();
        setTags(data.sort((a, b) => a.localeCompare(b)));
      }
    };

    fetchScenarios();
    fetchTags();
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
            <div className={styles.gameName}>{scenario.GameName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TousScenarios;
