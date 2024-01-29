const db = require("../database/connection");
const { validationResult, param } = require("express-validator");

exports.getScenariosByGameId = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const gameId = req.params.gameId;
    const sqlGetScenarios = "SELECT * FROM scenarios WHERE JeuScenario = ?";
    db.query(sqlGetScenarios, [gameId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getScenarioById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const scenarioId = req.params.scenarioId;
    const sqlGetScenario = `
        SELECT scenarios.*, jeux.NomJeu 
        FROM scenarios 
        LEFT JOIN jeux ON scenarios.JeuScenario = jeux.idJeu 
        WHERE scenarios.idScenario = ?`;
    db.query(sqlGetScenario, [scenarioId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: "Scénario non trouvé" });
        }
    });
};

exports.getScenariosByUserId = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const sqlGetScenarios = "SELECT * FROM scenarios WHERE idUserScenario = ?";
    db.query(sqlGetScenarios, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getAllScenarios = (req, res) => {
    const sqlGetAllScenarios = `
        SELECT 
            scenarios.*, 
            jeux.NomJeu AS GameName 
        FROM scenarios 
        LEFT JOIN jeux ON scenarios.JeuScenario = jeux.idJeu`;
    db.query(sqlGetAllScenarios, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getScenariosByTag = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tag = req.params.tag;
    const sqlGetScenariosByTag =
        "SELECT * FROM scenarios WHERE FIND_IN_SET(?, CategorieScenario) > 0";
    db.query(sqlGetScenariosByTag, [tag], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getRecentScenarios = (req, res) => {
    const sqlGetRecentScenarios = `
        SELECT 
            scenarios.*, 
            jeux.NomJeu AS GameName 
        FROM scenarios 
        LEFT JOIN jeux ON scenarios.JeuScenario = jeux.idJeu
        ORDER BY STR_TO_DATE(DateScenario, '%d/%m/%Y') DESC
        LIMIT 10`;
    db.query(sqlGetRecentScenarios, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getAllScenariosWithDetails = (req, res) => {
    const sql = `
        SELECT scenarios.*, jeux.NomJeu, users.username AS PostedBy
        FROM scenarios
        JOIN jeux ON scenarios.JeuScenario = jeux.idJeu
        JOIN users ON scenarios.idUserScenario = users.idUser`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getAllScenarioTags = (req, res) => {
    const sqlGetAllTags = "SELECT CategorieScenario FROM scenarios";
    db.query(sqlGetAllTags, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        const allTags = result
            .flatMap((row) =>
                row.CategorieScenario ? row.CategorieScenario.split(",") : []
            )
            .map((tag) => tag.trim())
            .filter((tag) => tag)
            .filter((value, index, self) => self.indexOf(value) === index);

        res.status(200).json(allTags);
    });
};

exports.createScenario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        NomScenario,
        DescScenario,
        CategorieScenario,
        JeuScenario,
        ContenuScenario
    } = req.body;
    const currentDate = new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const sqlInsert = `
        INSERT INTO scenarios (NomScenario, DescScenario, CategorieScenario, JeuScenario, ContenuScenario, DateScenario, idUserScenario) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        NomScenario,
        DescScenario,
        CategorieScenario,
        JeuScenario,
        ContenuScenario,
        currentDate,
        req.body.idUserScenario
    ];

    db.query(sqlInsert, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json({
            message: "Scénario créé avec succès",
            idScenario: result.insertId
        });
    });
};

exports.updateScenario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { scenarioId } = req.params;
    const { NomScenario, DescScenario, CategorieScenario, JeuScenario } = req.body;

    const sqlUpdate = `
        UPDATE scenarios 
        SET NomScenario = ?, DescScenario = ?, CategorieScenario = ?, JeuScenario = ? 
        WHERE idScenario = ?`;

    db.query(sqlUpdate, [NomScenario, DescScenario, CategorieScenario, JeuScenario, scenarioId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Scénario mis à jour avec succès" });
        } else {
            res.status(404).json({ message: "Scénario non trouvé" });
        }
    });
};

exports.deleteScenario = (req, res) => {
    const { scenarioId } = req.params;
    const sqlDelete = "DELETE FROM scenarios WHERE idScenario = ?";

    db.query(sqlDelete, [scenarioId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Scénario supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Scénario non trouvé" });
        }
    });
};