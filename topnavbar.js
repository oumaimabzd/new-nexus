"use strict";

/**
 * School Nexus — Global Top Nav (Injected)
 * - Logo on FAR LEFT
 * - Welcome text under logo text
 * - Three separate icon buttons on the RIGHT: Profile / Settings / Sign out
 * - Slightly transparent + fixed on top
 */

(function injectTopNav() {
  if (document.querySelector(".topNav")) return;

  const header = document.createElement("header");
  header.className = "topNav";
  header.setAttribute("role", "banner");
  header.setAttribute("aria-label", "School Nexus top navigation");

  header.innerHTML = `
    <div class="shell topNav__inner">
      <!-- LEFT: Brand (logo + text) -->
      <a class="topNav__brand" href="dashboard.html" aria-label="School Nexus home">
        <span class="topNav__logo" aria-hidden="true">
          
          <img class="topNav__logoImg" src="newlogonexus.png" alt="" />
        </span>

       <!-- <span class="topNav__brandText">
          <span class="topNav__name">School Nexus</span>
          <span class="topNav__welcome">Welcome to your security and guidance dashboard</span>
        </span>-->
      </a>

      <!-- RIGHT: Actions -->
      <div class="topNav__actions" aria-label="Top actions">
        <button class="topNav__iconBtn" type="button" aria-label="Profile" data-action="profile">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M20 21a8 8 0 0 0-16 0"></path>
          </svg>
        </button>

        <button class="topNav__iconBtn" type="button" aria-label="Settings" data-action="settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <button class="topNav__iconBtn" type="button" aria-label="Sign out" data-action="signout">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <!-- Log out: arrow leaving door -->
            <path d="M10 7V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-1"></path>
            <path d="M3 12h11"></path>
            <path d="M7 8l-4 4 4 4"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Insert at top of body
  document.body.insertBefore(header, document.body.firstChild);
  const logoImg = header.querySelector(".topNav__logoImg");
  if (logoImg) {
    logoImg.src = "./newlogonexus.png";
    logoImg.alt = "School Nexus logo";
    logoImg.onerror = () => {
      logoImg.style.display = "none"; // hide broken image icon
    };
  }

  // Click handlers (route stubs — replace with your real pages later)
  header.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");

    if (action === "profile") {
      // window.location.href = "profile.html";
      console.log("Profile");
    } else if (action === "settings") {
      // window.location.href = "settings.html";
      console.log("Settings");
    } else if (action === "signout") {
      console.log("Sign out");
      // localStorage.removeItem("sn_auth");
      window.location.href = "login.html";
    }
  });
})();
