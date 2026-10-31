(() => {
  const root = document.getElementById("catalogue-produits");
  if (!root) return;
  const tel = "212708275864";

  window.catalogueProduits.forEach((produit) => {
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
        ${avecCouleurs ? `<a class="catalogue-more" href="produit.html?ref=${encodeURIComponent(produit.reference)}">Voir plus</a>` : ''}
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
