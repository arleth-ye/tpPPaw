import express from "express";
import cors from "cors"; // Middleware CORS
import mysql from "mysql2"; // Importation du client MySQL

const app = express(); // Initialisation de l'application Express

// Middleware pour parser les requêtes JSON
app.use(cors());
app.use(express.json());

// Configuration de la connexion MySQL
const con = mysql.createConnection({
    host: "localhost",       // Adresse du serveur MySQL
    user: "root",            // Utilisateur MySQL
    password: "amina004",    // Mot de passe MySQL
    database: "todo_list1",  // Nom de la base de données
});

// Connexion à la base de données
con.connect((err) => {
    if (err) {
        console.error("Database connection error:", err.stack);
        return;
    }
    console.log("Connected to the database");
});

// Route POST pour insérer des données dans la base
app.post('/postauto', (req, res) => {
    const { id, module } = req.body; // Récupération des données du corps de la requête

    // Requête d'insertion dans la table "basetable"
    const insert_query = 'INSERT INTO basetable(id, module) VALUES(?, ?)';
    con.query(insert_query, [id, module], (err, result) => {
        if (err) {
            console.error("Error executing query:", err.stack);
            res.status(500).send("Error inserting data");
        } else {
            console.log("Data inserted successfully:", result);
            res.send("POSTED DATA");
        }
    });
});

// Route GET pour récupérer toutes les données
app.get('/fetchData', (req, res) => {
    const fetch_query = "SELECT * FROM basetable";
    con.query(fetch_query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Route GET pour récupérer les données par ID
app.get('/fetchbyId/:id', (req, res) => {
    const id = req.params.id;
    const fetch_query = "SELECT * FROM basetable WHERE id = ?";
    con.query(fetch_query, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result[0]);
        }
    });
});

// Route PUT pour mettre à jour les données par ID
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const module = req.body.module;
    const update_query = "UPDATE basetable SET module = ? WHERE id = ?";
    con.query(update_query, [module, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("UPDATED");
        }
    });
});

// Route DELETE pour supprimer une tâche par ID
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const delete_query = "DELETE FROM basetable WHERE id = ?";
    con.query(delete_query, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Deleted");
        }
    });
});

