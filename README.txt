MC WATCHES - FICHIERS DU SITE
=============================

Site statique (HTML, CSS, JavaScript), hébergé sur GitHub Pages.
Domaine : www.mc-watches.com (fichier CNAME).

PAGES
  index.html      accueil
  produits.html   tous les produits (montres + boîtes)
  produit.html    fiche d'une collection (ex. produit.html?ref=MC-01)
  livraison.html  livraison, paiement et questions fréquentes
  404.html        page affichée quand un lien est cassé

FICHIERS À MODIFIER
  data.js         TOUS les produits, prix, photos, numéro WhatsApp, e-mail,
                  Instagram et lien du formulaire. Pour changer un prix ou
                  ajouter une photo, modifiez uniquement ce fichier.
  styles.css      tout le design (couleurs en haut du fichier, section :root)
  site.js         comportement (menu, carrousels, fiche produit)

AJOUTER UNE COLLECTION
  1. Déposez ses photos dans un nouveau dossier : images/mc04
  2. Dans data.js, copiez un bloc "montre" (de { type: "montre" jusqu'à son }),
     collez-le à la suite et changez reference, nom, prix, couleurs, photos.
  Tout le reste se met à jour tout seul : cartes de l'accueil et de la page
  produits, fiche produit, formulaire de commande, "Quatre collections" sur
  l'accueil.
  À faire à la main (pour Google) : ajouter la nouvelle fiche dans sitemap.xml
  (copier une ligne produit.html?ref=...) ; les descriptions des pages
  mentionnent MC-01, MC-02, MC-03 dans produits.html (balise description).

AJOUTER UNE COULEUR OU UNE PHOTO
  1. Déposez la photo dans le bon dossier : images/mc01, mc02, mc03...
  2. Ajoutez son chemin dans data.js, dans la liste "photos" de la couleur.
  Conseil : photos en JPG, 1600 px de large maximum, moins de 250 Ko chacune.

NUMÉRO WHATSAPP
  Il est dans data.js (boutons des cartes et des fiches produits) et aussi
  écrit dans index.html, produits.html, produit.html et 404.html (menu, bouton
  flottant, pied de page). Si vous le changez, remplacez 212708275864 partout.

MISE EN LIGNE (GitHub Pages)
  1. Dézippez, puis envoyez TOUT sur GitHub : les fichiers ET le dossier images
     (un zip ne se décompresse pas tout seul sur GitHub).
     Vérifiez ensuite : www.mc-watches.com/logo-light.png doit afficher le logo.
  2. Settings > Pages : Deploy from a branch, main, /root.

AVANT LE LANCEMENT (à confirmer par vous)
  - Délais de livraison et conditions de retour : pas encore sur le site.
  - Ne pas publier de marque, d'authenticité, de matière, d'étanchéité ni de
    garantie sans les avoir vérifiées.

COMMANDE SUR LE SITE
  Le bouton "Commander" ouvre un formulaire (prénom, nom, téléphone, ville,
  adresse, quantité). Au clic sur "Commander", la commande est envoyée
  directement dans votre formulaire Google (les réponses arrivent dans
  Google Forms / Google Sheets). WhatsApp reste proposé en option dans la
  même fenêtre ("Je préfère commander sur WhatsApp").
  Les identifiants des champs du formulaire Google sont dans data.js
  (bloc "formulaire"). Si vous ajoutez ou renommez une question dans
  Google Forms, mettez à jour ces identifiants.

PAGE LIVRAISON : VALEURS À VÉRIFIER
  Délais (24 à 48 h Casablanca/Rabat, 3 jours ailleurs), échange 45 DH,
  retour 80 DH et délai de 7 jours sont écrits directement dans :
  index.html, produits.html, produit.html, livraison.html, 404.html (bandeau
  du haut) et site.js (fiche produit). Si une règle change, modifiez ces
  fichiers. Dans livraison.html, le même texte existe aussi dans le bloc
  <script type="application/ld+json"> (pour Google).
