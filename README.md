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

Le site lit le catalogue/stock/blog depuis le back-office [CultureCase GS](https://github.com/VIEM0S) sur les collections Firestore du projet `culturecase-gs`, et écrit deux types de contenu soumis par les visiteurs, à valider côté GS :

| Collection Firestore | Sens | Contenu |
|---|---|---|
| `data/main` + `data/products_*` (chunked) | lecture | catalogue, stock, prix (`priceSettings.modelPrices`), designs |
| `blog_posts` | lecture | articles de blog (gérés depuis GS) |
| `reviews` (statut `published`) | lecture | avis clients validés, affichés sur le site |
| `reviews` (statut `pending`) | **écriture** | nouveaux avis soumis via le formulaire du site, en attente de modération côté GS |
| `webOrders` (statut `pending`) | **écriture** | commandes passées sur le site, à valider côté GS |

Le catalogue, les prix et le blog ne sont modifiables que côté GS. Les avis et les commandes peuvent être créés depuis le site, mais restent en attente (`pending`) tant qu'ils ne sont pas validés côté GS.
