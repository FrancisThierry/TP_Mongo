// blog_app/config/db.js

const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGO_URL

const connectDB = async () => {
  try {
    // Options de connexion pour assurer une connexion stable et gérer les erreurs
    const clientOptions = {
      serverSelectionTimeoutMS: 5000 // Délai d'attente de 5 secondes pour la sélection du serveur
    };

    await mongoose.connect(uri, clientOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;

