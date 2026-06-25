/* Subtle, dependency-free motion — shared by all pages.
   1. Scroll-reveal: fades/slides .reveal elements in as they enter the viewport.
   2. Rotating role text under the hero name.
   Both are no-ops (content fully visible) when the user prefers reduced motion. */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal --------------------------------------------------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Rotating role text ---------------------------------------------- */
  function initRoleRotator() {
    if (prefersReduced) return;
    var el = document.querySelector(".hero__role-text");
    if (!el) return;

    var roles = [
      "Embedded Systems Engineer",
      "ML / RL Engineer",
      "FPV Drone Builder",
    ];
    var i = 0;

    setInterval(function () {
      el.classList.add("is-swapping");
      window.setTimeout(function () {
        i = (i + 1) % roles.length;
        el.textContent = roles[i];
        el.classList.remove("is-swapping");
      }, 240); // matches the CSS fade duration
    }, 2600);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initRoleRotator();
  });
})();
