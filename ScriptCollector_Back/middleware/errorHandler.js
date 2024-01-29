const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.type === 'database') {
        res.status(500).json({ message: "Erreur interne du serveur liée à la base de données" });
    } else if (err.type === 'not-found') {
        res.status(404).json({ message: "Ressource non trouvée" });
    } else if (err.type === 'validation') {
        res.status(400).json({ message: "Données d'entrée non valides", details: err.details });
    } else {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

module.exports = { errorHandler };
