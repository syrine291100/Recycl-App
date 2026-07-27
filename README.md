# Recycl’App ♻️

Application mobile réalisée avec **React Native et Expo** pour aider les utilisateurs à identifier la bonne consigne de tri et à progresser grâce à un système d’éco-score.

> Projet personnel en cours d’amélioration. Les consignes présentes dans la base locale sont fournies à titre démonstratif et peuvent varier selon la commune.

## Fonctionnalités

- création d’un profil local et connexion sur l’appareil ;
- recherche par objet ou matériau ;
- recherche d’un produit par code-barres avec Open Food Facts ;
- affichage d’une consigne de tri issue d’une base locale ;
- attribution de points après une recherche réussie ;
- historique des 50 dernières recherches ;
- classement local des utilisateurs ;
- carte de démonstration des points de collecte.

## Stack technique

- React Native
- Expo
- React Navigation
- AsyncStorage
- Axios
- React Native Maps
- Open Food Facts API

## Installation

### Prérequis

- Node.js
- npm
- Expo Go sur un téléphone, ou un émulateur Android/iOS

### Lancer le projet

```bash
git clone https://github.com/syrine291100/Recycl-App.git
cd Recycl-App
npm install
npm start
```

Ensuite :

- scanne le QR code avec Expo Go ;
- ou appuie sur `a` pour Android ;
- ou utilise `npm run web` pour tester les écrans compatibles avec le navigateur.

## Structure principale

```text
Recycl-App/
├── App.js
├── components/
├── data/
│   └── tri_rules.json
├── screens/
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── ScanScreen.js
│   ├── HistoryScreen.js
│   ├── MapScreen.js
│   └── RankingScreen.js
├── util/
│   ├── api.js
│   └── storage.js
├── app.json
└── package.json
```

## Données et sécurité

Cette version est une démonstration locale :

- les profils, scores et historiques sont enregistrés avec AsyncStorage ;
- aucune donnée n’est envoyée vers un serveur personnel ;
- les mots de passe ne sont pas chiffrés et cette authentification ne doit pas être utilisée en production.

Une version destinée à la production devrait utiliser une API sécurisée, une base de données distante et un mécanisme d’authentification adapté.

## Améliorations prévues

- remplacement de l’authentification locale par une API sécurisée ;
- ajout d’un véritable scanner de code-barres avec la caméra ;
- géolocalisation et points de collecte réels ;
- règles de tri adaptées à la commune de l’utilisateur ;
- tests automatisés ;
- amélioration de l’accessibilité et du design system.

## Statut

Le projet est fonctionnel comme prototype, mais certaines fonctionnalités restent démonstratives et doivent encore être testées sur plusieurs appareils.
