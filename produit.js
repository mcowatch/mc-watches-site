(() => {
  const root = document.getElementById("fiche-produit");
  const ref = new URLSearchParams(location.search).get("ref");
  const produit = (window.catalogueProduits || []).find((p) => p.reference === ref && Array.isArray(p.couleurs));
  const tel = "212708275864";

  if (!produit) {
    root.innerHTML = '<div class="product-error"><h1>Produit introuvable</h1><p>Retournez au catalogue pour choisir un modele.</p><a href="index.html#catalogue">Retour au catalogue</a></div>';
    return;
  }

  document.title = `${produit.reference} | MC Watches`;
  root.innerHTML = `
    <section class="product-heading">
      <p class="eyebrow">${produit.reference}</p>
      <h1>${produit.nom}</h1>
      <p>${produit.prix} DH</p>
    </section>
    <section class="variant-list"></section>`;

  const list = root.querySelector(".variant-list");

  produit.couleurs.forEach((couleur) => {
    let index = 0;
    const photos = [...couleur.photos, ...(produit.photosCommunes || [])];
    const card = document.createElement("article");
    card.className = "variant-card";
    card.innerHTML = `
      <div class="variant-gallery">
        <img class="variant-image" alt="${produit.nom} ${couleur.nom}">
        <button type="button" class="detail-nav detail-prev" aria-label="Photo precedente">&#10094;</button>
        <button type="button" class="detail-nav detail-next" aria-label="Photo suivante">&#10095;</button>
        <span class="detail-count" aria-live="polite"></span>
      </div>
      <div class="variant-content">
        <div class="variant-color"><span class="variant-dot"></span><strong>${couleur.nom}</strong></div>
        <h2>${produit.reference} - ${couleur.nom}</h2>
        <p>Photos de cette couleur, suivies des photos communes du modele.</p>
        <a class="order-one" target="_blank" rel="noopener">Commander cette couleur sur WhatsApp</a>
      </div>`;

    card.querySelector(".variant-dot").style.backgroundColor = couleur.code;
    const image = card.querySelector(".variant-image");
    const count = card.querySelector(".detail-count");

    function show() {
      image.src = photos[index];
      image.alt = `${produit.nom} - ${couleur.nom}`;
      count.textContent = `${index + 1} / ${photos.length}`;
    }

    card.querySelector(".detail-prev").addEventListener("click", () => {
      index = (index - 1 + photos.length) % photos.length;
      show();
    });

    card.querySelector(".detail-next").addEventListener("click", () => {
      index = (index + 1) % photos.length;
      show();
    });

    let startX = 0;
    card.querySelector(".variant-gallery").addEventListener("touchstart", (event) => {
      startX = event.changedTouches[0].clientX;
    }, { passive: true });
    card.querySelector(".variant-gallery").addEventListener("touchend", (event) => {
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) < 45) return;
      index = delta < 0 ? (index + 1) % photos.length : (index - 1 + photos.length) % photos.length;
      show();
    }, { passive: true });

    const message = `Bonjour MC Watches, je souhaite commander ${produit.reference}, couleur ${couleur.nom}, au prix de ${produit.prix} DH. Pouvez-vous confirmer la disponibilite et la livraison ?`;
   card.querySelector(".order-one").href =
  `https://wa.me/${tel}?text=${encodeURIComponent(message)}`;

    show();
    list.appendChild(card);
  });
})();
