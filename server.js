// Importation des modules nécessaires
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import db from './config/db.js'; // Connexion à la base de données

// Importation des routes
import authRoutes from './controllers/authController.js';
import emailVerificationRoutes from './domaine/email_verification/routes.js';
import forgotPasswordRoutes from './domaine/forgot_password/routes.js';
import otpRoutes from './domaine/otp/routes.js';
import userRoutes from './domaine/routes.js';
import dashboardRoutes from './modules/dashboard/dashboardRoutes.js';

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Middlewares globaux
app.use(express.json()); // Pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données des formulaires
app.use(cors()); // Gestion des requêtes cross-origin
app.use(morgan('dev')); // Logger HTTP pour le développement

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});

// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/email-verification', emailVerificationRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Route de base pour tester le serveur
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur le serveur Backend 2 !' });
});

// Gestion des erreurs 404 (Route non trouvée)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
