const express = require('express');
const path = require('path');

module.exports = (keycloak) => {
    const router = express.Router();

    // Route protégée pour la page utilisateur
    router.get('/', keycloak.protect(), (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'user.html'));
    });

    // Route pour afficher les rôles de l'utilisateur connecté (debugging)
    router.get('/roles', keycloak.protect(), (req, res) => {
        const roles = req.kauth.grant.access_token.content.realm_access.roles; // Récupère les rôles du Realm
        console.log('Rôles utilisateur (User):', roles);
        res.json({ roles });
    });

    return router;
};
