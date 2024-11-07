# Utilisez une image Node.js de base (ajustez la version si nécessaire)
FROM node:18-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et installez les dépendances
COPY package*.json ./
RUN npm install

# Copiez le reste de votre application
COPY . .

# Exposez le port sur lequel votre application écoutera (ajustez si nécessaire)
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["node", "server.js"]