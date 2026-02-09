/* =========================================================
   reporting-hub.js — Hub behaviors
   - Role dropdown (demo)
   - Draft pill
   - Recent submissions (role-scoped)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Role setup
  if (window.SNRole) {
    window.SNRole.applyRole(window.SNRole.getRole());
    bindRoleDropdown();
  }

  // Draft pill
  renderDraftPill();

  // Recent list
  renderRecents();
});

function bindRoleDropdown() {
  const sel = document.getElementById("roleSelect");
  if (!sel) return;

  // Set dropdown to current stored role
  sel.value = window.SNRole.getRole();
  syncRoleText();

  sel.addEventListener("change", () => {
    window.SNRole.setRole(sel.value);
    syncRoleText();
    renderRecents(); // important: recents change by role
  });
}

function syncRoleText() {
  const label = document.getElementById("snRoleText");
  if (!label) return;
  const role = window.SNRole.getRole();
  label.textContent = window.SNRole.roleLabel(role);
}

function renderDraftPill() {
  const pill = document.getElementById("draftPill");
  if (!pill || !window.SNStore) return;

  const draft = window.SNStore.getDraft();
  pill.hidden = !draft;
}

function renderRecents() {
  const list = document.getElementById("recentList");
  const empty = document.getElementById("recentEmpty");
  const hint = document.getElementById("recentsHint");
  if (!list || !empty || !window.SNStore || !window.SNRole) return;

  const role = window.SNRole.getRole();
  const all = window.SNStore.getReports();
  const scoped = window.SNStore.filterReportsForRole(all, role).slice(0, 6);

  if (hint) {
    const map = {
      teacher: "Your latest submitted reports (demo/local).",
      mentor: "Latest class-visible reports (demo/local).",
      headofyear: "Latest grade-visible reports (demo/local).",
      counselor: "Latest follow-up & escalated reports (demo/local).",
      principal: "Latest reports across the school (demo/local).",
      admin: "Latest reports across the system (demo/local).",
    };
    hint.textContent = map[role] || "Latest submitted reports (demo/local).";
  }

  list.innerHTML = "";

  if (scoped.length === 0) {
    empty.hidden = false;
    const b = empty.querySelector(".recentsEmpty__b");
    if (b) b.textContent = "Submit a report to see it appear here.";
    return;
  }

  empty.hidden = true;

  scoped.forEach((r) => {
    const a = document.createElement("a");
    a.className = "recentRow";
    a.href = `report-detail.html?id=${encodeURIComponent(r.id || "")}`;
    a.setAttribute("role", "listitem");

    a.innerHTML = `
      <div class="recentRow__left">
        <div class="recentRow__id">${escapeHtml(r.id || "INC-000000")}</div>
        <div class="recentRow__meta">
          ${escapeHtml(r.type || "Incident")} · ${escapeHtml(r.status || "open")} · ${escapeHtml(r.severity || "moderate")}
        </div>
      </div>
      <div class="recentRow__right">${formatDate(r.createdAt)}</div>
    `;

    list.appendChild(a);
  });
}

function formatDate(iso) {
  try {
    const d = iso ? new Date(iso) : new Date();
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
