const express = require('express');
const session = require('express-session');
const { keycloak, memoryStore } = require('./middleware/keycloak');

const app = express();

// Configuration de la session
app.use(session({
  secret: 'someRandomSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

// Activer Keycloak
app.use(keycloak.middleware());

// Fonction pour extraire et afficher les rôles de l'utilisateur
function getUserRoles(req) {
  if (req.kauth && req.kauth.grant) {
    const tokenContent = req.kauth.grant.access_token.content;
    return tokenContent.realm_access?.roles || [];
  }
  return [];
}

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenue sur le site web !</h1>
    <a href="/admin">Admin</a> | <a href="/user">User</a> | <a href="/logout">Déconnexion</a>
  `);
});

app.get('/admin', keycloak.protect('my-website:admin-role'), (req, res) => {
  const roles = getUserRoles(req);
  console.log('Rôles utilisateur (Admin) :', roles); // Affiche les rôles dans la console
  console.log("Contenu du jeton utilisateur :", req.kauth.grant.access_token.content);
});

app.get('/user', keycloak.protect(), (req, res) => {
  const roles = getUserRoles(req);

  // Récupérer le nom de l'utilisateur depuis le token
  let userName = 'Utilisateur inconnu'; // Valeur par défaut si le nom n'est pas trouvé
  if (req.kauth && req.kauth.grant) {
    const tokenContent = req.kauth.grant.access_token.content;
    userName = tokenContent.preferred_username || tokenContent.name || tokenContent.sub || userName;
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Site web en ligne sur http://localhost:3000');
});
