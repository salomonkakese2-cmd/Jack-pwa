# JACK PWA

Première version mobile installable de **JACK**, un catalogue multimédia légal de démonstration, gratuit et sans publicité.

## Fonctions incluses

- interface mobile avec accueil, catalogue, liste et réglages ;
- recherche locale par titre, genre ou format ;
- favoris enregistrés sur le téléphone ;
- français, anglais et arabe avec prise en charge de l’écriture de droite à gauche ;
- manifeste PWA et service worker pour l’installation et l’utilisation hors connexion ;
- catalogue entièrement fictif : aucun film commercial n’est distribué.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de l’application |
| `styles.css` | Présentation mobile |
| `app.js` | Catalogue, navigation, recherche, favoris et langues |
| `manifest.webmanifest` | Paramètres d’installation PWA |
| `service-worker.js` | Cache de l’interface hors connexion |
| `icons/` | Icônes standard et adaptative |

## Publier avec GitHub Pages

1. Fusionner la branche de développement dans `main` après vérification.
2. Ouvrir **Settings → Pages** dans le dépôt GitHub.
3. Dans **Build and deployment**, choisir **Deploy from a branch**.
4. Sélectionner la branche `main`, le dossier `/ (root)`, puis enregistrer.
5. Attendre la fin du déploiement GitHub Pages.

L’adresse attendue sera : `https://salomonkakese2-cmd.github.io/Jack-pwa/`

## Installer sur Android

1. Ouvrir l’adresse HTTPS dans Chrome.
2. Ouvrir le menu ⋮.
3. Choisir **Installer l’application** ou **Ajouter à l’écran d’accueil**.
4. Confirmer l’installation.

## Limites de cette version

Cette version ne lit et ne télécharge aucun média. Elle valide uniquement l’interface, l’installation PWA, le catalogue fictif, les favoris et le cache de l’application. Tout futur contenu devra disposer de droits documentés avant sa publication.
