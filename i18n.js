/* ==========================================================
   MC WATCHES - DEUX LANGUES : FRANÇAIS ET ARABE

   Le site est écrit en français. Ce fichier contient la version
   arabe : chaque phrase française a sa traduction en face.

   Pour corriger un mot arabe : trouvez la phrase française dans
   la liste AR ci-dessous et modifiez le texte de droite.
   Pour ajouter une phrase : copiez la phrase française EXACTE
   telle qu'elle est écrite sur le site, et mettez l'arabe en face.
   Une phrase sans traduction reste simplement en français.

   Le visiteur choisit sa langue avec le bouton de l'en-tête.
   Son choix est retenu pour ses prochaines visites, et les liens
   ?lang=ar / ?lang=fr ouvrent directement la bonne version.
   ========================================================== */

(function () {
  "use strict";

  var CLE = "mc-langue";

  /* ---------- Les traductions ---------- */

  var AR = {
    /* --- bandeau du haut --- */
    "Livraison gratuite partout au Maroc": "توصيل مجاني إلى جميع أنحاء المغرب",
    "Livraison en 24 à 48 h à Casablanca et Rabat, 3 jours ailleurs":
      "التوصيل في 24 إلى 48 ساعة بالدار البيضاء والرباط، و3 أيام في باقي المدن",
    "Paiement à la livraison": "الدفع عند التسليم",
    "Échange et retour sous 7 jours": "التبديل والإرجاع داخل 7 أيام",

    /* --- en-tête et navigation --- */
    "Aller au contenu": "الانتقال إلى المحتوى",
    "MC Watches, accueil": "MC Watches، الصفحة الرئيسية",
    "Menu": "القائمة",
    "Navigation principale": "التنقل الرئيسي",
    "Produits": "المنتجات",
    "Livraison": "التوصيل",
    "À propos": "من نحن",
    "Contact": "اتصل بنا",
    "Panier": "السلة",
    "Voir le panier": "عرض السلة",
    "Aller au panier": "الذهاب إلى السلة",
    "Écrire sur WhatsApp": "راسلنا على واتساب",

    /* --- page d'accueil : haut de page --- */
    "Des montres pour homme, livrées partout au Maroc.": "ساعات رجالية، تُوصَّل إلى جميع أنحاء المغرب.",
    /* --- descriptions pour Google (balises meta des pages) --- */
    "Montres pour homme à prix abordables. Livraison gratuite partout au Maroc et paiement à la livraison. Boutique basée à Casablanca.":
      "ساعات رجالية بأسعار في المتناول. توصيل مجاني إلى جميع أنحاء المغرب والدفع عند التسليم. متجر مقره الدار البيضاء.",
    "Toutes nos montres pour homme en plusieurs couleurs, et nos boîtes de rangement. Livraison gratuite partout au Maroc, paiement à la livraison.":
      "كل ساعاتنا الرجالية بعدة ألوان، وعلب تخزين الساعات. توصيل مجاني إلى جميع أنحاء المغرب، والدفع عند التسليم.",
    "Livraison gratuite au Maroc : 24 à 48 h à Casablanca et Rabat, 3 jours ailleurs. Paiement à la livraison. Échange et retour sans motif sous 7 jours.":
      "توصيل مجاني في المغرب: من 24 إلى 48 ساعة في الدار البيضاء والرباط، و3 أيام في باقي المدن. الدفع عند التسليم. تبديل أو إرجاع بدون سبب خلال 7 أيام.",
    "collections, plusieurs couleurs. La livraison est gratuite et vous payez à la réception.":
      "مجموعات، بعدة ألوان. التوصيل مجاني وتدفع عند التسلّم.",
    "Deux": "اثنتان",
    "Trois": "ثلاث",
    "Quatre": "أربع",
    "Cinq": "خمس",
    "Six": "ست",
    "Sept": "سبع",
    "Huit": "ثماني",
    "Voir les montres": "عرض الساعات",
    "Montre MC-01 à cadran blanc et bleu, photographiée devant une lampe":
      "ساعة MC-01 بميناء أبيض وأزرق، مصوّرة أمام مصباح",

    /* --- page d'accueil : livraison et retours --- */
    "Livraison et retours": "التوصيل والإرجاع",
    "24 à 48 h": "24 إلى 48 ساعة",
    "Casablanca, Rabat et environs": "الدار البيضاء والرباط ونواحيهما",
    "3 jours": "3 أيام",
    "Autres villes du Maroc": "مدن أخرى بالمغرب",
    "7 jours": "7 أيام",
    "Échange ou retour sans motif": "تبديل أو إرجاع بدون سبب",

    /* --- page d'accueil : les montres --- */
    "Nos montres": "ساعاتنا",
    "Choisissez un modèle, puis une couleur. Prix final, livraison gratuite, vous payez à la réception.":
      "اختر الموديل، ثم اللون. الثمن نهائي، التوصيل مجاني، وتدفع عند التسلّم.",
    "Voir les modèles sur WhatsApp": "عرض الموديلات على واتساب",

    /* --- page d'accueil : les boîtes --- */
    "Boîte de rangement noire pour 6 montres, couvercle transparent ouvert":
      "علبة تخزين سوداء لـ 6 ساعات، بغطاء شفاف مفتوح",
    "Une boîte pour ranger vos montres.": "علبة لترتيب ساعاتك.",
    "Deux formats de boîtes à couvercle transparent, pour 6 ou 12 montres.":
      "حجمان من العلب بغطاء شفاف، لـ 6 أو 12 ساعة.",
    "Boîte 6 montres": "علبة 6 ساعات",
    "Boîte 12 montres": "علبة 12 ساعة",
    "Voir les boîtes": "عرض العلب",

    /* --- page d'accueil : à propos --- */
    "Des produits sélectionnés pour votre style.": "منتجات مختارة تناسب ذوقك.",
    "MC Watches est une boutique basée à Casablanca. Nous proposons une sélection de montres et de boîtes de rangement à des prix accessibles.":
      "MC Watches متجر مقره الدار البيضاء. نقدّم مجموعة مختارة من الساعات وعلب التخزين بأثمنة في المتناول.",
    "Notre objectif : vous offrir plusieurs styles et couleurs, avec une commande simple, la livraison gratuite partout au Maroc et le paiement à la livraison.":
      "هدفنا: أن نقدّم لك عدة أنماط وألوان، مع طلب بسيط، وتوصيل مجاني إلى جميع أنحاء المغرب، والدفع عند التسليم.",
    "Boutique": "المتجر",
    "Basée à Casablanca": "مقره الدار البيضاء",
    "Gratuite partout au Maroc : 24 à 48 h à Casablanca et Rabat, 3 jours ailleurs":
      "مجاني إلى جميع أنحاء المغرب: 24 إلى 48 ساعة بالدار البيضاء والرباط، و3 أيام في باقي المدن",
    "Paiement": "الدفع",
    "À la livraison": "عند التسليم",
    "Retours": "الإرجاع",
    "Échange ou retour sans motif sous 7 jours": "تبديل أو إرجاع بدون سبب داخل 7 أيام",
    "Commande": "الطلب",
    "Sur le site, par formulaire ou sur WhatsApp": "من الموقع، عبر النموذج أو على واتساب",

    /* --- page d'accueil : commander en trois étapes --- */
    "Commander en trois étapes.": "اطلب في ثلاث خطوات.",
    "Choisissez": "اختر",
    "Un modèle et une couleur sur le site, ou demandez les modèles disponibles.":
      "موديلاً ولوناً من الموقع، أو اطلب الموديلات المتوفرة.",
    "Confirmez": "أكّد",
    "Nous validons avec vous le modèle, la couleur, le prix et la disponibilité.":
      "نؤكد معك الموديل واللون والثمن والتوفر.",
    "Recevez": "استلم",
    "Vous payez à la livraison, quand vous recevez votre montre.": "تدفع عند التسليم، لحظة استلام ساعتك.",
    "Livraison, retours et questions fréquentes": "التوصيل والإرجاع والأسئلة الشائعة",

    /* --- page d'accueil : contact --- */
    "Une question sur un modèle ?": "سؤال عن موديل؟",
    "Écrivez-nous. Prix final, livraison gratuite, vous payez à la réception.":
      "راسلنا. الثمن نهائي، التوصيل مجاني، وتدفع عند التسلّم.",
    "Une autre question ?": "سؤال آخر؟",

    /* --- pied de page --- */
    "Logo MC Watches": "شعار MC Watches",
    "Montres et boîtes de rangement, livrées partout au Maroc. Boutique basée à Casablanca.":
      "ساعات وعلب تخزين، تُوصَّل إلى جميع أنحاء المغرب. متجر مقره الدار البيضاء.",
    "Montres": "الساعات",
    "Boîtes de rangement": "علب التخزين",
    "WhatsApp : +212 708 275 864": "واتساب: ⁦+212 708 275 864⁩",
    "Instagram : @mcowatches": "إنستغرام: ⁦@mcowatches⁩",
    "Casablanca, Maroc": "الدار البيضاء، المغرب",
    "© 2026 MC Watches. Tous droits réservés.": "⁦© 2026 MC Watches⁩. جميع الحقوق محفوظة.",

    /* --- page produits --- */
    "Tous nos produits.": "جميع منتجاتنا.",
    "Livraison gratuite : 24 à 48 h à Casablanca et Rabat, 3 jours ailleurs au Maroc. Paiement à la livraison. Choisissez une couleur pour voir ses photos.":
      "توصيل مجاني: 24 إلى 48 ساعة بالدار البيضاء والرباط، و3 أيام في باقي مدن المغرب. الدفع عند التسليم. اختر لوناً لرؤية صوره.",

    /* --- les cartes produit --- */
    "Ajouter au panier": "أضف إلى السلة",
    "Voir les détails": "عرض التفاصيل",
    "Poser une question": "اطرح سؤالاً",
    "Livraison gratuite": "توصيل مجاني",
    "Couleur :": "اللون:",
    "Couleur": "اللون",
    "Choisir une couleur": "اختيار لون",
    "Choisir une photo": "اختيار صورة",
    "Photo précédente": "الصورة السابقة",
    "Photo suivante": "الصورة التالية",
    "carrousel": "عرض الصور",

    /* --- les produits (data.js) --- */
    "Montre pour homme": "ساعة رجالية",
    "Montre automatique pour homme": "ساعة رجالية أوتوماتيكية",
    "Accessoire": "إكسسوار",
    "Boîte de rangement - 6 montres": "علبة تخزين - 6 ساعات",
    "Boîte de rangement - 12 montres": "علبة تخزين - 12 ساعة",

    /* --- les couleurs --- */
    "Toutes les photos sont les nôtres : chaque montre est photographiée ici, telle que vous la recevrez.":
      "كل الصور من تصويرنا: كل ساعة مصوّرة عندنا، كما ستصلك.",

    "Noir": "أسود",
    "Noir et or": "أسود وذهبي",
    "Blanc": "أبيض",
    "Blanc et bleu": "أبيض وأزرق",
    "Vert": "أخضر",
    "Gris": "رمادي",
    "Marron": "بني",
    /* --- les textes des fiches produit (data.js, description) --- */
    "Un cadran rond à trois compteurs, dans un boîtier argenté qui se prolonge jusqu'au bracelet à maillons. Elle se porte aussi bien avec une chemise qu'avec un t-shirt. En noir, en blanc, ou en blanc avec des compteurs bleus.":
      "ميناء دائري بثلاثة عدادات، في علبة فضية اللون تمتد حتى سوار الحلقات. تُلبس مع قميص كما مع تيشيرت. متوفرة بالأسود، بالأبيض، أو بالأبيض مع عدادات زرقاء.",
    "Un cadran strié, une fenêtre jour et date, et un bracelet argenté à maillons fins qui lui donne un air rétro, sans en faire trop. En vert, en blanc ou en noir.":
      "ميناء مخطط، ونافذة لليوم والتاريخ، وسوار فضي اللون بحلقات رفيعة يمنحها طابعاً كلاسيكياً دون مبالغة. متوفرة بالأخضر، بالأبيض أو بالأسود.",
    "Un boîtier carré aux vis apparentes et des chiffres romains, sur un bracelet effet croco. Une montre habillée qui reste simple à porter tous les jours. En gris, en bleu avec cadran blanc, en bleu ou en marron.":
      "علبة مربعة ببراغٍ ظاهرة وأرقام رومانية، على سوار بنقشة التمساح. ساعة أنيقة تبقى سهلة الارتداء كل يوم. متوفرة بالرمادي، بالأزرق مع ميناء أبيض، بالأزرق أو بالبني.",
    "Un cadran ajouré qui laisse voir le mécanisme, entouré de chiffres romains, sur un bracelet argenté à maillons. Une montre automatique qui attire le regard. En noir ou en blanc.":
      "ميناء مفرّغ يُظهر الآلية، تحيط به أرقام رومانية، على سوار فضي اللون بحلقات. ساعة أوتوماتيكية تلفت الأنظار. متوفرة بالأسود أو بالأبيض.",
    "Une ouverture dans le cadran laisse voir le mécanisme, dans un boîtier rond sur un bracelet argenté à maillons. Une montre automatique au dessin moderne. En noir ou en blanc.":
      "فتحة في الميناء تُظهر الآلية، في علبة دائرية على سوار فضي اللون بحلقات. ساعة أوتوماتيكية بتصميم عصري. متوفرة بالأسود أو بالأبيض.",
    "Un boîtier carré aux vis apparentes, des chiffres romains et un bracelet noir texturé. La version noir et or porte une lunette dorée, la version noire reste toute en sobriété. Les deux se portent du matin au soir.":
      "علبة مربعة ببراغٍ ظاهرة، وأرقام رومانية، وسوار أسود بملمس مخطط. نسخة الأسود والذهبي بإطار ذهبي، والنسخة السوداء بسيطة ورصينة. كلتاهما تُلبس من الصباح إلى المساء.",
    "Un boîtier carré aux angles adoucis, un cadran gris avec des chiffres romains et des aiguilles bleues, sur un bracelet noir. Une montre discrète, qui se remarque quand vous levez le bras.":
      "علبة مربعة بزوايا ناعمة، وميناء رمادي بأرقام رومانية وعقارب زرقاء، على سوار أسود. ساعة هادئة تُلاحظ حين ترفع ذراعك.",
    "Un boîtier rond, un cadran clair à chiffres romains et aiguilles bleues, et une couronne protégée par un arceau sur le côté. Sur un bracelet effet croco, en gris, en marron ou en noir.":
      "علبة دائرية، وميناء فاتح بأرقام رومانية وعقارب زرقاء، وتاج محمي بقوس على الجانب. على سوار بنقشة التمساح، بالرمادي أو البني أو الأسود.",
    "Bleu": "أزرق",
    "Bleu avec cadran blanc": "أزرق بميناء أبيض",

    /* --- fiche produit --- */
    "Ce modèle n'existe pas": "هذا الموديل غير موجود",
    "Le lien est peut-être ancien. Choisissez un modèle dans la liste des produits.":
      "ربما الرابط قديم. اختر موديلاً من قائمة المنتجات.",
    "Voir tous les produits": "عرض جميع المنتجات",
    "Fil d'Ariane": "مسار التنقل",
    "Accueil": "الرئيسية",
    "Commander": "اطلب الآن",
    "Poser une question sur WhatsApp": "اطرح سؤالاً على واتساب",
    "Échange ou retour": "تبديل أو إرجاع",
    "Sans motif, sous 7 jours": "بدون سبب، داخل 7 أيام",
    "Prix final. Vous payez à la livraison, rien à l'avance.": "الثمن نهائي. تدفع عند التسليم، ولا شيء مقدماً.",
    "Voir toutes les conditions": "عرض جميع الشروط",
    "Autres modèles": "موديلات أخرى",

    /* --- fenêtre de commande et formulaire --- */
    "Passer commande": "إتمام الطلب",
    "Fermer": "إغلاق",
    "Prénom": "الاسم الشخصي",
    "Nom": "الاسم العائلي",
    "Téléphone": "الهاتف",
    "Ville": "المدينة",
    "Adresse de livraison": "عنوان التوصيل",
    "Pays": "البلد",
    "Quantité": "الكمية",
    "Indiquez votre prénom.": "أدخل اسمك الشخصي.",
    "Indiquez votre nom.": "أدخل اسمك العائلي.",
    "Indiquez votre ville.": "أدخل مدينتك.",
    "Indiquez votre adresse de livraison.": "أدخل عنوان التوصيل.",
    "Choisissez votre pays, puis tapez votre numéro sans l'indicatif.":
      "اختر بلدك، ثم اكتب رقمك بدون مقدمة الاتصال.",
    "Ce numéro ne correspond pas au pays choisi. Vérifiez le nombre de chiffres.":
      "هذا الرقم لا يطابق البلد المختار. تحقق من عدد الأرقام.",
    "Quartier, rue, numéro, repère.": "الحي، الشارع، الرقم، علامة قريبة.",
    "Livraison gratuite. Paiement à la livraison.": "توصيل مجاني. الدفع عند التسليم.",
    "Prix final. Votre commande nous est envoyée directement. Nous vous appelons seulement pour confirmer l'adresse, puis vous payez au livreur.":
      "الثمن نهائي. طلبك يصلنا مباشرة. نتصل بك فقط لتأكيد العنوان، ثم تدفع لعامل التوصيل.",
    "Prix final. Nous vous appelons seulement pour confirmer l'adresse, puis vous payez au livreur.":
      "الثمن نهائي. نتصل بك فقط لتأكيد العنوان، ثم تدفع لعامل التوصيل.",
    "Commander sur WhatsApp à la place": "الطلب على واتساب بدل ذلك",
    "Envoi en cours…": "جاري الإرسال…",
    "Commande envoyée": "تم إرسال الطلب",
    "Merci, votre commande est enregistrée. Nous vous appelons très vite pour confirmer l'adresse, puis vous payez au livreur à la réception.":
      "شكراً، طلبك مسجّل. نتصل بك قريباً جداً لتأكيد العنوان، ثم تدفع لعامل التوصيل عند التسلّم.",
    "Pas de nouvelles de notre part ?": "لم تسمع منا شيئاً؟",
    "Nous écrire sur WhatsApp": "راسلنا على واتساب",
    "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez, ou commandez sur WhatsApp ci-dessous.":
      "لم يتم الإرسال. تحقق من اتصالك وأعد المحاولة، أو اطلب على واتساب أسفله.",
    "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.":
      "لم يتم الإرسال. تحقق من اتصالك وأعد المحاولة.",

    /* --- la liste des pays du formulaire --- */
    "+212 Maroc": "⁦+212⁩ المغرب",
    "+33 France": "⁦+33⁩ فرنسا",
    "+34 Espagne": "⁦+34⁩ إسبانيا",
    "+32 Belgique": "⁦+32⁩ بلجيكا",
    "+31 Pays-Bas": "⁦+31⁩ هولندا",
    "+49 Allemagne": "⁦+49⁩ ألمانيا",
    "+39 Italie": "⁦+39⁩ إيطاليا",
    "+44 Royaume-Uni": "⁦+44⁩ المملكة المتحدة",
    "+41 Suisse": "⁦+41⁩ سويسرا",
    "+351 Portugal": "⁦+351⁩ البرتغال",
    "+1 Canada / USA": "⁦+1⁩ كندا / الولايات المتحدة",
    "+971 Emirats arabes unis": "⁦+971⁩ الإمارات العربية المتحدة",
    "+966 Arabie saoudite": "⁦+966⁩ السعودية",
    "+974 Qatar": "⁦+974⁩ قطر",
    "Autre pays": "بلد آخر",

    /* --- page panier --- */
    "Votre panier": "سلتك",
    "Votre panier est vide pour le moment.": "سلتك فارغة حالياً.",
    "Récapitulatif": "الملخص",
    "Sous-total": "المجموع الفرعي",
    "Offre lot": "عرض المجموعة",
    "Offre lot :": "عرض المجموعة:",
    "Gratuite": "مجاني",
    "Total": "المجموع",
    "Chaque montre après la première coûte 49 DH de moins. Prix final : vous payez au livreur à la réception, rien à l'avance. Échange ou retour sans motif sous 7 jours.":
      "كل ساعة بعد الأولى تكلّف 49 درهم أقل. الثمن نهائي: تدفع لعامل التوصيل عند التسلّم، ولا شيء مقدماً. تبديل أو إرجاع بدون سبب داخل 7 أيام.",
    "Continuer mes achats": "متابعة التسوق",
    "Vos coordonnées de livraison": "معلومات التوصيل",
    "Nous vous appelons seulement pour confirmer l'adresse. Vous payez au livreur.":
      "نتصل بك فقط لتأكيد العنوان. تدفع لعامل التوصيل.",
    "Retirer": "إزالة",
    "Retirer un": "إزالة واحدة",
    "Ajouter un": "إضافة واحدة",

    /* --- page livraison --- */
    "Livraison, paiement et retours.": "التوصيل والدفع والإرجاع.",
    "Les délais, les frais et les conditions d'échange, expliqués clairement avant votre commande.":
      "المدد والتكاليف وشروط التبديل، موضّحة بوضوح قبل طلبك.",
    "Délais de livraison": "مدد التوصيل",
    "Livraison rapide à votre adresse.": "توصيل سريع إلى عنوانك.",
    "Partout au Maroc, jusqu'à votre porte.": "إلى جميع أنحاء المغرب، حتى باب منزلك.",
    "Frais de livraison": "تكلفة التوصيل",
    "Vous payez à la livraison, à la réception de votre commande.": "تدفع عند التسليم، لحظة استلام طلبك.",
    "Les délais sont comptés en jours ouvrables à partir de la confirmation de votre commande.":
      "تُحسب المدد بأيام العمل انطلاقاً من تأكيد طلبك.",
    "Échange et retour.": "التبديل والإرجاع.",
    "Vous pouvez échanger ou retourner votre montre sans avoir à donner de motif, dans un délai de 7 jours après réception.":
      "يمكنك تبديل ساعتك أو إرجاعها بدون الحاجة إلى ذكر سبب، داخل 7 أيام من الاستلام.",
    "Échange": "التبديل",
    "de frais de livraison à votre charge.": "من تكاليف التوصيل على حسابك.",
    "Retour": "الإرجاع",
    "retenus sur le remboursement.": "تُخصم من المبلغ المرجَع.",
    "Conditions": "الشروط",
    "La montre est non portée et en parfait état.": "الساعة غير مستعملة وفي حالة ممتازة.",
    "Elle est renvoyée avec son emballage et tous ses accessoires d'origine.":
      "تُرجَع مع علبتها وجميع ملحقاتها الأصلية.",
    "Vous nous contactez avant de la renvoyer, pour valider votre demande.":
      "تتصل بنا قبل إرجاعها، لتأكيد طلبك.",
    "Le remboursement est effectué sous 48 heures après réception et vérification, moins les frais de retour.":
      "يتم إرجاع المبلغ داخل 48 ساعة بعد الاستلام والتحقق، ناقص تكاليف الإرجاع.",
    "Montre défectueuse ou erreur de notre part ?": "ساعة بها عيب أو خطأ من جهتنا؟",
    "L'échange ou le retour est entièrement gratuit.": "التبديل أو الإرجاع مجاني بالكامل.",
    "Comment commander.": "كيف تطلب.",
    "Un modèle et une couleur depuis la fiche produit, puis cliquez sur « Commander ».":
      "موديلاً ولوناً من صفحة المنتج، ثم اضغط «اطلب الآن».",
    "Commandez": "اطلب",
    "Remplissez vos coordonnées et cliquez sur « Commander » : votre commande nous est envoyée directement. Nous vous appelons seulement pour confirmer l'adresse.":
      "املأ معلوماتك واضغط «اطلب الآن»: طلبك يصلنا مباشرة. نتصل بك فقط لتأكيد العنوان.",
    "Recevez et payez": "استلم وادفع",
    "Questions fréquentes": "الأسئلة الشائعة",
    "Combien coûte la livraison ?": "كم يكلّف التوصيل؟",
    "Rien : la livraison est gratuite partout au Maroc.": "لا شيء: التوصيل مجاني إلى جميع أنحاء المغرب.",
    "Comment payer ?": "كيف أدفع؟",
    "Comment commander ?": "كيف أطلب؟",
    "Choisissez un modèle et une couleur, cliquez sur « Commander » et remplissez vos coordonnées. Votre commande nous est envoyée directement, puis nous vous contactons pour la confirmer. Vous pouvez aussi nous écrire sur WhatsApp.":
      "اختر موديلاً ولوناً، اضغط «اطلب الآن» واملأ معلوماتك. طلبك يصلنا مباشرة، ثم نتصل بك لتأكيده. يمكنك أيضاً مراسلتنا على واتساب.",
    "La montre est-elle disponible ?": "هل الساعة متوفرة؟",
    "La disponibilité de chaque couleur est confirmée avant chaque commande.":
      "يتم تأكيد توفر كل لون قبل كل طلب.",
    "Quel est le délai de livraison ?": "ما هي مدة التوصيل؟",
    "Casablanca, Rabat et environs : 24 à 48 heures. Autres villes du Maroc : 3 jours. Les délais sont comptés en jours ouvrables à partir de la confirmation de votre commande.":
      "الدار البيضاء والرباط ونواحيهما: 24 إلى 48 ساعة. مدن أخرى بالمغرب: 3 أيام. تُحسب المدد بأيام العمل انطلاقاً من تأكيد طلبك.",
    "Puis-je échanger ou retourner une montre ?": "هل يمكنني تبديل ساعة أو إرجاعها؟",
    "Oui, sans avoir à donner de motif, dans un délai de 7 jours après réception. L'échange coûte 45 DH de frais de livraison, le retour 80 DH retenus sur le remboursement. La montre doit être non portée, en parfait état, avec son emballage et ses accessoires d'origine. Contactez-nous sur WhatsApp avant de la renvoyer. Le remboursement est effectué sous 48 heures après réception et vérification. Si la montre est défectueuse ou si nous nous sommes trompés, l'échange ou le retour est gratuit.":
      "نعم، بدون الحاجة إلى ذكر سبب، داخل 7 أيام من الاستلام. التبديل يكلّف 45 درهم من تكاليف التوصيل، والإرجاع 80 درهم تُخصم من المبلغ المرجَع. يجب أن تكون الساعة غير مستعملة، في حالة ممتازة، مع علبتها وملحقاتها الأصلية. راسلنا على واتساب قبل إرجاعها. يتم إرجاع المبلغ داخل 48 ساعة بعد الاستلام والتحقق. إذا كانت الساعة بها عيب أو كان الخطأ من جهتنا، فالتبديل أو الإرجاع مجاني.",

    /* --- page introuvable --- */
    "Page introuvable.": "الصفحة غير موجودة.",
    "Le lien est peut-être ancien ou mal écrit. Retrouvez nos montres et nos boîtes de rangement.":
      "ربما الرابط قديم أو مكتوب بشكل خاطئ. تجد هنا ساعاتنا وعلب التخزين.",
    "Voir les produits": "عرض المنتجات",
    "Retour à l'accueil": "العودة إلى الرئيسية",

    /* --- titres des onglets du navigateur --- */
    "MC Watches | Montres pour homme, livraison gratuite au Maroc":
      "MC Watches | ساعات رجالية، توصيل مجاني بالمغرب",
    "Nos montres et boîtes de rangement | MC Watches": "ساعاتنا وعلب التخزين | MC Watches",
    "Votre panier | MC Watches": "سلتك | MC Watches",
    "Livraison, paiement et retours | MC Watches": "التوصيل والدفع والإرجاع | MC Watches",
    "Page introuvable | MC Watches": "الصفحة غير موجودة | MC Watches",
    "Modèle introuvable | MC Watches": "موديل غير موجود | MC Watches",

    /* --- messages WhatsApp pré-remplis ----------
       Ce que le client envoie quand il clique sur un bouton WhatsApp.
       En arabe, c'est en arabe que la commande vous arrive.
       Les {accolades} sont remplacées par le produit, le prix, etc. */
    "Bonjour MC Watches, je souhaite découvrir les modèles disponibles.":
      "مرحباً MC Watches، أريد التعرف على الموديلات المتوفرة.",
    "Bonjour MC Watches, j'ai une question sur vos modèles.":
      "مرحباً MC Watches، لدي سؤال عن موديلاتكم.",
    "Bonjour MC Watches, je souhaite commander une montre.":
      "مرحباً MC Watches، أريد طلب ساعة.",
    "Bonjour MC Watches, j'ai une question avant de commander.":
      "مرحباً MC Watches، لدي سؤال قبل الطلب.",
    "Bonjour MC Watches, j'ai une question sur {produit}, couleur {couleur}.":
      "مرحباً MC Watches، لدي سؤال عن {produit}، اللون {couleur}.",
    "Bonjour MC Watches, j'ai une question sur {produit}.":
      "مرحباً MC Watches، لدي سؤال عن {produit}.",
    "Bonjour MC Watches, je commande {reference}, couleur {couleur}, à {prix} DH. Je vous envoie mon nom, mon téléphone, ma ville et mon adresse.":
      "مرحباً MC Watches، أطلب {reference}، اللون {couleur}، بـ {prix} درهم. أرسل لكم اسمي وهاتفي ومدينتي وعنواني.",
    "Bonjour MC Watches, je commande {produit} à {prix} DH. Je vous envoie mon nom, mon téléphone, ma ville et mon adresse.":
      "مرحباً MC Watches، أطلب {produit} بـ {prix} درهم. أرسل لكم اسمي وهاتفي ومدينتي وعنواني.",
    "Bonjour MC Watches, je souhaite passer commande :": "مرحباً MC Watches، أريد تسجيل طلب:",
    "Bonjour MC Watches, je commande :": "مرحباً MC Watches، أطلب:",
    "Produit : {produit}": "المنتج: {produit}",
    "Couleur : {couleur}": "اللون: {couleur}",
    "Quantité : {qte}": "الكمية: {qte}",
    "Prix : {prix} DH (livraison gratuite)": "الثمن: {prix} درهم (توصيل مجاني)",
    "Total : {total} DH": "المجموع: {total} درهم",
    "Nom : {client}": "الاسم: {client}",
    "Téléphone : {tel}": "الهاتف: {tel}",
    "Ville : {ville}": "المدينة: {ville}",
    "Adresse : {adresse}": "العنوان: {adresse}",
    "Merci de confirmer ma commande.": "أرجو تأكيد طلبي.",

  };

  /* ---------- Les phrases qui contiennent un chiffre ----------
     Un prix, un numéro de photo ou une quantité change à chaque
     fois : on traduit la FORME de la phrase, pas la phrase.
     $1 et $2 reprennent les chiffres trouvés dans l'ordre.        */

  var MOTIFS = [
    [/^(\d+) DH$/, "$1 درهم"],
    [/^(\d+) DH l'unité$/, "$1 درهم للوحدة"],
    [/^− (\d+) DH$/, "− $1 درهم"],
    [/^Offre lot · (\d+) montres$/, "عرض المجموعة · $1 ساعات"],
    [/^(\d+) DH, vous économisez (\d+) DH\.$/, "$1 درهم، توفّر $2 درهم."],
    [/^Offre lot : (\d+) DH (\d+) DH, vous économisez (\d+) DH\.$/,
      "عرض المجموعة: $1 درهم ← $2 درهم، توفّر $3 درهم."],
    [/^2 montres : (\d+) DH au lieu de (\d+) DH\. Chaque montre en plus coûte (\d+) DH de moins\.$/,
      "ساعتان: $1 درهم بدل $2 درهم. كل ساعة إضافية تكلّف $3 درهم أقل."],
    [/^Collection (MC-\d+)$/, "مجموعة $1"],
    [/^Voir la photo (\d+)$/, "عرض الصورة $1"],
    [/^(MC-\d+) - montre pour homme, (\d+) DH \| MC Watches$/,
      "$1 - ساعة رجالية، $2 درهم | MC Watches"],
    /* « Collection MC-01, Noir - photo 2 sur 7 » : chaque morceau à part.
       Ces trois motifs passent AVANT celui du nom + couleur seuls.      */
    [/^(.+) - photo (\d+) sur (\d+)$/, function (m, quoi, i, n) {
      return texte(quoi) + " - صورة " + i + " من " + n;
    }],
    [/^Photos : (.+)$/, function (m, quoi) { return "صور: " + texte(quoi); }],
    /* « Collection MC-01, Noir » : le nom du produit, puis la couleur */
    [/^(Collection MC-\d+|Boîte de rangement - \d+ montres), (.+)$/, function (m, nom, couleur) {
      return texte(nom) + "، " + texte(couleur);
    }]
  ];

  /* ---------- La mécanique ----------
     À partir d'ici, il n'y a plus de texte à traduire : seulement
     le code qui remplace le français par l'arabe sur la page.     */

  var params = new URLSearchParams(window.location.search);
  var demande = params.get("lang");
  var langue = "fr";

  try {
    if (demande === "ar" || demande === "fr") {
      langue = demande;
      localStorage.setItem(CLE, langue);
    } else {
      langue = localStorage.getItem(CLE) === "ar" ? "ar" : "fr";
    }
  } catch (e) {
    langue = demande === "ar" ? "ar" : "fr";
  }

  /* Nettoie une phrase avant de la chercher : espaces insécables,
     retours à la ligne et espaces multiples deviennent un espace. */
  function cle(s) {
    return String(s).replace(new RegExp(String.fromCharCode(160), "g"), " ").replace(/\s+/g, " ").trim();
  }

  function motif(s) {
    for (var i = 0; i < MOTIFS.length; i++) {
      var m = s.match(MOTIFS[i][0]);
      if (!m) continue;
      var r = MOTIFS[i][1];
      var sortie = typeof r === "function" ? r.apply(null, m) : s.replace(MOTIFS[i][0], r);
      if (sortie) return sortie;
    }
    return null;
  }

  /* La traduction d'une phrase, ou la phrase française si elle n'en a pas. */
  function texte(s) {
    var k = cle(s);
    if (!k) return s;
    return AR[k] || motif(k) || s;
  }

  /* Remplit les {accolades} d'un modèle de phrase. */
  function modele(fr, valeurs) {
    var base = langue === "ar" ? (AR[fr] || fr) : fr;
    return base.replace(/\{(\w+)\}/g, function (m, nom) {
      return Object.prototype.hasOwnProperty.call(valeurs, nom) ? String(valeurs[nom]) : m;
    });
  }

  /* Ce que site.js utilise pour ses propres phrases. */
  window.MC_LANGUE = langue;
  window.MC_T = function (s) { return langue === "ar" ? texte(s) : s; };
  window.MC_TPL = modele;

  /* En français il n'y a rien à traduire : on pose seulement le
     bouton qui mène vers l'arabe, et on laisse la page tranquille. */
  if (langue !== "ar") {
    bouton();
    pretE();
    return;
  }

  /* --- traduction de la page --- */

  var SAUTER = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1 };
  var ATTRIBUTS = ["alt", "title", "aria-label", "placeholder", "aria-roledescription"];

  function traduireTexte(n) {
    var brut = n.nodeValue;
    if (!brut || !brut.trim()) return;
    var parent = n.parentNode;
    if (parent && SAUTER[parent.nodeName]) return;
    if (parent && parent.closest && parent.closest("[data-pas-de-traduction]")) return;
    var k = cle(brut);
    var trad = AR[k] || motif(k);
    if (!trad || trad === k) return;
    /* on garde les espaces du début et de la fin tels quels */
    n.nodeValue = brut.match(/^\s*/)[0] + trad + brut.match(/\s*$/)[0];
  }

  function traduireAttributs(el) {
    for (var i = 0; i < ATTRIBUTS.length; i++) {
      var a = ATTRIBUTS[i];
      if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      var v = el.getAttribute(a);
      var k = cle(v);
      var trad = AR[k] || motif(k);
      if (trad && trad !== k) el.setAttribute(a, trad);
    }
    /* Les liens WhatsApp portent le message dans leur adresse. */
    if (el.tagName === "A" && el.href && el.href.indexOf("wa.me/") > -1) {
      try {
        var u = new URL(el.href);
        var t = u.searchParams.get("text");
        if (t) {
          var tk = cle(t);
          var tt = AR[tk];
          if (tt && tt !== tk) {
            /* On réécrit l'adresse à la main : WhatsApp veut les
               espaces en %20, pas en +. */
            el.href = u.origin + u.pathname + "?text=" + encodeURIComponent(tt);
          }
        }
      } catch (e) {}
    }
  }

  function traduire(racine) {
    if (racine.nodeType === 3) { traduireTexte(racine); return; }
    if (racine.nodeType !== 1 && racine.nodeType !== 9 && racine.nodeType !== 11) return;
    if (racine.nodeType === 1) traduireAttributs(racine);

    var promeneur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = promeneur.nextNode())) {
      if (n.nodeType === 3) traduireTexte(n);
      else traduireAttributs(n);
    }
  }

  function metas() {
    var liste = [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]'
    ];
    liste.forEach(function (s) {
      var m = document.querySelector(s);
      if (!m) return;
      var k = cle(m.content);
      var trad = AR[k] || motif(k);
      if (trad && trad !== k) m.content = trad;
    });
    var loc = document.querySelector('meta[property="og:locale"]');
    if (loc) loc.content = "ar_MA";
    /* La version arabe est une page à part entière pour Google : quand
       l'adresse demande l'arabe (?lang=ar), elle se désigne elle-même
       comme adresse officielle. Avant, elle renvoyait vers la page
       française, et Google ne montrait jamais la version arabe.     */
    if (demande === "ar") {
      ['link[rel="canonical"]', 'meta[property="og:url"]'].forEach(function (s) {
        var el = document.querySelector(s);
        if (!el) return;
        var attr = el.tagName === "LINK" ? "href" : "content";
        var v = el.getAttribute(attr);
        if (v && v.indexOf("lang=ar") < 0) {
          el.setAttribute(attr, v + (v.indexOf("?") < 0 ? "?" : "&") + "lang=ar");
        }
      });
    }
  }

  /* Le choix de langue, dans l'en-tête, cerné de doré pour qu'on le
     voie tout de suite. Sur ordinateur on voit LES DEUX langues, avec
     celle en cours remplie en doré : on comprend d'un coup d'œil qu'il
     y a une version arabe. Sur téléphone la place manque, alors seule
     l'AUTRE langue reste affichée (le CSS cache celle en cours) : le
     mot « عربي » en doré se repère quand même immédiatement.

     Chaque lien garde l'adresse de la page en cours : la référence du
     produit, la couleur choisie, l'ancre.                           */

  function bouton() {
    var wrap = document.querySelector(".site-header .wrap");
    if (!wrap || wrap.querySelector(".lang-choix")) return;

    var LANGUES = [
      { code: "fr", nom: "FR", dit: { fr: "Voir le site en français", ar: "عرض الموقع بالفرنسية" } },
      { code: "ar", nom: "عربي", dit: { fr: "Voir le site en arabe", ar: "عرض الموقع بالعربية" } }
    ];

    var GLOBE =
      '<svg class="lang-globe" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
      '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
      '<path d="M3.2 12h17.6M12 3.2c2.7 2.5 2.7 15.1 0 17.6M12 3.2c-2.7 2.5-2.7 15.1 0 17.6" ' +
      'fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';

    var boite = document.createElement("div");
    boite.className = "lang-choix";
    boite.setAttribute("role", "group");
    boite.setAttribute("aria-label", langue === "ar" ? "اللغة" : "Langue");
    boite.innerHTML = GLOBE;

    LANGUES.forEach(function (l) {
      var active = l.code === langue;
      var u = new URL(window.location.href);
      u.searchParams.set("lang", l.code);

      var a = document.createElement("a");
      a.className = "lang-opt" + (active ? " est-active" : "");
      a.href = u.toString();
      a.textContent = l.nom;
      a.setAttribute("lang", l.code);
      a.setAttribute("dir", l.code === "ar" ? "rtl" : "ltr");
      a.setAttribute("aria-label", l.dit[langue]);
      if (active) a.setAttribute("aria-current", "true");

      /* Recalculée au dernier moment : la couleur choisie sur une fiche
         produit s'ajoute à l'adresse APRÈS l'affichage de la page. */
      a.addEventListener("click", function () {
        var maintenant = new URL(window.location.href);
        maintenant.searchParams.set("lang", l.code);
        a.href = maintenant.toString();
      });

      boite.appendChild(a);
    });

    wrap.appendChild(boite);
  }

  /* Enlève le voile posé par le petit script de l'en-tête :
     la page ne s'affiche qu'une fois traduite, pour qu'on ne voie
     pas le français passer une fraction de seconde.             */
  function pretE() {
    var d = document.documentElement;
    d.classList.remove("mc-attente");
    if (window.MC_LANGUE === "ar") {
      d.lang = "ar";
      d.dir = "rtl";
      d.classList.add("mc-ar");
    }
  }

  var enCours = false;
  var observateur = new MutationObserver(function (listes) {
    if (enCours) return;
    enCours = true;
    listes.forEach(function (m) {
      if (m.type === "childList") {
        for (var i = 0; i < m.addedNodes.length; i++) traduire(m.addedNodes[i]);
      } else if (m.type === "characterData") {
        traduireTexte(m.target);
      } else if (m.type === "attributes") {
        traduireAttributs(m.target);
      }
    });
    enCours = false;
  });

  function demarrer() {
    traduire(document.documentElement);
    metas();
    bouton();
    pretE();
    observateur.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTS.concat(["href", "content"])
    });
  }

  demarrer();
})();
