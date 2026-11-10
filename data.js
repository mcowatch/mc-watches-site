/* ==========================================================
   MC WATCHES - DONNEES DU SITE
   Pour changer un prix, un numéro ou ajouter une photo :
   modifiez uniquement ce fichier.
   ========================================================== */

window.MC = {
  boutique: "MC Watches",
  domaine: "https://www.mc-watches.com",

  // Numéro WhatsApp au format international, sans + ni espaces.
  whatsapp: "212708275864",
  whatsappAffiche: "+212 708 275 864",
  email: "mcowatches@gmail.com",
  instagram: "https://www.instagram.com/mcowatches/",
  instagramNom: "@mcowatches",

  // Pixel Meta. Collez ici l'identifiant trouvé dans
  // Gestionnaire d'évènements > Sources de données (une suite de chiffres).
  // Tant que c'est vide, aucun script Meta n'est chargé sur le site.
  pixel: "1923341795704210",

  // Formulaire Google : identifiants des champs préremplis.
  formulaire: {
    base: "https://docs.google.com/forms/d/e/1FAIpQLSerO_SjWbLOsfbOhFkFcDC0gSQHaS_0Ss3w8ePUO94eo3wCzQ/viewform",
    reference: "entry.1548138927",
    couleur: "entry.549343203",
    prix: "entry.1447288487",
    nom: "entry.663554986",
    prenom: "entry.443864583",
    ville: "entry.2138251804",
    telephone: "entry.1484696432",
    adresse: "entry.573979871",
    quantite: "entry.792405374"
  },

  /* type "montre" : plusieurs couleurs (couleurs) + photos communes
     type "boite"  : une seule liste de photos (photos)
     code2 = deuxième teinte pour les pastilles bicolores            */
  produits: [
    {
      type: "montre",
      categorie: "Montre pour homme",
      reference: "MC-01",
      nom: "Collection MC-01",
      prix: 249,
      couleurs: [
        { nom: "Noir", code: "#171717",
          photos: ["images/mc01/NOIRT1.jpg", "images/mc01/NOIRT2.jpg", "images/mc01/NOIRT3.jpg", "images/mc01/NOIRT4.jpg"] },
        { nom: "Blanc", code: "#F4F1E8",
          photos: ["images/mc01/BLANCT1.jpg", "images/mc01/BLANCT2.jpg", "images/mc01/BLANCT3.jpg", "images/mc01/BLANCT4.jpg", "images/mc01/BLANCT5.jpg"] },
        { nom: "Blanc et bleu", code: "#F4F1E8", code2: "#315A8C",
          photos: ["images/mc01/blancbleu2.jpg", "images/mc01/blancbleu3.jpg", "images/mc01/blancbleu4.jpg", "images/mc01/blancbleu5.jpg", "images/mc01/blancbleu6.jpg", "images/mc01/blancbleu7.jpg"] }
      ],
      photosCommunes: ["images/mc01/20261029_212605.jpg", "images/mc01/20261029_212717.jpg", "images/mc01/20261029_213002.jpg", "images/mc01/20261029_213034.jpg"]
    },
    {
      type: "montre",
      categorie: "Montre pour homme",
      reference: "MC-02",
      nom: "Collection MC-02",
      prix: 229,
      couleurs: [
        { nom: "Vert", code: "#3E7560",
          photos: ["images/mc02/VERT1.jpg", "images/mc02/VERT2.jpg", "images/mc02/VERT3.jpg", "images/mc02/VERT4.jpg", "images/mc02/VERT5.jpg"] },
        { nom: "Blanc", code: "#F4F1E8",
          photos: ["images/mc02/blanc1.jpg", "images/mc02/blanc2.jpg", "images/mc02/blanc4.jpg", "images/mc02/blanc5.jpg"] },
        { nom: "Noir", code: "#171717",
          photos: ["images/mc02/NOIR1.jpg", "images/mc02/NOIR2.jpg", "images/mc02/NOIR3.jpg", "images/mc02/NOIR4.jpg"] }
      ],
      photosCommunes: ["images/mc02/CASIO2.jpg", "images/mc02/CASIO3.jpg", "images/mc02/CASIO5.jpg", "images/mc02/CASIO6.jpg"]
    },
    {
      type: "montre",
      categorie: "Montre pour homme",
      reference: "MC-03",
      nom: "Collection MC-03",
      prix: 249,
      couleurs: [
        { nom: "Gris", code: "#9A9A8F",
          photos: ["images/mc03/GRIS1.jpg", "images/mc03/GRIS2.jpg", "images/mc03/GRIS3.jpg", "images/mc03/GRIS4.jpg", "images/mc03/GRIS5.jpg", "images/mc03/GRIS6.jpg", "images/mc03/GRIS7.jpg", "images/mc03/GRIS8.jpg"] },
        { nom: "Bleu avec cadran blanc", code: "#EDE9DC", code2: "#243D68",
          photos: ["images/mc03/BLEUBLANC1.jpg", "images/mc03/BLEUBLANC2.jpg", "images/mc03/BLEUBLANC3.jpg", "images/mc03/BLEUBLANC4.jpg", "images/mc03/BLEUBLANC5.jpg"] },
        { nom: "Bleu", code: "#243D68",
          photos: ["images/mc03/BLEU1.jpg", "images/mc03/BLEU2.jpg", "images/mc03/BLEU3.jpg", "images/mc03/BLEU4.jpg", "images/mc03/BLEU5.jpg", "images/mc03/BLEU6.jpg", "images/mc03/BLEU7.jpg"] }
      ],
      photosCommunes: ["images/mc03/20261101_122552.jpg", "images/mc03/20261101_122644.jpg", "images/mc03/20261101_122757.jpg", "images/mc03/20261101_122911.jpg", "images/mc03/20261101_122917.jpg", "images/mc03/20261101_122936.jpg"]
    },
    {
      type: "montre",
      categorie: "Montre automatique pour homme",
      reference: "MC-04",
      nom: "Collection MC-04",
      prix: 299,
      couleurs: [
        { nom: "Noir", code: "#171717",
          photos: ["images/mc04/NOIR1.jpg", "images/mc04/NOIR2.jpg", "images/mc04/NOIR3.jpg", "images/mc04/NOIR4.jpg", "images/mc04/NOIR5.jpg"] },
        { nom: "Blanc", code: "#F4F1E8",
          photos: ["images/mc04/BLANC1.jpg", "images/mc04/BLANC2.jpg", "images/mc04/BLANC3.jpg", "images/mc04/BLANC4.jpg", "images/mc04/BLANC5.jpg", "images/mc04/BLANC6.jpg", "images/mc04/BLANC7.jpg"] }
      ],
      photosCommunes: ["images/mc04/DUO1.jpg", "images/mc04/DUO2.jpg", "images/mc04/DUO3.jpg", "images/mc04/DUO4.jpg", "images/mc04/DUO5.jpg"]
    },
    {
      type: "montre",
      categorie: "Montre automatique pour homme",
      reference: "MC-05",
      nom: "Collection MC-05",
      prix: 299,
      couleurs: [
        { nom: "Noir", code: "#171717",
          photos: ["images/mc05/NOIR1.jpg", "images/mc05/NOIR2.jpg", "images/mc05/NOIR3.jpg"] },
        { nom: "Blanc", code: "#F4F1E8",
          photos: ["images/mc05/BLANC1.jpg", "images/mc05/BLANC2.jpg", "images/mc05/BLANC3.jpg", "images/mc05/BLANC4.jpg"] }
      ],
      photosCommunes: ["images/mc05/DUO1.jpg", "images/mc05/DUO2.jpg", "images/mc05/DUO3.jpg", "images/mc05/DUO4.jpg", "images/mc05/DUO5.jpg"]
    },
    {
      type: "boite",
      categorie: "Accessoire",
      reference: "Boîte de rangement - 6 montres",
      nom: "Boîte de rangement - 6 montres",
      nomCourt: "Boîte 6 montres",
      prix: 219,
      couleur: "Noir",
      photos: ["images/boite-6/BOITEPETIT1.jpg", "images/boite-6/BOITEPETIT2.jpg", "images/boite-6/BOITEPETIT3.jpg", "images/boite-6/BOITEPETIT4.jpg"]
    },
    {
      type: "boite",
      categorie: "Accessoire",
      reference: "Boîte de rangement - 12 montres",
      nom: "Boîte de rangement - 12 montres",
      nomCourt: "Boîte 12 montres",
      prix: 299,
      couleur: "Noir",
      photos: ["images/boite-12/BG1.jpg", "images/boite-12/BG2.jpg", "images/boite-12/BG3.jpg"]
    }
  ]
};
