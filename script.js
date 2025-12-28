import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// NAV TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      navLinks.classList.remove("is-open");
    }
  });
}

// SMOOTH ANCHOR SCROLL
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;
  const id = link.getAttribute("href");
  if (!id || id === "#") return;
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  const rect = target.getBoundingClientRect();
  const offset = window.scrollY + rect.top - 72;
  window.scrollTo({ top: offset, behavior: "smooth" });
});

// HERO FLOAT ANIMATIONS
const orbit = document.querySelector(".hero-orbit");
const terminal = document.querySelector(".terminal-shell");
const chips = document.querySelectorAll(".hero-chip");

if (orbit) {
  gsap.to(orbit, {
    rotate: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });
}

if (terminal) {
  gsap.to(terminal, {
    y: -8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

if (chips.length) {
  gsap.to(chips, {
    y: -4,
    duration: 1.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.25
  });
}

// SECTION REVEALS
const revealSections = document.querySelectorAll(".section-light, .section-dark");
revealSections.forEach((section) => {
  gsap.from(section, {
    autoAlpha: 0,
    y: 20,
    duration: 0.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    }
  });
});

// BUTTON MICRO INTERACTION
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("pointerdown", () => {
    gsap.to(btn, { scale: 0.96, duration: 0.08 });
  });
  btn.addEventListener("pointerup", () => {
    gsap.to(btn, { scale: 1, duration: 0.16, ease: "back.out(2)" });
  });
  btn.addEventListener("pointerleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.16, ease: "back.out(2)" });
  });
});

// LIGHTBOX
const lightboxRoot = document.querySelector("[data-lightbox-root]");
const lightboxImg = lightboxRoot?.querySelector(".lightbox-img");
const lightboxCaption = lightboxRoot?.querySelector(".lightbox-caption");

if (lightboxRoot && lightboxImg && lightboxCaption) {
  const frames = document.querySelectorAll(".screen-card");
  frames.forEach((card) => {
    const frame = card.querySelector(".screen-frame");
    if (!frame) return;
    frame.addEventListener("click", () => {
      const src = card.getAttribute("data-lightbox") || frame.querySelector("img")?.src;
      const caption = card.querySelector("figcaption")?.textContent || "";
      if (!src) return;
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightboxRoot.classList.add("is-open");
      gsap.fromTo(
        lightboxImg,
        { scale: 0.92, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.2, ease: "power2.out" }
      );
    });
  });

  lightboxRoot.addEventListener("click", (e) => {
    if (e.target === lightboxRoot || e.target.classList.contains("lightbox-backdrop")) {
      lightboxRoot.classList.remove("is-open");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxRoot.classList.contains("is-open")) {
      lightboxRoot.classList.remove("is-open");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });
}