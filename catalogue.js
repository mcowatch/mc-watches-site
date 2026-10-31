const catalogueProduits = [
  {
    reference: "MC-01",
    nom: "Collection MC-01",
    prix: 280,
    couleurs: [
      { nom: "Noir", code: "#171717", photos: ["images/mc01/NOIRT1.jpg","images/mc01/NOIRT2.jpg","images/mc01/NOIRT3.jpg","images/mc01/NOIRT4.jpg"] },
      { nom: "Blanc", code: "#F4F1E8", bordure: true, photos: ["images/mc01/BLANCT1.jpg","images/mc01/BLANCT2.jpg","images/mc01/BLANCT3.jpg","images/mc01/BLANCT4.jpg","images/mc01/BLANCT5.jpg"] },
      { nom: "Blanc et bleu", code: "#315A8C", photos: ["images/mc01/blancbleu2.jpg","images/mc01/blancbleu3.jpg","images/mc01/blancbleu4.jpg","images/mc01/blancbleu5.jpg","images/mc01/blancbleu6.jpg","images/mc01/blancbleu7.jpg"] }
    ],
    photosCommunes: ["images/mc01/20261029_212605.jpg","images/mc01/20261029_212717.jpg","images/mc01/20261029_213002.jpg","images/mc01/20261029_213034.jpg"]
  },
  {
    reference: "MC-02",
    nom: "Collection MC-02",
    prix: 200,
    couleurs: [
      { nom: "Vert", code: "#3E7560", photos: ["images/mc02/VERT1.jpg","images/mc02/VERT2.jpg","images/mc02/VERT3.jpg","images/mc02/VERT4.jpg","images/mc02/VERT5.jpg"] },
      { nom: "Blanc", code: "#F4F1E8", bordure: true, photos: ["images/mc02/blanc1.jpg","images/mc02/blanc2.jpg","images/mc02/blanc4.jpg","images/mc02/blanc5.jpg"] },
      { nom: "Noir", code: "#171717", photos: ["images/mc02/NOIR1.jpg","images/mc02/NOIR2.jpg","images/mc02/NOIR3.jpg","images/mc02/NOIR4.jpg"] }
    ],
    photosCommunes: ["images/mc02/CASIO2.jpg","images/mc02/CASIO3.jpg","images/mc02/CASIO5.jpg","images/mc02/CASIO6.jpg"]
  },
  {
    reference: "BOX-06",
    nom: "Boite de rangement - 6 montres",
    prix: 200,
    photos: ["images/boite-6/BOITEPETIT1.jpg","images/boite-6/BOITEPETIT2.jpg","images/boite-6/BOITEPETIT3.jpg","images/boite-6/BOITEPETIT4.jpg"]
  },
  {
    reference: "BOX-12",
    nom: "Boite de rangement - 12 montres",
    prix: 280,
    photos: ["images/boite-12/BG1.jpg","images/boite-12/BG2.jpg","images/boite-12/BG3.jpg"]
  }
];

(() => {
  const root = document.getElementById("catalogue-produits");
  if (!root) return;
  const tel = "212708954292";

  catalogueProduits.forEach((produit) => {
    const avecCouleurs = Array.isArray(produit.couleurs);
    let couleurIndex = 0;
    let photoIndex = 0;
    const photosActuelles = () => avecCouleurs
      ? [...produit.couleurs[couleurIndex].photos, ...(produit.photosCommunes || [])]
      : produit.photos;

    const carte = document.createElement("article");
    carte.className = "catalogue-card";
    carte.innerHTML = `
      <div class="catalogue-media">
        <img class="catalogue-image" alt="${produit.nom}">
        <button type="button" class="carousel-btn prev" aria-label="Photo precedente">&#10094;</button>
        <button type="button" class="carousel-btn next" aria-label="Photo suivante">&#10095;</button>
        <div class="carousel-count" aria-live="polite"></div>
      </div>
      <div class="catalogue-info">
        <p class="catalogue-ref">${produit.reference}</p>
        <h3>${produit.nom}</h3>
        <p class="catalogue-price">${produit.prix} DH</p>
        ${avecCouleurs ? '<div class="color-label">Couleur : <strong class="selected-color"></strong></div><div class="color-options" aria-label="Choisir une couleur"></div>' : ''}
        ${avecCouleurs ? `<a class="catalogue-more" href="produit.html?ref=${encodeURIComponent(produit.reference)}">Voir plus</a>` : ""}
<a class="catalogue-whatsapp" target="_blank" rel="noopener">Commander sur WhatsApp</a>

      </div>`;

    const image = carte.querySelector(".catalogue-image");
    const compteur = carte.querySelector(".carousel-count");
    const boutonWhatsapp = carte.querySelector(".catalogue-whatsapp");
    const libelleCouleur = carte.querySelector(".selected-color");

    function actualiser() {
      const photos = photosActuelles();
      if (photoIndex >= photos.length) photoIndex = 0;
      image.src = photos[photoIndex];
      image.alt = avecCouleurs ? `${produit.nom} - ${produit.couleurs[couleurIndex].nom}` : produit.nom;
      compteur.textContent = `${photoIndex + 1} / ${photos.length}`;
      const couleur = avecCouleurs ? produit.couleurs[couleurIndex].nom : "";
      if (libelleCouleur) libelleCouleur.textContent = couleur;
      const message = avecCouleurs
        ? `Bonjour MC Watches, je souhaite commander ${produit.reference}, couleur ${couleur}, au prix de ${produit.prix} DH. Pouvez-vous confirmer la disponibilite et la livraison ?`
        : `Bonjour MC Watches, je souhaite commander ${produit.nom} au prix de ${produit.prix} DH. Pouvez-vous confirmer la disponibilite et la livraison ?`;
      boutonWhatsapp.href = `https://wa.me/${tel}?text=${encodeURIComponent(message)}`;
    }

    carte.querySelector(".prev").addEventListener("click", () => {
      const photos = photosActuelles();
      photoIndex = (photoIndex - 1 + photos.length) % photos.length;
      actualiser();
    });
    carte.querySelector(".next").addEventListener("click", () => {
      const photos = photosActuelles();
      photoIndex = (photoIndex + 1) % photos.length;
      actualiser();
    });

    if (avecCouleurs) {
      const options = carte.querySelector(".color-options");
      produit.couleurs.forEach((couleur, index) => {
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "color-dot" + (index === 0 ? " active" : "") + (couleur.bordure ? " light" : "");
        bouton.style.backgroundColor = couleur.code;
        bouton.setAttribute("aria-label", couleur.nom);
        bouton.title = couleur.nom;
        bouton.addEventListener("click", () => {
          couleurIndex = index;
          photoIndex = 0;
          options.querySelectorAll(".color-dot").forEach((el) => el.classList.remove("active"));
          bouton.classList.add("active");
          actualiser();
        });
        options.appendChild(bouton);
      });
    }

    let debutX = 0;
    carte.querySelector(".catalogue-media").addEventListener("touchstart", (e) => { debutX = e.changedTouches[0].clientX; }, { passive: true });
    carte.querySelector(".catalogue-media").addEventListener("touchend", (e) => {
      const ecart = e.changedTouches[0].clientX - debutX;
      if (Math.abs(ecart) < 45) return;
      const photos = photosActuelles();
      photoIndex = ecart < 0 ? (photoIndex + 1) % photos.length : (photoIndex - 1 + photos.length) % photos.length;
      actualiser();
    }, { passive: true });

    actualiser();
    root.appendChild(carte);
  });
})();
