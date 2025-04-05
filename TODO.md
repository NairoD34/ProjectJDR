# TODO List - Project JDR

## Arena Page - Maps et Grille

### Bugs à corriger
- [ ] Corriger la récupération des données depuis la base de données SQLite
- [ ] Vérifier le chemin des images dans la modale (`project-jdr-bucket.s3.amazonaws.com/`)
- [ ] Corriger l'affichage des images dans la grille

### Améliorations à apporter
- [ ] Ajouter un système de prévisualisation des maps dans la modale
- [ ] Implémenter un système de chargement (loading state) pendant la récupération des maps
- [ ] Ajouter des messages d'erreur si le chargement des maps échoue
- [ ] Optimiser le chargement des images

### Nouvelles fonctionnalités
- [ ] Ajouter la possibilité d'uploader de nouvelles maps
- [ ] Implémenter un système de catégories pour les maps (fantasy, western, futuriste, etc.)
- [ ] Ajouter une fonction de recherche/filtrage des maps
- [ ] Permettre la suppression des maps existantes

### Optimisations
- [ ] Mettre en cache les maps déjà chargées pour éviter les rechargements inutiles
- [ ] Optimiser la taille des images avant l'affichage
- [ ] Améliorer la réactivité de la modale
