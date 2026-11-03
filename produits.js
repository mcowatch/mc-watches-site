<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>Produit | MC Watches</title>

  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./produit.css">

  <script src="./produits.js?v=32" defer></script>
  <script src="./produit.js?v=32" defer></script>
</head>

<body>

  <!-- Barre de livraison -->

  <div
    class="shipping-bar"
    aria-label="Livraison gratuite partout au Maroc"
  >
    <div class="shipping-track">
      <span>Livraison gratuite partout au Maroc</span>
      <span>Paiement à la livraison</span>
      <span>Livraison gratuite partout au Maroc</span>
      <span>Paiement à la livraison</span>
    </div>
  </div>

  <!-- Header -->

  <header class="site-header">

    <a
      class="brand"
      href="./index.html"
      aria-label="Accueil MC Watches"
    >
      <img
        src="./LOGOMC.png"
        alt="Logo MC Watches"
        class="header-logo"
      >
    </a>

    <div class="dropdown-menu">

      <button
        type="button"
        class="menu-toggle"
        aria-expanded="false"
        aria-controls="main-navigation"
      >
        <span>Menu</span>

        <span
          class="menu-arrow"
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>

      <nav
        class="main-navigation"
        id="main-navigation"
        aria-label="Navigation principale"
      >
        <a href="./index.html">Accueil</a>
        <a href="./produits.html">Produits</a>
        <a href="./about.html">À propos</a>
        <a href="./contact.html">Contact</a>
      </nav>

    </div>

  </header>

  <!-- Contenu dynamique du produit -->

  <main
    id="fiche-produit"
    class="product-page"
    aria-live="polite"
  ></main>

  <!-- Footer -->

  <footer class="product-footer">

    <span>MC Watches</span>

    <a
      href="https://www.instagram.com/mcowatches/"
      target="_blank"
      rel="noopener"
    >
      Instagram : @mcowatches
    </a>

    <a href="https://www.mc-watches.com">
      mc-watches.com
    </a>

    <a href="tel:+212708275864">
      +212 708 275 864
    </a>

  </footer>

  <!-- Menu déroulant -->

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const menuButton =
        document.querySelector(".menu-toggle");

      const navigation =
        document.querySelector(".main-navigation");

      if (!menuButton || !navigation) {
        return;
      }

      function closeMenu() {
        navigation.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      }

      menuButton.addEventListener(
        "click",
        function (event) {
          event.stopPropagation();

          const isOpen =
            navigation.classList.toggle("open");

          menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
          );
        }
      );

      navigation
        .querySelectorAll("a")
        .forEach(function (link) {
          link.addEventListener(
            "click",
            closeMenu
          );
        });

      document.addEventListener(
        "click",
        function (event) {
          const clickInsideMenu =
            navigation.contains(event.target) ||
            menuButton.contains(event.target);

          if (!clickInsideMenu) {
            closeMenu();
          }
        }
      );

      document.addEventListener(
        "keydown",
        function (event) {
          if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
          }
        }
      );
    });
  </script>

</body>

</html>
