(() => {
  const root = document.getElementById("fiche-produit");
  const ref = new URLSearchParams(window.location.search).get("ref");
  const produit = (window.catalogueProduits || []).find(
    (item) => item.reference === ref && Array.isArray(item.couleurs)
  );
  const telephone = "212708275864";
  const formulaireBase = "https://docs.google.com/forms/d/e/1FAIpQLSerO_SjWbLOsfbOhFkFcDC0gSQHaS_0Ss3w8ePUO94eo3wCzQ/viewform";

  if (!root) return;

  if (!produit) {
    root.innerHTML = `
      <div class="product-error">
        <h1>Produit introuvable</h1>
        <p>Retournez au catalogue pour choisir un modèle.</p>
        <a href="index.html#catalogue">Retour au catalogue</a>
      </div>`;
    return;
  }

  document.title = `${produit.reference} | MC Watches`;
  root.innerHTML = `
    <section class="product-heading">
      <p class="eyebrow">${produit.reference}</p>
      <h1>${produit.nom}</h1>
      <p class="product-main-price">${produit.prix} DH</p>
    </section>
    <section class="variant-list"></section>`;

  const list = root.querySelector(".variant-list");

  produit.couleurs.forEach((couleur) => {
    let imageIndex = 0;
    const photos = [...couleur.photos, ...(produit.photosCommunes || [])];
    const card = document.createElement("article");
    card.className = "variant-card";
    card.innerHTML = `
      <div class="variant-gallery">
        <img class="variant-image" alt="${produit.nom} - ${couleur.nom}">
        <button type="button" class="detail-nav detail-prev" aria-label="Photo précédente">&#10094;</button>
        <button type="button" class="detail-nav detail-next" aria-label="Photo suivante">&#10095;</button>
        <span class="detail-count" aria-live="polite"></span>
      </div>
      <div class="variant-content">
        <div class="variant-color">
          <span class="variant-dot" aria-hidden="true"></span>
          <strong>${couleur.nom}</strong>
        </div>
        <h2>${produit.reference} - ${couleur.nom}</h2>
        <p>Découvrez les photos de cette couleur et les vues communes du modèle.</p>
        <div class="variant-actions">
          <a class="order-form" target="_blank" rel="noopener">Commander cette couleur</a>
          <a class="order-whatsapp" target="_blank" rel="noopener">Commander directement sur WhatsApp</a>
        </div>
      </div>`;

    const image = card.querySelector(".variant-image");
    const count = card.querySelector(".detail-count");
    const gallery = card.querySelector(".variant-gallery");
    card.querySelector(".variant-dot").style.backgroundColor = couleur.code;

    const afficherPhoto = () => {
      if (!photos.length) return;
      image.src = photos[imageIndex];
      count.textContent = `${imageIndex + 1} / ${photos.length}`;
    };

    card.querySelector(".detail-prev").addEventListener("click", () => {
      imageIndex = (imageIndex - 1 + photos.length) % photos.length;
      afficherPhoto();
    });

    card.querySelector(".detail-next").addEventListener("click", () => {
      imageIndex = (imageIndex + 1) % photos.length;
      afficherPhoto();
    });

    let debutX = 0;
    gallery.addEventListener("touchstart", (event) => {
      debutX = event.changedTouches[0].clientX;
    }, { passive: true });
    gallery.addEventListener("touchend", (event) => {
      const ecart = event.changedTouches[0].clientX - debutX;
      if (Math.abs(ecart) < 45) return;
      imageIndex = ecart < 0
        ? (imageIndex + 1) % photos.length
        : (imageIndex - 1 + photos.length) % photos.length;
      afficherPhoto();
    }, { passive: true });

    const formulaire =
      `${formulaireBase}?usp=pp_url` +
      `&entry.1548138927=${encodeURIComponent(produit.reference)}` +
      `&entry.549343203=${encodeURIComponent(couleur.nom)}` +
      `&entry.1447288487=${encodeURIComponent(produit.prix)}`;

    const message =
      `Bonjour MC Watches, je souhaite commander ${produit.reference}, ` +
      `couleur ${couleur.nom}, au prix de ${produit.prix} DH. ` +
      `Pouvez-vous confirmer la disponibilité et la livraison ?`;

    card.querySelector(".order-form").href = formulaire;
    card.querySelector(".order-whatsapp").href =
      `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`;

    afficherPhoto();
    list.appendChild(card);
  });
})();
