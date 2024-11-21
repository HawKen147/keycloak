const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const memoryStore = new session.MemoryStore();

// Configuration session
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

// Configuration Keycloak
const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Bienvenue sur le site web !</h1><a href="/admin">Admin</a> | <a href="/user">User</a>');
});

app.get('/admin', keycloak.protect('admin'), (req, res) => {
  res.send('<h1>Page Administration</h1><p>Accès réservé aux admins</p>');
});

app.get('/user', keycloak.protect('user'), (req, res) => {
  res.send('<h1>Page Utilisateur</h1><p>Bienvenue utilisateur !</p>');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Site web en ligne sur http://localhost:3000');
});
