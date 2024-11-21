# keycloak POC

## Pour commencer

### Installer Keycloak
Créer le container docker avec cette commande : `docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.0.5 start-dev`

### Configurer Keycloak
#### Créer un Realm (Espace de gestion des utilisateurs et des rôles)

- Connectez-vous à l'interface d'administration de Keycloak à l'adresse http://localhost:8080/auth/admin/ avec le compte administrateur par défaut.
- Allez dans la section "Realms" (dans la barre latérale à gauche).
- Cliquez sur "Create Realm" pour créer un nouveau domaine (realm).
- Donnez-lui un nom, par exemple, example-realm, puis cliquez sur Create.

#### Créer des rôles (différents droits)

Dans Keycloak, les rôles permettent de définir des droits d'accès. Pour notre PoC, nous allons créer trois rôles différents.
Allez dans la section **"Roles"** du realm créé.
Cliquez sur "Add Role" pour ajouter de nouveaux rôles.
    - Admin : un rôle avec des droits d'administrateur.
    - User : un rôle avec des droits d'utilisateur de base.
    - Viewer : un rôle avec des droits de consultation.

#### Créer des utilisateurs

Vous allez maintenant créer trois utilisateurs avec ces rôles différents.

Allez dans la section **"Users"** du realm créé.
Cliquez sur "Add User" pour créer un nouvel utilisateur.
Créez trois utilisateurs avec des noms différents, par exemple :
    - admin@example.com : Utilisateur avec le rôle "Admin".
    - user@example.com : Utilisateur avec le rôle "User".
    - viewer@example.com : Utilisateur avec le rôle "Viewer".
Cliquez sur "Save" après avoir rempli les informations de chaque utilisateur.

#### Assigner des rôles aux utilisateurs

Une fois les utilisateurs créés, vous devez leur attribuer des rôles :

    Dans la liste des utilisateurs, cliquez sur un utilisateur (par exemple admin@example.com).
    Allez dans l'onglet "Role Mappings".
    Sous "Available Roles", sélectionnez le rôle approprié (par exemple Admin) et cliquez sur Add selected.
    Répétez cette étape pour les autres utilisateurs, en leur attribuant les rôles correspondants (User ou Viewer).

#### Activer la connexion des utilisateurs

N'oubliez pas de définir un mot de passe pour chaque utilisateur :

    Allez dans l'onglet "Credentials" de chaque utilisateur.
    Cliquez sur Set Password, et définissez un mot de passe pour chaque utilisateur.
    Assurez-vous de décocher l'option Temporary pour que le mot de passe ne soit pas temporaire.
 
### Créer une application cliente (Client)

Pour tester les utilisateurs et leurs rôles, vous pouvez créer une application cliente dans Keycloak qui sera protégée par des rôles.

    Allez dans Clients (dans la barre latérale).
    Cliquez sur "Create" pour créer un nouveau client.
    Donnez-lui un nom, par exemple my-app.
    Pour le Client Protocol, sélectionnez openid-connect.
    Sous l'onglet Settings, définissez l'Access Type sur confidential ou public en fonction de vos besoins.
    Cliquez sur Save.

### Configurer des permissions d'accès basées sur les rôles

Pour chaque utilisateur, vous pouvez définir des permissions d'accès dans l'application cliente. Pour activer l'onglet "Authorization", il faut aller dans l'onglet **"settings"** du client et cocher **"Authorizaton enabled"**

    - Allez dans la section "Authorization" du client créé.
    - Créez des resources (par exemple : "admin-page", "user-page", "viewer-page").
    - Créez des policies basées sur les rôles, par exemple :
        - Admin policy : autorise l'accès à "admin-page" uniquement pour les utilisateurs avec le rôle "Admin".
        - User policy : autorise l'accès à "user-page" uniquement pour les utilisateurs avec le rôle "User".
        - Viewer policy : autorise l'accès à "viewer-page" uniquement pour les utilisateurs avec le rôle "Viewer".
