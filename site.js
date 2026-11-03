/* ==========================================================
   MC WATCHES - COMPORTEMENT DU SITE
   Menu, cartes produits, carrousels, fiche produit.
   Les données viennent de data.js (window.MC).
   ========================================================== */

(() => {
  "use strict";

  const MC = window.MC;
  if (!MC) return;

  /* ---------- Outils ---------- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const html = (str) => {
    const t = document.createElement("template");
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  };

  const prix = (n) => `${n} DH`;

  const lienWhatsApp = (message) =>
    `https://wa.me/${MC.whatsapp}?text=${encodeURIComponent(message)}`;

  const lienFormulaire = (reference, couleur, montant) => {
    const f = MC.formulaire;
    return (
      `${f.base}?usp=pp_url` +
      `&${f.reference}=${encodeURIComponent(reference)}` +
      `&${f.couleur}=${encodeURIComponent(couleur)}` +
      `&${f.prix}=${encodeURIComponent(montant)}`
    );
  };

  const messageCommande = (p, couleur) =>
    couleur
      ? `Bonjour MC Watches, je souhaite commander ${p.reference}, couleur ${couleur}, au prix de ${p.prix} DH. Pouvez-vous confirmer la disponibilité et la livraison ?`
      : `Bonjour MC Watches, je souhaite commander ${p.nom} au prix de ${p.prix} DH. Pouvez-vous confirmer la disponibilité et la livraison ?`;

  const style = (c) =>
    c.code2
      ? `background:linear-gradient(135deg, ${c.code} 0 50%, ${c.code2} 50% 100%)`
      : `background:${c.code}`;

  const ICON_PREV = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_NEXT = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- Fenêtre de commande ----------
     Le client remplit ses coordonnées ; un message WhatsApp complet
     (produit, couleur, quantité, adresse) s'ouvre, prêt à envoyer.   */

  const messageQuestion = (p, couleur) =>
    `Bonjour MC Watches, j'ai une question sur ${p.nom}${couleur ? `, couleur ${couleur}` : ""}.`;

  const messageDetaille = (p, couleur, qte, f) =>
    [
      "Bonjour MC Watches, je souhaite passer commande :",
      "",
      `Produit : ${p.nom}`,
      couleur ? `Couleur : ${couleur}` : null,
      `Quantité : ${qte}`,
      `Prix : ${p.prix} DH (livraison gratuite)`,
      `Total : ${p.prix * qte} DH`,
      "",
      `Nom : ${f.nom}`,
      `Téléphone : ${f.tel}`,
      `Ville : ${f.ville}`,
      `Adresse : ${f.adresse}`,
      "",
      "Pouvez-vous confirmer la disponibilité et la livraison ?"
    ].filter((l) => l !== null).join("\n");

  const telValide = (v) => /^(?:\+?212|0)[5-7]\d{8}$/.test(v.replace(/[\s.\-()]/g, ""));

  const CHAMPS = [
    { id: "nom", label: "Nom complet", auto: "name", erreur: "Indiquez votre nom." },
    { id: "tel", label: "Téléphone", auto: "tel", type: "tel", aide: "Exemple : 06 12 34 56 78",
      erreur: "Entrez un numéro marocain valide, par exemple 06 12 34 56 78." },
    { id: "ville", label: "Ville", auto: "address-level2", erreur: "Indiquez votre ville." },
    { id: "adresse", label: "Adresse de livraison", auto: "street-address", zone: true,
      aide: "Quartier, rue, numéro, repère.", erreur: "Indiquez votre adresse de livraison." }
  ];

  const ICON_CLOSE = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  let dlg = null;

  function creerDialogue() {
    const champs = CHAMPS.map((c) => `
      <div class="field">
        <label for="of-${c.id}">${c.label}</label>
        ${c.zone
          ? `<textarea id="of-${c.id}" name="${c.id}" rows="2" autocomplete="${c.auto}" required aria-describedby="of-${c.id}-aide of-${c.id}-err"></textarea>`
          : `<input id="of-${c.id}" name="${c.id}" type="${c.type || "text"}" autocomplete="${c.auto}" ${c.type === "tel" ? 'inputmode="tel"' : ""} required aria-describedby="of-${c.id}-aide of-${c.id}-err">`}
        <p class="field-help" id="of-${c.id}-aide">${c.aide || ""}</p>
        <p class="field-error" id="of-${c.id}-err" role="alert"></p>
      </div>`).join("");

    const el = html(`
      <dialog class="order-dialog" aria-labelledby="order-title">
        <form class="order-form" novalidate>
          <div class="order-head">
            <h2 id="order-title">Passer commande</h2>
            <button type="button" class="order-close" aria-label="Fermer">${ICON_CLOSE}</button>
          </div>

          <div class="order-summary"></div>

          ${champs}

          <button type="submit" class="btn btn-solid order-submit">Envoyer ma commande sur WhatsApp</button>
          <p class="order-fine">WhatsApp s'ouvre avec votre message déjà écrit : vous pouvez le relire avant de l'envoyer. Le prix, la disponibilité et la livraison sont confirmés avant la commande.</p>
          <p class="order-alt"><a data-alt-form target="_blank" rel="noopener">Commander avec le formulaire Google</a></p>
        </form>

        <div class="order-done" hidden>
          <div class="order-head">
            <h2 id="order-done-title">Votre message est prêt</h2>
            <button type="button" class="order-close" aria-label="Fermer">${ICON_CLOSE}</button>
          </div>
          <p>Envoyez-le dans WhatsApp pour valider votre demande. Nous vous confirmons ensuite le prix, la disponibilité et la livraison.</p>
          <a class="btn btn-solid" data-open-wa target="_blank" rel="noopener">Ouvrir WhatsApp</a>
          <button type="button" class="btn btn-ghost order-close-2">Fermer</button>
        </div>
      </dialog>`);

    document.body.appendChild(el);
    const form = el.querySelector("form");
    const done = el.querySelector(".order-done");
    const resume = el.querySelector(".order-summary");
    const etat = { p: null, couleur: "" };

    const dessiner = () => {
      const { p, couleur } = etat;
      resume.innerHTML = `
        <p class="order-product"><strong>${esc(p.nom)}</strong>${couleur ? `<span>${esc(couleur)}</span>` : ""}</p>
        <div class="order-line">
          <label for="of-qte">Quantité</label>
          <select id="of-qte" name="qte">${[1, 2, 3, 4, 5].map((n) => `<option value="${n}">${n}</option>`).join("")}</select>
          <span class="order-total"><span class="order-unit">${prix(p.prix)} l'unité</span><strong data-total>${prix(p.prix)}</strong></span>
        </div>
        <p class="order-note">Livraison gratuite. Paiement à la livraison.</p>`;
      resume.querySelector("#of-qte").addEventListener("change", (e) => {
        resume.querySelector("[data-total]").textContent = prix(p.prix * Number(e.target.value));
      });
    };

    const fermer = () => el.close();
    el.querySelectorAll(".order-close, .order-close-2").forEach((b) => b.addEventListener("click", fermer));
    el.addEventListener("click", (e) => { if (e.target === el) fermer(); });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const valeurs = {};
      let premier = null;
      CHAMPS.forEach((c) => {
        const champ = form.elements[c.id];
        const v = champ.value.trim();
        valeurs[c.id] = v;
        const ok = c.id === "tel" ? telValide(v) : v.length > 1;
        champ.setAttribute("aria-invalid", String(!ok));
        form.querySelector(`#of-${c.id}-err`).textContent = ok ? "" : c.erreur;
        if (!ok && !premier) premier = champ;
      });
      if (premier) { premier.focus(); return; }

      const qte = Number(form.elements.qte.value) || 1;
      const lien = lienWhatsApp(messageDetaille(etat.p, etat.couleur, qte, valeurs));
      done.querySelector("[data-open-wa]").href = lien;
      window.open(lien, "_blank", "noopener");
      form.hidden = true;
      done.hidden = false;
      el.setAttribute("aria-labelledby", "order-done-title");
      done.querySelector(".btn").focus();
    });

    return {
      ouvrir(p, couleur) {
        etat.p = p;
        etat.couleur = couleur || "";
        dessiner();
        form.hidden = false;
        done.hidden = true;
        el.setAttribute("aria-labelledby", "order-title");
        form.querySelectorAll(".field-error").forEach((x) => (x.textContent = ""));
        form.querySelectorAll("[aria-invalid]").forEach((x) => x.removeAttribute("aria-invalid"));
        el.querySelector("[data-alt-form]").href = lienFormulaire(p.reference, couleur || p.couleur || "", p.prix);
        el.showModal();
        form.elements.nom.focus();
      },
      supporte: typeof el.showModal === "function"
    };
  }

  function ouvrirCommande(p, couleur) {
    if (!dlg) dlg = creerDialogue();
    if (!dlg.supporte) {
      window.open(lienWhatsApp(messageCommande(p, couleur)), "_blank", "noopener");
      return;
    }
    dlg.ouvrir(p, couleur);
  }

  /* ---------- Menu ---------- */

  function initMenu() {
    const bouton = document.querySelector(".menu-toggle");
    const nav = document.getElementById("main-navigation");
    if (!bouton || !nav) return;

    const fermer = () => {
      nav.classList.remove("is-open");
      bouton.setAttribute("aria-expanded", "false");
    };

    bouton.addEventListener("click", (e) => {
      e.stopPropagation();
      const ouvert = nav.classList.toggle("is-open");
      bouton.setAttribute("aria-expanded", String(ouvert));
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", fermer));

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !bouton.contains(e.target)) fermer();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        fermer();
        bouton.focus();
      }
    });
  }

  /* ---------- Carrousel (partagé par les cartes et la fiche) ----------
     Gère : flèches, balayage tactile, flèches clavier, compteur.      */

  function carrousel({ media, image, compteur, photos, alt, onChange }) {
    let index = 0;

    const afficher = () => {
      const liste = photos();
      if (!liste.length) return;
      if (index >= liste.length) index = 0;
      image.src = liste[index];
      image.alt = `${alt()} - photo ${index + 1} sur ${liste.length}`;
      compteur.textContent = `${index + 1} / ${liste.length}`;
      if (onChange) onChange(index);
    };

    const aller = (delta) => {
      const n = photos().length;
      if (!n) return;
      index = (index + delta + n) % n;
      afficher();
    };

    const allerA = (i) => {
      index = i;
      afficher();
    };

    media.querySelector(".car-prev").addEventListener("click", () => aller(-1));
    media.querySelector(".car-next").addEventListener("click", () => aller(1));

    media.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { aller(-1); e.preventDefault(); }
      if (e.key === "ArrowRight") { aller(1); e.preventDefault(); }
    });

    let x0 = 0;
    media.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    media.addEventListener("touchend", (e) => {
      const ecart = e.changedTouches[0].clientX - x0;
      if (Math.abs(ecart) >= 45) aller(ecart < 0 ? 1 : -1);
    }, { passive: true });

    return { afficher, reset: () => allerA(0), allerA };
  }

  /* ---------- Carte produit (accueil et page produits) ---------- */

  function creerCarte(p) {
    const avecCouleurs = p.type === "montre";
    let ci = 0;

    const photos = () =>
      avecCouleurs ? [...p.couleurs[ci].photos, ...(p.photosCommunes || [])] : p.photos;
    const alt = () => (avecCouleurs ? `${p.nom}, ${p.couleurs[ci].nom}` : p.nom);

    const pastilles = avecCouleurs
      ? `<div class="swatch-group">
           <p class="swatch-label">Couleur : <strong data-couleur></strong></p>
           <div class="swatches" role="group" aria-label="Choisir une couleur"></div>
         </div>`
      : "";

    const actions = avecCouleurs
      ? `<button type="button" class="btn btn-solid" data-order>Commander</button>
         <a class="btn btn-ghost" data-details>Voir les détails</a>`
      : `<button type="button" class="btn btn-solid" data-order>Commander</button>
         <a class="btn btn-ghost" data-wa target="_blank" rel="noopener">Poser une question sur WhatsApp</a>`;

    const carte = html(`
      <article class="card">
        <div class="card-media" tabindex="0" role="group" aria-roledescription="carrousel" aria-label="Photos : ${esc(p.nom)}">
          <img class="card-img" width="1600" height="1200" loading="lazy" decoding="async" alt="">
          <button type="button" class="car-btn car-prev" aria-label="Photo précédente">${ICON_PREV}</button>
          <button type="button" class="car-btn car-next" aria-label="Photo suivante">${ICON_NEXT}</button>
          <span class="count" aria-live="polite"></span>
        </div>
        <div class="card-body">
          <p class="card-ref">${esc(p.categorie || "")}</p>
          <h3 class="card-title">${esc(p.nom)}</h3>
          <p class="card-price">${prix(p.prix)}</p>
          <p class="card-delivery">Livraison gratuite</p>
          ${pastilles}
          <div class="card-actions">${actions}</div>
        </div>
      </article>`);

    const media = carte.querySelector(".card-media");
    const mettreAJourLiens = () => {
      const c = avecCouleurs ? p.couleurs[ci].nom : "";
      if (avecCouleurs) {
        carte.querySelector("[data-details]").href =
          `produit.html?ref=${encodeURIComponent(p.reference)}&couleur=${encodeURIComponent(c)}`;
        carte.querySelector("[data-couleur]").textContent = c;
      } else {
        carte.querySelector("[data-wa]").href = lienWhatsApp(messageQuestion(p, ""));
      }
    };

    carte.querySelector("[data-order]").addEventListener("click", () =>
      ouvrirCommande(p, avecCouleurs ? p.couleurs[ci].nom : p.couleur || "")
    );

    const car = carrousel({
      media,
      image: carte.querySelector(".card-img"),
      compteur: carte.querySelector(".count"),
      photos,
      alt
    });

    if (avecCouleurs) {
      const zone = carte.querySelector(".swatches");
      p.couleurs.forEach((c, i) => {
        const b = html(
          `<button type="button" class="swatch" style="${style(c)}" aria-label="${esc(c.nom)}" title="${esc(c.nom)}" aria-pressed="${i === 0}"></button>`
        );
        b.addEventListener("click", () => {
          ci = i;
          zone.querySelectorAll(".swatch").forEach((s) => s.setAttribute("aria-pressed", "false"));
          b.setAttribute("aria-pressed", "true");
          mettreAJourLiens();
          car.reset();
        });
        zone.appendChild(b);
      });
    }

    mettreAJourLiens();
    car.afficher();
    return carte;
  }

  function initCatalogue() {
    document.querySelectorAll("[data-produits]").forEach((zone) => {
      const type = zone.getAttribute("data-produits");
      const liste = MC.produits.filter((p) => p.type === type);
      liste.forEach((p) => zone.appendChild(creerCarte(p)));
    });
  }

  /* ---------- Fiche produit ---------- */

  function initFiche() {
    const racine = document.getElementById("fiche-produit");
    if (!racine) return;

    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    const p = MC.produits.find((x) => x.type === "montre" && x.reference === ref);

    if (!p) {
      racine.innerHTML = `
        <div class="notfound">
          <h1>Ce modèle n'existe pas</h1>
          <p>Le lien est peut-être ancien. Choisissez un modèle dans la liste des produits.</p>
          <a class="btn btn-solid" href="produits.html">Voir tous les produits</a>
        </div>`;
      document.title = "Modèle introuvable | MC Watches";
      return;
    }

    let ci = Math.max(0, p.couleurs.findIndex((c) => c.nom === params.get("couleur")));
    const photos = () => [...p.couleurs[ci].photos, ...(p.photosCommunes || [])];

    /* Titre, description, JSON-LD */
    document.title = `${p.reference} - montre pour homme, ${prix(p.prix)} | MC Watches`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.content = `${p.nom} : ${p.couleurs.map((c) => c.nom.toLowerCase()).join(", ")}. ${prix(p.prix)}, livraison gratuite partout au Maroc, paiement à la livraison.`;
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${MC.domaine}/produit.html?ref=${encodeURIComponent(p.reference)}`;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.nom,
      sku: p.reference,
      image: p.couleurs.map((c) => `${MC.domaine}/${c.photos[0]}`),
      brand: { "@type": "Brand", name: "MC Watches" },
      offers: {
        "@type": "Offer",
        priceCurrency: "MAD",
        price: String(p.prix),
        url: `${MC.domaine}/produit.html?ref=${encodeURIComponent(p.reference)}`,
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "MAD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "MA" }
        }
      }
    });
    document.head.appendChild(ld);

    /* Les autres modèles */
    const autres = MC.produits
      .filter((x) => x.type === "montre" && x.reference !== p.reference)
      .map((x) => `
        <a class="mini" href="produit.html?ref=${encodeURIComponent(x.reference)}">
          <img src="${esc(x.couleurs[0].photos[0])}" width="1600" height="1200" loading="lazy" decoding="async" alt="${esc(x.nom)}">
          <span class="mini-name">${esc(x.nom)}</span>
          <span class="mini-price">${prix(x.prix)}</span>
        </a>`)
      .join("");

    racine.innerHTML = `
      <nav class="crumbs" aria-label="Fil d'Ariane">
        <a href="./">Accueil</a>
        <span aria-hidden="true">/</span>
        <a href="produits.html#montres">Montres</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${esc(p.reference)}</span>
      </nav>

      <div class="detail">
        <div class="detail-gallery">
          <div class="detail-media" tabindex="0" role="group" aria-roledescription="carrousel" aria-label="Photos : ${esc(p.nom)}">
            <img class="detail-img" width="1600" height="1200" decoding="async" alt="">
            <button type="button" class="car-btn car-prev" aria-label="Photo précédente">${ICON_PREV}</button>
            <button type="button" class="car-btn car-next" aria-label="Photo suivante">${ICON_NEXT}</button>
            <span class="count" aria-live="polite"></span>
          </div>
          <div class="thumbs" role="group" aria-label="Choisir une photo"></div>
        </div>

        <div class="detail-info">
          <p class="card-ref">${esc(p.categorie || "")}</p>
          <h1>${esc(p.nom)}</h1>
          <p class="detail-price">${prix(p.prix)}</p>
          <p class="card-delivery">Livraison gratuite partout au Maroc</p>

          <div class="swatch-group">
            <p class="swatch-label">Couleur : <strong data-couleur></strong></p>
            <div class="chips" role="group" aria-label="Choisir une couleur"></div>
          </div>

          <div class="detail-actions">
            <button type="button" class="btn btn-solid" data-order>Commander</button>
            <a class="btn btn-ghost" data-wa target="_blank" rel="noopener">Poser une question sur WhatsApp</a>
          </div>

          <ul class="facts">
            <li>Paiement à la livraison</li>
            <li>Prix, disponibilité et livraison confirmés avant la commande</li>
            <li><a href="livraison.html">Livraison, paiement et questions fréquentes</a></li>
          </ul>
        </div>
      </div>

      <section class="others" aria-labelledby="autres-titre">
        <h2 id="autres-titre">Autres modèles</h2>
        <div class="others-grid">${autres}</div>
      </section>`;

    const media = racine.querySelector(".detail-media");
    const thumbs = racine.querySelector(".thumbs");
    const wa = racine.querySelector("[data-wa]");
    const zone = racine.querySelector(".chips");

    const dessinerMiniatures = () => {
      thumbs.innerHTML = "";
      photos().forEach((src, i) => {
        const b = html(
          `<button type="button" class="thumb" aria-label="Voir la photo ${i + 1}"><img src="${esc(src)}" width="160" height="120" loading="lazy" decoding="async" alt=""></button>`
        );
        b.addEventListener("click", () => car.allerA(i));
        thumbs.appendChild(b);
      });
    };

    const car = carrousel({
      media,
      image: racine.querySelector(".detail-img"),
      compteur: racine.querySelector(".count"),
      photos,
      alt: () => `${p.nom}, ${p.couleurs[ci].nom}`,
      onChange: (i) => {
        thumbs.querySelectorAll(".thumb").forEach((t, k) => {
          t.classList.toggle("is-active", k === i);
          if (k === i) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
        });
      }
    });

    const majCouleur = () => {
      const c = p.couleurs[ci].nom;
      racine.querySelector("[data-couleur]").textContent = c;
      wa.href = lienWhatsApp(messageQuestion(p, c));
      zone.querySelectorAll(".chip").forEach((s, i) => s.setAttribute("aria-pressed", String(i === ci)));
      const url = new URL(window.location.href);
      url.searchParams.set("couleur", c);
      window.history.replaceState(null, "", url);
      dessinerMiniatures();
      car.reset();
    };

    p.couleurs.forEach((c, i) => {
      const b = html(
        `<button type="button" class="chip" aria-pressed="false"><span class="chip-dot" style="${style(c)}"></span><span>${esc(c.nom)}</span></button>`
      );
      b.addEventListener("click", () => { ci = i; majCouleur(); });
      zone.appendChild(b);
    });

    racine.querySelector("[data-order]").addEventListener("click", () => ouvrirCommande(p, p.couleurs[ci].nom));

    majCouleur();
  }

  /* ---------- Bouton WhatsApp flottant ----------
     Il se masque quand l'en-tête d'accueil, le contact ou le pied de page est visible. */

  function initFloat() {
    const bouton = document.querySelector(".wa-float");
    const cibles = document.querySelectorAll(".hero, #contact, .site-footer");
    if (!bouton || !cibles.length || !("IntersectionObserver" in window)) return;
    const visibles = new Set();
    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
      bouton.classList.toggle("is-hidden", visibles.size > 0);
    });
    cibles.forEach((c) => obs.observe(c));
  }

  /* ---------- Démarrage ---------- */

  initFloat();
  initMenu();
  initCatalogue();
  initFiche();
})();
