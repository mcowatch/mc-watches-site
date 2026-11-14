/* ==========================================================
   MC WATCHES - COMPORTEMENT DU SITE
   Menu, cartes produits, carrousels, fiche produit.
   Les données viennent de data.js (window.MC).
   ========================================================== */

(() => {
  "use strict";

  const MC = window.MC;
  if (!MC) return;

  /* ---------- Mode test ----------
     Vos propres commandes de test faussent le pixel et apprennent à Meta
     à chercher des gens qui vous ressemblent, pas des acheteurs.

     Ouvrez le site UNE fois avec ?notrack=1 sur chaque appareil que vous
     utilisez pour tester (téléphone + ordinateur). Le pixel ne partira
     plus jamais depuis cet appareil, et un petit badge vous le confirme.
     Pour réactiver le suivi : ?notrack=0                              */

  const CLE_TEST = "mc-notrack";

  const estModeTest = () => {
    try {
      var p = new URLSearchParams(window.location.search);
      if (p.has("notrack")) {
        if (p.get("notrack") === "0") localStorage.removeItem(CLE_TEST);
        else localStorage.setItem(CLE_TEST, "1");
      }
      return localStorage.getItem(CLE_TEST) === "1";
    } catch (e) {
      return false; /* navigation privée, stockage bloqué : on suit normalement */
    }
  };

  const modeTest = estModeTest();

  const badgeModeTest = () => {
    if (!modeTest || !document.body) return;
    var b = document.createElement("div");
    b.textContent = "mode test · rien n'est envoyé";
    b.style.cssText =
      "position:fixed;left:8px;bottom:8px;z-index:9999;background:#1d1d1d;color:#fff;" +
      "font:600 11px/1 system-ui,-apple-system,sans-serif;letter-spacing:.04em;" +
      "padding:7px 10px;border-radius:4px;opacity:.85;pointer-events:none";
    document.body.appendChild(b);
  };

  /* ---------- Pixel Meta ----------
     L'identifiant se colle dans data.js (MC.pixel).
     Tant qu'il est vide, aucun script Meta n'est chargé et le site
     fonctionne exactement comme avant.                              */

  const initPixel = () => {
    if (modeTest) return; /* vos tests ne partent pas chez Meta */
    const id = String(MC.pixel || "").trim();
    if (!id) return;
    /* extrait officiel Meta */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  };

  /* N'envoie un évènement que si le pixel est réellement chargé. */
  const pixel = (evenement, donnees) => {
    if (typeof window.fbq === "function") window.fbq("track", evenement, donnees || {});
  };

  const refProduit = (p) => p.reference || p.nom || "";

  /* ---------- Prix d'une commande ----------
     UNE seule fonction calcule le total. Le récapitulatif, le formulaire
     Google, le pixel et WhatsApp s'en servent tous, pour qu'aucun des
     quatre ne puisse afficher un prix différent des autres.           */

  const REMISE_SUPP = Number(MC.remiseMontreSupp) || 0;

  const offreLot = (p) => !!p && p.type === "montre" && REMISE_SUPP > 0;

  const prixTotal = (p, qte) => {
    const q = Math.max(1, Number(qte) || 1);
    const plein = p.prix * q;
    return offreLot(p) ? Math.max(0, plein - REMISE_SUPP * (q - 1)) : plein;
  };

  const economie = (p, qte) => p.prix * Math.max(1, Number(qte) || 1) - prixTotal(p, qte);

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
      ? `Bonjour MC Watches, je commande ${p.reference}, couleur ${couleur}, à ${p.prix} DH. Je vous envoie mon nom, mon téléphone, ma ville et mon adresse.`
      : `Bonjour MC Watches, je commande ${p.nom} à ${p.prix} DH. Je vous envoie mon nom, mon téléphone, ma ville et mon adresse.`;

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
      `Total : ${prixTotal(p, qte)} DH`,
      "",
      `Nom : ${f.prenom} ${f.nom}`,
      `Téléphone : ${f.tel}`,
      `Ville : ${f.ville}`,
      `Adresse : ${f.adresse}`,
      "",
      "Merci de confirmer ma commande."
    ].filter((l) => l !== null).join("\n");

  /* ---------- Telephone : pays + numero ----------
     Chaque pays donne son indicatif et la longueur du numero national
     (sans le 0 de debut). "debuts" limite les premiers chiffres quand
     le pays a des regles nettes. "garde0" pour l'Italie, qui conserve
     son 0. Le pays par defaut est le premier de la liste : le Maroc.   */

  const PAYS = [
    { code: "MA", nom: "Maroc",            ind: "212", min: 9,  max: 9,  debuts: ["5", "6", "7"] },
    { code: "FR", nom: "France",           ind: "33",  min: 9,  max: 9 },
    { code: "ES", nom: "Espagne",          ind: "34",  min: 9,  max: 9 },
    { code: "BE", nom: "Belgique",         ind: "32",  min: 8,  max: 9 },
    { code: "NL", nom: "Pays-Bas",         ind: "31",  min: 9,  max: 9 },
    { code: "DE", nom: "Allemagne",        ind: "49",  min: 10, max: 11 },
    { code: "IT", nom: "Italie",           ind: "39",  min: 9,  max: 10, garde0: true },
    { code: "GB", nom: "Royaume-Uni",      ind: "44",  min: 10, max: 10 },
    { code: "CH", nom: "Suisse",           ind: "41",  min: 9,  max: 9 },
    { code: "PT", nom: "Portugal",         ind: "351", min: 9,  max: 9 },
    { code: "CA", nom: "Canada / USA",     ind: "1",   min: 10, max: 10 },
    { code: "AE", nom: "Emirats arabes unis", ind: "971", min: 9, max: 9 },
    { code: "SA", nom: "Arabie saoudite",  ind: "966", min: 9,  max: 9 },
    { code: "QA", nom: "Qatar",            ind: "974", min: 8,  max: 8 },
    { code: "XX", nom: "Autre pays",       ind: "",    min: 6,  max: 15 }
  ];

  const paysDe = (code) => PAYS.find((p) => p.code === code) || PAYS[0];

  /* Transforme ce que le client a tape en numero international.
     Renvoie null si le numero ne colle pas au pays choisi.            */
  const numeroInternational = (codePays, saisi) => {
    const p = paysDe(codePays);
    let n = String(saisi || "").replace(/[^\d+]/g, "");
    n = n.replace(/^\+/, "").replace(/^00/, "");
    if (p.ind && n.startsWith(p.ind) && n.length > p.ind.length) n = n.slice(p.ind.length);
    if (!p.garde0) n = n.replace(/^0+/, "");
    if (n.length < p.min || n.length > p.max) return null;
    if (p.debuts && !p.debuts.some((d) => n.startsWith(d))) return null;
    return p.ind ? "+" + p.ind + n : "+" + n;
  };

  const telValide = (codePays, saisi) => numeroInternational(codePays, saisi) !== null;


  const CHAMPS = [
    { id: "prenom", label: "Prénom", auto: "given-name", erreur: "Indiquez votre prénom." },
    { id: "nom", label: "Nom", auto: "family-name", erreur: "Indiquez votre nom." },
    { id: "tel", label: "Téléphone", auto: "tel", type: "tel", pays: true,
      aide: "Choisissez votre pays, puis tapez votre numéro sans l'indicatif.",
      erreur: "Ce numéro ne correspond pas au pays choisi. Vérifiez le nombre de chiffres." },
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
        ${c.pays
          ? `<div style="display:flex;gap:8px;align-items:stretch">
               <select id="of-pays" name="pays" aria-label="Pays" style="flex:0 1 42%;min-width:0">
                 ${PAYS.map((p) => `<option value="${p.code}">${p.ind ? `+${p.ind} ` : ""}${esc(p.nom)}</option>`).join("")}
               </select>
               <input id="of-${c.id}" name="${c.id}" type="tel" autocomplete="${c.auto}" inputmode="tel" required style="flex:1 1 auto;min-width:0" aria-describedby="of-${c.id}-aide of-${c.id}-err">
             </div>`
          : c.zone
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
          <p class="order-fine">Prix final. Votre commande nous est envoyée directement. Nous vous appelons seulement pour confirmer l'adresse, puis vous payez au livreur.</p>
          <p class="order-alt" hidden><a data-alt-wa target="_blank" rel="noopener">Commander sur WhatsApp à la place</a></p>
        </form>

        <div class="order-done" hidden>
          <div class="order-head">
            <h2 id="order-done-title">Commande envoyée</h2>
            <button type="button" class="order-close" aria-label="Fermer">${ICON_CLOSE}</button>
          </div>
          <p>Merci, votre commande est enregistrée. Nous vous appelons très vite pour confirmer l'adresse, puis vous payez au livreur à la réception.</p>
          <button type="button" class="btn btn-solid order-close-2">Fermer</button>
          <p class="order-fine order-fine-tight">Pas de nouvelles de notre part ?</p>
          <a class="btn btn-ghost" data-open-wa target="_blank" rel="noopener">Nous écrire sur WhatsApp</a>
        </div>
      </dialog>`);

    document.body.appendChild(el);
    const form = el.querySelector("form");
    const done = el.querySelector(".order-done");
    const resume = el.querySelector(".order-summary");
    const etat = { p: null, couleur: "", panier: false };

    const dessiner = () => {
      /* mode panier : on récapitule les lignes, la quantité se règle
         dans le panier lui-même, pas ici. */
      if (etat.panier) {
        const k = Panier.calcul();
        resume.innerHTML =
          '<ul class="order-panier">' +
          Panier.lignes.map(function (l) {
            return '<li><span>' + esc(l.nom) + (l.couleur ? " · " + esc(l.couleur) : "") +
              ' <b>&times;' + l.qte + '</b></span><span>' + prix(l.prix * l.qte) + "</span></li>";
          }).join("") +
          "</ul>" +
          (k.remise > 0
            ? '<p class="order-eco">Offre lot : <s>' + prix(k.sousTotal) + "</s> " + prix(k.total) +
              ", vous économisez " + prix(k.remise) + ".</p>"
            : "") +
          '<div class="order-line order-line-tot"><span>Total</span><strong>' + prix(k.total) + "</strong></div>" +
          '<p class="order-note">Livraison gratuite. Paiement à la livraison.</p>';
        return;
      }

      const { p, couleur } = etat;
      resume.innerHTML = `
        <p class="order-product"><strong>${esc(p.nom)}</strong>${couleur ? `<span>${esc(couleur)}</span>` : ""}</p>
        <div class="order-line">
          <label for="of-qte">Quantité</label>
          <select id="of-qte" name="qte">${[1, 2, 3, 4, 5].map((n) => `<option value="${n}">${n}</option>`).join("")}</select>
          <span class="order-total"><span class="order-unit">${prix(p.prix)} l'unité</span><strong data-total>${prix(p.prix)}</strong></span>
        </div>
        ${offreLot(p) ? `<p data-offre hidden style="margin:6px 0 0;font-weight:600"></p>` : ""}
        <p class="order-note">Livraison gratuite. Paiement à la livraison.</p>`;

      const majTotal = (qte) => {
        resume.querySelector("[data-total]").textContent = prix(prixTotal(p, qte));
        const ligne = resume.querySelector("[data-offre]");
        if (!ligne) return;
        const eco = economie(p, qte);
        ligne.hidden = eco <= 0;
        if (eco > 0) {
          ligne.innerHTML = `Offre lot : <s>${prix(p.prix * qte)}</s> ${prix(prixTotal(p, qte))}, vous économisez ${prix(eco)}.`;
        }
      };

      resume.querySelector("#of-qte").addEventListener("change", (e) => majTotal(Number(e.target.value)));
      majTotal(1);
    };

    /* Lit ce que le client a déjà saisi dans le formulaire du site. */
    const saisie = () => {
      const v = (id) => (form.elements[id] ? form.elements[id].value.trim() : "");
      const pays = form.elements.pays ? form.elements.pays.value : "MA";
      return {
        prenom: v("prenom"), nom: v("nom"),
        tel: numeroInternational(pays, v("tel")) || v("tel"),
        ville: v("ville"), adresse: v("adresse"),
        qte: Number(v("qte")) || 1
      };
    };

    /* Message WhatsApp : détaillé si tout est rempli, simple sinon. */
    const lienWa = () => {
      const c = saisie();
      const { p, couleur } = etat;
      if (etat.panier) {
        const k = Panier.calcul();
        const lignes = Panier.lignes.map(function (l) {
          return "• " + l.ref + (l.couleur ? " " + l.couleur : "") + " x" + l.qte;
        }).join("\n");
        return lienWhatsApp(
          "Bonjour MC Watches, je commande :\n" + lignes +
          "\nTotal : " + k.total + " DH" +
          (c.prenom ? "\n\nNom : " + c.prenom + " " + c.nom + "\nTéléphone : " + c.tel +
                      "\nVille : " + c.ville + "\nAdresse : " + c.adresse : ""));
      }
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
      /* En mode test (?notrack=1) la commande n'est envoyée nulle part :
         ni au formulaire Google, ni au pixel. Vous pouvez essayer tout le
         parcours sans salir votre feuille de commandes.                 */
      if (modeTest) return Promise.resolve();

      const f = MC.formulaire;
      const { p, couleur } = etat;

      /* Un panier tient dans les mêmes champs : la référence porte le
         détail lisible, le prix porte le total, la quantité le nombre
         d'articles. Rien à changer dans le formulaire Google.        */
      let ref, coul, montant, nb;
      if (etat.panier) {
        const k = Panier.calcul();
        ref = Panier.resume(); coul = Panier.couleurs();
        montant = k.total; nb = Panier.nbArticles();
      } else {
        ref = p.reference; coul = couleur || p.couleur || "";
        montant = prixTotal(p, c.qte); nb = c.qte;
      }

      const corps = new URLSearchParams();
      [
        [f.reference, ref],
        [f.couleur, coul],
        [f.prix, montant],
        [f.prenom, c.prenom],
        [f.nom, c.nom],
        [f.telephone, c.tel],
        [f.ville, c.ville],
        [f.adresse, c.adresse],
        [f.quantite, nb]
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
        const ok = c.id === "tel"
          ? telValide(form.elements.pays ? form.elements.pays.value : "MA", v)
          : v.length > 1;
        champ.setAttribute("aria-invalid", String(!ok));
        form.querySelector(`#of-${c.id}-err`).textContent = ok ? "" : c.erreur;
        if (!ok && !premier) premier = champ;
      });
      if (premier) { premier.focus(); return; }

      const c = saisie();
      done.querySelector("[data-open-wa]").href = etat.panier
        ? lienWa()
        : lienWhatsApp(messageDetaille(etat.p, etat.couleur, c.qte, valeurs));
      erreurEnvoi.textContent = "";
      boutonEnvoi.disabled = true;
      boutonEnvoi.textContent = "Envoi en cours…";

      envoyerCommande(c)
        .then(() => {
          if (etat.panier) {
            const k = Panier.calcul();
            pixel("Purchase", {
              value: k.total,
              currency: "MAD",
              content_type: "product",
              content_ids: Panier.lignes.map(function (l) { return l.ref; }),
              contents: Panier.lignes.map(function (l) { return { id: l.ref, quantity: l.qte }; }),
              num_items: Panier.nbArticles()
            });
            Panier.vider();
          } else {
            pixel("Purchase", {
              value: prixTotal(etat.p, c.qte),
              currency: "MAD",
              content_type: "product",
              content_ids: [refProduit(etat.p)],
              contents: [{ id: refProduit(etat.p), quantity: c.qte }]
            });
          }
          form.hidden = true;
          done.hidden = false;
          if (modeTest && !done.querySelector("[data-test-note]")) {
            var note = document.createElement("p");
            note.setAttribute("data-test-note", "");
            note.textContent = "Mode test : rien n'a été envoyé. Aucune ligne dans vos commandes, aucun évènement chez Meta.";
            note.style.cssText = "background:#1d1d1d;color:#fff;padding:9px 12px;border-radius:4px;font-size:13px";
            done.insertBefore(note, done.children[1] || null);
          }
          el.setAttribute("aria-labelledby", "order-done-title");
          done.querySelector(".btn").focus();
        })
        .catch(() => {
          erreurEnvoi.textContent =
            "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez, ou commandez sur WhatsApp ci-dessous.";
          lienAlt.href = lienWa();
          /* WhatsApp n'apparaît qu'ici : quand l'envoi a échoué. */
          const alt = lienAlt.closest(".order-alt");
          if (alt) alt.hidden = false;
        })
        .finally(() => {
          boutonEnvoi.disabled = false;
          boutonEnvoi.textContent = "Commander";
        });
    });

    const preparer = () => {
      dessiner();
      form.hidden = false;
      done.hidden = true;
      const note = done.querySelector("[data-test-note]");
      if (note) note.remove();
      el.setAttribute("aria-labelledby", "order-title");
      form.querySelectorAll(".field-error").forEach((x) => (x.textContent = ""));
      form.querySelectorAll("[aria-invalid]").forEach((x) => x.removeAttribute("aria-invalid"));
      erreurEnvoi.textContent = "";
      lienAlt.href = lienWa();
      const altReset = lienAlt.closest(".order-alt");
      if (altReset) altReset.hidden = true;
      el.showModal();
      form.elements.prenom.focus();
    };

    return {
      ouvrir(p, couleur) {
        etat.panier = false;
        etat.p = p;
        etat.couleur = couleur || "";
        preparer();
        pixel("InitiateCheckout", {
          value: p.prix,
          currency: "MAD",
          content_type: "product",
          content_ids: [refProduit(p)]
        });
      },
      ouvrirPanier() {
        etat.panier = true;
        etat.p = null;
        etat.couleur = "";
        preparer();
        const k = Panier.calcul();
        pixel("InitiateCheckout", {
          value: k.total,
          currency: "MAD",
          content_type: "product",
          content_ids: Panier.lignes.map(function (l) { return l.ref; }),
          num_items: Panier.nbArticles()
        });
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
    // Tant que le client n'a pas clique une couleur, on montre les deux coloris d'abord.
    let couleurChoisie = false;

    const photos = () =>
      avecCouleurs ? (couleurChoisie
            ? [...p.couleurs[ci].photos, ...(p.photosCommunes || [])]
            : [...(p.photosCommunes || []), ...p.couleurs[ci].photos]) : p.photos;
    const alt = () => (avecCouleurs ? `${p.nom}, ${p.couleurs[ci].nom}` : p.nom);

    const pastilles = avecCouleurs
      ? `<div class="swatch-group">
           <p class="swatch-label">Couleur : <strong data-couleur></strong></p>
           <div class="swatches" role="group" aria-label="Choisir une couleur"></div>
         </div>`
      : "";

    /* Le panier passe en premier et en bouton plein : c'est l'action
       qu'on veut voir choisie. Commander reste possible d'un seul clic. */
    const actions = avecCouleurs
      ? `<button type="button" class="btn btn-solid" data-panier>Ajouter au panier</button>
         <button type="button" class="btn btn-ghost" data-order>Commander</button>
         <a class="btn btn-ghost" data-details>Voir les détails</a>`
      : `<button type="button" class="btn btn-solid" data-panier>Ajouter au panier</button>
         <button type="button" class="btn btn-ghost" data-order>Commander</button>
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

    carte.querySelector("[data-panier]").addEventListener("click", function () {
      const c = avecCouleurs ? p.couleurs[ci].nom : p.couleur || "";
      Panier.ajouter(p, c, 1);
      pixel("AddToCart", {
        value: p.prix, currency: "MAD",
        content_type: "product", content_ids: [refProduit(p)]
      });
      document.dispatchEvent(new CustomEvent("panier:ouvrir"));
    });

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
          couleurChoisie = true;
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

    const couleurDemandee = p.couleurs.findIndex((c) => c.nom === params.get("couleur"));
    let ci = Math.max(0, couleurDemandee);
    // Une couleur dans l'adresse = le client a deja choisi. Sinon, les deux d'abord.
    let couleurChoisie = couleurDemandee >= 0;
    const photos = () => (couleurChoisie
            ? [...p.couleurs[ci].photos, ...(p.photosCommunes || [])]
            : [...(p.photosCommunes || []), ...p.couleurs[ci].photos]);

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
          ${offreLot(p) ? `<p class="card-delivery" style="font-weight:600">2 montres : ${prix(prixTotal(p, 2))} au lieu de ${prix(p.prix * 2)}. Chaque montre en plus coûte ${REMISE_SUPP} DH de moins.</p>` : ""}

          <div class="swatch-group">
            <p class="swatch-label">Couleur : <strong data-couleur></strong></p>
            <div class="chips" role="group" aria-label="Choisir une couleur"></div>
          </div>

          <div class="detail-actions">
            <button type="button" class="btn btn-solid" data-panier>Ajouter au panier</button>
            <button type="button" class="btn btn-ghost" data-order>Commander</button>
            <a class="btn btn-ghost btn-wa" data-wa target="_blank" rel="noopener">Poser une question sur WhatsApp</a>
          </div>

          <div class="service">
            <p class="service-title">Livraison et retours</p>
            <dl class="service-list">
              <div><dt>Casablanca, Rabat et environs</dt><dd>24 à 48 h</dd></div>
              <div><dt>Autres villes du Maroc</dt><dd>3 jours</dd></div>
              <div><dt>Paiement</dt><dd>À la livraison</dd></div>
              <div><dt>Échange ou retour</dt><dd>Sans motif, sous 7 jours</dd></div>
            </dl>
            <p class="service-note">Prix final. Vous payez à la livraison, rien à l'avance. <a href="livraison.html">Voir toutes les conditions</a></p>
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
      b.addEventListener("click", () => { ci = i; couleurChoisie = true; majCouleur(); });
      zone.appendChild(b);
    });

    racine.querySelector("[data-order]").addEventListener("click", () => ouvrirCommande(p, p.couleurs[ci].nom));

    const btnPan = racine.querySelector("[data-panier]");
    if (btnPan) btnPan.addEventListener("click", function () {
      Panier.ajouter(p, p.couleurs[ci].nom, 1);
      pixel("AddToCart", {
        value: p.prix, currency: "MAD",
        content_type: "product", content_ids: [refProduit(p)]
      });
      document.dispatchEvent(new CustomEvent("panier:ouvrir"));
    });

    pixel("ViewContent", {
      value: p.prix,
      currency: "MAD",
      content_type: "product",
      content_ids: [refProduit(p)],
      content_name: p.nom || refProduit(p)
    });

    majCouleur();
  }

  /* ---------- Textes qui suivent data.js ----------
     Nombre de collections et prix des boîtes :
     ils se mettent à jour tout seuls quand vous modifiez data.js. */

  /* ---------- Panier ----------
     Plusieurs montres, plusieurs couleurs, une seule commande.
     L'offre porte sur TOUT le panier : chaque montre après la première
     coûte REMISE_SUPP de moins, même si ce sont des modèles différents.
     Les boîtes de rangement n'entrent pas dans le calcul.             */

  var PANIER_CLE = "mc-panier-v1";

  var Panier = {
    lignes: [],

    charger: function () {
      try {
        var brut = JSON.parse(localStorage.getItem(PANIER_CLE) || "[]");
        this.lignes = Array.isArray(brut) ? brut.filter(function (l) {
          return l && l.ref && Number(l.qte) > 0;
        }) : [];
      } catch (e) { this.lignes = []; }
      return this.lignes;
    },

    enregistrer: function () {
      try { localStorage.setItem(PANIER_CLE, JSON.stringify(this.lignes)); } catch (e) {}
      document.dispatchEvent(new CustomEvent("panier:maj"));
    },

    ajouter: function (p, couleur, qte) {
      var n = Math.max(1, Number(qte) || 1);
      var ref = refProduit(p), coul = couleur || "";
      var trouve = null;
      for (var i=0;i<this.lignes.length;i++){
        if (this.lignes[i].ref === ref && this.lignes[i].couleur === coul) { trouve = this.lignes[i]; break; }
      }
      if (trouve) trouve.qte = Math.min(20, trouve.qte + n);
      else this.lignes.push({
        ref: ref, nom: p.nom || ref, couleur: coul,
        prix: p.prix, type: p.type || "montre", qte: n
      });
      this.enregistrer();
    },

    definirQte: function (i, qte) {
      var n = Number(qte);
      if (!this.lignes[i]) return;
      if (n <= 0) this.lignes.splice(i, 1);
      else this.lignes[i].qte = Math.min(20, n);
      this.enregistrer();
    },

    definirCouleur: function (i, couleur) {
      if (!this.lignes[i]) return;
      /* si la même montre existe déjà dans cette couleur, on fusionne */
      var l = this.lignes[i], autre = -1;
      for (var k=0;k<this.lignes.length;k++){
        if (k !== i && this.lignes[k].ref === l.ref && this.lignes[k].couleur === couleur) { autre = k; break; }
      }
      if (autre > -1){
        this.lignes[autre].qte = Math.min(20, this.lignes[autre].qte + l.qte);
        this.lignes.splice(i,1);
      } else l.couleur = couleur;
      this.enregistrer();
    },

    retirer: function (i) { this.lignes.splice(i, 1); this.enregistrer(); },
    vider: function () { this.lignes = []; this.enregistrer(); },

    nbArticles: function () {
      return this.lignes.reduce(function (s, l) { return s + l.qte; }, 0);
    },

    calcul: function () {
      var sousTotal = this.lignes.reduce(function (s, l) { return s + l.prix * l.qte; }, 0);
      var nbMontres = this.lignes.reduce(function (s, l) { return s + (l.type === "montre" ? l.qte : 0); }, 0);
      var remise = REMISE_SUPP > 0 ? REMISE_SUPP * Math.max(0, nbMontres - 1) : 0;
      return { sousTotal: sousTotal, nbMontres: nbMontres, remise: remise,
               total: Math.max(0, sousTotal - remise) };
    },

    /* une ligne lisible pour la feuille de commandes */
    resume: function () {
      return this.lignes.map(function (l) {
        return l.ref + (l.couleur ? " " + l.couleur : "") + " x" + l.qte;
      }).join(" | ");
    },

    couleurs: function () {
      return this.lignes.map(function (l) { return l.couleur; })
        .filter(Boolean).join(", ");
    }
  };

  function produitDe(ref) {
    var liste = MC.produits || [];
    for (var i=0;i<liste.length;i++) if (refProduit(liste[i]) === ref) return liste[i];
    return null;
  }
  function couleursDe(ref) {
    var p = produitDe(ref);
    return (p && p.couleurs) ? p.couleurs.map(function (c) { return c.nom; }) : [];
  }
  function photoDe(ref, couleur) {
    var p = produitDe(ref);
    if (!p) return "";
    if (p.couleurs) {
      for (var i=0;i<p.couleurs.length;i++){
        if (p.couleurs[i].nom === couleur && p.couleurs[i].photos && p.couleurs[i].photos.length)
          return p.couleurs[i].photos[0];
      }
      if (p.couleurs[0] && p.couleurs[0].photos) return p.couleurs[0].photos[0];
    }
    return (p.photos && p.photos[0]) || "";
  }

  function initPanier() {
    Panier.charger();

    var el = html(
      '<div class="pan" hidden>' +
        '<div class="pan-voile" data-fermer></div>' +
        '<aside class="pan-boite" role="dialog" aria-modal="true" aria-labelledby="pan-titre">' +
          '<div class="pan-tete">' +
            '<h2 id="pan-titre">Votre panier</h2>' +
            '<button type="button" class="order-close" data-fermer aria-label="Fermer">' + ICON_CLOSE + '</button>' +
          '</div>' +
          '<div class="pan-corps"></div>' +
          '<div class="pan-pied">' +
            '<div class="pan-l"><span>Sous-total</span><strong data-sous>0 DH</strong></div>' +
            '<div class="pan-l pan-eco" data-eco-l hidden><span>Offre lot</span><strong data-eco>0 DH</strong></div>' +
            '<div class="pan-l pan-tot"><span>Total</span><strong data-tot>0 DH</strong></div>' +
            '<p class="pan-note">Livraison gratuite partout au Maroc. Vous payez à la réception.</p>' +
            '<button type="button" class="btn btn-solid pan-go">Commander</button>' +
          '</div>' +
        '</aside>' +
      '</div>');
    document.body.appendChild(el);

    var corps = el.querySelector(".pan-corps");
    var pied  = el.querySelector(".pan-pied");

    function ouvrir() {
      el.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { el.classList.add("is-open"); });
      var b = el.querySelector(".order-close"); if (b) b.focus();
    }
    function fermer() {
      el.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { el.hidden = true; }, 240);
    }
    el.querySelectorAll("[data-fermer]").forEach(function (b) { b.addEventListener("click", fermer); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !el.hidden) fermer();
    });

    function dessiner() {
      var lignes = Panier.lignes;

      if (!lignes.length) {
        corps.innerHTML = '<p class="pan-vide">Votre panier est vide.<br>Ajoutez une montre pour commencer.</p>';
        pied.hidden = true;
        return;
      }
      pied.hidden = false;

      corps.innerHTML = lignes.map(function (l, i) {
        var cols = couleursDe(l.ref);
        var ph = photoDe(l.ref, l.couleur);
        return '<div class="pan-art">' +
          (ph ? '<img class="pan-img" src="' + esc(ph) + '" alt="" loading="lazy">' : '<span class="pan-img"></span>') +
          '<div class="pan-info">' +
            '<p class="pan-nom">' + esc(l.nom) + '</p>' +
            '<p class="pan-prix">' + prix(l.prix) + " l'unité" + '</p>' +
            (cols.length
              ? '<label class="pan-coul"><span>Couleur</span>' +
                '<select data-coul="' + i + '">' +
                  cols.map(function (c) {
                    return '<option value="' + esc(c) + '"' + (c === l.couleur ? " selected" : "") + ">" + esc(c) + "</option>";
                  }).join("") +
                '</select></label>'
              : "") +
            '<div class="pan-qte">' +
              '<button type="button" data-moins="' + i + '" aria-label="Retirer un">&minus;</button>' +
              '<span>' + l.qte + '</span>' +
              '<button type="button" data-plus="' + i + '" aria-label="Ajouter un">+</button>' +
              '<button type="button" class="pan-sup" data-sup="' + i + '">Retirer</button>' +
            '</div>' +
          '</div>' +
          '<strong class="pan-sous">' + prix(l.prix * l.qte) + '</strong>' +
        '</div>';
      }).join("");

      var c = Panier.calcul();
      el.querySelector("[data-sous]").textContent = prix(c.sousTotal);
      el.querySelector("[data-tot]").textContent  = prix(c.total);
      var ecoL = el.querySelector("[data-eco-l]");
      ecoL.hidden = c.remise <= 0;
      if (c.remise > 0) {
        el.querySelector("[data-eco]").textContent = "− " + prix(c.remise);
        ecoL.querySelector("span").textContent =
          "Offre lot (" + c.nbMontres + " montres, " + REMISE_SUPP + " DH par montre en plus)";
      }
    }

    corps.addEventListener("click", function (e) {
      var t = e.target.closest("[data-moins],[data-plus],[data-sup]");
      if (!t) return;
      if (t.hasAttribute("data-moins")) Panier.definirQte(+t.getAttribute("data-moins"), Panier.lignes[+t.getAttribute("data-moins")].qte - 1);
      else if (t.hasAttribute("data-plus")) Panier.definirQte(+t.getAttribute("data-plus"), Panier.lignes[+t.getAttribute("data-plus")].qte + 1);
      else Panier.retirer(+t.getAttribute("data-sup"));
    });
    corps.addEventListener("change", function (e) {
      var s = e.target.closest("[data-coul]");
      if (s) Panier.definirCouleur(+s.getAttribute("data-coul"), s.value);
    });

    el.querySelector(".pan-go").addEventListener("click", function () {
      if (!Panier.lignes.length) return;
      fermer();
      if (!dlg) dlg = creerDialogue();
      if (dlg.supporte) dlg.ouvrirPanier();
    });

    /* bouton dans l'en-tête */
    var nav = document.querySelector(".site-header .nav");
    var btn = html('<button type="button" class="nav-panier" aria-label="Ouvrir le panier">' +
      '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">' +
      '<path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M9 7a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg><span>Panier</span><b data-compte hidden>0</b></button>');
    btn.addEventListener("click", function () { dessiner(); ouvrir(); });
    if (nav) nav.insertBefore(btn, nav.querySelector(".nav-cta") || null);
    else document.querySelector(".site-header .wrap").appendChild(btn);

    function majBadge() {
      var n = Panier.nbArticles();
      var b = btn.querySelector("[data-compte]");
      b.textContent = String(n);
      b.hidden = n === 0;
      btn.classList.toggle("a-des-articles", n > 0);
    }

    document.addEventListener("panier:maj", function () { majBadge(); dessiner(); });
    majBadge(); dessiner();

    /* ouvert depuis ailleurs (bouton « Ajouter au panier ») */
    document.addEventListener("panier:ouvrir", function () { dessiner(); ouvrir(); });
  }

  /* Le cadran du hero donne l'heure réelle : les aiguilles bougent,
     la trotteuse balaie, et la couronne de graduations tourne
     lentement (animation CSS). */
  function initMontre() {
    var hote = document.querySelector(".site-header .wrap");
    if (!hote) return;

    var ticks = "";
    for (var k = 0; k < 12; k++) {
      var ang = (k / 12) * Math.PI * 2;
      var maj = k % 3 === 0;
      var r1 = 42, r2 = maj ? 32 : 36;
      ticks += '<line class="hm-t' + (maj ? " hm-t-maj" : "") + '"' +
        ' x1="' + (50 + Math.sin(ang) * r1).toFixed(2) + '" y1="' + (50 - Math.cos(ang) * r1).toFixed(2) + '"' +
        ' x2="' + (50 + Math.sin(ang) * r2).toFixed(2) + '" y2="' + (50 - Math.cos(ang) * r2).toFixed(2) + '"/>';
    }

    var el = html(
      '<div class="hdr-montre" title="Heure actuelle">' +
        '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
          '<circle class="hm-ring" cx="50" cy="50" r="46"/>' + ticks +
          '<line class="hm-h" x1="50" y1="57" x2="50" y2="29"/>' +
          '<line class="hm-m" x1="50" y1="59" x2="50" y2="19"/>' +
          '<line class="hm-s" x1="50" y1="62" x2="50" y2="15"/>' +
          '<circle class="hm-pin" cx="50" cy="50" r="2.8"/>' +
        '</svg>' +
        '<span class="hm-sr" data-heure>heure actuelle</span>' +
      '</div>');

    var marque = hote.querySelector(".brand");
    if (marque) hote.insertBefore(el, marque.nextSibling);
    else hote.insertBefore(el, hote.firstChild);

    var svg = el.querySelector("svg");
    var hr = svg.querySelector(".hm-h"),
        mn = svg.querySelector(".hm-m"),
        sc = svg.querySelector(".hm-s"),
        txt = el.querySelector("[data-heure]");
    if (!hr || !mn || !sc) return;

    var doux = true;
    try { doux = !window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

    var derniereMin = -1;
    function poser() {
      var d = new Date();
      var s = d.getSeconds() + (doux ? d.getMilliseconds() / 1000 : 0);
      var m = d.getMinutes() + s / 60;
      var h = (d.getHours() % 12) + m / 60;
      hr.style.transform = "rotate(" + (h / 12) * 360 + "deg)";
      mn.style.transform = "rotate(" + (m / 60) * 360 + "deg)";
      sc.style.transform = "rotate(" + (s / 60) * 360 + "deg)";
      if (txt && d.getMinutes() !== derniereMin) {
        derniereMin = d.getMinutes();
        txt.textContent = "Il est " + d.getHours() + " h " +
          String(derniereMin).padStart(2, "0");
      }
    }

    poser();
    if (doux) {
      var boucle = function () { poser(); requestAnimationFrame(boucle); };
      requestAnimationFrame(boucle);
    } else {
      setInterval(poser, 1000);
    }
  }

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

  initPixel();
  badgeModeTest();
  initPanier();
  initMontre();
  initAuto();
  initFloat();
  initBandeau();
  initMenu();
  initCatalogue();
  initFiche();
})();
