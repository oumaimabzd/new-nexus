/* =========================================================
   reporting-hub.js — Reporting Hub (Admin view)
   - Big actions (Submit / Drafts / Review)
   - Recent submissions list + View more
   Reads localStorage only (demo/testing)
========================================================= */

(function () {
  const KEY_REPORTS = "sn_incident_reports_v1";
  const KEY_DRAFT = "sn_incident_draft_v1";

  const recentList = document.getElementById("recentList");
  const recentEmpty = document.getElementById("recentEmpty");

  const draftPill = document.getElementById("draftPill");
  const draftsLink = document.getElementById("draftsLink");

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function fmtWhen(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleString([], {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  }

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderRecents(reports) {
    if (!recentList) return;

    const sorted = [...reports].sort((a, b) => {
      const ta = new Date(a.createdAt || 0).getTime();
      const tb = new Date(b.createdAt || 0).getTime();
      return tb - ta;
    });

    const top = sorted.slice(0, 5);

    if (!top.length) {
      recentList.innerHTML = "";
      if (recentEmpty) recentEmpty.hidden = false;
      return;
    }

    if (recentEmpty) recentEmpty.hidden = true;

    recentList.innerHTML = top
      .map((r) => {
        const id = escapeHTML(r.id || "INC-XXXXXX");
        const when = fmtWhen(r.createdAt);
        const student = escapeHTML(r.studentCode || "—");
        const klass = escapeHTML(r.studentClass || "—");
        const loc = escapeHTML(r.location || "—");
        const sev = escapeHTML(r.severity || "—");
        const status = escapeHTML(r.status || "New");

        return `
          <div class="recentRow" role="listitem">
            <div>
              <div class="recentRow__id">${id}</div>
              <div class="recentRow__meta">${student} • ${klass} • ${loc} • ${sev} • ${status}</div>
            </div>
            <div class="recentRow__right">${escapeHTML(when)}</div>
          </div>
        `;
      })
      .join("");
  }

  function initDraftState() {
    const draftRaw = localStorage.getItem(KEY_DRAFT);

    // If a draft exists, show pill
    const hasDraft = !!draftRaw && draftRaw.length > 0;

    if (draftPill) draftPill.hidden = !hasDraft;

    // If no draft exists, keep drafts link but make it feel disabled (optional)
    if (draftsLink) {
      if (!hasDraft) {
        draftsLink.classList.add("is-disabled");
        draftsLink.setAttribute("aria-disabled", "true");
        draftsLink.setAttribute("tabindex", "-1");
      } else {
        // If you later add a dedicated drafts page, update this href.
        // For now: take them to the form (your incident-report.js can load draft automatically if it does).
        draftsLink.classList.remove("is-disabled");
        draftsLink.removeAttribute("aria-disabled");
        draftsLink.removeAttribute("tabindex");
      }
    }
  }

  function init() {
    const reports = safeParse(KEY_REPORTS, []);
    renderRecents(Array.isArray(reports) ? reports : []);
    initDraftState();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
