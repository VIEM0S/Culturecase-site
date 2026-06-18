// ══ DONNÉES STATIQUES ═══════════════════════════════════════════════════════
// Toutes les données viennent de Firestore (firebase-init.js).
// DS est initialisé vide — rempli dès que Firestore répond (~500ms).
const DS = [];

// stock réel par design × modèle — extrait du backup 31/05/2026
const STOCK_MAP = {
  D1: {
    "iPhone 12": 2,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 2,
    "iPhone 13 Pro": 1,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 2,
    "iPhone 15": 1,
    "iPhone 15 Plus": 1,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 5,
    "iPhone 17 Pro Max": 6,
  },
  D2: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 2,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 1,
    "iPhone 15": 2,
    "iPhone 15 Plus": 2,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 1,
    "iPhone 17": 0,
    "iPhone 17 Air": 1,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D3: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 1,
    "iPhone 13 Pro": 1,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 1,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 2,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 0,
    "iPhone 17 Pro Max": 0,
  },
  D4: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 1,
    "iPhone 17": 0,
    "iPhone 17 Air": 1,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D5: {
    "iPhone 12": 3,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 3,
    "iPhone 13 Pro": 1,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 2,
    "iPhone 14 Pro": 1,
    "iPhone 14 Pro Max": 1,
    "iPhone 15": 1,
    "iPhone 15 Plus": 1,
    "iPhone 15 Pro": 1,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 1,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D6: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 1,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 1,
    "iPhone 14": 2,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 1,
    "iPhone 15 Pro": 1,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 1,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D7: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 2,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 1,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 1,
    "iPhone 17 Pro": 0,
    "iPhone 17 Pro Max": 0,
  },
  D8: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 2,
    "iPhone 14": 2,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 1,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 1,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D9: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 1,
    "iPhone 13 Pro": 1,
    "iPhone 13 Pro Max": 2,
    "iPhone 14": 0,
    "iPhone 14 Plus": 3,
    "iPhone 14 Pro": 1,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D10: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 1,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 2,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 1,
  },
  D11: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 2,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 1,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 1,
    "iPhone 15 Pro": 2,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 1,
    "iPhone 17 Pro": 0,
    "iPhone 17 Pro Max": 1,
  },
  D12: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 1,
    "iPhone 14": 0,
    "iPhone 14 Plus": 1,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 1,
    "iPhone 15": 1,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 1,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 9,
  },
  D13: {},
  D14: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 1,
    "iPhone 14": 1,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 1,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 1,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 3,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 2,
  },
  D15: {},
  D16: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 1,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 2,
    "iPhone 17 Pro Max": 1,
  },
  D17: {},
  D18: {},
  D19: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 2,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 1,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D20: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 1,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 1,
    "iPhone 14 Plus": 2,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 2,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D21: {},
  D22: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 0,
    "iPhone 17 Pro Max": 1,
  },
  D25: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 1,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D28: {
    "iPhone 12": 1,
    "iPhone 12 Pro Max": 1,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 1,
    "iPhone 14": 1,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 2,
    "iPhone 17 Pro Max": 0,
  },
  D33: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 2,
    "iPhone 17 Pro Max": 0,
  },
  D34: {},
  D42: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 1,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 3,
    "iPhone 17 Pro": 2,
    "iPhone 17 Pro Max": 2,
  },
  D43: {},
  D44: {
    "iPhone 12": 0,
    "iPhone 12 Pro Max": 0,
    "iPhone 13": 0,
    "iPhone 13 Pro": 0,
    "iPhone 13 Pro Max": 0,
    "iPhone 14": 0,
    "iPhone 14 Plus": 0,
    "iPhone 14 Pro": 0,
    "iPhone 14 Pro Max": 0,
    "iPhone 15": 0,
    "iPhone 15 Plus": 0,
    "iPhone 15 Pro": 0,
    "iPhone 15 Pro Max": 0,
    "iPhone 16": 0,
    "iPhone 16 Plus": 0,
    "iPhone 16 Pro": 0,
    "iPhone 16 Pro Max": 0,
    "iPhone 17": 0,
    "iPhone 17 Air": 0,
    "iPhone 17 Pro": 1,
    "iPhone 17 Pro Max": 0,
  },
  D45: {},
  D46: {},
};

function getModelStock(designId, model) {
  const map = STOCK_MAP[designId] || {};
  return map[model] ?? -1; // -1 = pas de données
}

function getDesignGlobalStatus(designId) {
  const map = STOCK_MAP[designId] || {};
  const vals = Object.values(map);
  if (vals.length === 0) return "unknown";
  const total = vals.reduce((a, b) => a + b, 0);
  const dispo = vals.filter((v) => v > 0).length;
  if (total === 0) return "out";
  if (dispo <= 3) return "limited";
  return "available";
}

// NOTE: Ces tableaux sont mutables — Firebase les met à jour en temps réel
// MDS_G1 = modèles ≤ 3 500 FCFA | MDS_G2 = modèles > 3 500 FCFA
const MDS_G1 = [
  "iPhone 12",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
];
const MDS_G2 = [
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 17",
  "iPhone 17 Air",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
];
const ALL_MDS = [...MDS_G1, ...MDS_G2]; // Firebase remplace le contenu via .length=0 + push

let curD = null,
  dQty = 1,
  prevPg = "catalogue",
  activeTag = "all",
  stockFilter = "all";

function fp(n) {
  return Number(n).toLocaleString("fr-FR") + " FCFA";
}

// ticker
const tItems = [
  "BOGOLAN",
  "DJENNÉ",
  "N'KO",
  "TOUAREG",
  "AFRICA",
  "CIWARA",
  "MUNYU",
  "WAX",
  "SARAMAYA",
  "AFRO QUEEN",
  "BÈNKADI",
  "MASQUE DOGON",
  "DJOLIBA",
  "NYA",
  "SABABU",
  "WARI",
  "MONUMENT DU MALI",
];

// Le script est après le DOM — on initialise directement
const tEl = document.getElementById("ttick");
if (tEl) {
  const tH = tItems
    .map(
      (x) => `<span class="tk-item"><span class="tk-dot"></span>${x}</span>`,
    )
    .join("");
  tEl.innerHTML = tH + tH;
}
// Année dynamique dans le footer
const fyEl = document.getElementById("footer-year");
if (fyEl) fyEl.textContent = new Date().getFullYear();
initHome();

function getModelPrice(model) {
  // Source unique : prix réels Firestore via window.MODEL_PRICES
  if (window.MODEL_PRICES && window.MODEL_PRICES[model] != null)
    return Number(window.MODEL_PRICES[model]);
  return MDS_G1.includes(model) ? 3500 : 5000; // fallback statique
}
function getPrice(model) {
  return fp(getModelPrice(model));
}

function updatePrice() {
  if (!curD) return;
  const model = document.getElementById("d-mod").value;
  const sb = document.getElementById("d-stock-badge");
  const waBtn = document.getElementById("wa-order-btn");
  const waSpan = waBtn.querySelector("span");
  const cartBtn = document.getElementById("det-cart-btn");

  // Aucun modèle disponible
  if (!model) {
    sb.className = "det-stock out";
    sb.innerHTML =
      '<i class="ti ti-alert-circle"></i> Aucun modèle disponible';
    waBtn.disabled = true;
    waBtn.style.opacity = ".35";
    waBtn.style.cursor = "not-allowed";
    waSpan.textContent = "Aucun modèle disponible";
    if (cartBtn) {
      cartBtn.disabled = true;
      cartBtn.style.opacity = ".35";
    }
    document.getElementById("d-price-display").textContent = "—";
    return;
  }

  const qty = getModelStock(curD.id, model);
  const price = getModelPrice(model);

  // Ajuster dQty si dépasse le stock (ignorer si qty=-1 = pas de données)
  if (qty > 0 && dQty > qty) {
    dQty = Math.max(1, qty);
    document.getElementById("d-qty").textContent = dQty;
  }
  const plusBtn = document.querySelectorAll(".qb")[1];
  if (plusBtn)
    plusBtn.style.opacity = qty > 0 && dQty >= qty ? ".3" : "1";

  document.getElementById("d-price-display").textContent =
    fp(price) + " × " + dQty + " = " + fp(price * dQty);

  if (qty === -1) {
    // Pas de données stock — on laisse commander
    sb.className = "det-stock available";
    sb.innerHTML = '<i class="ti ti-circle-check"></i> En stock';
    waBtn.disabled = false;
    waBtn.style.opacity = "1";
    waBtn.style.cursor = "pointer";
    waSpan.textContent = "Commander";
    if (cartBtn) {
      cartBtn.disabled = false;
      cartBtn.style.opacity = "1";
    }
  } else if (qty === 0) {
    sb.className = "det-stock out";
    sb.innerHTML = '<i class="ti ti-clock"></i> Rupture pour ce modèle';
    waBtn.disabled = true;
    waBtn.style.opacity = ".35";
    waBtn.style.cursor = "not-allowed";
    waSpan.textContent = "Indisponible pour ce modèle";
    if (cartBtn) {
      cartBtn.disabled = true;
      cartBtn.style.opacity = ".35";
    }
  } else if (qty <= 2) {
    sb.className = "det-stock limited";
    sb.innerHTML = `<i class="ti ti-alert-triangle"></i> Plus que ${qty} en stock — commandez vite`;
    waBtn.disabled = false;
    waBtn.style.opacity = "1";
    waBtn.style.cursor = "pointer";
    waSpan.textContent = "Commander";
    if (cartBtn) {
      cartBtn.disabled = false;
      cartBtn.style.opacity = "1";
    }
  } else {
    sb.className = "det-stock available";
    sb.innerHTML = '<i class="ti ti-circle-check"></i> En stock';
    waBtn.disabled = false;
    waBtn.style.opacity = "1";
    waBtn.style.cursor = "pointer";
    waSpan.textContent = "Commander";
    if (cartBtn) {
      cartBtn.disabled = false;
      cartBtn.style.opacity = "1";
    }
  }
  syncMobileBar();
}

function toast(msg) {
  const el = document.getElementById("toast-el");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

// ══ IMAGES STATIQUES (hero + about) — pilotées depuis Firestore ══════════
// settings.heroImages  = [{id:"D12",w:400},{id:"D1",w:300},{id:"D13",w:300}]
// settings.aboutImages = [{id:"D14",w:500},{id:"D3",w:300},{id:"D28",w:300}]
const DEFAULT_HERO_IMAGES  = [{id:"D12",w:400},{id:"D1",w:300},{id:"D13",w:300}];
const DEFAULT_ABOUT_IMAGES = [{id:"D14",w:500},{id:"D3",w:300},{id:"D28",w:300}];

function renderStaticImages(heroImages, aboutImages) {
  const heroList  = (heroImages  && heroImages.length)  ? heroImages  : DEFAULT_HERO_IMAGES;
  const aboutList = (aboutImages && aboutImages.length) ? aboutImages : DEFAULT_ABOUT_IMAGES;
  heroList.forEach((cfg, i) => {
    const design = DS.find((d) => d.id === cfg.id);
    if (!design) return;
    const imgEl = document.getElementById("hero-img-"+i+"-src");
    const lblEl = document.getElementById("hero-img-"+i+"-lbl");
    const wrap  = document.getElementById("hero-img-"+i);
    if (imgEl) imgEl.src = cldImg(design.img, cfg.w || 300);
    if (lblEl) lblEl.textContent = design.name;
    if (wrap)  wrap.onclick = () => openDet(design.id);
  });
  aboutList.forEach((cfg, i) => {
    const design = DS.find((d) => d.id === cfg.id);
    if (!design) return;
    const imgEl = document.getElementById("about-img-"+i+"-src");
    if (imgEl) imgEl.src = cldImg(design.img, cfg.w || 300);
  });
}

// ══ CLOUDINARY — optimisation automatique des images ══════════════════════
// Injecte w_auto,f_auto,q_auto dans les URLs Cloudinary pour 3-5x moins de poids
function cldImg(url, w) {
  if (!url) return ""; // guard — pas de requête vide
  if (!url.includes("cloudinary.com")) return url;
  var width = w || 500;
  return url.replace(
    "/upload/",
    "/upload/w_" + width + ",f_auto,q_auto/",
  );
}

// ══ BLOG — Firestore (géré depuis culturecase-gs) ══════════════════════════
let BLOG = []; // rempli en temps réel depuis la collection blog_posts

// ── Échappement HTML anti-XSS pour le contenu utilisateur/Firestore ───────
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Rendu markdown minimal pour le contenu des articles de blog ───────────
function renderMarkdown(md, images) {
  if (!md) return "";
  const imgs = images || [];
  let html = escapeHTML(md);

  // Titres
  html = html.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Gras + italique (gras+italique combiné en premier)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Citation
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

  // Séparateur
  html = html.replace(/^---$/gm, "<hr>");

  // Listes non ordonnées
  html = html.replace(/^[*-] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

  // Liens — escapeHTML a déjà transformé les caractères, on cible la forme échappée
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => {
    // Bloquer javascript:, data:, vbscript: et toute URL non http(s)
    const safe = /^https?:\/\//i.test(url.trim());
    if (!safe) return escapeHTML(text); // afficher le texte brut sans lien
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Images par URL directe (legacy)
  html = html.replace(
    /!\[(.+?)\]\((.+?)\)/g,
    '<img src="$2" alt="$1" loading="lazy">',
  );

  // Repères de galerie {img:N} → résolus depuis le tableau images de l'article
  html = html.replace(/\{img:(\d+)\}/g, (m, n) => {
    const url = imgs[parseInt(n, 10) - 1];
    if (!url) return "";
    const safeUrl = cldImg(url, 800);
    return `<img src="${safeUrl}" alt="Image ${n}" loading="lazy">`;
  });

  // Code inline
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");

  // Paragraphes — ligne par ligne, on saute les lignes déjà transformées en bloc HTML
  html = html
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (/^<(h[1-4]|ul|ol|li|blockquote|hr|img|p|a)/.test(trimmed))
        return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

// ── Estimation du temps de lecture (≈200 mots/min) ─────────────────────────
function estimateReadTime(text) {
  if (!text) return "1 min";
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return mins + " min";
}

// ── Conversion Firestore Timestamp → date FR lisible ────────────────────
function formatBlogDate(ts) {
  try {
    const d = ts && typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return "";
  }
}

function listenBlog() {
  if (window.__blogListening) return;
  window.__blogListening = true;

  const { collection, query, where, orderBy, onSnapshot } =
    window.__firestoreAPI;
  const q = query(
    collection(window.__db, "blog_posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );

  onSnapshot(
    q,
    function (snap) {
      BLOG = snap.docs.map(function (d) {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          images: data.images || [],
          img: data.cover || data.img || "",
          tag: data.tags?.[0] || "culture",
          tags: data.tags || [],
          createdAt: data.createdAt,
          date: formatBlogDate(data.createdAt),
          read: estimateReadTime(data.content),
          published: data.published,
        };
      });
      if (document.querySelector(".pg.on")?.id === "pg-blog")
        renderBlog();
    },
    function (err) {
      console.error("[CultureCase] Blog Firestore error:", err);
    },
  );
}

let activeBlogTag = "all";

function filterBlog(tag, btn) {
  activeBlogTag = tag;
  document
    .querySelectorAll(".blog-cats .ftag")
    .forEach((x) => x.classList.remove("on"));
  if (btn) btn.classList.add("on");
  renderBlog();
}

function renderBlog() {
  if (!BLOG || BLOG.length === 0) return; // garde — laisse le skeleton visible tant que Firestore n'a pas répondu
  const filtered = BLOG.filter(
    (b) => activeBlogTag === "all" || b.tag === activeBlogTag,
  );
  const grid = document.getElementById("blog-grid");
  if (!grid) return;
  let html = "";
  filtered.forEach((b, i) => {
    const eid = escapeHTML(b.id);
    const etitle = escapeHTML(b.title);
    const etag = escapeHTML(b.tag);
    const eexcerpt = escapeHTML(b.excerpt);
    const edate = escapeHTML(b.date);
    const eread = escapeHTML(b.read);
    if (i === 0 && activeBlogTag === "all") {
      html += `<div class="blog-featured" data-blog-id="${eid}" style="cursor:pointer">
  <div class="bf-img"><img src="${cldImg(b.img, 600)}" alt="${etitle}" loading="lazy"></div>
  <div class="bf-body">
    <span class="bf-tag">${etag}</span>
    <div class="bf-title">${etitle}</div>
    <div class="bf-excerpt">${eexcerpt}</div>
    <div class="bf-meta"><span class="bf-date">${edate}</span><span>·</span><span>${eread}</span></div>
  </div>
</div>`;
    } else {
      html += `<div class="bcard" data-blog-id="${eid}" style="cursor:pointer">
  <div class="bc-img"><img src="${cldImg(b.img, 600)}" alt="${etitle}" loading="lazy"></div>
  <div class="bc-body">
    <span class="bc-tag">${etag}</span>
    <div class="bc-title">${etitle}</div>
    <div class="bc-excerpt">${eexcerpt}</div>
    <div class="bc-meta"><span class="bc-date">${edate}</span><span>·</span><span>${eread}</span></div>
  </div>
</div>`;
    }
  });
  grid.innerHTML =
    html ||
    `<p style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">Aucun article dans cette catégorie pour l'instant.</p>`;
  grid.onclick = function (e) {
    const card = e.target.closest("[data-blog-id]");
    if (card) openBlog(card.dataset.blogId);
  };
}

function openBlog(id) {
  const b = BLOG.find((x) => x.id === id);
  if (!b) return;
  document.getElementById("bd-tag").textContent = b.tag;
  document.getElementById("bd-title").textContent = b.title;
  document.getElementById("bd-date").textContent = b.date;
  document.getElementById("bd-read").textContent = b.read;
  document.getElementById("bd-img").src = cldImg(b.img, 900);
  document.getElementById("bd-content").innerHTML = renderMarkdown(
    b.content,
    b.images,
  );
  // related
  const rel = BLOG.filter((x) => x.id !== id).slice(0, 3);
  const relGrid = document.getElementById("bd-related");
  relGrid.innerHTML = rel
    .map(
      (r) => `<div class="bcard" data-blog-id="${escapeHTML(r.id)}" style="cursor:pointer">
    <div class="bc-img"><img src="${cldImg(r.img, 400)}" alt="${escapeHTML(r.title)}" loading="lazy"></div>
    <div class="bc-body"><span class="bc-tag">${escapeHTML(r.tag)}</span><div class="bc-title">${escapeHTML(r.title)}</div><div class="bc-meta"><span class="bc-date">${escapeHTML(r.date)}</span><span>·</span><span>${escapeHTML(r.read)}</span></div></div>
  </div>`,
    )
    .join("");
  relGrid.onclick = function (e) {
    const card = e.target.closest("[data-blog-id]");
    if (card) openBlog(card.dataset.blogId);
  };
  go("blogdet");
  // Écrire l'ID dans l'URL pour que le lien soit partageable et survivre au rafraîchissement
  history.replaceState(null, "", "#/blog/" + encodeURIComponent(id));
  updatePageTitle(null, b.title + " — Blog CultureCase");
}

function toggleMobileMenu() {
  const ham = document.getElementById("nav-ham");
  const menu = document.getElementById("nav-mobile");
  ham.classList.toggle("open");
  menu.classList.toggle("open");
}

// ── Sticky mobile order bar ───────────────────────────────────────────────
var CART = []; // [{ designId, name, img, model, qty, price }]

// ── Persistance panier (localStorage) ────────────────────────────────────────
function saveCart() {
  try {
    localStorage.setItem("cc_cart", JSON.stringify(CART));
  } catch (e) {}
}
function loadCart() {
  try {
    const raw = localStorage.getItem("cc_cart");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      CART.length = 0;
      parsed.forEach((i) => CART.push(i));
    }
  } catch (e) {}
}
loadCart(); // Restaurer au chargement
function syncMobileBar() {
  if (typeof CART !== "undefined") updateCartBadge();
  if (window.innerWidth > 640) return;
  const bar = document.getElementById("mobile-order-bar");
  const pg = document.querySelector(".pg.on")?.id;
  if (!bar) return;

  // Masquer si pas sur page détail ou curD pas défini
  if (pg !== "pg-detail" || !curD) {
    bar.style.display = "none";
    return;
  }

  // Masquer si toutes ruptures de stock
  const hasStock = ALL_MDS.some((m) => getModelStock(curD.id, m) > 0);
  if (!hasStock) {
    bar.style.display = "none";
    return;
  }

  bar.style.display = "block";
  const nameEl = document.getElementById("mob-design-name");
  const priceEl = document.getElementById("mob-price");
  if (nameEl) nameEl.textContent = curD.name;
  if (priceEl) {
    const priceBox = document.getElementById("d-price-display");
    priceEl.textContent = priceBox ? priceBox.textContent : "";
  }
}

// Délégation — cartes catalogue et home (remplace onclick inline)
document.addEventListener("click", function (e) {
  var card = e.target.closest("[data-det-id]");
  if (card) { e.stopPropagation(); openDet(card.dataset.detId); return; }
});

// Fermer le menu si clic en dehors
document.addEventListener("click", function (e) {
  const ham = document.getElementById("nav-ham");
  const menu = document.getElementById("nav-mobile");
  if (
    ham &&
    menu &&
    !ham.contains(e.target) &&
    !menu.contains(e.target)
  ) {
    ham.classList.remove("open");
    menu.classList.remove("open");
  }
});

// Afficher hamburger sur mobile
function checkMobile() {
  const ham = document.getElementById("nav-ham");
  if (ham) ham.style.display = window.innerWidth <= 640 ? "flex" : "none";
  syncMobileBar();
}
window.addEventListener("resize", checkMobile);
checkMobile();

function go(p, opts) {
  var target = document.getElementById("pg-" + p);
  if (!target) {
    toast("⚠️ Page introuvable");
    return;
  }
  document
    .querySelectorAll(".pg")
    .forEach((x) => x.classList.remove("on"));
  target.classList.add("on");
  document
    .querySelectorAll(".nb")
    .forEach((x) => x.classList.remove("on"));
  var nb = document.getElementById("nm-" + p);
  if (nb) nb.classList.add("on");
  var nbm = document.getElementById("nm-" + p + "-m");
  if (nbm) nbm.classList.add("on");
  window.scrollTo(0, 0);
  if (p === "catalogue") initCat();
  if (p === "home") initHome();
  if (p === "blog") renderBlog();
  syncMobileBar();
  updatePageTitle(p);
  // Écrire le hash sans déclencher un nouveau hashchange
  if (!opts || !opts.silent) {
    var newHash = (p === "home") ? "#/" : "#/" + p;
    if (location.hash !== newHash) history.pushState(null, "", newHash);
  }
}

const PAGE_TITLES = {
  home: "CultureCase — Coques iPhone · Bamako, Mali",
  catalogue: "Catalogue — CultureCase",
  about: "À propos — CultureCase",
  blog: "Blog — CultureCase",
  contact: "Contact — CultureCase",
  faq: "FAQ — CultureCase",
  livraison: "Livraison & Retours — CultureCase",
  politique: "Politique commerciale — CultureCase",
  paiement: "Modes de paiement — CultureCase",
};
function updatePageTitle(p, override) {
  document.title = override || PAGE_TITLES[p] || PAGE_TITLES.home;
}

function card(d) {
  const gmEl = document.getElementById("global-model");
  const gm = gmEl ? gmEl.value : "";

  // Badge dispo si modèle sélectionné
  let availBadge = "";
  let stockDot = '<span class="pc-stock-dot dot-ok"></span>';
  let stockHint = "Disponible";
  if (gm) {
    const qty = getModelStock(d.id, gm);
    if (qty === -1) {
      // Pas de données stock pour ce design × modèle
      availBadge = "";
      stockDot = '<span class="pc-stock-dot dot-out"></span>';
      stockHint = `Stock inconnu pour ${gm}`;
    } else if (qty > 0 && qty <= 3) {
      availBadge = `<div class="stock-badge stock-limited">Derniers</div>`;
      stockDot = '<span class="pc-stock-dot dot-lim"></span>';
      stockHint = `${qty} restant${qty > 1 ? "s" : ""} pour ${gm}`;
    } else if (qty > 3) {
      availBadge = `<div class="stock-badge stock-available">Dispo</div>`;
      stockHint = `En stock pour ${gm}`;
    } else {
      availBadge = `<div class="stock-badge stock-out">Rupture</div>`;
      stockDot = '<span class="pc-stock-dot dot-out"></span>';
      stockHint = `Rupture pour ${gm}`;
    }
  }

  const price = gm
    ? Number(getModelPrice(gm)).toLocaleString("fr-FR") + " FCFA"
    : "3 500 – 5 000 FCFA";
  const isOut = gm && getModelStock(d.id, gm) === 0;

  return `<div class="pcard${isOut ? " is-out" : ""}" tabindex="0" role="button" data-det-id="${d.id}" aria-label="Voir le design ${d.name}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDet('${d.id}')}">
    <div class="pc-img">
<img src="${cldImg(d.img, 400)}" alt="${d.name}" loading="lazy" onerror="this.parentNode.style.background='var(--sand)'">
<div class="pc-overlay">
  <button class="pc-ov-btn" data-det-id="${d.id}">Voir le design</button>
</div>
${availBadge}
    </div>
    <div class="pc-body">
<div class="pc-name">${d.name}</div>
<div class="pc-hint">${stockDot}${stockHint}</div>
<div class="pc-row">
  <div class="pc-price">${price}</div>
</div>
    </div>
  </div>`;
}

function goToCatalogueWithModel(model) {
  go("catalogue");
  if (model) {
    setTimeout(() => {
      const sel = document.getElementById("global-model");
      if (sel) {
        sel.value = model;
        onGlobalModelChange();
      }
    }, 100);
  }
}

function initHome() {
  if (!DS || DS.length === 0) return; // garde — laisse le skeleton visible tant que Firestore n'a pas répondu
  const grid = document.getElementById("home-grid");
  if (grid) grid.innerHTML = DS.slice(0, 8).map(card).join("");
  // Stats dynamiques
  const statD = document.getElementById("stat-designs");
  const statM = document.getElementById("stat-models");
  if (statD) statD.textContent = DS.length;
  if (statM) statM.textContent = ALL_MDS.length;
}

function initCat() {
  filt();
}

var activeSort = "popular"; // 'popular' | 'new'

function setSort(sort, btn) {
  activeSort = sort;
  document
    .querySelectorAll("#sort-pop, #sort-new")
    .forEach((b) => b.classList.remove("on"));
  btn.classList.add("on");
  const label = document.getElementById("cat-sort-label");
  if (label)
    label.textContent =
      sort === "popular"
        ? "Tous les designs"
        : "✦ Les 6 derniers ajoutés";
  filt();
}

function toggleDispo(btn) {
  const gm = document.getElementById("global-model")?.value || "";
  if (!gm) return; // guard — le bouton est disabled mais au cas où
  stockFilter = stockFilter === "available" ? "all" : "available";
  btn.classList.toggle("on");
  filt();
}

function onGlobalModelChange() {
  const sel = document.getElementById("global-model");
  const m = sel.value;
  sel.classList.toggle("chosen", !!m);
  const hint = document.getElementById("mb-price-hint");
  const info = document.getElementById("mb-info");
  // Activer/désactiver le bouton "Disponible" selon si un modèle est choisi
  const dispoBtn = document.getElementById("dispo-btn");
  if (dispoBtn) {
    if (m) {
      dispoBtn.disabled = false;
      dispoBtn.style.opacity = "1";
      dispoBtn.style.cursor = "pointer";
      dispoBtn.title = "";
    } else {
      dispoBtn.disabled = true;
      dispoBtn.style.opacity = ".38";
      dispoBtn.style.cursor = "not-allowed";
      dispoBtn.title = "Choisis d'abord ton modèle iPhone";
      // Désactiver le filtre si actif
      if (stockFilter === "available") {
        stockFilter = "all";
        dispoBtn.classList.remove("on");
      }
    }
  }
  if (m) {
    hint.textContent = Number(getModelPrice(m)).toLocaleString("fr-FR") + " FCFA";
    const dispo = DS.filter((d) => getModelStock(d.id, m) > 0).length;
    info.innerHTML = `<strong>${dispo} design${dispo > 1 ? "s" : ""}</strong> disponibles pour ${m}`;
  } else {
    if (hint) hint.textContent = "";
    if (info) info.textContent = "";
  }
  filt();
}

// Debounce — évite de re-render le catalogue à chaque frappe (réseau lent)
function _debounce(fn, delay) {
  var t;
  return function () { clearTimeout(t); t = setTimeout(fn, delay); };
}
var _filtDebounced = _debounce(function () { filt(); }, 200);

function filt() {
  if (!DS || DS.length === 0) return;
  const q = (document.getElementById("sinp")?.value || "")
    .trim()
    .toLowerCase();
  const gm = document.getElementById("global-model")?.value || "";
  let res = DS.filter((d) => {
    if (
      stockFilter === "available" &&
      gm &&
      getModelStock(d.id, gm) === 0
    )
      return false;
    if (q && !d.name.toLowerCase().includes(q)) return false;
    return true;
  });

  // Tri selon activeSort
  if (activeSort === "popular") {
    // TOUS — ordre éditorial DS[], ruptures totales en fin de liste
    const dsOrder = DS.map((d) => d.id);
    res.sort((a, b) => {
      const aOut = ALL_MDS.every((m) => getModelStock(a.id, m) === 0);
      const bOut = ALL_MDS.every((m) => getModelStock(b.id, m) === 0);
      if (aOut !== bOut) return aOut ? 1 : -1;
      return dsOrder.indexOf(a.id) - dsOrder.indexOf(b.id);
    });
  } else if (activeSort === "new") {
    // NOUVEAUTÉS — les 6 derniers ajoutés (fin de DS[]), du plus récent au plus ancien
    res = [...res].reverse().slice(0, 6);
  }

  // Compteur
  let countTxt = `${res.length} design${res.length > 1 ? "s" : ""}`;
  if (gm) {
    const dispo = res.filter((d) => getModelStock(d.id, gm) > 0).length;
    countTxt += ` · <span style="color:var(--leaf);font-weight:600">${dispo} disponible${dispo > 1 ? "s" : ""} pour ${gm}</span>`;
  }
  document.getElementById("cat-count").innerHTML = countTxt;
  document.getElementById("cat-grid").innerHTML = res.length
    ? res.map(card).join("")
    : `<p style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">Aucun résultat.</p>`;
}

function openDet(id) {
  prevPg =
    document.querySelector(".pg.on")?.id?.replace("pg-", "") ||
    "catalogue";
  curD = DS.find((d) => d.id === id);
  if (!curD) return;
  dQty = 1;
  document.getElementById("d-img").src = cldImg(curD.img, 800);
  document.getElementById("d-name").textContent = curD.name;
  document.getElementById("d-story").textContent = curD.story;
  document.getElementById("d-qty").textContent = "1";
  // sélecteur avec stock visible par modèle
  const sel = document.getElementById("d-mod");
  sel.innerHTML = ALL_MDS.map((m) => {
    const qty = getModelStock(curD.id, m);
    if (qty === 0) return "";
    let label = m;
    if (qty === 1) label += " — 1 restant";
    else if (qty <= 3) label += " — " + qty + " restants";
    return `<option value="${m}">${label}</option>`;
  })
    .filter(Boolean)
    .join("");
  if (!sel.innerHTML)
    sel.innerHTML = '<option value="">Aucun modèle disponible</option>';
  // pré-sélectionner le modèle global si choisi, sinon le premier dispo
  const gm = document.getElementById("global-model")?.value || "";
  // Utiliser gm seulement si ce modèle est bien disponible pour ce design
  const gmAvail = gm && getModelStock(curD.id, gm) > 0;
  const firstAvail = gmAvail
    ? gm
    : ALL_MDS.find((m) => getModelStock(curD.id, m) > 0) || "";
  if (firstAvail) sel.value = firstAvail;
  // pré-remplir infos client si mémorisées
  try {
    const sn = localStorage.getItem("cc_nom") || "";
    const st = localStorage.getItem("cc_tel") || "";
    if (sn) document.getElementById("lf-nom").value = sn;
    if (st) document.getElementById("lf-tel").value = st;
  } catch (e) {}
  updatePrice();
  // Écrire le hash avant go() pour que go() ne l'écrase pas
  var detHash = "#/design/" + curD.id;
  if (location.hash !== detHash) history.pushState(null, "", detHash);
  // Schema Product dynamique pour Google rich results
  injectProductSchema(curD);
  go("detail", { silent: true });
  updatePageTitle(null, curD.name + " — CultureCase");
}

function injectProductSchema(d) {
  // Supprimer l'éventuel schema précédent
  var old = document.getElementById("schema-product");
  if (old) old.remove();
  // Déterminer disponibilité et prix selon le modèle sélectionné
  var sel = document.getElementById("d-mod");
  var model = sel ? sel.value : "";
  var isG2 = model && MDS_G2.indexOf(model) !== -1;
  var price = String(getModelPrice(model) || (isG2 ? 5000 : 3500));
  var status = getDesignGlobalStatus(d.id);
  var availability = status === "out"
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";
  var img = cldImg(d.img, 800);
  var url = "https://viem0s.github.io/culturecase-site/#/design/" + d.id;
  var schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "CultureCase — " + d.name,
    "description": d.story,
    "image": img,
    "url": url,
    "brand": { "@type": "Brand", "name": "CultureCase" },
    "category": "Coque iPhone",
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "XOF",
      "price": price,
      "availability": availability,
      "seller": { "@type": "Organization", "name": "CultureCase" }
    }
  };
  var script = document.createElement("script");
  script.id = "schema-product";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function goBack() {
  if (history.length > 1) {
    history.back();
  } else {
    go(prevPg);
  }
}
function dq(d) {
  dQty = Math.max(1, dQty + d);
  document.getElementById("d-qty").textContent = dQty;
  updatePrice();
}

var _orderWALock = false;
function orderWA() {
  if (!curD) return;
  if (_orderWALock) return; // évite l'ouverture de plusieurs onglets WhatsApp sur double-clic
  const model = document.getElementById("d-mod").value;
  if (!model) {
    toast("⚠️ Choisis un modèle iPhone d'abord");
    return;
  }
  const nom = (document.getElementById("lf-nom").value || "").trim();
  const tel = (document.getElementById("lf-tel").value || "").trim();
  const quartier = (
    document.getElementById("lf-quartier").value || ""
  ).trim();
  if (!nom) {
    document.getElementById("lf-nom")?.focus();
    toast("⚠️ Indique ton prénom pour qu'on te retrouve");
    return;
  }
  if (!tel) {
    document.getElementById("lf-tel")?.focus();
    toast("⚠️ Indique ton numéro de téléphone");
    return;
  }
  if (tel.replace(/\D/g, "").length < 8) {
    document.getElementById("lf-tel")?.focus();
    toast("⚠️ Numéro trop court — vérifie ton numéro");
    return;
  }
  if (!quartier) {
    document.getElementById("lf-quartier")?.focus();
    toast("⚠️ Indique ton quartier pour la livraison");
    return;
  }
  _orderWALock = true;
  setTimeout(() => { _orderWALock = false; }, 1500);
  try {
    localStorage.setItem("cc_nom", nom);
    localStorage.setItem("cc_tel", tel);
    if (quartier) localStorage.setItem("cc_quartier", quartier);
  } catch (e) {}
  const safeQty = typeof dQty === "number" && dQty > 0 ? dQty : 1;
  const unitPrice = getModelPrice(model);
  const total = fp(unitPrice * safeQty);
  const qtyStr = safeQty > 1 ? ` · x${safeQty} → ${total}` : ` → ${total}`;
  let msg = `Bonjour ! Je voudrais commander :\n\n- *${curD.name}* · ${model}${qtyStr}\n\nJe m'appelle ${nom}`;
  if (quartier) msg += `, je suis à ${quartier}`;
  msg += `.\n📞 ${tel}\n\nMerci 🙏`;
  window.open(
    "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
    "_blank",
  );
  // Toast de confirmation
  toast("✓ Message WhatsApp ouvert — on te confirme sous 30 min !");
}

function orderQuick(id) {
  const d = DS.find((x) => x.id === id);
  if (!d) return;
  const gm = document.getElementById("global-model")?.value || "";
  const nom = (localStorage.getItem("cc_nom") || "").trim();
  const tel = (localStorage.getItem("cc_tel") || "").trim();

  // Validation — si infos manquantes, ouvrir la fiche produit pour que le client les remplisse
  if (!gm) {
    toast("⚠️ Choisis d'abord ton modèle iPhone en haut de la page");
    return;
  }
  const quartierQ = (localStorage.getItem("cc_quartier") || "").trim();
  if (!nom || !tel || tel.replace(/\D/g, "").length < 8 || !quartierQ) {
    openDet(id);
    setTimeout(() => toast("⚠️ Remplis ton prénom, numéro et quartier avant de commander"), 400);
    return;
  }

  const _price = fp(getModelPrice(gm));
  let msg = `Bonjour ! Je voudrais commander :\n\n- *${d.name}* · ${gm} → ${_price}`;
  msg += `\n\nJe m'appelle ${nom}, je suis à ${quartierQ}.\n📞 ${tel}\n\nMerci 🙏`;
  window.open(
    "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
    "_blank",
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SYSTÈME DE PANIER
// ══════════════════════════════════════════════════════════════════════════════

function getCartPrice(model) {
  return getModelPrice(model); // source unique via MODEL_PRICES
}

function cartTotal() {
  return CART.reduce((s, item) => s + item.price * item.qty, 0);
}

function updateCartBadge() {
  const total = CART.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cart-badge");
  const label = document.getElementById("cart-count-label");
  if (!badge) return;
  if (total > 0) {
    badge.textContent = total;
    badge.classList.add("visible");
    if (label)
      label.textContent = total + " article" + (total > 1 ? "s" : "");
  } else {
    badge.classList.remove("visible");
    if (label) label.textContent = "Panier";
  }
  document.getElementById("cart-total") &&
    (document.getElementById("cart-total").textContent = fp(cartTotal()));
}

function showCartToast(msg) {
  const t = document.getElementById("cart-toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

let _pickDesignId = null; // design en attente de choix de modèle

function addToCart(designId, modelOverride) {
  const d = DS.find((x) => x.id === designId);
  if (!d) return;

  // Bloquer si rupture totale sur tous les modèles
  const hasAnyStock = ALL_MDS.some((m) => getModelStock(designId, m) > 0);
  if (!hasAnyStock) {
    showCartToast("❌ " + d.name + " est épuisé");
    return;
  }

  const gm = document.getElementById("global-model")?.value || "";

  // Si modèle déjà connu ET en stock → ajout direct fluide
  if (modelOverride || gm) {
    const model = modelOverride || gm;
    // Vérifier le stock pour ce modèle précis
    if (getModelStock(designId, model) === 0) {
      // Ce modèle est épuisé → ouvrir la popup pour choisir un autre
      showCartToast("⚠️ " + model + " épuisé pour ce design");
      // Continuer vers la popup
    } else {
      _doAddToCart(designId, model);
      return;
    }
  }

  // Sinon → ouvrir la popup légère de choix de modèle
  _pickDesignId = designId;
  const nameEl = document.getElementById("model-pick-name");
  if (nameEl) nameEl.textContent = d.name;

  const sel = document.getElementById("model-pick-sel");
  if (sel) {
    sel.innerHTML = ALL_MDS.map((m) => {
      const stock = getModelStock(designId, m);
      if (stock === 0) return ""; // masquer complètement les ruptures
      const label =
        stock <= 2
          ? m + " — " + stock + " restant" + (stock > 1 ? "s" : "")
          : m;
      return `<option value="${m}">${label}</option>`;
    })
      .filter(Boolean)
      .join("");
    if (!sel.innerHTML)
      sel.innerHTML = '<option value="">Aucun modèle disponible</option>';
    // Pré-sélectionner le dernier modèle utilisé si dispo
    const lastModel = localStorage.getItem("cc_last_model");
    const firstDispo =
      lastModel && getModelStock(designId, lastModel) > 0
        ? lastModel
        : ALL_MDS.find((m) => getModelStock(designId, m) > 0);
    if (firstDispo) sel.value = firstDispo;
  }

  // Afficher la popup
  const overlay = document.getElementById("model-pick-overlay");
  const popup = document.getElementById("model-pick-popup");
  if (overlay) overlay.style.display = "block";
  if (popup) {
    popup.style.display = "block";
    setTimeout(() => (popup.style.transform = "translateY(0)"), 10);
  }
}

function closeModelPick() {
  const overlay = document.getElementById("model-pick-overlay");
  const popup = document.getElementById("model-pick-popup");
  if (popup) popup.style.transform = "translateY(100%)";
  setTimeout(() => {
    if (overlay) overlay.style.display = "none";
    if (popup) popup.style.display = "none";
  }, 300);
  _pickDesignId = null;
}

function confirmModelPick() {
  if (!_pickDesignId) return;
  const sel = document.getElementById("model-pick-sel");
  const model = sel ? sel.value : "";
  if (!model || model === "") {
    showCartToast("⚠️ Choisis un modèle");
    return;
  }
  try {
    localStorage.setItem("cc_last_model", model);
  } catch (e) {}
  const designId = _pickDesignId; // capturer avant closeModelPick() qui nullifie _pickDesignId
  closeModelPick();
  setTimeout(() => _doAddToCart(designId, model), 320);
}

function _doAddToCart(designId, model) {
  const d = DS.find((x) => x.id === designId);
  if (!d || !model) return;
  const price = getCartPrice(model);

  const existing = CART.find(
    (i) => i.designId === designId && i.model === model,
  );
  if (existing) {
    existing.qty++;
  } else {
    CART.push({
      designId,
      name: d.name,
      img: d.img,
      model,
      qty: 1,
      price,
    });
  }

  updateCartBadge();
  renderCartItems();
  saveCart();
  showCartToast("✓ " + d.name + " · " + model + " ajouté");
}

function removeFromCart(idx) {
  CART.splice(idx, 1);
  updateCartBadge();
  renderCartItems();
  saveCart();
}

function updateCartQty(idx, delta) {
  const item = CART[idx];
  if (!item) return;
  const _s = getModelStock(item.designId, item.model);
  const maxQty = _s > 0 ? _s : 99; // -1 = pas de données → on laisse libre
  item.qty = Math.min(maxQty, Math.max(1, item.qty + delta));
  updateCartBadge();
  renderCartItems();
  saveCart();
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");
  if (!container) return;

  if (CART.length === 0) {
    container.innerHTML = `
<div class="cart-empty">
  <div class="cart-empty-icon">🛒</div>
  <p>Ton panier est vide.<br>Ajoute des designs pour commander.</p>
  <button class="cart-empty-cta" onclick="closeCart();go('catalogue')">
    Voir le catalogue
  </button>
</div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  // Pré-remplir les champs avec localStorage
  try {
    const sn = localStorage.getItem("cc_nom") || "";
    const st = localStorage.getItem("cc_tel") || "";
    const sq = localStorage.getItem("cc_quartier") || "";
    setTimeout(() => {
      if (
        sn &&
        document.getElementById("cart-nom") &&
        !document.getElementById("cart-nom").value
      )
        document.getElementById("cart-nom").value = sn;
      if (
        st &&
        document.getElementById("cart-tel") &&
        !document.getElementById("cart-tel").value
      )
        document.getElementById("cart-tel").value = st;
      if (
        sq &&
        document.getElementById("cart-quartier") &&
        !document.getElementById("cart-quartier").value
      )
        document.getElementById("cart-quartier").value = sq;
    }, 50);
  } catch (e) {}

  // Construction sécurisée anti-XSS (textContent pour les données utilisateur)
  container.innerHTML = "";
  CART.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "cart-item";

    const imgBox = document.createElement("div");
    imgBox.className = "cart-item-img";
    if (item.img) {
      const img = document.createElement("img");
      img.src = cldImg(item.img, 120);
      img.alt = item.name;
      img.loading = "lazy";
      const fallback = document.createElement("span");
      fallback.style.cssText =
        "font-size:28px;display:none;align-items:center;justify-content:center;width:100%;height:100%";
      fallback.textContent = "📱";
      img.onerror = function () {
        this.style.display = "none";
        fallback.style.display = "flex";
      };
      imgBox.appendChild(img);
      imgBox.appendChild(fallback);
    } else {
      const fallback = document.createElement("span");
      fallback.style.cssText =
        "font-size:28px;display:flex;align-items:center;justify-content:center;width:100%;height:100%";
      fallback.textContent = "📱";
      imgBox.appendChild(fallback);
    }

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const nameEl = document.createElement("div");
    nameEl.className = "cart-item-name";
    nameEl.textContent = item.name;

    const modelEl = document.createElement("div");
    modelEl.className = "cart-item-model";
    modelEl.textContent = item.model;

    const bottom = document.createElement("div");
    bottom.className = "cart-item-bottom";

    const priceEl = document.createElement("div");
    priceEl.className = "cart-item-price";
    priceEl.textContent = fp(item.price * item.qty);

    const qtyEl = document.createElement("div");
    qtyEl.className = "cart-item-qty";
    const qtyMinus = document.createElement("button");
    qtyMinus.textContent = "−";
    qtyMinus.setAttribute("aria-label", "Diminuer la quantité");
    (function(i){ qtyMinus.onclick = function(){ updateCartQty(i, -1); }; })(idx);
    const qtySp = document.createElement("span");
    qtySp.textContent = item.qty;
    const qtyPlus = document.createElement("button");
    qtyPlus.textContent = "+";
    qtyPlus.setAttribute("aria-label", "Augmenter la quantité");
    (function(i){ qtyPlus.onclick = function(){ updateCartQty(i, +1); }; })(idx);
    qtyEl.appendChild(qtyMinus);
    qtyEl.appendChild(qtySp);
    qtyEl.appendChild(qtyPlus);

    bottom.appendChild(priceEl);
    bottom.appendChild(qtyEl);
    info.appendChild(nameEl);
    info.appendChild(modelEl);
    info.appendChild(bottom);

    const del = document.createElement("button");
    del.className = "cart-item-del";
    del.title = "Retirer";
    del.textContent = "✕";
    del.onclick = () => removeFromCart(idx);

    wrap.appendChild(imgBox);
    wrap.appendChild(info);
    wrap.appendChild(del);
    container.appendChild(wrap);
  });

  if (footer) {
    footer.style.display = "block";
    document.getElementById("cart-total").textContent = fp(cartTotal());
  }
}

function showOrderConfirmation(nom) {
  const items = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");
  if (!items) return;
  if (footer) footer.style.display = "none";

  const prenom = escapeHTML(nom.split(" ")[0]);
  items.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 1.5rem;text-align:center;flex:1;gap:1rem">
<div style="width:64px;height:64px;background:rgba(37,211,102,.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px">✓</div>
<div>
  <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--ink);margin-bottom:.3rem">Commande envoyée !</div>
  <div style="font-size:13px;color:var(--muted);line-height:1.6">Merci ${prenom} 🙏<br>Ton message WhatsApp a bien été ouvert.<br>On te confirme <strong style="color:var(--ink)">sous 30 min</strong>.</div>
</div>
<div style="background:var(--sand);border-radius:var(--radius-lg);padding:1rem 1.25rem;width:100%;font-size:12px;color:var(--muted);line-height:1.8;text-align:left">
  <div style="font-weight:700;color:var(--ink);margin-bottom:.4rem;font-size:11px;letter-spacing:1px">ET APRÈS ?</div>
  <div>📲 Envoie le message WhatsApp si ce n'est pas encore fait</div>
  <div>⏱ On te répond sous 30 min avec confirmation</div>
  <div>🛵 Livraison le jour même ou le lendemain</div>
</div>
<div style="display:flex;gap:8px;width:100%;margin-top:.5rem">
  <button onclick="closeCart();go('catalogue')"
    style="flex:1;padding:10px;background:var(--ember);color:#fff;border:none;border-radius:var(--radius);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">
    Continuer les achats
  </button>
  <button onclick="closeCart()"
    style="padding:10px 16px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:var(--radius);font-size:13px;cursor:pointer;font-family:inherit">
    Fermer
  </button>
</div>
    </div>`;
}

function openCart() {
  renderCartItems();
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", _cartEscHandler);
}

function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", _cartEscHandler);
}
function _cartEscHandler(e) {
  if (e.key === "Escape") closeCart();
}

function cartOrderWA() {
  if (CART.length === 0) return;
  const nom = (document.getElementById("cart-nom").value || "").trim();
  const tel = (document.getElementById("cart-tel").value || "").trim();
  const quartier = (
    document.getElementById("cart-quartier").value || ""
  ).trim();

  // Validation avec messages ciblés
  if (!nom) {
    document.getElementById("cart-nom").focus();
    showCartToast("⚠️ Indique ton prénom");
    return;
  }
  if (!tel) {
    document.getElementById("cart-tel").focus();
    showCartToast("⚠️ Indique ton numéro de téléphone");
    return;
  }
  if (tel.replace(/\D/g, "").length < 8) {
    document.getElementById("cart-tel").focus();
    showCartToast("⚠️ Numéro trop court — vérifie ton numéro");
    return;
  }
  if (!quartier) {
    document.getElementById("cart-quartier").focus();
    showCartToast("⚠️ Indique ton quartier pour la livraison");
    return;
  }

  // Mémoriser infos client
  try {
    localStorage.setItem("cc_nom", nom);
    localStorage.setItem("cc_tel", tel);
    if (quartier) localStorage.setItem("cc_quartier", quartier);
  } catch (e) {}

  // Message naturel — du point de vue du client
  let msg = "Bonjour ! Je voudrais commander :\n\n";
  CART.forEach((item) => {
    const ligne = item.qty > 1
      ? `- *${item.name}* · ${item.model} · x${item.qty} → ${fp(item.price * item.qty)}`
      : `- *${item.name}* · ${item.model} → ${fp(item.price)}`;
    msg += ligne + "\n";
  });
  if (CART.length > 1) msg += `\n*Total : ${fp(cartTotal())}*\n`;
  msg += `\nJe m'appelle ${nom}`;
  if (quartier) msg += `, je suis à ${quartier}`;
  msg += `.\n📞 ${tel}\n\nMerci 🙏`;

  // Ouvrir WhatsApp
  var waOpened = window.open(
    "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
    "_blank",
  );

  // Vider le panier après 1,5s — laisse le temps à WhatsApp de s'ouvrir.
  // Si le popup est bloqué (waOpened === null), on ne vide pas et on prévient.
  if (waOpened === null) {
    showCartToast("⚠️ Popup bloqué — autorise les popups puis réessaie.");
    if (btn) { btn.disabled = false; btn.textContent = "Commander via WhatsApp →"; }
    return;
  }
  setTimeout(function () {
    CART.length = 0;
    saveCart();
    updateCartBadge();
    showOrderConfirmation(nom);
  }, 1500);
}

// Ajouter depuis la page détail au panier
function addToCartFromDet() {
  if (!curD) return;
  const model = document.getElementById("d-mod").value;
  if (!model) {
    showCartToast("⚠️ Choisis un modèle iPhone d'abord");
    return;
  }
  const stock = getModelStock(curD.id, model);
  if (stock === 0) {
    showCartToast("❌ Ce modèle est épuisé");
    return;
  }
  const price = getCartPrice(model);
  const existing = CART.find(
    (i) => i.designId === curD.id && i.model === model,
  );
  if (existing) {
    const newQty = existing.qty + dQty;
    existing.qty = stock > 0 ? Math.min(newQty, stock) : newQty;
  } else {
    const qty = stock > 0 ? Math.min(dQty, stock) : dQty;
    CART.push({
      designId: curD.id,
      name: curD.name,
      img: curD.img,
      model,
      qty,
      price,
    });
  }
  updateCartBadge();
  renderCartItems();
  saveCart();
  showCartToast("✓ " + curD.name + " · " + model + " ajouté au panier");
  openCart();
}

function sendContact() {
  const n = document.getElementById("cf-n").value.trim();
  const m = document.getElementById("cf-m").value.trim();
  if (!n) {
    toast("⚠️ Votre nom est requis");
    return;
  }
  if (m.length < 10) {
    toast("⚠️ Votre message est trop court");
    return;
  }
  const msg = encodeURIComponent(
    `Bonjour CultureCase 👋\nNom : ${n}\nTéléphone : ${document.getElementById("cf-p").value}\n\n${m}`,
  );
  window.open("https://wa.me/22375992482?text=" + msg, "_blank");
}

// ══ SYSTÈME D'AVIS ═══════════════════════════════════════════════════════════
var _stars = 0;

function pickStar(n) {
  _stars = n;
  document.querySelectorAll("#star-row span").forEach(function (s, i) {
    s.style.color = n > 0 && i < n ? "var(--gold)" : "var(--border2)";
  });
}

function submitAvis() {
  var nom = (document.getElementById("av-nom").value || "").trim();
  var loc = (document.getElementById("av-loc").value || "").trim();
  var txt = (document.getElementById("av-txt").value || "").trim();
  var err = document.getElementById("av-err");
  if (!_stars) {
    err.textContent = "Veuillez choisir une note.";
    err.style.display = "block";
    return;
  }
  if (!nom) {
    err.textContent = "Veuillez indiquer votre prénom.";
    err.style.display = "block";
    return;
  }
  if (txt.length < 15) {
    err.textContent = "Votre avis doit faire au moins 15 caractères.";
    err.style.display = "block";
    return;
  }
  err.style.display = "none";

  // Désactiver le bouton pendant l'envoi
  var btn = document.querySelector(
    '#av-err ~ button, .cf-btn[onclick="submitAvis()"]',
  );
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Envoi…";
  }

  var payload = {
    nom: nom,
    loc: loc || "Bamako, Mali",
    txt: txt,
    stars: _stars,
    status: "pending", // en attente de modération dans le back-office
    createdAt:
      window.__firestoreAPI && window.__firestoreAPI.serverTimestamp
        ? window.__firestoreAPI.serverTimestamp()
        : new Date().toISOString(),
  };

  var db = window.__db;
  var api = window.__firestoreAPI;

  function _doSubmit() {
    api
      .addDoc(api.collection(db, "reviews"), payload)
      .then(function () {
        _resetAvisForm();
        toast(
          "Merci " +
            nom.split(" ")[0] +
            " ! Votre avis est en cours de vérification. ✨",
        );
        go("home");
      })
      .catch(function (e) {
        console.error("[CultureCase] submitAvis error:", e);
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Publier mon avis →";
        }
        err.textContent = "Erreur d'envoi — vérifiez votre connexion.";
        err.style.display = "block";
      });
  }

  if (db && api && api.addDoc && api.collection) {
    var authObj = window.__auth;
    if (authObj && authObj.currentUser) {
      // Auth déjà prête → soumettre immédiatement
      _doSubmit();
    } else if (authObj) {
      // Auth en cours (réseau lent) → attendre max 6s
      var authWait = 0;
      var authPoll = setInterval(function () {
        authWait++;
        if (authObj.currentUser) {
          clearInterval(authPoll);
          _doSubmit();
        } else if (authWait > 30) {
          clearInterval(authPoll);
          if (btn) { btn.disabled = false; btn.textContent = "Publier mon avis →"; }
          err.textContent = "Connexion trop lente — réessayez dans quelques secondes.";
          err.style.display = "block";
        }
      }, 200);
    } else {
      _doSubmit(); // pas d'auth configurée (dev) → essai direct
    }
  } else {
    // Firestore pas encore prêt (rare) — on réessaie dans 2s
    if (btn) btn.textContent = "Connexion en cours…";
    setTimeout(submitAvis, 2000);
  }
}

function _resetAvisForm() {
  document.getElementById("av-nom").value = "";
  document.getElementById("av-loc").value = "";
  document.getElementById("av-txt").value = "";
  pickStar(0);
  var btn = document.querySelector('.cf-btn[onclick="submitAvis()"]');
  if (btn) {
    btn.disabled = false;
    btn.textContent = "Publier mon avis →";
  }
}

// ══ HASH ROUTING ════════════════════════════════════════════════════════════
function routeFromHash() {
  var hash = location.hash || "#/";
  // #/design/D12
  var detMatch = hash.match(/^#\/design\/(D\d+)$/);
  if (detMatch) {
    var id = detMatch[1];
    // DS peut ne pas encore être peuplé par Firebase — on attend si nécessaire
    var d = DS.find(function(x) { return x.id === id; });
    if (d) {
      openDet(id);
    } else {
      // Firebase pas encore prêt — réessayer après chargement
      var attempts = 0;
      var retry = setInterval(function() {
        attempts++;
        var d2 = DS.find(function(x) { return x.id === id; });
        if (d2) { clearInterval(retry); openDet(id); }
        if (attempts > 20) { clearInterval(retry); go("catalogue"); }
      }, 200);
    }
    return;
  }
  // #/blog/<id> — lien article direct (partage WhatsApp, rafraîchissement)
  var blogMatch = hash.match(/^#\/blog\/(.+)$/);
  if (blogMatch) {
    var blogId = decodeURIComponent(blogMatch[1]);
    var found = BLOG.find(function(x) { return x.id === blogId; });
    if (found) {
      openBlog(blogId);
    } else {
      // BLOG pas encore chargé — réessayer
      var bAttempts = 0;
      var bRetry = setInterval(function() {
        bAttempts++;
        var b2 = BLOG.find(function(x) { return x.id === blogId; });
        if (b2) { clearInterval(bRetry); openBlog(blogId); }
        if (bAttempts > 25) { clearInterval(bRetry); go("blog"); }
      }, 200);
    }
    return;
  }
  // #/catalogue, #/blog, #/about, #/contact, etc.
  var pageMatch = hash.match(/^#\/([a-z]+)$/);
  if (pageMatch) {
    var pg = pageMatch[1];
    var known = ["home","catalogue","about","blog","contact","faq","livraison","politique","paiement","404"];
    if (known.indexOf(pg) !== -1) {
      go(pg, { silent: true });
      return;
    }
  }
  // #/ ou hash inconnu → page 404 (sauf racine, qui va à home)
  if (hash === "#/" || hash === "") {
    go("home", { silent: true });
  } else {
    go("404", { silent: true });
  }
}

window.addEventListener("hashchange", function() {
  routeFromHash();
});

// Routage initial au chargement de la page
routeFromHash();
