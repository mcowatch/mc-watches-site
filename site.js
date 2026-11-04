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
     Le client remplit ses coordonnées et clique sur « Commander » : la
     commande (produit, couleur, quantité, total, adresse) est envoyée
     directement dans le formulaire Google. WhatsApp reste proposé en
     option (« Je préfère commander sur WhatsApp »).                   */

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
      `Nom : ${f.prenom} ${f.nom}`,
      `Téléphone : ${f.tel}`,
      `Ville : ${f.ville}`,
      `Adresse : ${f.adresse}`,
      "",
      "Pouvez-vous confirmer la disponibilité et la livraison ?"
    ].filter((l) => l !== null).join("\n");

  const telValide = (v) => /^(?:\+?212|0)[5-7]\d{8}$/.test(v.replace(/[\s.\-()]/g, ""));

  const CHAMPS = [
    { id: "prenom", label: "Prénom", auto: "given-name", erreur: "Indiquez votre prénom." },
    { id: "nom", label: "Nom", auto: "family-name", erreur: "Indiquez votre nom." },
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

          <p class="field-error order-send-error" role="alert"></p>
          <button type="submit" class="btn btn-solid order-submit">Commander</button>
          <p class="order-fine">Votre commande nous est envoyée directement. Nous vous contactons pour confirmer la disponibilité et la livraison, puis vous payez à la réception.</p>
          <p class="order-alt"><a data-alt-wa target="_blank" rel="noopener">Je préfère commander sur WhatsApp</a></p>
        </form>

        <div class="order-done" hidden>
          <div class="order-head">
            <h2 id="order-done-title">Commande envoyée</h2>
            <button type="button" class="order-close" aria-label="Fermer">${ICON_CLOSE}</button>
          </div>
          <p>Merci ! Nous vous contactons très vite pour confirmer la disponibilité et la livraison. Vous payez à la réception de votre montre.</p>
          <button type="button" class="btn btn-solid order-close-2">Fermer</button>
          <p class="order-fine order-fine-tight">Pas de nouvelles de notre part ?</p>
          <a class="btn btn-ghost" data-open-wa target="_blank" rel="noopener">Nous écrire sur WhatsApp</a>
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

    /* Lit ce que le client a déjà saisi dans le formulaire du site. */
    const saisie = () => {
      const v = (id) => (form.elements[id] ? form.elements[id].value.trim() : "");
      return {
        prenom: v("prenom"), nom: v("nom"), tel: v("tel"),
        ville: v("ville"), adresse: v("adresse"),
        qte: Number(v("qte")) || 1
      };
    };

    /* Message WhatsApp : détaillé si tout est rempli, simple sinon. */
    const lienWa = () => {
      const c = saisie();
      const { p, couleur } = etat;
      const complet = c.prenom && c.nom && c.tel && c.ville && c.adresse;
      return lienWhatsApp(complet ? messageDetaille(p, couleur, c.qte, c) : messageCommande(p, couleur));
    };

    // Le lien WhatsApp (option « je préfère ») est recalculé juste avant
    // l'ouverture, avec les dernières informations saisies.
    const lienAlt = el.querySelector("[data-alt-wa]");
    ["pointerdown", "focus", "click"].forEach((ev) =>
      lienAlt.addEventListener(ev, () => { lienAlt.href = lienWa(); })
    );

    const boutonEnvoi = form.querySelector(".order-submit");
    const erreurEnvoi = form.querySelector(".order-send-error");

    /* Envoie la commande au formulaire Google, sans quitter le site.
       (mode no-cors : Google ne renvoie pas de réponse lisible, on sait
       seulement si l'envoi a pu partir.)                              */
    const envoyerCommande = (c) => {
      const f = MC.formulaire;
      const { p, couleur } = etat;
      const corps = new URLSearchParams();
      [
        [f.reference, p.reference],
        [f.couleur, couleur || p.couleur || ""],
        [f.prix, p.prix * c.qte],
        [f.prenom, c.prenom],
        [f.nom, c.nom],
        [f.telephone, c.tel],
        [f.ville, c.ville],
        [f.adresse, c.adresse],
        [f.quantite, c.qte]
      ].forEach(([id, v]) => { if (id && String(v).trim() !== "") corps.append(id, String(v).trim()); });
      corps.append("fvv", "1");
      corps.append("pageHistory", "0");

      const ctrl = typeof AbortController === "function" ? new AbortController() : null;
      const minuteur = setTimeout(() => ctrl && ctrl.abort(), 15000);
      return fetch(f.base.replace(/\/viewform.*$/, "/formResponse"), {
        method: "POST",
        mode: "no-cors",
        body: corps,
        signal: ctrl ? ctrl.signal : undefined
      }).finally(() => clearTimeout(minuteur));
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

      const c = saisie();
      done.querySelector("[data-open-wa]").href = lienWhatsApp(messageDetaille(etat.p, etat.couleur, c.qte, valeurs));
      erreurEnvoi.textContent = "";
      boutonEnvoi.disabled = true;
      boutonEnvoi.textContent = "Envoi en cours…";

      envoyerCommande(c)
        .then(() => {
          form.hidden = true;
          done.hidden = false;
          el.setAttribute("aria-labelledby", "order-done-title");
          done.querySelector(".btn").focus();
        })
        .catch(() => {
          erreurEnvoi.textContent =
            "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez, ou commandez sur WhatsApp ci-dessous.";
          lienAlt.href = lienWa();
        })
        .finally(() => {
          boutonEnvoi.disabled = false;
          boutonEnvoi.textContent = "Commander";
        });
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
        erreurEnvoi.textContent = "";
        lienAlt.href = lienWa();
        el.showModal();
        form.elements.prenom.focus();
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

          <div class="service">
            <p class="service-title">Livraison et retours</p>
            <dl class="service-list">
              <div><dt>Casablanca, Rabat et environs</dt><dd>24 à 48 h</dd></div>
              <div><dt>Autres villes du Maroc</dt><dd>3 jours</dd></div>
              <div><dt>Paiement</dt><dd>À la livraison</dd></div>
              <div><dt>Échange ou retour</dt><dd>Sans motif, sous 7 jours</dd></div>
            </dl>
            <p class="service-note">Le prix et la disponibilité sont confirmés avec vous avant l'envoi. <a href="livraison.html">Voir toutes les conditions</a></p>
          </div>
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

  /* ---------- Textes qui suivent data.js ----------
     Nombre de collections et prix des boîtes :
     ils se mettent à jour tout seuls quand vous modifiez data.js. */

  function initAuto() {
    const montres = MC.produits.filter((p) => p.type === "montre");
    const boites = MC.produits.filter((p) => p.type === "boite");
    const mots = ["zéro", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];

    document.querySelectorAll('[data-auto="nb-collections"]').forEach((e) => {
      let t = mots[montres.length] || String(montres.length);
      if (e.hasAttribute("data-cap")) t = t.charAt(0).toUpperCase() + t.slice(1);
      e.textContent = t;
    });

    document.querySelectorAll('[data-auto="boites-prix"]').forEach((ul) => {
      if (!boites.length) return;
      ul.innerHTML = boites
        .map((p) => `<li><span>${esc(p.nomCourt || p.nom)}</span><strong>${prix(p.prix)}</strong></li>`)
        .join("");
    });
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

  /* ---------- Bandeau d'infos défilant ----------
     Les infos du bandeau défilent lentement, en boucle. Le défilement
     s'arrête au survol, et n'existe pas du tout si le visiteur a demandé
     « réduire les animations » (le bandeau reste alors fixe).
     Pour changer la vitesse : modifiez VITESSE (pixels par seconde).   */

  function initBandeau() {
    const VITESSE = 28;
    const bandeau = document.querySelector(".promo");
    const liste = bandeau && bandeau.querySelector(".promo-list");
    if (!liste) return;
    const calme = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calme && calme.matches) return;

    const original = liste.cloneNode(true);
    let piste = null;

    const construire = () => {
      if (piste) piste.remove();
      bandeau.classList.remove("is-marquee");
      liste.style.display = "";

      // Largeur d'un groupe d'infos, puis nombre de copies pour remplir l'écran.
      bandeau.classList.add("is-marquee");
      const probe = original.cloneNode(true);
      probe.classList.add("promo-measure");
      bandeau.appendChild(probe);
      const largeur = probe.getBoundingClientRect().width;
      probe.remove();
      if (!largeur) { bandeau.classList.remove("is-marquee"); return; }

      const copies = Math.ceil(bandeau.clientWidth / largeur) + 1;
      piste = document.createElement("div");
      piste.className = "promo-track";
      piste.style.setProperty("--shift", `${largeur}px`);
      piste.style.setProperty("--duree", `${(largeur / VITESSE).toFixed(1)}s`);
      for (let i = 0; i < copies; i++) {
        const c = original.cloneNode(true);
        if (i > 0) c.setAttribute("aria-hidden", "true");
        piste.appendChild(c);
      }
      liste.style.display = "none";
      bandeau.appendChild(piste);
    };

    construire();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(construire, 200); });
  }

  /* ---------- Démarrage ---------- */

  initAuto();
  initFloat();
  initBandeau();
  initMenu();
  initCatalogue();
  initFiche();
})();
