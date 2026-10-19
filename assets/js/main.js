/* ==========================================================================
   StudentKit Nigeria — shared layout & helpers
   Injects the consistent header + footer, wires the mobile menu, sets the
   active nav state and the copyright year, and exposes small helpers (SK.*)
   used by the tool scripts. No external dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var NAV = [
    { href: "/tools", label: "Tools", match: "/tools" },
    { href: "/guides", label: "Guides", match: "/guides" },
    { href: "/about", label: "About", match: "/about" },
    { href: "/contact", label: "Contact", match: "/contact" }
  ];

  var FOOTER_POLICY = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/disclaimer", label: "Disclaimer" }
  ];

  var ICON_MARK =
    '<svg class="brand__mark" viewBox="0 0 24 24" aria-hidden="true" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M7 9v5c0 1.5 2.5 3 5 3s5-1.5 5-3V9"/></svg>';
  var ICON_MENU =
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function currentSection() {
    var p = location.pathname.replace(/\/index\.html$/, "/");
    for (var i = 0; i < NAV.length; i++) {
      if (p === NAV[i].match || p.indexOf(NAV[i].match + "/") === 0) return NAV[i].match;
    }
    return null;
  }

  function navListHtml(active, mobile) {
    var out = "";
    for (var i = 0; i < NAV.length; i++) {
      var cur = NAV[i].match === active ? ' aria-current="page"' : "";
      out += '<li><a href="' + NAV[i].href + '"' + cur + ">" + NAV[i].label + "</a></li>";
    }
    if (mobile) {
      out += "<li><hr></li>";
      out += '<li><a href="/privacy-policy">Privacy Policy</a></li>';
      out += '<li><a href="/terms">Terms of Use</a></li>';
      out += '<li><a href="/disclaimer">Disclaimer</a></li>';
    }
    return out;
  }

  function buildHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var active = currentSection();
    header.className = "site-header";
    header.innerHTML =
      '<div class="container">' +
        '<div class="site-header__bar">' +
          '<a class="brand" href="/">' + ICON_MARK +
            '<span>StudentKit <span class="brand__sub">Nigeria</span></span>' +
          "</a>" +
          '<nav class="nav-desktop" aria-label="Primary">' +
            "<ul>" + navListHtml(active, false) + "</ul>" +
          "</nav>" +
          '<button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navMobile">' +
            '<span class="visually-hidden">Menu</span>' + ICON_MENU +
          "</button>" +
        "</div>" +
      "</div>" +
      '<nav class="nav-mobile" id="navMobile" aria-label="Mobile" hidden>' +
        '<div class="container" style="padding:0">' +
          "<ul>" + navListHtml(active, true) + "</ul>" +
        "</div>" +
      "</nav>";

    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMobile");
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.innerHTML = (open ? '<span class="visually-hidden">Menu</span>' + ICON_MENU
                               : '<span class="visually-hidden">Close menu</span>' + ICON_CLOSE);
      menu.hidden = open;
      if (!open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.click();
        toggle.focus();
      }
    });
    // Close menu when a link is chosen
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && toggle.getAttribute("aria-expanded") === "true") {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<span class="visually-hidden">Menu</span>' + ICON_MENU;
      }
    });
  }

  function buildFooter() {
    var footer = document.getElementById("site-footer");
    if (!footer) return;
    var year = new Date().getFullYear();
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col footer-brand">' +
            "<h3>StudentKit Nigeria</h3>" +
            "<p>Practical study tools and guides for Nigerian students. Results are estimates — always verify with your institution.</p>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h3>Tools</h3><ul>" +
              '<li><a href="/tools/cgpa-calculator">CGPA Calculator</a></li>' +
              '<li><a href="/tools/study-planner">Study Planner</a></li>' +
              '<li><a href="/tools/practice-quiz">Practice Quiz</a></li>' +
              '<li><a href="/tools/exam-score-planner">Exam Score Planner</a></li>' +
              '<li><a href="/tools/percentage-calculator">Percentage Calculator</a></li>' +
              '<li><a href="/tools">All tools</a></li>' +
            "</ul>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h3>Guides</h3><ul>" +
              '<li><a href="/guides/how-cgpa-is-calculated">How CGPA is calculated</a></li>' +
              '<li><a href="/guides/how-to-create-a-study-timetable">Create a study timetable</a></li>' +
              '<li><a href="/guides/how-to-review-practice-quiz-results">Review quiz results</a></li>' +
              '<li><a href="/guides">All guides</a></li>' +
            "</ul>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h3>Information</h3><ul>" +
              '<li><a href="/about">About</a></li>' +
              '<li><a href="/contact">Contact</a></li>' +
              '<li><a href="/privacy-policy">Privacy Policy</a></li>' +
              '<li><a href="/terms">Terms of Use</a></li>' +
              '<li><a href="/disclaimer">Disclaimer</a></li>' +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<p>Educational tools. Results are estimates — always verify with your institution. StudentKit Nigeria is not affiliated with JAMB, WAEC, NECO, or any university.</p>" +
          "<p>&copy; " + year + " StudentKit Nigeria.</p>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Shared helpers for tool scripts ---------- */
  var ALERT_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/></svg>';

  window.SK = {
    /* Escape user text before inserting into HTML */
    esc: function (s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    /* Round to n decimals returning a Number (no float drift in display) */
    round: function (n, d) {
      var f = Math.pow(10, d == null ? 2 : d);
      return Math.round((n + Number.EPSILON) * f) / f;
    },
    /* Show/clear an inline field error (expects a .field-error with id) */
    setError: function (input, errorEl, message) {
      if (!input || !errorEl) return;
      input.setAttribute("aria-invalid", "true");
      errorEl.innerHTML = ALERT_ICON + "<span>" + this.esc(message) + "</span>";
      errorEl.classList.add("is-shown");
    },
    clearError: function (input, errorEl) {
      if (input) input.removeAttribute("aria-invalid");
      if (errorEl) { errorEl.classList.remove("is-shown"); errorEl.textContent = ""; }
    },
    /* Announce a result to screen readers via a polite live region */
    announce: function (regionId, message) {
      var r = document.getElementById(regionId);
      if (r) r.textContent = message;
    },
    /* localStorage with safe fallback (approved: device-only persistence) */
    store: {
      get: function (key) {
        try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
        catch (e) { return null; }
      },
      set: function (key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); return true; }
        catch (e) { return false; }
      },
      remove: function (key) {
        try { localStorage.removeItem(key); } catch (e) {}
      }
    },
    printDate: function () {
      try { return new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }); }
      catch (e) { return new Date().toDateString(); }
    }
  };

  /* Pages ship hard-coded production canonical + og:url (https://studykit.com.ng/...).
     This only fills a self-referential canonical if one is somehow missing, and
     never overrides the hard-coded production URLs (so preview/localhost builds
     do not rewrite the canonical away from production). */
  function setCanonical() {
    if (document.querySelector('link[rel="canonical"]')) return;
    try {
      var path = location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/") || "/";
      var url = location.origin + path;
      var link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", url);
      document.head.appendChild(link);
      var og = document.querySelector('meta[property="og:url"]');
      if (og && !og.getAttribute("content")) og.setAttribute("content", url);
    } catch (e) { /* non-critical */ }
  }

  function init() { buildHeader(); buildFooter(); setCanonical(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
