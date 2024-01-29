const db = require("../database/connection");
const { validationResult, param } = require("express-validator");

exports.getAllGames = (req, res) => {
    const sqlGetAllGames = "SELECT * FROM jeux";
    db.query(sqlGetAllGames, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getGameById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const gameId = req.params.gameId;
    const sqlGetGame = "SELECT * FROM jeux WHERE idJeu = ?";
    db.query(sqlGetGame, [gameId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: "Jeu non trouvé" });
        }
    });
};

exports.getGamesByTag = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tag = req.params.tag;
    const sql = "SELECT * FROM jeux WHERE FIND_IN_SET(?, CategorieJeu) > 0";
    db.query(sql, [tag], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};

exports.getAllGameTags = (req, res) => {
    const sqlGetAllTags = "SELECT CategorieJeu FROM jeux";

    db.query(sqlGetAllTags, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        const allTags = result
            .flatMap((row) => row.CategorieJeu.split(","))
            .map((tag) => tag.trim())
            .filter((tag) => tag)
            .filter((value, index, self) => self.indexOf(value) === index);

        res.status(200).json(allTags);
    });
};