'use strict';

(function () {
  const priceFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

  const lightenColor = (hex, ratio = 0.55) => {
    if (!hex) {
      return '#f4d8e3';
    }
    let sanitized = hex.trim().replace('#', '');
    if (sanitized.length === 3) {
      sanitized = sanitized.split('').map((char) => char + char).join('');
    }
    const numeric = parseInt(sanitized, 16);
    if (Number.isNaN(numeric)) {
      return '#f4d8e3';
    }
    const r = (numeric >> 16) & 0xff;
    const g = (numeric >> 8) & 0xff;
    const b = numeric & 0xff;
    const lighten = (value) => Math.min(255, Math.round(value + (255 - value) * ratio));
    const composed = [lighten(r), lighten(g), lighten(b)]
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
    return `#${composed}`;
  };

  const escapeSvgText = (value) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const createPlaceholderImage = (text, accent) => {
    const safeText = escapeSvgText(text || 'Miss Indya');
    const secondary = lightenColor(accent, 0.7);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" role="img" aria-label="${safeText}">\n  <defs>\n    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">\n      <stop offset="0%" stop-color="${accent}"/>\n      <stop offset="100%" stop-color="${secondary}"/>\n    </linearGradient>\n  </defs>\n  <rect width="420" height="420" rx="40" fill="url(#grad)"/>\n  <text x="50%" y="52%" fill="#ffffff" font-family="'Poppins', sans-serif" font-size="38" font-weight="600" text-anchor="middle">${safeText}</text>\n</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const products = [
    {
      id: 'lehenga-jaipur',
      name: 'Ensemble Lehenga Jaipur',
      shortDescription: 'Lehenga brodé rose poudré avec blouse travaillée et dupatta dorée.',
      description:
        'Ensemble trois pièces confectionné dans un tissu soyeux brodé à la main. Parfait pour les cérémonies et les mariages.',
      category: 'ensembles',
      price: 169,
      sizes: [
        { label: 'XS', available: true },
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: false }
      ],
      colors: ['Rose poudré', 'Doré'],
      materials: 'Soie mélangée, broderies miroir et sequins.',
      care: 'Nettoyage à sec conseillé pour préserver les broderies.',
      highlights: ['Dupatta brodée incluse', 'Jupon confortable', 'Broderies miroir faites main'],
      tags: ['Edition limitée', 'Cérémonie'],
      newArrival: true,
      bestSeller: true,
      available: true,
      readyToShip: true,
      delivery: 'Expédition 48h ou retrait boutique Ivry-sur-Seine.',
      accent: '#d1608f',
      accentSecondary: '#f9d9e8',
      imageAlt: 'Ensemble lehenga rose poudré Miss Indya',
      imageLabel: 'Lehenga Jaipur'
    },
    {
      id: 'robe-sari-velours',
      name: 'Robe sari velours Fuchsia',
      shortDescription: 'Robe sari pré-drapée en velours, détail de ceinture dorée.',
      description:
        'Une robe sari déjà drapée, facile à enfiler, avec une ceinture brodée dorée et une jupe fluide pour danser toute la nuit.',
      category: 'robes',
      price: 89,
      sizes: [
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: true },
        { label: 'XL', available: false }
      ],
      colors: ['Fuchsia', 'Doré'],
      materials: 'Velours stretch, doublure satin.',
      care: 'Nettoyage à sec doux ou lavage délicat à froid.',
      highlights: ['Pré-drapée en 30 secondes', 'Ceinture amovible', 'Parfaite pour les cocktails'],
      tags: ['Best look', 'Nouvelle collection'],
      newArrival: true,
      bestSeller: false,
      available: true,
      readyToShip: true,
      delivery: 'Retrait express en boutique ou livraison 72h.',
      accent: '#c23d7a',
      accentSecondary: '#f5c4dc',
      imageAlt: 'Robe sari velours fuchsia Miss Indya',
      imageLabel: 'Sari Velours'
    },
    {
      id: 'robe-anarkali-emerald',
      name: 'Robe Anarkali Emeraude',
      shortDescription: 'Anarkali évasée vert émeraude avec perles et dupatta légère.',
      description:
        'Silhouette anarkali fluide, ornée de perles ton sur ton et d\'un col brodé. Une valeur sûre pour les cérémonies du soir.',
      category: 'robes',
      price: 149,
      sizes: [
        { label: 'XS', available: true },
        { label: 'S', available: true },
        { label: 'M', available: false },
        { label: 'L', available: true }
      ],
      colors: ['Vert émeraude', 'Argent'],
      materials: 'Georgette doublée, broderies perlées.',
      care: 'Nettoyage à sec uniquement.',
      highlights: ['Coupe évasée flatteuse', 'Manches translucides', 'Dupatta assortie incluse'],
      tags: ['Iconique', 'Cérémonie'],
      newArrival: false,
      bestSeller: true,
      available: true,
      readyToShip: false,
      delivery: 'Préparation 5 à 7 jours ouvrés.',
      accent: '#1f6b62',
      accentSecondary: '#a9d9cf',
      imageAlt: 'Robe Anarkali verte Miss Indya',
      imageLabel: 'Anarkali Vert'
    },
    {
      id: 'ensemble-kurta-enfant',
      name: 'Kurta Festive Enfant Jaipur',
      shortDescription: 'Kurta garçon avec pantalon churidar et gilet brodé.',
      description:
        'Un ensemble trois pièces pour enfant, doux et confortable, pensé pour les fêtes familiales et les mariages.',
      category: 'enfants',
      price: 59,
      sizes: [
        { label: '4A', available: true },
        { label: '6A', available: false },
        { label: '8A', available: true },
        { label: '10A', available: true }
      ],
      colors: ['Bleu roi', 'Doré'],
      materials: 'Coton satin et broderies lurex.',
      care: 'Lavage délicat sur l\'envers.',
      highlights: ['Gilet brodé inclus', 'Coupe confortable', 'Idéal pour danser'],
      tags: ['Mini collection', 'Nouveauté'],
      newArrival: true,
      bestSeller: false,
      available: true,
      readyToShip: true,
      delivery: 'Livraison 48h ou retrait boutique.',
      accent: '#2f6cc5',
      accentSecondary: '#bdd3f7',
      imageAlt: 'Ensemble kurta enfant bleu Miss Indya',
      imageLabel: 'Kurta Enfant'
    },
    {
      id: 'parure-kundan-royale',
      name: 'Parure Kundan Royale',
      shortDescription: 'Collier, boucles et maang tikka sertis de pierres kundan.',
      description:
        'Un set de bijoux kundan monté à Jaipur, composé d\'un collier ajustable, de boucles et d\'un maang tikka.',
      category: 'accessoires',
      price: 79,
      sizes: [{ label: 'Taille unique', available: true }],
      colors: ['Ivoire', 'Or antique'],
      materials: 'Alliage hypoallergénique, pierres kundan.',
      care: 'Conserver dans sa pochette après usage.',
      highlights: ['Réglable au cou', 'Pierres kundan polies', 'Fabrication artisanale'],
      tags: ['Best-seller', 'Mariage'],
      newArrival: false,
      bestSeller: true,
      available: true,
      readyToShip: true,
      delivery: 'Envoi soigné sous 48h.',
      accent: '#c48a3c',
      accentSecondary: '#f4d9a8',
      imageAlt: 'Parure kundan dorée Miss Indya',
      imageLabel: 'Parure Kundan'
    },
    {
      id: 'bracelets-bangles-lotus',
      name: 'Set de bangles Lotus',
      shortDescription: 'Lot de 8 bangles rose gold et perles blanches.',
      description:
        'Un mix de bracelets texturés qui se combinent à toutes vos tenues indo-occidentales. Disponible en plusieurs tailles.',
      category: 'accessoires',
      price: 39,
      sizes: [
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: true }
      ],
      colors: ['Rose gold', 'Ivoire'],
      materials: 'Alliage léger sans nickel.',
      care: 'Essuyer avec un chiffon doux après usage.',
      highlights: ['Léger et confortable', 'Mix & match', 'Ne ternit pas facilement'],
      tags: ['Edition permanente'],
      newArrival: true,
      bestSeller: false,
      available: true,
      readyToShip: true,
      delivery: 'Prêt à expédier sous 24h.',
      accent: '#d08a82',
      accentSecondary: '#f6d4cd',
      imageAlt: 'Bracelets bangles rose gold Miss Indya',
      imageLabel: 'Bangles Lotus'
    },
    {
      id: 'palette-henna-rajasthan',
      name: 'Palette henné Rajasthan',
      shortDescription: 'Kit henné naturel avec cônes prêts à l\'emploi et pochoirs.',
      description:
        'Palette composée de 4 cônes de henné naturel, d\'huile protectrice et de pochoirs floraux pour réussir vos motifs à la maison.',
      category: 'beaute',
      price: 29,
      sizes: [{ label: 'Kit complet', available: true }],
      colors: ['Cuivré'],
      materials: 'Henné 100% naturel et accessoires.',
      care: 'Conserver au frais pour garder toute l\'intensité.',
      highlights: ['4 cônes prêts à l\'emploi', 'Pochoirs inclus', 'Tenue jusqu\'à 10 jours'],
      tags: ['Beauté', 'Do it yourself'],
      newArrival: true,
      bestSeller: false,
      available: true,
      readyToShip: true,
      delivery: 'Expédition sous 24h.',
      accent: '#b45a30',
      accentSecondary: '#f0c0a0',
      imageAlt: 'Palette de henné Miss Indya',
      imageLabel: 'Kit Henné'
    },
    {
      id: 'bougie-masala-chaud',
      name: 'Bougie Masala Chai',
      shortDescription: 'Bougie parfumée aux épices chai, coulée à la main.',
      description:
        'Une bougie artisanale inspirée du célèbre chai indien, avec des notes de cardamome, cannelle et vanille.',
      category: 'maison',
      price: 24,
      sizes: [{ label: '200 g', available: true }],
      colors: ['Ivoire'],
      materials: 'Cire de soja naturelle, mèche coton.',
      care: 'Couper la mèche avant chaque utilisation.',
      highlights: ['45h de combustion', 'Parfum élaboré à Grasse', 'Coffret cadeau offert'],
      tags: ['Lifestyle'],
      newArrival: false,
      bestSeller: false,
      available: true,
      readyToShip: true,
      delivery: 'Livraison standard 3 à 5 jours.',
      accent: '#c17a4c',
      accentSecondary: '#f4d2b1',
      imageAlt: 'Bougie parfumée Miss Indya',
      imageLabel: 'Bougie Chai'
    },
    {
      id: 'sherwani-ivoire-maharaja',
      name: 'Sherwani ivoire Maharaja',
      shortDescription: 'Sherwani ivoire brodé avec pantalon churidar assorti.',
      description:
        'Un sherwani d\'exception aux broderies ton sur ton, parfait pour le marié ou le témoin. Disponible sur commande avec ajustements.',
      category: 'ensembles',
      price: 189,
      sizes: [
        { label: 'S', available: true },
        { label: 'M', available: false },
        { label: 'L', available: true },
        { label: 'XL', available: true }
      ],
      colors: ['Ivoire', 'Or pâle'],
      materials: 'Brocart léger doublé coton.',
      care: 'Nettoyage à sec professionnel.',
      highlights: ['Broderies ton sur ton', 'Boutons recouverts', 'Possibilité de retouches'],
      tags: ['Mariage', 'Sur commande'],
      newArrival: false,
      bestSeller: true,
      available: true,
      readyToShip: false,
      delivery: 'Confection sous 10 jours + livraison.',
      accent: '#d2b48c',
      accentSecondary: '#f5e7c9',
      imageAlt: 'Sherwani ivoire Miss Indya',
      imageLabel: 'Sherwani Ivoire'
    },
    {
      id: 'sari-or-pre-drape',
      name: 'Sari doré pré-drapé Noor',
      shortDescription: 'Sari pré-drapé doré avec blouse brodée et ceinture chaîne.',
      description:
        'Sari métallisé prêt à porter avec blouse brodée et ceinture chaîne. Un incontournable pour les soirées festives.',
      category: 'robes',
      price: 129,
      sizes: [
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: false },
        { label: 'XL', available: false }
      ],
      colors: ['Doré', 'Champagne'],
      materials: 'Mousseline métallisée et doublure satin.',
      care: 'Nettoyage à sec uniquement.',
      highlights: ['Ceinture chaîne incluse', 'Blouse dos nu réglable', 'Sari déjà plissé'],
      tags: ['Soirée'],
      newArrival: false,
      bestSeller: true,
      available: true,
      readyToShip: true,
      delivery: 'Livraison 72h ou retrait boutique.',
      accent: '#d1a348',
      accentSecondary: '#f7e2a4',
      imageAlt: 'Sari doré pré-drapé Miss Indya',
      imageLabel: 'Sari Noor'
    }
  ];

  const state = {
    products,
    activeCategory: 'all',
    filters: new Set(),
    searchTerm: '',
    sort: 'recommended',
    cart: []
  };

  let summaryGenerated = false;
  let toastTimeout;
  const overlayState = { count: 0 };
  const whatsappShareBase = 'https://wa.me/?text=';
  const elements = {
    productGrid: document.querySelector('#productGrid'),
    resultsCount: document.querySelector('#resultsCount'),
    searchInput: document.querySelector('#searchInput'),
    categoryButtons: document.querySelectorAll('.category-button'),
    filterChips: document.querySelectorAll('.filter-chip'),
    sortSelect: document.querySelector('#sortSelect'),
    resetFiltersButton: document.querySelector('#resetFilters'),
    cartCount: document.querySelector('#cartCount'),
    openCartButton: document.querySelector('#openCart'),
    floatingCartButton: document.querySelector('#floatingCart'),
    cartPanel: document.querySelector('#cartPanel'),
    cartItems: document.querySelector('#cartItems'),
    cartEmpty: document.querySelector('#cartEmpty'),
    cartTotal: document.querySelector('#cartTotal'),
    clearCartButton: document.querySelector('#clearCart'),
    startCheckoutButton: document.querySelector('#startCheckout'),
    checkoutModal: document.querySelector('#checkoutModal'),
    checkoutForm: document.querySelector('#checkoutForm'),
    checkoutItems: document.querySelector('#checkoutItems'),
    checkoutTotal: document.querySelector('#checkoutTotal'),
    checkoutSuccess: document.querySelector('#checkoutSuccess'),
    orderSummaryText: document.querySelector('#orderSummaryText'),
    copySummaryButton: document.querySelector('#copySummary'),
    whatsappLink: document.querySelector('#whatsappLink'),
    toast: document.querySelector('#toast'),
    srAnnouncer: document.querySelector('#sr-announcer'),
    productModal: document.querySelector('#productModal'),
    productModalTitle: document.querySelector('#productModalTitle'),
    productModalSubtitle: document.querySelector('#productModalSubtitle'),
    productModalPrice: document.querySelector('#productModalPrice'),
    productModalContent: document.querySelector('#productModalContent'),
    menuToggle: document.querySelector('.menu-toggle'),
    mainNav: document.querySelector('.main-nav')
  };

  const navLinks = elements.mainNav ? elements.mainNav.querySelectorAll('a') : [];

  const formatPrice = (value) => priceFormatter.format(value);

  const getDeliveryLabel = (value) => {
    switch (value) {
      case 'boutique':
        return 'Retrait boutique - Ivry-sur-Seine';
      case 'livraison':
        return 'Livraison France';
      case 'international':
        return 'Livraison internationale';
      default:
        return value || 'À confirmer';
    }
  };

  const lockScroll = () => {
    overlayState.count += 1;
    document.body.classList.add('no-scroll');
  };

  const unlockScroll = () => {
    overlayState.count = Math.max(0, overlayState.count - 1);
    if (overlayState.count === 0) {
      document.body.classList.remove('no-scroll');
    }
  };

  const announce = (message) => {
    if (!elements.srAnnouncer) {
      return;
    }
    elements.srAnnouncer.textContent = '';
    window.requestAnimationFrame(() => {
      elements.srAnnouncer.textContent = message;
    });
  };

  const showToast = (message) => {
    if (!elements.toast) {
      return;
    }
    elements.toast.textContent = message;
    elements.toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      elements.toast.classList.remove('is-visible');
    }, 3200);
  };

  const findProductById = (id) => state.products.find((product) => product.id === id);

  const getDefaultSize = (product) => product.sizes.find((size) => size.available) || product.sizes[0];

  const buildSearchIndex = (product) => {
    const base = [
      product.name,
      product.shortDescription,
      product.description,
      (product.tags || []).join(' '),
      (product.highlights || []).join(' ')
    ]
      .join(' ')
      .toLowerCase();
    return base;
  };

  const createProductCard = (product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    const accentSecondary = product.accentSecondary || lightenColor(product.accent, 0.6);
    const placeholder = createPlaceholderImage(product.imageLabel || product.name, product.accent);
    const defaultSize = getDefaultSize(product);
    const sizesDisabled = product.sizes.every((size) => !size.available);
    const canAddToCart = product.available && !sizesDisabled;

    const tagList = product.tags && product.tags.length
      ? `<ul class="product-card__tags">${product.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>`
      : '';
    const highlightList = product.highlights && product.highlights.length
      ? `<ul class="product-card__highlights">${product.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : '';

    const sizeOptions = product.sizes
      .map((size) => {
        const disabled = size.available ? '' : ' disabled';
        const selected = size.label === defaultSize.label ? ' selected' : '';
        const suffix = size.available ? '' : ' - bientôt de retour';
        return `<option value="${size.label}"${disabled}${selected}>${size.label}${suffix}</option>`;
      })
      .join('');

    card.innerHTML = `
      <div class="product-card__media" style="background: linear-gradient(135deg, ${product.accent}1f, ${accentSecondary}33);">
        <img src="${placeholder}" alt="${product.imageAlt || product.name}" loading="lazy">
        ${product.newArrival ? '<span class="badge badge--new">Nouveau</span>' : ''}
        ${product.bestSeller ? '<span class="badge badge--best">Coup de cœur</span>' : ''}
      </div>
      <div class="product-card__body">
        <h3>${product.name}</h3>
        <p class="product-card__excerpt">${product.shortDescription}</p>
        <div class="product-card__meta">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          <span class="product-card__availability ${product.available ? 'available' : 'unavailable'}">${product.available ? 'En stock' : 'Sur commande'}</span>
        </div>
        ${tagList}
        <label class="size-selector">
          <span>Tailles disponibles</span>
          <select ${sizesDisabled ? 'disabled' : ''} aria-label="Choisir une taille pour ${product.name}">
            ${sizeOptions}
          </select>
        </label>
        ${highlightList}
        <div class="product-card__actions">
          <button type="button" class="btn btn--outline" data-action="details">Détails</button>
          <button type="button" class="btn btn--primary" data-action="add"${canAddToCart ? '' : ' disabled'}>Ajouter</button>
        </div>
      </div>
    `;

    return card;
  };

  const updateResultsCount = (count) => {
    if (!elements.resultsCount) {
      return;
    }
    if (count === 0) {
      elements.resultsCount.textContent = 'Aucun article trouvé.';
    } else if (count === 1) {
      elements.resultsCount.textContent = '1 article disponible.';
    } else {
      elements.resultsCount.textContent = `${count} articles disponibles.`;
    }
  };

  const applyFilters = () => {
    const term = state.searchTerm.trim().toLowerCase();
    const filtered = state.products.filter((product) => {
      if (state.activeCategory !== 'all' && product.category !== state.activeCategory) {
        return false;
      }
      if (term && !buildSearchIndex(product).includes(term)) {
        return false;
      }
      if (state.filters.has('new') && !product.newArrival) {
        return false;
      }
      if (state.filters.has('best') && !product.bestSeller) {
        return false;
      }
      if (state.filters.has('ready') && !product.readyToShip) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (state.sort) {
      case 'priceAsc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || Number(b.bestSeller) - Number(a.bestSeller));
        break;
      default:
        sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || Number(b.newArrival) - Number(a.newArrival));
    }

    if (!elements.productGrid) {
      return;
    }

    elements.productGrid.innerHTML = '';
    if (sorted.length === 0) {
      elements.productGrid.innerHTML = '<div class="empty-state">Aucun article ne correspond à votre sélection. Essayez une autre catégorie ou réinitialisez les filtres.</div>';
    } else {
      sorted.forEach((product) => {
        elements.productGrid.appendChild(createProductCard(product));
      });
    }
    updateResultsCount(sorted.length);
  };

  const updateCartBadge = () => {
    if (!elements.cartCount) {
      return;
    }
    const total = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = String(total);
  };

  const renderCart = () => {
    if (!elements.cartItems || !elements.cartEmpty || !elements.cartTotal) {
      return;
    }
    elements.cartItems.innerHTML = '';
    if (state.cart.length === 0) {
      elements.cartEmpty.style.display = '';
    } else {
      elements.cartEmpty.style.display = 'none';
    }

    let total = 0;
    state.cart.forEach((item, index) => {
      const product = findProductById(item.id);
      if (!product) {
        return;
      }
      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.dataset.cartIndex = String(index);
      li.innerHTML = `
        <div class="cart-item__header">
          <span>${product.name}</span>
          <span>${formatPrice(lineTotal)}</span>
        </div>
        <div class="cart-item__meta">
          <span>Taille : ${item.size}</span>
          <span>${formatPrice(product.price)} / pièce</span>
        </div>
        <div class="cart-item__controls">
          <div class="quantity-control" role="group" aria-label="Quantité pour ${product.name}">
            <button type="button" data-action="decrease" aria-label="Diminuer la quantité">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" aria-label="Augmenter la quantité">+</button>
          </div>
          <button type="button" class="remove-item" data-action="remove">Retirer</button>
        </div>
      `;
      elements.cartItems.appendChild(li);
    });

    elements.cartTotal.textContent = formatPrice(total);
  };

  const renderCheckoutSummary = () => {
    if (!elements.checkoutItems || !elements.checkoutTotal) {
      return;
    }
    elements.checkoutItems.innerHTML = '';
    if (state.cart.length === 0) {
      const empty = document.createElement('li');
      empty.textContent = 'Votre panier est vide pour le moment.';
      elements.checkoutItems.appendChild(empty);
      elements.checkoutTotal.textContent = formatPrice(0);
      elements.checkoutSuccess.hidden = true;
      elements.orderSummaryText.value = '';
      summaryGenerated = false;
      return;
    }

    let total = 0;
    state.cart.forEach((item) => {
      const product = findProductById(item.id);
      if (!product) {
        return;
      }
      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      const li = document.createElement('li');
      li.innerHTML = `${product.name} — Taille ${item.size} × ${item.quantity} (${formatPrice(lineTotal)})`;
      elements.checkoutItems.appendChild(li);
    });
    elements.checkoutTotal.textContent = formatPrice(total);
    if (!summaryGenerated) {
      elements.checkoutSuccess.hidden = true;
      elements.orderSummaryText.value = '';
    }
  };

  const updateCart = () => {
    updateCartBadge();
    renderCart();
    if (summaryGenerated) {
      summaryGenerated = false;
      if (elements.checkoutSuccess) {
        elements.checkoutSuccess.hidden = true;
      }
      if (elements.orderSummaryText) {
        elements.orderSummaryText.value = '';
      }
    }
    if (elements.checkoutModal && elements.checkoutModal.classList.contains('is-open')) {
      renderCheckoutSummary();
    }
  };

  const addToCart = (productId, size) => {
    const product = findProductById(productId);
    if (!product) {
      return;
    }
    if (!size) {
      showToast('Sélectionnez une taille disponible.');
      return;
    }
    const existing = state.cart.find((item) => item.id === productId && item.size === size);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ id: productId, size, quantity: 1 });
    }
    updateCart();
    announce(`${product.name} (${size}) ajouté au panier.`);
    showToast('Article ajouté au panier.');
  };

  const clearCart = () => {
    if (state.cart.length === 0) {
      showToast('Le panier est déjà vide.');
      return;
    }
    state.cart.length = 0;
    updateCart();
    announce('Le panier a été vidé.');
    showToast('Panier vidé.');
  };

  const removeCartItem = (index) => {
    const [removed] = state.cart.splice(index, 1);
    updateCart();
    if (removed) {
      const product = findProductById(removed.id);
      if (product) {
        announce(`${product.name} retiré du panier.`);
        showToast('Article retiré.');
      }
    }
  };

  const changeQuantity = (index, delta) => {
    const item = state.cart[index];
    if (!item) {
      return;
    }
    item.quantity = Math.max(1, item.quantity + delta);
    updateCart();
  };

  const buildOrderSummary = (formData) => {
    const lines = state.cart
      .map((item) => {
        const product = findProductById(item.id);
        if (!product) {
          return null;
        }
        const lineTotal = formatPrice(product.price * item.quantity);
        return `- ${product.name} (taille ${item.size}) × ${item.quantity} — ${lineTotal}`;
      })
      .filter(Boolean);

    const total = state.cart.reduce((sum, item) => {
      const product = findProductById(item.id);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);

    const message = [
      'Commande Miss Indya',
      '',
      `Client·e : ${formData.get('name') || '---'}`,
      `Téléphone : ${formData.get('phone') || '---'}`,
      `E-mail : ${formData.get('email') || '---'}`,
      `Mode de retrait : ${getDeliveryLabel(formData.get('delivery'))}`,
      '',
      'Articles :',
      ...lines,
      '',
      `Total estimé : ${formatPrice(total)}`
    ];

    const additional = formData.get('message');
    if (additional) {
      message.push('', 'Précisions :', additional);
    }

    message.push('', 'Merci !');
    return message.join('\n');
  };

  const openCart = () => {
    if (!elements.cartPanel) {
      return;
    }
    elements.cartPanel.classList.add('is-open');
    elements.cartPanel.setAttribute('aria-hidden', 'false');
    lockScroll();
  };

  const closeCart = () => {
    if (!elements.cartPanel) {
      return;
    }
    elements.cartPanel.classList.remove('is-open');
    elements.cartPanel.setAttribute('aria-hidden', 'true');
    unlockScroll();
  };

  const openProductModal = (product) => {
    if (!elements.productModal) {
      return;
    }
    elements.productModalTitle.textContent = product.name;
    elements.productModalSubtitle.textContent = product.description;
    elements.productModalPrice.textContent = formatPrice(product.price);
    const placeholder = createPlaceholderImage(product.imageLabel || product.name, product.accent);
    const sizes = product.sizes
      .map((size) => `${size.label}${size.available ? '' : ' (bientôt de retour)'}`)
      .join(', ');
    const colors = (product.colors || []).join(', ');

    elements.productModalContent.innerHTML = `
      <div class="modal__image">
        <img src="${placeholder}" alt="${product.imageAlt || product.name}">
      </div>
      <div class="modal__details">
        <ul class="modal__list">
          <li><span>Matières</span>${product.materials}</li>
          <li><span>Couleurs</span>${colors || 'Multicolore'}</li>
          <li><span>Tailles</span>${sizes}</li>
          <li><span>Conseils d'entretien</span>${product.care}</li>
          ${product.delivery ? `<li><span>Livraison</span>${product.delivery}</li>` : ''}
        </ul>
        ${product.highlights && product.highlights.length ? `<p class="modal__note">${product.highlights.join(' · ')}</p>` : ''}
      </div>
    `;

    elements.productModal.classList.add('is-open');
    elements.productModal.setAttribute('aria-hidden', 'false');
    lockScroll();
  };

  const closeProductModal = () => {
    if (!elements.productModal) {
      return;
    }
    elements.productModal.classList.remove('is-open');
    elements.productModal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  };

  const openCheckout = () => {
    if (!elements.checkoutModal) {
      return;
    }
    renderCheckoutSummary();
    if (elements.checkoutForm) {
      elements.checkoutForm.reset();
    }
    elements.checkoutModal.classList.add('is-open');
    elements.checkoutModal.setAttribute('aria-hidden', 'false');
    summaryGenerated = false;
    if (elements.checkoutSuccess) {
      elements.checkoutSuccess.hidden = true;
    }
    if (elements.orderSummaryText) {
      elements.orderSummaryText.value = '';
    }
    lockScroll();
    window.requestAnimationFrame(() => {
      const focusTarget = document.querySelector('#customerName');
      if (focusTarget) {
        focusTarget.focus();
      }
    });
  };

  const closeCheckout = () => {
    if (!elements.checkoutModal) {
      return;
    }
    elements.checkoutModal.classList.remove('is-open');
    elements.checkoutModal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    if (state.cart.length === 0) {
      showToast('Ajoutez au moins un article avant de finaliser.');
      return;
    }
    if (elements.checkoutForm && typeof elements.checkoutForm.reportValidity === 'function') {
      if (!elements.checkoutForm.reportValidity()) {
        return;
      }
    }
    const formData = new FormData(elements.checkoutForm);
    const summary = buildOrderSummary(formData);
    elements.orderSummaryText.value = summary;
    elements.checkoutSuccess.hidden = false;
    summaryGenerated = true;
    announce('Votre récapitulatif de commande est prêt.');
    showToast('Récapitulatif généré avec succès.');
    elements.whatsappLink.href = `${whatsappShareBase}${encodeURIComponent(summary)}`;
  };

  const copySummaryToClipboard = async () => {
    const text = elements.orderSummaryText.value;
    if (!text) {
      showToast('Aucun récapitulatif à copier.');
      return;
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Récapitulatif copié dans le presse-papiers.');
    } catch (error) {
      console.error('Clipboard error:', error);
      showToast('Impossible de copier automatiquement. Sélectionnez le texte manuellement.');
    }
  };

  const resetFilters = () => {
    state.activeCategory = 'all';
    state.filters.clear();
    state.searchTerm = '';
    state.sort = 'recommended';
    if (elements.searchInput) {
      elements.searchInput.value = '';
    }
    if (elements.sortSelect) {
      elements.sortSelect.value = 'recommended';
    }
    elements.categoryButtons.forEach((button) => {
      const isAll = button.dataset.category === 'all';
      button.classList.toggle('is-active', isAll);
      button.setAttribute('aria-pressed', isAll ? 'true' : 'false');
    });
    elements.filterChips.forEach((chip) => {
      chip.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  };

  const closeAllOverlays = () => {
    if (elements.checkoutModal && elements.checkoutModal.classList.contains('is-open')) {
      closeCheckout();
      return true;
    }
    if (elements.productModal && elements.productModal.classList.contains('is-open')) {
      closeProductModal();
      return true;
    }
    if (elements.cartPanel && elements.cartPanel.classList.contains('is-open')) {
      closeCart();
      return true;
    }
    return false;
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      const closed = closeAllOverlays();
      if (closed) {
        event.preventDefault();
      }
    }
  };

  const bindEvents = () => {
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (event) => {
        state.searchTerm = event.target.value;
        applyFilters();
      });
    }

    elements.categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        state.activeCategory = button.dataset.category || 'all';
        elements.categoryButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        applyFilters();
      });
    });

    elements.filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        const isActive = state.filters.has(filter);
        if (isActive) {
          state.filters.delete(filter);
        } else {
          state.filters.add(filter);
        }
        chip.setAttribute('aria-pressed', isActive ? 'false' : 'true');
        applyFilters();
      });
    });

    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', (event) => {
        state.sort = event.target.value;
        applyFilters();
      });
    }

    if (elements.resetFiltersButton) {
      elements.resetFiltersButton.addEventListener('click', resetFilters);
    }

    if (elements.productGrid) {
      elements.productGrid.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (!action) {
          return;
        }
        const card = event.target.closest('.product-card');
        if (!card) {
          return;
        }
        const product = findProductById(card.dataset.productId);
        if (!product) {
          return;
        }
        if (action === 'details') {
          openProductModal(product);
          return;
        }
        if (action === 'add') {
          const select = card.querySelector('select');
          const size = select ? select.value : null;
          if (select && select.disabled) {
            showToast('Cette taille est momentanément indisponible.');
            return;
          }
          addToCart(product.id, size);
        }
      });
    }

    if (elements.cartItems) {
      elements.cartItems.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (!action) {
          return;
        }
        const itemElement = event.target.closest('.cart-item');
        if (!itemElement) {
          return;
        }
        const index = Number.parseInt(itemElement.dataset.cartIndex, 10);
        if (Number.isNaN(index)) {
          return;
        }
        if (action === 'increase') {
          changeQuantity(index, 1);
        } else if (action === 'decrease') {
          changeQuantity(index, -1);
        } else if (action === 'remove') {
          removeCartItem(index);
        }
      });
    }

    if (elements.openCartButton) {
      elements.openCartButton.addEventListener('click', () => {
        renderCart();
        openCart();
      });
    }

    if (elements.floatingCartButton) {
      elements.floatingCartButton.addEventListener('click', () => {
        renderCart();
        openCart();
      });
    }

    if (elements.cartPanel) {
      elements.cartPanel.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'close-cart' || event.target === elements.cartPanel.querySelector('.cart-panel__backdrop')) {
          closeCart();
        }
      });
    }

    if (elements.productModal) {
      elements.productModal.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'close-modal' || event.target === elements.productModal.querySelector('.modal__backdrop')) {
          closeProductModal();
        }
      });
    }

    if (elements.checkoutModal) {
      elements.checkoutModal.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'close-checkout' || event.target === elements.checkoutModal.querySelector('.modal__backdrop')) {
          closeCheckout();
        }
      });
    }

    if (elements.clearCartButton) {
      elements.clearCartButton.addEventListener('click', clearCart);
    }

    if (elements.startCheckoutButton) {
      elements.startCheckoutButton.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Votre panier est vide. Ajoutez un article.');
          return;
        }
        closeCart();
        openCheckout();
      });
    }

    if (elements.checkoutForm) {
      elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    if (elements.copySummaryButton) {
      elements.copySummaryButton.addEventListener('click', copySummaryToClipboard);
    }

    if (elements.whatsappLink) {
      elements.whatsappLink.addEventListener('click', () => {
        if (!elements.orderSummaryText.value) {
          showToast('Générez le récapitulatif avant de partager.');
        }
      });
    }

    if (elements.menuToggle && elements.mainNav) {
      elements.menuToggle.addEventListener('click', () => {
        const isOpen = elements.mainNav.classList.toggle('is-open');
        elements.menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (elements.mainNav && elements.mainNav.classList.contains('is-open')) {
          elements.mainNav.classList.remove('is-open');
          if (elements.menuToggle) {
            elements.menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });

    window.addEventListener('resize', () => {
      if (elements.mainNav && window.innerWidth > 1024 && elements.mainNav.classList.contains('is-open')) {
        elements.mainNav.classList.remove('is-open');
        if (elements.menuToggle) {
          elements.menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', handleKeydown);
  };

  const init = () => {
    applyFilters();
    updateCart();
    bindEvents();
  };

  init();
})();
