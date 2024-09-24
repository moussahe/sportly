# Sportly - Application de Gestion de Centre Sportif

Sportly est une application web moderne conçue pour faciliter la gestion des centres sportifs. Elle offre des fonctionnalités telles que la réservation de terrains, la gestion des utilisateurs, et l'organisation de tournois.

## Fonctionnalités

- Authentification des utilisateurs (connexion classique et SSO)
- Réservation de terrains sportifs
- Gestion des calendriers et des disponibilités
- Interface utilisateur intuitive et responsive

## Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le rendu côté serveur et la génération de sites statiques
- [React](https://reactjs.org/) - Bibliothèque JavaScript pour la construction d'interfaces utilisateur
- [TypeScript](https://www.typescriptlang.org/) - Superset typé de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [Radix UI](https://www.radix-ui.com/) - Bibliothèque de composants UI accessibles et sans style

## Prérequis

- Node.js (version 14.0 ou supérieure)
- npm (généralement inclus avec Node.js)

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/moussa.he/sportly.git
   ```

2. Naviguez dans le dossier du projet :
   ```
   cd sportly
   ```

3. Installez les dépendances :
   ```
   npm install
   ```

## Configuration

1. Créez un fichier `.env.local` à la racine du projet et ajoutez les variables d'environnement nécessaires :
   ```
   NEXT_PUBLIC_API_URL=votre_url_api
   ```

2. Configurez les options de connexion SSO dans le fichier approprié (par exemple, `config/auth.ts`).

## Lancement de l'Application

Pour lancer l'application en mode développement :

```
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Build et Déploiement

Pour créer une version de production :

```
npm run build
```

Pour lancer la version de production :

```
npm start
```

## Structure du Projet

```
sportly/
├── app/
│   ├── auth/
│   ├── calendar/
│   ├── sports-booking/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
├── public/
├── styles/
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes pour contribuer :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

moussa.he@gmail.com
