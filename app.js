const catalog = [
  { id: "horizon", type: "Film", title: "Au-delà de l’horizon", genre: "Aventure", description: "Une cartographe suit une lumière mystérieuse jusqu’aux limites du monde connu.", symbol: "✦", hue: 26, featured: true },
  { id: "signal", type: "Série", title: "Signal Zéro", genre: "Science-fiction", description: "Une équipe scientifique reçoit chaque nuit un message venant du futur.", symbol: "◉", hue: 216, featured: true },
  { id: "kora", type: "Animé", title: "Les Chroniques de Kora", genre: "Fantastique", description: "Une jeune gardienne apprend à maîtriser les histoires capables de changer la réalité.", symbol: "◆", hue: 278, featured: true },
  { id: "ink", type: "Manga", title: "Encre d’aube", genre: "Drame", description: "Deux artistes rivaux découvrent qu’ils dessinent les souvenirs de la même ville.", symbol: "✎", hue: 345, featured: false },
  { id: "river", type: "Documentaire", title: "La Mémoire du fleuve", genre: "Nature", description: "Un voyage fictif au fil d’un grand fleuve et des communautés qui le protègent.", symbol: "≈", hue: 168, featured: false },
  { id: "orbit", type: "Film", title: "Orbite 17", genre: "Mystère", description: "À bord d’une station silencieuse, une pilote cherche l’origine d’un dernier signal.", symbol: "●", hue: 198, featured: false }
];

const translations = {
  fr: {
    legalDemo: "Catalogue légal de démonstration", welcome: "Regardez, lisez, découvrez.", welcomeText: "Une première version de JACK, gratuite et sans publicité.", explore: "Explorer le catalogue", featured: "À découvrir", home: "Accueil", catalog: "Catalogue", library: "Ma liste", settings: "Réglages", search: "Rechercher", searchPlaceholder: "Rechercher un titre ou un genre…", noResults: "Aucun résultat.", favoritesEmpty: "Ajoutez des titres à votre liste.", language: "Langue de l’interface", rightsNotice: "Les titres présentés sont fictifs. Aucun contenu commercial n’est distribué.", add: "Ajouter à ma liste", remove: "Retirer de ma liste", install: "Installer"
  },
  en: {
    legalDemo: "Legal demo catalogue", welcome: "Watch, read, discover.", welcomeText: "A first version of JACK, free and without advertising.", explore: "Explore the catalogue", featured: "Featured", home: "Home", catalog: "Catalogue", library: "My list", settings: "Settings", search: "Search", searchPlaceholder: "Search by title or genre…", noResults: "No results.", favoritesEmpty: "Add titles to your list.", language: "Interface language", rightsNotice: "All titles shown are fictional. No commercial content is distributed.", add: "Add to my list", remove: "Remove from my list", install: "Install"
  },
  ar: {
    legalDemo: "كتالوج تجريبي قانوني", welcome: "شاهد واقرأ واكتشف.", welcomeText: "النسخة الأولى من JACK مجانية ومن دون إعلانات.", explore: "استكشف الكتالوج", featured: "مختارات", home: "الرئيسية", catalog: "الكتالوج", library: "قائمتي", settings: "الإعدادات", search: "بحث", searchPlaceholder: "ابحث بالعنوان أو النوع…", noResults: "لا توجد نتائج.", favoritesEmpty: "أضف عناوين إلى قائمتك.", language: "لغة الواجهة", rightsNotice: "كل العناوين المعروضة خيالية. لا يتم توزيع أي محتوى تجاري.", add: "أضف إلى قائمتي", remove: "إزالة من قائمتي", install: "تثبيت"
  }
};

const state = {
  language: localStorage.getItem("jack-language") || "fr",
  favorites: new Set(JSON.parse(localStorage.getItem("jack-favorites") || "[]")),
  deferredInstallPrompt: null
};

const elements = {
  featured: document.querySelector("#featuredGrid"),
  catalog: document.querySelector("#catalogGrid"),
  favorites: document.querySelector("#favoritesGrid"),
  empty: document.querySelector("#emptyState"),
  favoritesEmpty: document.querySelector("#favoritesEmpty"),
  search: document.querySelector("#searchInput"),
  language: document.querySelector("#languageSelect"),
  install: document.querySelector("#installButton"),
  template: document.querySelector("#cardTemplate")
};

function t(key) { return translations[state.language]?.[key] || translations.fr[key] || key; }

function createCard(item) {
  const card = elements.template.content.firstElementChild.cloneNode(true);
  card.querySelector(".poster").style.setProperty("--poster-hue", item.hue);
  card.querySelector(".poster-symbol").textContent = item.symbol;
  card.querySelector(".meta").textContent = `${item.type} · ${item.genre}`;
  card.querySelector("h3").textContent = item.title;
  card.querySelector(".description").textContent = item.description;
  const button = card.querySelector(".favorite-button");
  const isFavorite = state.favorites.has(item.id);
  button.textContent = isFavorite ? `♥ ${t("remove")}` : `♡ ${t("add")}`;
  button.classList.toggle("active", isFavorite);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.addEventListener("click", () => toggleFavorite(item.id));
  return card;
}

function renderGrid(target, items) {
  target.replaceChildren(...items.map(createCard));
}

function render() {
  const query = elements.search.value.trim().toLocaleLowerCase(state.language);
  const filtered = catalog.filter(item => `${item.title} ${item.genre} ${item.type}`.toLocaleLowerCase(state.language).includes(query));
  renderGrid(elements.featured, catalog.filter(item => item.featured));
  renderGrid(elements.catalog, filtered);
  const favorites = catalog.filter(item => state.favorites.has(item.id));
  renderGrid(elements.favorites, favorites);
  elements.empty.hidden = filtered.length > 0;
  elements.favoritesEmpty.hidden = favorites.length > 0;
}

function toggleFavorite(id) {
  state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
  localStorage.setItem("jack-favorites", JSON.stringify([...state.favorites]));
  render();
}

function applyLanguage(language) {
  state.language = translations[language] ? language : "fr";
  localStorage.setItem("jack-language", state.language);
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
  elements.language.value = state.language;
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  elements.install.textContent = t("install");
  render();
}

function updateRoute() {
  const route = location.hash.slice(1) || "home";
  const safeRoute = document.querySelector(`#${CSS.escape(route)}.view`) ? route : "home";
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === safeRoute));
  document.querySelectorAll("[data-route]").forEach(link => {
    const active = link.dataset.route === safeRoute;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "instant" });
}

elements.search.addEventListener("input", render);
elements.language.addEventListener("change", event => applyLanguage(event.target.value));
window.addEventListener("hashchange", updateRoute);
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  state.deferredInstallPrompt = event;
  elements.install.hidden = false;
});
elements.install.addEventListener("click", async () => {
  if (!state.deferredInstallPrompt) return;
  state.deferredInstallPrompt.prompt();
  await state.deferredInstallPrompt.userChoice;
  state.deferredInstallPrompt = null;
  elements.install.hidden = true;
});
window.addEventListener("appinstalled", () => { elements.install.hidden = true; });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(error => console.warn("Service worker unavailable", error)));
}

applyLanguage(state.language);
updateRoute();
