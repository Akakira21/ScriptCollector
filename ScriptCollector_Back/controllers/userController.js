const db = require("../database/connection");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const currentDate = new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlEmail = "SELECT email FROM users WHERE email = ?";
    const emailValue = [email];

    db.query(sqlEmail, emailValue, async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        if (result.length !== 0) {
            res.status(200).json({ message: "Mail existant" });
        } else {
            const sqlInsert = "INSERT INTO users (email, password, username, date) VALUES (?, ?, ?, ?)";
            const values = [email, hashedPassword, username, currentDate];

            db.query(sqlInsert, values, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }
                res.status(200).json({ message: "Ok" });
            });
        }
    });
};

exports.getUserByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body.user);

    const { email, password } = req.body.user;
    const sqlGet = "SELECT * FROM users WHERE email = ?";

    db.query(sqlGet, [email], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        if (result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(200).json({
                    message: "Connexion réussie",
                    user: {
                        email: user.email,
                        name: user.username,
                        idUser: user.idUser,
                        rangUser: user.rangUser,
                    },
                });
            } else {
                res.status(401).json({ message: "Erreur" });
            }
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    });
};

exports.getAllUsers = (req, res) => {
    const sql = "SELECT username, email, rangUser, date FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json(result);
    });
};
