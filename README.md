# CultureCase — site

Vitrine e-commerce de CultureCase (coques iPhone à motifs culturels maliens). SPA en JavaScript vanilla (sans framework, sans build), routing par hash (`#/...`).

## Fichiers

- `index.html` — structure HTML de toutes les pages (SPA à page unique, sections `.pg` activées/désactivées en JS).
- `app.js` — logique applicative : routing, catalogue, panier, fiche produit, blog, commande.
- `firebase-init.js` — connexion Firebase (module ES), listeners temps réel sur Firestore, panier/avis.
- `style.css` — feuille de style globale.

## Lancer en local

Site 100% statique : servir le dossier avec n'importe quel serveur HTTP statique (ex. `npx serve .`) et ouvrir `index.html`. Pas de build, pas de dépendances npm.

## Intégration avec CultureCase GS

Le site est un client **lecture** du back-office [CultureCase GS](https://github.com/VIEM0S) sur les collections Firestore du projet `culturecase-gs` :

| Collection Firestore | Sens | Contenu |
|---|---|---|
| `data/main` + `data/products_*` (chunked) | lecture | catalogue, stock, prix (`priceSettings.modelPrices`), designs |
| `blog_posts` | lecture | articles de blog (gérés depuis GS) |
| `reviews` (statut `published`) | lecture | avis clients validés |
| `webOrders` (statut `pending`) | **écriture** | commandes passées sur le site, à valider côté GS |

Toute modification du catalogue, des prix, du blog ou des avis se fait côté GS — le site ne fait qu'écouter ces données en temps réel (`onSnapshot`).
