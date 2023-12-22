const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require ("bcrypt")

const app = express();

app.use(bodyParser.json());

const port = 8000
;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scriptcollector"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(port, () => {
  console.log(`Serveur Node écoutant sur le port ${port}`);
});

app.post("/addUser", async (req, res) => {
  const date = new Date();
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlEmail = "SELECT email FROM users WHERE email = ?"
  const emailValue = [email];
  connection.query(sqlEmail, emailValue, (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      res.status(200).json({ message: "Mail existant" });
    } else {
      const sqlInsert = "INSERT INTO users ( email, password, username, date ) VALUES (?, ?, ?, ?)";
      const values = [email, hashedPassword,username , date];
      connection.query(sqlInsert, values, (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "Ok"})
      })
    }
  })
})

app.post("/getUserByEmail", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const sqlGet = "SELECT * FROM users WHERE email = ?";

  connection.query(sqlGet, [email], async (err, result) => {
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
            name: user.username
          }
        });
      } else {
        res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  });
});

app.get("/getAllGames", (req, res) => {
  const sqlGetAllGames = "SELECT * FROM jeux";

  connection.query(sqlGetAllGames, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
          return;
      }

      res.status(200).json(result);
  });
});

app.get("/getGameById/:gameId", (req, res) => {

  const gameId = req.params.gameId;
  const sqlGetGame = "SELECT * FROM jeux WHERE idJeu = ?";

  connection.query(sqlGetGame, [gameId], (err, result) => {
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
});

app.get("/getScenariosByGameId/:gameId", (req, res) => {
  const gameId = req.params.gameId;
  const sqlGetScenarios = "SELECT * FROM scenarios WHERE JeuScenario = ?";

  connection.query(sqlGetScenarios, [gameId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.status(200).json(result);
  });
});

app.get("/getScenarioById/:scenarioId", (req, res) => {
  const scenarioId = req.params.scenarioId;
  const sqlGetScenario = "SELECT * FROM scenarios WHERE idScenario = ?";

  connection.query(sqlGetScenario, [scenarioId], (err, result) => {
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
});

app.get("/getAllGameTags", (req, res) => {
  const sqlGetAllTags = "SELECT CategorieJeu FROM jeux";

  connection.query(sqlGetAllTags, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const allTags = result
      .flatMap(row => row.CategorieJeu.split(','))
      .map(tag => tag.trim())
      .filter(tag => tag)
      .filter((value, index, self) => self.indexOf(value) === index);

    res.status(200).json(allTags);
  });
});

app.get("/getAllScenarioTags", (req, res) => {
  const sqlGetAllTags = "SELECT CategorieScenario FROM scenarios";

  connection.query(sqlGetAllTags, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const allTags = result
      .flatMap(row => row.CategorieScenario ? row.CategorieScenario.split(',') : [])
      .map(tag => tag.trim())
      .filter(tag => tag)
      .filter((value, index, self) => self.indexOf(value) === index);

    res.status(200).json(allTags);
  });
});

app.get("/getGamesByTag/:tag", (req, res) => {
  const tag = req.params.tag;
  const sql = "SELECT * FROM jeux WHERE FIND_IN_SET(?, CategorieJeu) > 0";

  connection.query(sql, [tag], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.status(200).json(result);
  });
});

app.get("/getAllScenarios", (req, res) => {
  const sqlGetAllScenarios = "SELECT * FROM scenarios";

  connection.query(sqlGetAllScenarios, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.status(200).json(result);
  });
});

app.get("/getScenariosByTag/:tag", (req, res) => {
  const tag = req.params.tag;
  const sqlGetScenariosByTag = "SELECT * FROM scenarios WHERE FIND_IN_SET(?, CategorieScenario) > 0";

  connection.query(sqlGetScenariosByTag, [tag], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.status(200).json(result);
  });
});