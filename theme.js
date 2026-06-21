/* Theme switcher — shared by all pages.
   The saved theme is applied pre-paint by an inline <head> snippet;
   this file only wires up the toggle button and persists changes. */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";

  function currentTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage may be unavailable (private mode); ignore */
    }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(currentTheme()); // sync button state with whatever the pre-paint script set
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        apply(currentTheme() === "dark" ? "light" : "dark");
      });
    }
  });
})();
