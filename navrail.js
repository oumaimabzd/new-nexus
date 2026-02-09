/* =========================================================
   navrail.js — School Nexus Nav Rail (injector)
   - Injects the nav rail (.navRail)
   - Reusable across pages
   - All items are routes (no slideouts)
========================================================= */
(function snInjectNavRail() {
  "use strict";

  const NAVRAIL_HTML = `
    <nav class="navRail" aria-label="Primary" data-sn-navrail>
      <div class="navRail__group">
        <button class="navRail__iconBtn" type="button" aria-label="Dashboard" data-sn-nav="dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="Anonymous reports" data-sn-nav="anonymous">
          <span class="navRail__badgePulse" id="snBadgeAnon" aria-hidden="true">1</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M12 2l8 4v6c0 5-3.5 9-8 10C7.5 21 4 17 4 12V6l8-4Z" />
            <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.2-.7 1.8-1.5 2.3-.7.4-1 .8-1 1.7" />
            <path d="M12 17h.01" />
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="Behavior reports" data-sn-nav="behavior">
          <span class="navRail__badgePulse" id="snBadgeBehavior" aria-hidden="true">2</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="Inbox" data-sn-nav="inbox">
          <span class="navRail__badgePulse" id="snBadgeInbox" aria-hidden="true">2</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M4 4h16v11a2 2 0 0 1-2 2h-4l-2 3-2-3H6a2 2 0 0 1-2-2V4Z" />
            <path d="M8 8h8" />
            <path d="M8 12h6" />
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="My courses" data-sn-nav="training">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
            <path d="M22 10v6" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="Profile" data-sn-nav="profile">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 21a8 8 0 0 0-16 0"></path>
            <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
          </svg>
        </button>

        <button class="navRail__iconBtn" type="button" aria-label="Settings" data-sn-nav="settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
    </nav>
  `;

  // IMPORTANT:
  // Change these filenames to match YOUR real pages.
  // (I’m using sensible placeholders for now.)
  const ROUTES = {
    dashboard: "index.html",
    anonymous: "anonymous-reporting.html", // placeholder
    behavior: "behaviorNEW1.html", // placeholder (behavioral reporting hub)
    inbox: "inbox.html", // placeholder
    training: "training-library.html",
    profile: "profile.html",
    settings: "settings.html",
  };

  function getActiveKey() {
    const bodyKey = document.body?.getAttribute("data-active-nav");
    if (bodyKey) return bodyKey;

    const file = (location.pathname.split("/").pop() || "").toLowerCase();
    if (file.includes("anonymous")) return "anonymous";
    if (
      file.includes("inbox") ||
      file.includes("updates") ||
      file.includes("news")
    )
      return "inbox";
    if (file.includes("course") || file.includes("training")) return "training";
    if (file.includes("behavior")) return "behavior";
    if (file.includes("profile")) return "profile";
    if (file.includes("setting")) return "settings";
    return "dashboard";
  }

  function markActive(navEl) {
    const activeKey = getActiveKey();
    const btns = Array.from(navEl.querySelectorAll("[data-sn-nav]"));

    btns.forEach((b) => {
      const k = b.getAttribute("data-sn-nav");
      const isActive = k === activeKey;

      b.classList.toggle("is-active", isActive);
      if (isActive) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");

      if (!b.getAttribute("title")) {
        b.setAttribute("title", b.getAttribute("aria-label") || "");
      }
    });
  }

  function wireNav(navEl) {
    navEl.addEventListener("click", (e) => {
      const btn =
        e.target && e.target.closest ? e.target.closest("[data-sn-nav]") : null;
      if (!btn) return;

      const key = btn.getAttribute("data-sn-nav");
      const href = key && ROUTES[key];
      if (!href) return;

      const file = (location.pathname.split("/").pop() || "").toLowerCase();
      if (href.toLowerCase() === file) return;

      window.location.href = href;
    });
  }

  function injectLabels(navEl) {
    navEl.querySelectorAll(".navRail__iconBtn").forEach((btn) => {
      const label = btn.getAttribute("aria-label");
      if (!label) return;

      if (!btn.querySelector(".navRail__label")) {
        const span = document.createElement("span");
        span.className = "navRail__label";
        span.textContent = label;
        btn.appendChild(span);
      }
    });
  }

  function syncNotifBadges() {
    // MVP numbers requested (later: replace with real data)
    const counts = { anonymous: 3, behavior: 2, inbox: 2 };

    const map = {
      anonymous: document.getElementById("snBadgeAnon"),
      behavior: document.getElementById("snBadgeBehavior"),
      inbox: document.getElementById("snBadgeInbox"),
    };

    Object.keys(map).forEach((key) => {
      const el = map[key];
      if (!el) return;

      const n = Number(counts[key] || 0);
      el.textContent = String(n);
      el.style.display = n > 0 ? "inline-flex" : "none";
      el.classList.toggle("is-pulsing", n > 0);
    });
  }

  function alreadyInserted() {
    return !!document.querySelector("[data-sn-navrail]");
  }

  function mount() {
    const mount = document.querySelector("[data-sn-navrail-mount]");
    if (mount) {
      mount.insertAdjacentHTML("afterbegin", NAVRAIL_HTML);
      return mount.querySelector("[data-sn-navrail]");
    }

    const layout = document.querySelector(".layout");
    if (layout) {
      layout.insertAdjacentHTML("afterbegin", NAVRAIL_HTML);
      return layout.querySelector("[data-sn-navrail]");
    }

    const page = document.querySelector(".page");
    if (page) {
      page.insertAdjacentHTML("afterbegin", NAVRAIL_HTML);
      return page.querySelector("[data-sn-navrail]");
    }

    return null;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (alreadyInserted()) return;

    const navEl = mount();
    if (!navEl) return;

    injectLabels(navEl);
    markActive(navEl);
    wireNav(navEl);
    syncNotifBadges();
  });
})();
