/* =========================================================
   training-library.js — Filters + rendering ONLY
========================================================= */

"use strict";

const trainings = [
  //  Risk + Attacks  Start training
  {
    id: "risk-course",
    title: "Risks Training",
    desc: "Understand how risk factors connect, how escalation forms over time, and what early signals to document. Learn practical prevention steps aligned with school routines and policy.",
    duration: "45–60 min",
    type: "required",
    updated: "2026-01-16",
    status: "not_started",
    progress: 0,
    image: "Learning.svg",
    imageAlt: "Risks training cover image",
  },
  {
    id: "attacks-course",
    title: "Attacks Training",
    desc: "Learn the core concepts behind school attacks, warning pathways, and staff responsibilities. Focus on prevention, situational awareness, and structured response principles under pressure.",
    duration: "45–60 min",
    type: "required",
    updated: "2026-01-16",
    status: "not_started",
    progress: 0,
    image: "Learning.svg",
    imageAlt: "Risks training cover image",
  },

  //  for future reference
  {
    id: "example-in-progress",
    title: "Example training (in progress)",
    desc: "Example module used to preview how an in-progress training appears in the library UI.",
    duration: "30–40 min",
    type: "recommended",
    updated: "2026-01-10",
    status: "in_progress",
    progress: 62,
  },
  {
    id: "example-completed",
    title: "Example training (completed)",
    desc: "Example module used to preview how a completed training appears in the library UI.",
    duration: "20–30 min",
    type: "recommended",
    updated: "2025-12-28",
    status: "completed",
    progress: 100,
  },
];

const els = {
  grid: document.getElementById("trainingGrid"),
  search: document.getElementById("searchInput"),
  filterBtns: Array.from(document.querySelectorAll("[data-filter]")),
  resultCount: document.getElementById("resultCount"),
  summaryText: document.getElementById("summaryText"),
  summaryPill: document.getElementById("summaryPill"),
  summaryBar: document.getElementById("summaryBar"),
};

let activeFilter = "all";

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "—";
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function primaryActionFor(t) {
  if (t.status === "completed")
    return { label: "Review", variant: "secondary" };
  if (t.status === "in_progress")
    return { label: "Continue", variant: "primary" };
  return { label: "Start Lesson", variant: "primary" };
}

function matchesFilter(t) {
  if (activeFilter === "all") return true;
  if (activeFilter === "required") return t.type === "required";
  if (activeFilter === "recommended") return t.type === "recommended";
  if (activeFilter === "completed") return t.status === "completed";
  return true;
}

function matchesSearch(t, q) {
  if (!q) return true;
  const hay = (t.title + " " + t.desc + " " + t.type).toLowerCase();
  return hay.includes(q.toLowerCase());
}

function renderCard(t) {
  const action = primaryActionFor(t);
  const isCompleted = t.status === "completed";
  const isInProgress = t.status === "in_progress";

  const progressText = isCompleted
    ? "Completed"
    : isInProgress
      ? `In progress • ${t.progress}%`
      : "Not started";

  const metaTypeClass =
    t.type === "required" ? "metaPill--req" : "metaPill--rec";
  const metaTypeLabel = t.type === "required" ? "Required" : "Recommended";

  const statusPill = isCompleted
    ? `<span class="metaPill metaPill--done">Completed</span>`
    : "";

  const miniBar = isInProgress
    ? `
        <div class="trainingMiniBar" aria-hidden="true">
          <div class="trainingMiniBar__fill" style="width:${Math.max(
            1,
            Math.min(99, t.progress),
          )}%"></div>
        </div>`
    : "";

  const mark = (t.title || "T")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

  const card = document.createElement("article");
  card.className = `trainingCard${isCompleted ? " is-completed" : ""}`;
  card.setAttribute("data-id", t.id);
  const imgSrc = t.image || "";
  const imgAlt = t.imageAlt || `${t.title} cover`;
  card.innerHTML = `
   <div class="trainingCard__media">
      ${
        imgSrc
          ? `<img src="${imgSrc}" alt="${imgAlt}" class="trainingCard__image"
               onerror="this.style.display='none'; this.closest('.trainingCard__media').classList.add('is-fallback')" />`
          : ""
      }

      <div class="trainingCard__mediaInner" aria-hidden="true">
        <div class="trainingCard__mediaMark">${mark}</div>
      </div>
    </div>

    <div class="trainingCard__body">
      <h3 class="trainingCard__title">${t.title}</h3>
      <p class="trainingCard__desc">${t.desc}</p>

      <div class="trainingMetaRow" aria-label="Training metadata">
        <span class="metaPill ${metaTypeClass}">${metaTypeLabel}</span>
        <span class="metaPill">${t.duration}</span>
        <span class="metaPill">Updated ${formatDate(t.updated)}</span>
        ${statusPill}
      </div>
    </div>

    <footer class="trainingCard__footer">
      <div class="trainingCard__left">
        <div class="trainingCard__progressText">${progressText}</div>
        ${miniBar}
      </div>

      <div class="trainingCard__actions">
        <button class="btn btn--${action.variant}" type="button" data-action="${
          action.label
        }" data-training="${t.id}">
          ${action.label}
        </button>
      </div>
    </footer>
  `;

  return card;
}

function renderList(list) {
  els.grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  list.forEach((t) => frag.appendChild(renderCard(t)));
  els.grid.appendChild(frag);

  els.resultCount.textContent = `${list.length} of ${trainings.length} trainings`;
}

function updateProgressSummary() {
  const total = trainings.length;
  const completed = trainings.filter((t) => t.status === "completed").length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  els.summaryText.textContent = `You've completed ${completed}/${total} trainings`;
  els.summaryPill.textContent =
    pct === 100 ? "All complete" : `${pct}% complete`;
  els.summaryBar.style.width = `${pct}%`;

  const bar = els.summaryBar.parentElement;
  if (bar) bar.setAttribute("aria-valuenow", String(pct));
}

function setActiveFilter(next) {
  activeFilter = next;
  els.filterBtns.forEach((b) =>
    b.classList.toggle("is-active", b.dataset.filter === next),
  );
  apply();
}

function apply() {
  const q = (els.search.value || "").trim();
  const filtered = trainings.filter(
    (t) => matchesFilter(t) && matchesSearch(t, q),
  );
  renderList(filtered);
}

function wireEvents() {
  els.filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => setActiveFilter(btn.dataset.filter));
  });

  els.search.addEventListener("input", () => apply());

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button[data-training]");
    if (!btn) return;

    const id = btn.getAttribute("data-training");
    const action = btn.getAttribute("data-action");

    if (id && action) {
      // Real courses
      if (id === "risk-course") {
        window.location.href = "risks-course.html";
        return;
      }
      if (id === "attacks-course") {
        window.location.href = "attacks-course.html";
        return;
      }

      // Examples
      window.location.href = `course.html?course=${encodeURIComponent(id)}`;
    }
  });
}

(function init() {
  updateProgressSummary();
  wireEvents();
  apply();
})();
