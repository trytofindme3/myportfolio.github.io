/* ==========================================================================
   Olzhas Ashimov — Portfolio
   ---------------------------------------------------------------------
   EDIT YOUR WORKS HERE.
   Each work needs:
     id       — unique short id, no spaces
     title    — shown under the thumbnail and in the lightbox (EDIT ME)
     category — one of: "uiux" | "print" | "motion"
     type     — "image" | "video"
     image    — path to the main thumbnail (also used as poster for video)
     video    — (only for type:"video") path to the mp4 file
     gallery  — (optional) extra images shown inside the lightbox
   ========================================================================== */

const WORKS = [
  {
    id: "codedimension",
    title: "Codedimension - Learning Platform UI",
    category: "uiux",
    type: "image",
    image: "assets/works/codedimension-ui-1.jpg",
    gallery: ["assets/works/codedimension-ui-1.jpg", "assets/works/codedimension-ui-2.jpg"]
  },
  {
    id: "dev-portfolio",
    title: "Developer Portfolio - Personal Site UI",
    category: "uiux",
    type: "image",
    image: "assets/works/dev-portfolio-ui.jpg"
  },
  {
    id: "basketball",
    title: "Court Rental - Landing Page",
    category: "uiux",
    type: "image",
    image: "assets/works/basketball-ui.jpg"
  },
  {
  id: "neo-tokyo",
    title: "Neo Tokyo - typography music album website ",
    category: "uiux",       // или "print", или "motion"
    type: "image",
    image: "assets/works/neotokyo1.png",
    link: "https://neotokiotypography.netlify.app/",
    gallery: ["assets/works/neotokyo1.png", "assets/works/neotokyo2.png", "assets/works/neotokyo3.png", "assets/works/neotokyo4.png"]
  },
  {
    id: "coffee-shop",
    title: "Dum Coffee Shop - Landing Page",
    category: "uiux",
    type: "image",
    image: "assets/works/coffee-shop-ui.jpg"
  },
  {
    id: "coin-motion",
    title: "Planora - Coin Logo Animation",
    category: "motion",
    type: "video",
    image: "assets/works/coin_motion_poster.jpg",
    video: "assets/works/coin_motion.mp4"
  },
  {
    id: "drill-campaign",
    title: "AEG Cordless Drill - Ad Campaign",
    category: "print",
    type: "image",
    image: "assets/works/drill-poster.jpg",
    gallery: ["assets/works/drill-poster.jpg", "assets/works/product-cards.jpg", "assets/works/cover-design.jpg"]
  },
  {
    id: "colours-ostrava",
    title: "Colours of Ostrava - Festival Poster",
    category: "print",
    type: "image",
    image: "assets/works/colours-ostrava-poster.jpg"
  },
  {
    id: "food-fest",
    title: "Vkusnaya Almaty - Food Festival Poster",
    category: "print",
    type: "image",
    image: "assets/works/food-fest-poster.jpg"
  },
  {
    id: "cellar-wine",
    title: "Cellar - Wine Packaging Ad",
    category: "print",
    type: "image",
    image: "assets/works/cellar-wine-poster.jpg"
  },
  {
    id: "little-prince",
    title: "The Little Prince - Book Cover",
    category: "print",
    type: "image",
    image: "assets/works/little-prince-cover.jpg"
  },
  {
    id: "music-magazine",
    title: "Read & Music - Magazine Layout",
    category: "print",
    type: "image",
    link: "https://www.behance.net/gallery/95928101/zhurnal",
    image: "assets/works/music-magazine.jpg"
  },
  {
    id: "planora",
    title: "Planora - Logo & Brand Identity",
    category: "print",
    type: "image",
    image: "assets/works/planora-logo.jpg"
  }
];

/* ========================================================================== */

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- render works grid ---------- */
const grid = document.getElementById("worksGrid");
const CAT_LABEL = { uiux: "UI / UX", print: "Branding & Print", motion: "Motion" };

function renderWorks(filter) {
  grid.innerHTML = "";
  WORKS.filter(w => filter === "all" || w.category === filter).forEach(w => {
    const card = document.createElement("div");
    card.className = "work-card";
    card.dataset.id = w.id;

    const isVideo = w.type === "video";
    card.innerHTML = `
      <div class="work-card__media">
        <img src="${w.image}" alt="${w.title}" loading="lazy">
        ${isVideo ? `<div class="work-card__play"><span>&#9658;</span></div>` : ""}
        <span class="work-card__corner tl"></span>
        <span class="work-card__corner tr"></span>
        <span class="work-card__corner bl"></span>
        <span class="work-card__corner br"></span>
      </div>
      <div class="work-card__body">
        <p class="work-card__cat">${CAT_LABEL[w.category]}</p>
        <h3 class="work-card__title">${w.title}</h3>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(w));
    grid.appendChild(card);
  });
}
renderWorks("all");

/* ---------- filters ---------- */
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
  btn.classList.add("active");
  renderWorks(btn.dataset.filter);
});

/* ---------- lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxInner = document.getElementById("lightboxInner");

function mediaMarkup(src, isVideo) {
  return isVideo
    ? `<video src="${src}" controls autoplay playsinline></video>`
    : `<img src="${src}" alt="">`;
}

function openLightbox(w) {
  const isVideo = w.type === "video";
  const mainSrc = isVideo ? w.video : w.image;

  let galleryHTML = "";
  if (w.gallery && w.gallery.length > 1) {
    galleryHTML = `<div class="lightbox__gallery">` +
      w.gallery.map((src, i) => `<img src="${src}" data-src="${src}" class="${src === w.image ? "active" : ""}">`).join("") +
      `</div>`;
  }

  lightboxInner.innerHTML = `
    <div class="lightbox__media">${mediaMarkup(mainSrc, isVideo)}</div>
    <div class="lightbox__caption">
      <div>
        <p>${CAT_LABEL[w.category]}</p>
        <h3>${w.title}</h3>
      </div>
      ${w.link ? `<a href="${w.link}" target="_blank" rel="noopener" class="btn btn--ghost">${w.linkLabel || "View Project"} &#8599;</a>` : ""}
    </div>
    ${galleryHTML}
  `;

  lightboxInner.querySelectorAll(".lightbox__gallery img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      lightboxInner.querySelector(".lightbox__media").innerHTML = mediaMarkup(thumb.dataset.src, false);
      lightboxInner.querySelectorAll(".lightbox__gallery img").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxInner.innerHTML = "";
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

/* ---------- music toggle ----------
   Drop your track at: assets/audio/track.mp3
   The button auto-disables with a tooltip if the file isn't found. */
const musicBtn = document.getElementById("musicToggle");
const bgAudio = document.getElementById("bgAudio");
let audioChecked = false;

musicBtn.addEventListener("click", () => {
  if (musicBtn.disabled) return;
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-pressed", "true");
    }).catch(() => disableMusicButton());
  } else {
    bgAudio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-pressed", "false");
  }
  audioChecked = true;
});

bgAudio.addEventListener("error", disableMusicButton);

function disableMusicButton() {
  musicBtn.disabled = true;
  musicBtn.title = "Add assets/audio/track.mp3 to enable background music";
  musicBtn.classList.remove("playing");
}
