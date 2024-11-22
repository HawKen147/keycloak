const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Configuration de la session (stockée en mémoire)
const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({
    store: memoryStore,
}, {
    "realm": "MyRealm",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "none",
    "resource": "my-website",
    "public-client": true,
    "confidential-port": 0
});

// Exporter la configuration
module.exports = {
    keycloak,
    memoryStore,
};
