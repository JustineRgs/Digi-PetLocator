# PetLocator

## Présentation

PetLocator est une application permettant d'enregistrer un animal perdu ou trouvé.

## Technologies Utilisées

- Ionic
- Angular
- TypeScript

## Lancer le Projet

Pour lancer le projet, suivez les étapes ci-dessous :

1. Installer les packages en exécutant la commande : npm install
2. Lancer le serveur Ionic : ionic serve OU Lancer l'application avec Capacitor pour Android : ionic cap run android

## Fonctionnalités / Pages

### Accueil

La page d'accueil affiche les dernières publications ajoutées. Si la localisation est activée, les publications les plus récentes à proximité seront affichées. Pour chaque publication, il est possible d'afficher la dernière localisation de l'animal sur la carte (redirection).

### Carte

Sur la page Carte, si la localisation est activée, un zoom sur le département associé est affiché, avec les marqueurs des dernières publications. Si la localisation n'est pas activée, une carte de la France est affichée avec les points regroupés par régions.

### Espace Personnel

L'espace personnel permet aux utilisateurs de :

- Ajouter une nouvelle publication.
- Voir leurs propre publications déjà ajoutées.
- Modifier le statut d'une publication (animal retrouvé, décédé, etc.).
- Supprimer une publication.
- Modifier une publication existante.

### Ajouter une Publication

L'ajout d'une publication comprend les étapes suivantes :

1. Possibilité de prendre une photo ou de sélectionner une photo depuis la galerie.
2. Ajout et modification des données de l'animal, notamment l'ID, le nom, la dernière localisation, le sexe, le type, le téléphone, l'email et les informations supplémentaires.

## Axe d'amélioration

- Ajout de filtre par type d'animal, date de publication, rayon de proximité en vue liste
- Affichage de la carte une fois sur vue liste (erreur dans la console, et vue bloquer sur liste)
- Ajout d'aria label > je les ai enlevé car une fois mis, mes labels n'étaient plus visible.
