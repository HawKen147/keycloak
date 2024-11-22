# keycloak POC

## Pour commencer

### Pré-requis
- Avoir docker d'installé sur son pc
- Avoir node js d'installé sur son pc

### Installer Keycloak
Créer le container docker avec cette commande : `docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.0.5 start-dev`

### Configurer Keycloak
#### Créer un Realm (Espace de gestion des utilisateurs et des rôles)

- Connectez-vous à l'interface d'administration de Keycloak à l'adresse http://localhost:8080/auth/admin/ avec le compte administrateur par défaut.
- Allez dans la section "Realms" (dans la barre latérale à gauche).
- Cliquez sur "Create Realm" pour créer un nouveau domaine (realm).
- Donnez-lui un nom, par exemple, MyRealm, puis cliquez sur Create.

#### Créer des utilisateurs

Vous allez maintenant créer deux utilisateurs avec des rôles différents.

Allez dans la section **"Users"** du realm créé.
Cliquez sur **Add User** pour créer un nouvel utilisateur.
Créez deux utilisateurs avec des noms différents, par exemple :
- administrateur
- user
Cliquez sur "Save" après avoir rempli les informations de chaque utilisateur.

#### Activer la connexion des utilisateurs

N'oubliez pas de définir un mot de passe pour chaque utilisateur :

- Allez dans l'onglet **Credentials** de chaque utilisateur.
- Cliquez sur **Set Password**, et définissez un mot de passe pour chaque utilisateur.
- Assurez-vous de décocher l'option Temporary pour que le mot de passe ne soit pas temporaire.
 
### Créer une application cliente (Client)

Pour tester les utilisateurs et leurs rôles, vous pouvez créer une application cliente dans Keycloak qui sera protégée par des rôles.

- Allez dans Clients (dans la barre latérale).
- Cliquez sur "Create" pour créer un nouveau client.
- Donnez-lui un nom, par exemple my-app.
- Pour le Client Protocol, sélectionnez openid-connect.
    - Pour **Valid redirect URLs**, entrer `http://localhost:3000/*`
    - Pour **Web origins**, entrer `http://localhost:3000` 
- Sous l'onglet Settings, définissez l'Access Type sur confidential ou public en fonction de vos besoins.
- Cliquez sur Save.

### Configurer des permissions d'accès basées sur les rôles

Pour chaque utilisateur, vous pouvez définir des permissions d'accès dans l'application cliente. Pour activer l'onglet "Authorization", il faut aller dans l'onglet **"settings"** du client et cocher **"Authorizaton enabled"**

- Allez dans la section "Role" dans le client crée.
- Créer le role "admin-role" et le role "user"
- Ensuite il faut assigner les utilisateurs aux roles crées
    - Cliquer sur "Users" et choisissez l'administrateur. Aller dans "role mapping", puis "assign role". Choisissez le role crée pour l'administrateur (admin-role)
    - Faire de même pour l'utilisateur "User" en lui assignant le role "user"

### Création d'un site web simple

Exemple : Site web Node.js avec Express.js
#### Installation des dépendances :
```
npm init -y
npm install express express-session keycloak-connect
```
### Tests
- Démarrer le serveur web : `node index.js`
- Accédez à http://localhost:3000.
- Cliquez sur les liens vers /admin et /user.
- Vous serez redirigé vers Keycloak pour vous connecter.
    - Utilisez administrateur pour accéder à /admin.
    - Utilisez un utilisateur standard pour accéder à /user.