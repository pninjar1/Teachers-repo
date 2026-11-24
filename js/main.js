(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  /* ---- Settings you can edit ---- */
  // Photos for the gallery: add real files to assets/gallery/ and list them here.
  var GALLERY = [
    // { src: "assets/gallery/class-1.jpg", alt: "Pupils working on a Mathematics exercise" }
  ];
  // Downloadable resources: add PDFs to assets/resources/ and list them here.
  var RESOURCES = [
    // { title: "Primary 3 Mathematics worksheet", href: "assets/resources/p3-maths-worksheet.pdf" }
  ];

  /* ---- Year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Theme toggle ---- */
  var toggle = document.getElementById("theme-toggle");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    toggle.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#0F1115" : "#FAF7F0");
  }
  setTheme(root.getAttribute("data-theme") || "dark");
  toggle.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  function closeMenu() {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---- Scroll reveal and active link ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

    var navMap = {};
    links.querySelectorAll("a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = navMap[en.target.id];
        if (a && en.isIntersecting) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove("active"); });
          a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { so.observe(s); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- CV link: disable politely if the file has not been added yet ---- */
  var cv = document.getElementById("cv-link");
  if (cv && location.protocol.indexOf("http") === 0) {
    fetch(cv.getAttribute("href"), { method: "HEAD" }).then(function (r) {
      if (!r.ok) { cv.textContent = "CV coming soon"; cv.setAttribute("aria-disabled", "true"); cv.removeAttribute("download"); cv.removeAttribute("href"); }
    }).catch(function () {});
  }

  /* ---- Resources list ---- */
  var rl = document.getElementById("resource-list");
  if (rl && RESOURCES.length) {
    var empty = rl.parentNode.querySelector(".empty");
    if (empty) empty.remove();
    RESOURCES.forEach(function (r) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = r.href; a.textContent = r.title; a.setAttribute("download", "");
      li.appendChild(a); rl.appendChild(li);
    });
  }

  /* ---- Gallery and lightbox ---- */
  var grid = document.getElementById("gallery-grid");
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lastFocus = null;
  function openLb(item) {
    lastFocus = document.activeElement;
    lbImg.src = item.src; lbImg.alt = item.alt || "";
    lb.hidden = false;
    document.getElementById("lb-close").focus();
  }
  function closeLb() { lb.hidden = true; lbImg.src = ""; if (lastFocus) lastFocus.focus(); }
  if (grid && GALLERY.length) {
    grid.innerHTML = "";
    GALLERY.forEach(function (g) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "g-item";
      b.setAttribute("aria-label", "Open image: " + (g.alt || "gallery photo"));
      var im = document.createElement("img");
      im.src = g.src; im.alt = g.alt || ""; im.loading = "lazy";
      b.appendChild(im);
      b.addEventListener("click", function () { openLb(g); });
      grid.appendChild(b);
    });
  }
  document.getElementById("lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* ---- Contact form (Web3Forms) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var btn = document.getElementById("f-submit");
  function say(msg, cls) { status.textContent = msg; status.className = "form-status " + (cls || ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.botcheck.checked) return; // spam trap

    var ok = true;
    ["name", "email", "message"].forEach(function (n) {
      var f = form.elements[n];
      var bad = !f.value.trim() || (n === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) ok = false;
    });
    if (!ok) { say("Please fill in your name, a valid email and a message.", "err"); return; }

    if (form.access_key.value === "YOUR_WEB3FORMS_ACCESS_KEY") {
      say("The form is not connected yet. See the README to add your access key.", "err");
      return;
    }

    btn.disabled = true; say("Sending...");
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d.success) { say("Thank you. Your message has been sent.", "ok"); form.reset(); }
      else { say("Sorry, something went wrong. Please use WhatsApp or email instead.", "err"); }
    }).catch(function () {
      say("Network problem. Please try again or use WhatsApp.", "err");
    }).finally(function () { btn.disabled = false; });
  });
})();
