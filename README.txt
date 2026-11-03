MC WATCHES - FICHIERS DU SITE
=============================

Site statique (HTML, CSS, JavaScript), hébergé sur GitHub Pages.
Domaine : www.mc-watches.com (fichier CNAME).

PAGES
  index.html      accueil
  produits.html   tous les produits (montres + boîtes)
  produit.html    fiche d'une collection (ex. produit.html?ref=MC-01)
  404.html        page affichée quand un lien est cassé

FICHIERS À MODIFIER
  data.js         TOUS les produits, prix, photos, numéro WhatsApp, e-mail,
                  Instagram et lien du formulaire. Pour changer un prix ou
                  ajouter une photo, modifiez uniquement ce fichier.
  styles.css      tout le design (couleurs en haut du fichier, section :root)
  site.js         comportement (menu, carrousels, fiche produit)

AJOUTER UNE COULEUR OU UNE PHOTO
  1. Déposez la photo dans le bon dossier : images/mc01, mc02, mc03...
  2. Ajoutez son chemin dans data.js, dans la liste "photos" de la couleur.
  Conseil : photos en JPG, 1600 px de large maximum, moins de 250 Ko chacune.

NUMÉRO WHATSAPP
  Il est dans data.js (boutons des cartes et des fiches produits) et aussi
  écrit dans index.html, produits.html, produit.html et 404.html (menu, bouton
  flottant, pied de page). Si vous le changez, remplacez 212708275864 partout.

MISE EN LIGNE (GitHub Pages)
  1. Remplacez le contenu du dépôt par ces fichiers (gardez CNAME).
  2. Settings > Pages : Deploy from a branch, main, /root.

AVANT LE LANCEMENT (à confirmer par vous)
  - Délais de livraison et conditions de retour : pas encore sur le site.
  - Ne pas publier de marque, d'authenticité, de matière, d'étanchéité ni de
    garantie sans les avoir vérifiées.
