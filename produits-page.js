(() => {
  const root = document.getElementById("products-grid");

  if (!root) {
    return;
  }

  const produits = window.catalogueProduits || [];
  const telephone = "212708275864";

  produits.forEach((produit) => {
    const avecCouleurs = Array.isArray(produit.couleurs);

    if (avecCouleurs) {
      produit.couleurs.forEach((couleur) => {
        creerCarteVariante(produit, couleur);
      });
    } else {
      creerCarteSimple(produit);
    }
  });

  function creerCarteVariante(produit, couleur) {
    let photoIndex = 0;

    const photos = [
      ...(couleur.photos || []),
      ...(produit.photosCommunes || [])
    ];

    const carte = document.createElement("article");
    carte.className = "product-variant-card";

    carte.innerHTML = `
      <div class="product-variant-media">
        <img
          class="product-variant-image"
          alt="${produit.nom} - ${couleur.nom}"
        >

        <button
          type="button"
          class="variant-carousel-button variant-carousel-prev"
          aria-label="Photo précédente"
        >
          &#10094;
        </button>

        <button
          type="button"
          class="variant-carousel-button variant-carousel-next"
          aria-label="Photo suivante"
        >
          &#10095;
        </button>

        <span class="variant-carousel-count"></span>
      </div>

      <div class="product-variant-info">
        <p class="product-reference">
          ${produit.reference}
        </p>

        <h2>
          ${produit.nom}
        </h2>

        <div class="product-color-line">
          <span class="product-color-dot"></span>
          <strong>${couleur.nom}</strong>
        </div>

        <p class="product-price">
          ${produit.prix} DH
        </p>

        <p class="product-delivery">
          Livraison gratuite partout au Maroc
        </p>

        <div class="product-actions">
          "
          >
            Voir plus
          </a>

          <a
            class="product-whatsapp"
            target="_blank"
            rel="noopener"
          >
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    `;

    const image = carte.querySelector(".product-variant-image");
    const compteur = carte.querySelector(".variant-carousel-count");
    const media = carte.querySelector(".product-variant-media");

    carte.querySelector(".product-color-dot").style.backgroundColor =
      couleur.code;

    function afficherPhoto() {
      if (!photos.length) {
        image.removeAttribute("src");
        image.alt = "Photo indisponible";
        compteur.textContent = "0 / 0";
        return;
      }

      image.src = photos[photoIndex];

      compteur.textContent =
        `${photoIndex + 1} / ${photos.length}`;
    }

    carte
      .querySelector(".variant-carousel-prev")
      .addEventListener("click", () => {
        photoIndex =
          (photoIndex - 1 + photos.length) %
          photos.length;

        afficherPhoto();
      });

    carte
      .querySelector(".variant-carousel-next")
      .addEventListener("click", () => {
        photoIndex =
          (photoIndex + 1) %
          photos.length;

        afficherPhoto();
      });

    let debutX = 0;

    media.addEventListener(
      "touchstart",
      (event) => {
        debutX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );

    media.addEventListener(
      "touchend",
      (event) => {
        const ecart =
          event.changedTouches[0].clientX -
          debutX;

        if (Math.abs(ecart) < 45) {
          return;
        }

        photoIndex =
          ecart < 0
            ? (photoIndex + 1) % photos.length
            : (photoIndex - 1 + photos.length) % photos.length;

        afficherPhoto();
      },
      { passive: true }
    );

    const message =
      `Bonjour MC Watches, je souhaite commander ` +
      `${produit.reference}, couleur ${couleur.nom}, ` +
      `au prix de ${produit.prix} DH, livraison incluse. ` +
      `Pouvez-vous confirmer la disponibilité ?`;

    carte.querySelector(".product-whatsapp").href =
      `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`;

    afficherPhoto();
    root.appendChild(carte);
  }

  function creerCarteSimple(produit) {
    let photoIndex = 0;
    const photos = produit.photos || [];

    const carte = document.createElement("article");
    carte.className = "product-variant-card";

    carte.innerHTML = `
      <div class="product-variant-media">
        <img
          class="product-variant-image"
          alt="${produit.nom}"
        >

        <button
          type="button"
          class="variant-carousel-button variant-carousel-prev"
          aria-label="Photo précédente"
        >
          &#10094;
        </button>

        <button
          type="button"
          class="variant-carousel-button variant-carousel-next"
          aria-label="Photo suivante"
        >
          &#10095;
        </button>

        <span class="variant-carousel-count"></span>
      </div>

      <div class="product-variant-info">
        <p class="product-reference">
          ${produit.reference}
        </p>

        <h2>
          ${produit.nom}
        </h2>

        <div class="product-color-line">
          <span
            class="product-color-dot"
            style="background:#171717"
          ></span>

          <strong>
            ${produit.couleur || "Noir"}
          </strong>
        </div>

        <p class="product-price">
          ${produit.prix} DH
        </p>

        <p class="product-delivery">
          Livraison gratuite partout au Maroc
        </p>

        <div class="product-actions">
          <a
            class="product-whatsapp"
            target="_blank"
            rel="noopener"
          >
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    `;

    const image = carte.querySelector(".product-variant-image");
    const compteur = carte.querySelector(".variant-carousel-count");

    function afficherPhoto() {
      if (!photos.length) {
        image.removeAttribute("src");
        compteur.textContent = "0 / 0";
        return;
      }

      image.src = photos[photoIndex];

      compteur.textContent =
        `${photoIndex + 1} / ${photos.length}`;
    }

    carte
      .querySelector(".variant-carousel-prev")
      .addEventListener("click", () => {
        photoIndex =
          (photoIndex - 1 + photos.length) %
          photos.length;

        afficherPhoto();
      });

    carte
      .querySelector(".variant-carousel-next")
      .addEventListener("click", () => {
        photoIndex =
          (photoIndex + 1) %
          photos.length;

        afficherPhoto();
      });

    const message =
      `Bonjour MC Watches, je souhaite commander ` +
      `${produit.nom}, au prix de ${produit.prix} DH, ` +
      `livraison incluse. Pouvez-vous confirmer la disponibilité ?`;

    carte.querySelector(".product-whatsapp").href =
      `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`;

    afficherPhoto();
    root.appendChild(carte);
  }
})();
