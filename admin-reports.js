(function () {
  const REPORTS_KEY = "sn_incident_reports_v1";

  // -------- tiny toast (same pattern as incident-report.js) --------
  const toastWrap = document.getElementById("toastWrap");
  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function toast(title, msg) {
    if (!toastWrap) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `
      <p class="toast__title">${escapeHTML(title)}</p>
      <p class="toast__msg">${escapeHTML(msg)}</p>
    `;
    toastWrap.appendChild(el);
    window.setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      el.style.transition = "opacity 180ms ease, transform 180ms ease";
      window.setTimeout(() => el.remove(), 220);
    }, 2400);
  }

  // -------- DOM --------
  const qEl = document.getElementById("q");
  const sortEl = document.getElementById("sort");
  const sevEl = document.getElementById("sev");
  const statusEl = document.getElementById("status");
  const classEl = document.getElementById("classGroup");
  const evidenceEl = document.getElementById("hasEvidenceOnly");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  const catWrap = document.getElementById("catWrap");
  const catMeta = document.getElementById("catMeta");

  const listBox = document.getElementById("listBox");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");

  const generateDemoBtn = document.getElementById("generateDemoBtn");
  const emptyGenerateBtn = document.getElementById("emptyGenerateBtn");
  const inboxGrid = document.getElementById("inboxGrid");
  const caseFile = document.getElementById("caseFile");
  const closeCaseBtn = document.getElementById("closeCaseBtn");

  // new filter UI
  const filtersBtn = document.getElementById("filtersBtn");
  const activeFilterCount = document.getElementById("activeFilterCount");

  const chips = Array.from(document.querySelectorAll(".snChip[data-panel]"));
  const panels = Array.from(document.querySelectorAll(".snPanel"));
  const catSearch = document.getElementById("catSearch");

  const chipSevCount = document.getElementById("chipSevCount");
  const chipStatusCount = document.getElementById("chipStatusCount");
  const chipClassCount = document.getElementById("chipClassCount");
  const chipCatsCount = document.getElementById("chipCatsCount");
  const chipEvidenceCount = document.getElementById("chipEvidenceCount");
  const chipSortCount = document.getElementById("chipSortCount");

  const catSelectedCount = document.getElementById("catSelectedCount");

  // Summary
  const sumNew = document.getElementById("sumNew");
  const sumReview = document.getElementById("sumReview");
  const sumEscalated = document.getElementById("sumEscalated");
  const sumClosed = document.getElementById("sumClosed");
  const sumHigh = document.getElementById("sumHigh");
  const lastUpdatedMeta = document.getElementById("lastUpdatedMeta");

  // Detail
  const detail = document.getElementById("detail");
  const detailEmpty = document.getElementById("detailEmpty");
  const detailHint = document.getElementById("detailHint");

  const dId = document.getElementById("dId");
  const dMeta = document.getElementById("dMeta");
  const dStatus = document.getElementById("dStatus");
  const dSev = document.getElementById("dSev");
  const dEvidence = document.getElementById("dEvidence");

  const dStudent = document.getElementById("dStudent");
  const dClass = document.getElementById("dClass");
  const dCats = document.getElementById("dCats");
  const dWhen = document.getElementById("dWhen");
  const dLoc = document.getElementById("dLoc");
  const dDesc = document.getElementById("dDesc");
  const dWit = document.getElementById("dWit");
  const dRName = document.getElementById("dRName");
  const dREmail = document.getElementById("dREmail");

  const markReviewBtn = document.getElementById("markReviewBtn");
  const markEscalatedBtn = document.getElementById("markEscalatedBtn");
  const markClosedBtn = document.getElementById("markClosedBtn");
  const adminNoteEl = document.getElementById("adminNote");
  const copySummaryBtn = document.getElementById("copySummaryBtn");
  const copyIdBtn = document.getElementById("copyIdBtn");

  // -------- state --------
  let allReports = [];
  let filtered = [];
  let selectedId = null;
  let categoryUniverse = [];
  const selectedCats = new Set();

  // -------- helpers --------
  function safeArr(v) {
    return Array.isArray(v) ? v : [];
  }
  function nowISO() {
    return new Date().toISOString();
  }
  function setSplit(isSplit) {
    if (!inboxGrid) return;
    inboxGrid.classList.toggle("is-split", !!isSplit);
    inboxGrid.classList.toggle("is-full", !isSplit);
  }

  function closeCase() {
    selectedId = null;
    renderList();
    renderDetail(null);
    setSplit(false);
  }

  function openCaseFor(id) {
    selectedId = id;
    const r = filtered.find((x) => x.id === id) || null;
    renderList();
    renderDetail(r);
    setSplit(true);
  }

  function hideAllPanels() {
    panels.forEach((p) => (p.hidden = true));
    chips.forEach((c) => c.classList.remove("is-active"));
  }

  function togglePanel(panelId, chipEl) {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const isOpen = !panel.hidden;

    hideAllPanels();
    if (!isOpen) {
      panel.hidden = false;
      chipEl?.classList.add("is-active");
      // align panel under chip
      const rect = chipEl.getBoundingClientRect();
      const hostRect = panel.parentElement.getBoundingClientRect();
      panel.style.left = Math.max(0, rect.left - hostRect.left) + "px";
    }
  }

  function fmtDateTime(isoOrDate, timeMaybe) {
    // Stored schema has incidentDate + incidentTime; createdAt is ISO.
    try {
      if (isoOrDate && isoOrDate.includes("T")) {
        const d = new Date(isoOrDate);
        return d.toLocaleString([], {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch {}
    if (!isoOrDate) return "—";
    const t = timeMaybe ? String(timeMaybe) : "";
    return `${isoOrDate}${t ? " " + t : ""}`.trim();
  }
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .trim();
  }
  function includesAny(hay, needle) {
    return norm(hay).includes(norm(needle));
  }
  function severityRank(sev) {
    if (sev === "High") return 3;
    if (sev === "Medium") return 2;
    if (sev === "Low") return 1;
    return 0;
  }
  function uniq(list) {
    return Array.from(new Set(list)).filter(Boolean);
  }
  function loadReports() {
    try {
      const raw = localStorage.getItem(REPORTS_KEY);
      allReports = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(allReports)) allReports = [];
    } catch {
      allReports = [];
    }
  }
  function saveReports() {
    try {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(allReports));
    } catch {}
  }
  function setLastUpdated() {
    if (!lastUpdatedMeta) return;
    const ts = new Date();
    lastUpdatedMeta.textContent = `Last updated: ${ts.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  function getAllCategories() {
    const cats = [];
    allReports.forEach((r) =>
      safeArr(r.categories).forEach((c) => cats.push(c))
    );
    return uniq(cats).sort((a, b) => a.localeCompare(b));
  }

  function pillSevClass(sev) {
    if (sev === "High") return "is-high";
    if (sev === "Medium") return "is-medium";
    if (sev === "Low") return "is-low";
    return "";
  }

  function ensureAdminFields(r) {
    const createdAt = r.createdAt || nowISO();
    return {
      id: r.id || r.incidentId || "INC-000000",
      createdAt,
      reporterName: r.reporterName || "",
      reporterEmail: r.reporterEmail || "",
      studentCode: r.studentCode || "",
      studentClass: r.studentClass || "",
      severity: r.severity || "",
      categories: safeArr(r.categories),
      incidentDate: r.incidentDate || "",
      incidentTime: r.incidentTime || "",
      location: r.location || "",
      description: r.description || "",
      witnesses: r.witnesses || "",
      hasEvidence: !!r.hasEvidence,

      // admin-side
      status: r.status || "New",
      adminNote: r.adminNote || "",
      updatedAt: r.updatedAt || createdAt,
    };
  }
  function bindPickers() {
    // Severity picker -> #sev
    document.querySelectorAll('input[name="sevPick"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (!r.checked) return;
        if (sevEl) sevEl.value = r.value;
        applyAndRender();
        updateFilterBadges();
      });
    });

    // Status picker -> #status
    document.querySelectorAll('input[name="statusPick"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (!r.checked) return;
        if (statusEl) statusEl.value = r.value;
        applyAndRender();
        updateFilterBadges();
      });
    });

    // Sort picker -> #sort
    document.querySelectorAll('input[name="sortPick"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (!r.checked) return;
        if (sortEl) sortEl.value = r.value;
        applyAndRender();
        updateFilterBadges();
      });
    });
  }

  // -------- filters UI (categories) --------
  function renderCategoryFilter() {
    categoryUniverse = getAllCategories();
    if (!catWrap) return;

    if (!categoryUniverse.length) {
      catWrap.innerHTML = `<div class="snHelp">No categories available yet.</div>`;
      catMeta.textContent = "All";
      return;
    }

    catWrap.innerHTML = categoryUniverse
      .map((c) => {
        const id = `cat_${c.replaceAll(" ", "_").toLowerCase()}`;
        return `
  <label class="snCheck snCheck--tight" data-cat-row data-name="${escapeHTML(
    c
  )}">
    <input type="checkbox" data-cat="${escapeHTML(c)}" id="${escapeHTML(id)}" />
    <span>${escapeHTML(c)}</span>
  </label>
`;
      })
      .join("");

    catWrap
      .querySelectorAll('input[type="checkbox"][data-cat]')
      .forEach((cb) => {
        cb.checked = selectedCats.has(cb.getAttribute("data-cat"));
        cb.addEventListener("change", () => {
          const val = cb.getAttribute("data-cat");
          if (!val) return;
          if (cb.checked) selectedCats.add(val);
          else selectedCats.delete(val);
          updateCatMeta();
          applyAndRender();
        });
      });

    updateCatMeta();
  }

  function updateCatMeta() {
    if (!catMeta) return;
    if (!selectedCats.size) catMeta.textContent = "All";
    else catMeta.textContent = `${selectedCats.size} selected`;
    if (catSelectedCount)
      catSelectedCount.textContent = String(selectedCats.size || 0);
  }

  // -------- filtering + sorting --------
  function applyFilters() {
    const q = norm(qEl?.value);
    const sev = sevEl?.value || "";
    const st = statusEl?.value || "";
    const cls = norm(classEl?.value);
    const evidenceOnly = !!evidenceEl?.checked;
    const catsSelected = Array.from(selectedCats);

    filtered = allReports.map(ensureAdminFields).filter((r) => {
      if (sev && r.severity !== sev) return false;
      if (st && r.status !== st) return false;
      if (cls && !norm(r.studentClass).includes(cls)) return false;
      if (evidenceOnly && !r.hasEvidence) return false;

      if (catsSelected.length) {
        const rCats = safeArr(r.categories);
        const ok = catsSelected.some((c) => rCats.includes(c));
        if (!ok) return false;
      }

      if (q) {
        const hay = [
          r.id,
          r.studentCode,
          r.studentClass,
          r.location,
          safeArr(r.categories).join(" "),
          r.description,
          r.witnesses,
        ].join(" | ");
        if (!norm(hay).includes(q)) return false;
      }

      return true;
    });

    // sort
    const sort = sortEl?.value || "newest";
    if (sort === "oldest") {
      filtered.sort((a, b) =>
        String(a.createdAt).localeCompare(String(b.createdAt))
      );
    } else if (sort === "high") {
      filtered.sort((a, b) => {
        const s = severityRank(b.severity) - severityRank(a.severity);
        if (s !== 0) return s;
        return String(b.createdAt).localeCompare(String(a.createdAt));
      });
    } else {
      // newest
      filtered.sort((a, b) =>
        String(b.createdAt).localeCompare(String(a.createdAt))
      );
    }
  }

  // -------- list render --------
  function renderList() {
    if (!listBox) return;

    const count = filtered.length;
    if (resultsCount) {
      resultsCount.textContent = `${count} ${
        count === 1 ? "result" : "results"
      }`;
    }

    if (!count) {
      listBox.innerHTML = "";
      if (emptyState) emptyState.hidden = false;
      // clear detail if selection no longer exists
      selectedId = null;
      renderDetail(null);
      return;
    }

    if (emptyState) emptyState.hidden = true;

    listBox.innerHTML = filtered
      .map((r) => {
        const isActive = r.id === selectedId;
        const sevClass = pillSevClass(r.severity);
        const cats = safeArr(r.categories);
        const catTop = cats.slice(0, 2).join(", ");
        const catMore = cats.length > 2 ? ` +${cats.length - 2}` : "";
        const evidencePill = r.hasEvidence
          ? `<span class="snPill snPill--evidence">Evidence</span>`
          : "";

        return `
          <button
            class="snItemBtn ${isActive ? "is-active" : ""}"
            type="button"
            role="option"
            aria-selected="${isActive ? "true" : "false"}"
            data-id="${escapeHTML(r.id)}"
          >
            <div class="snItemRow">
              <div class="snItemMain">
                <div class="snItemId">${escapeHTML(r.id)}</div>
                <div class="snItemMeta">
                  ${escapeHTML(fmtDateTime(r.createdAt))} • ${escapeHTML(
          r.location || "—"
        )}
                </div>
              </div>

              <div>
                <div class="snItemStudent">${escapeHTML(
                  r.studentCode || "—"
                )}</div>
                <div class="snItemStudentSub">${escapeHTML(
                  r.studentClass || "—"
                )}</div>
              </div>

              <div class="snItemTags">
                <span class="snPill snPill--status">${escapeHTML(
                  r.status || "New"
                )}</span>
                <span class="snPill snPill--sev ${sevClass}">${escapeHTML(
          r.severity || "—"
        )}</span>
                ${evidencePill}
                ${
                  cats.length
                    ? `<span class="snPill">${escapeHTML(catTop)}${escapeHTML(
                        catMore
                      )}</span>`
                    : ""
                }
              </div>
            </div>
          </button>
        `;
      })
      .join("");

    // click handlers
    listBox.querySelectorAll(".snItemBtn[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (!id) return;
        // toggle behavior
        if (selectedId === id) {
          closeCase();
          return;
        }
        openCaseFor(id);
      });
    });
  }

  // Keyboard navigation for list
  function attachListKeyboardNav() {
    if (!listBox) return;

    listBox.addEventListener("keydown", (e) => {
      const items = Array.from(listBox.querySelectorAll(".snItemBtn[data-id]"));
      if (!items.length) return;

      const currentIndex = Math.max(
        0,
        items.findIndex((b) => b.getAttribute("data-id") === selectedId)
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = items[Math.min(items.length - 1, currentIndex + 1)];
        next?.click();
        next?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = items[Math.max(0, currentIndex - 1)];
        prev?.click();
        prev?.focus();
      }
      if (e.key === "Home") {
        e.preventDefault();
        items[0]?.click();
        items[0]?.focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1]?.click();
        items[items.length - 1]?.focus();
      }
    });
  }

  // -------- detail render + actions --------
  function renderDetail(r) {
    if (!detail || !detailEmpty) return;

    if (!r) {
      detail.hidden = true;
      detailEmpty.hidden = false;
      detailHint.textContent =
        "Select a report to review details and take action.";
      return;
    }

    detail.hidden = false;
    detailEmpty.hidden = true;
    detailHint.textContent =
      "Review details, update status, and add internal notes.";

    dId.textContent = r.id;
    dMeta.textContent = `Submitted: ${fmtDateTime(
      r.createdAt
    )} • Updated: ${fmtDateTime(r.updatedAt)}`;

    dStatus.textContent = r.status || "New";
    dSev.textContent = r.severity || "—";
    dSev.classList.remove("is-low", "is-medium", "is-high");
    const sevClass = pillSevClass(r.severity);
    if (sevClass) dSev.classList.add(sevClass);

    dEvidence.hidden = !r.hasEvidence;

    dStudent.textContent = r.studentCode || "—";
    dClass.textContent = r.studentClass || "—";
    dCats.textContent = safeArr(r.categories).length
      ? safeArr(r.categories).join(", ")
      : "—";
    dWhen.textContent = fmtDateTime(
      r.incidentDate || "—",
      r.incidentTime || ""
    );
    dLoc.textContent = r.location || "—";
    dDesc.textContent = r.description || "—";
    dWit.textContent = r.witnesses || "—";
    dRName.textContent = r.reporterName || "—";
    dREmail.textContent = r.reporterEmail || "—";

    adminNoteEl.value = r.adminNote || "";

    // action handlers (rebind each render, lightweight)
    markReviewBtn.onclick = () => updateStatus(r.id, "In review");
    markEscalatedBtn.onclick = () => updateStatus(r.id, "Escalated");
    markClosedBtn.onclick = () => updateStatus(r.id, "Closed");

    adminNoteEl.oninput = () => updateNote(r.id, adminNoteEl.value);

    copyIdBtn.onclick = () => copyText(r.id, "Copied", "Incident ID copied.");
    copySummaryBtn.onclick = () => {
      const summary = buildSummary(r);
      copyText(summary, "Copied", "Summary copied to clipboard.");
    };
  }

  function updateStatus(id, nextStatus) {
    const idx = allReports.findIndex((x) => ensureAdminFields(x).id === id);
    if (idx === -1) return;

    const r = ensureAdminFields(allReports[idx]);
    r.status = nextStatus;
    r.updatedAt = nowISO();

    allReports[idx] = r;
    saveReports();

    toast("Status updated", `${id} → ${nextStatus}`);
    applyAndRender(true);
  }

  function updateNote(id, note) {
    const idx = allReports.findIndex((x) => ensureAdminFields(x).id === id);
    if (idx === -1) return;

    const r = ensureAdminFields(allReports[idx]);
    r.adminNote = String(note || "");
    r.updatedAt = nowISO();

    allReports[idx] = r;
    saveReports();

    // Keep UI calm (no toast spam on every keystroke)
    applyAndRender(true, { silent: true });
  }

  function buildSummary(r) {
    const lines = [
      `Incident: ${r.id}`,
      `Status: ${r.status || "New"}`,
      `Severity: ${r.severity || "—"}`,
      `Student: ${r.studentCode || "—"} (${r.studentClass || "—"})`,
      `Categories: ${
        safeArr(r.categories).length ? safeArr(r.categories).join(", ") : "—"
      }`,
      `Incident date/time: ${fmtDateTime(
        r.incidentDate || "—",
        r.incidentTime || ""
      )}`,
      `Location: ${r.location || "—"}`,
      `Evidence: ${r.hasEvidence ? "Yes" : "No"}`,
      `Witnesses: ${r.witnesses || "—"}`,
      "",
      "Description:",
      `${r.description || "—"}`,
      "",
      `Admin note: ${r.adminNote ? r.adminNote : "—"}`,
    ];
    return lines.join("\n");
  }

  async function copyText(text, title, msg) {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      toast(title, msg);
    } catch {
      // fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = String(text || "");
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        toast(title, msg);
      } catch {
        toast("Copy failed", "Clipboard permission blocked in this browser.");
      }
    }
  }

  // -------- summary counts --------
  function renderSummary() {
    const all = allReports.map(ensureAdminFields);
    const counts = { New: 0, "In review": 0, Escalated: 0, Closed: 0 };
    let high = 0;

    all.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1;
      if (r.severity === "High") high++;
    });
    if (!sumNew || !sumReview || !sumEscalated || !sumClosed || !sumHigh)
      return;

    sumNew.textContent = String(counts.New || 0);
    sumReview.textContent = String(counts["In review"] || 0);
    sumEscalated.textContent = String(counts.Escalated || 0);
    sumClosed.textContent = String(counts.Closed || 0);
    sumHigh.textContent = String(high);

    setLastUpdated();
  }

  // -------- demo data --------
  function makeDemoReport(overrides = {}) {
    const id = `INC-${String(Math.floor(100000 + Math.random() * 900000))}`;
    const createdAt = nowISO();

    const base = {
      id,
      createdAt,
      reporterName: "Staff member",
      reporterEmail: "staff@school.se",
      studentCode: "8B-05",
      studentClass: "8B",
      severity: "Medium",
      categories: ["Threat / intimidation"],
      incidentDate: new Date().toISOString().split("T")[0],
      incidentTime: "10:20",
      location: "Hallway (near lockers)",
      description:
        "Student used intimidating language toward another student during break. Staff intervened and separated parties. No physical contact observed.",
      witnesses: "Staff A, Staff B",
      hasEvidence: false,

      status: "New",
      adminNote: "",
      updatedAt: createdAt,
    };

    return { ...base, ...overrides };
  }

  function generateDemoReports() {
    loadReports();
    const existing = Array.isArray(allReports) ? allReports.length : 0;

    const demo = [
      makeDemoReport({
        severity: "High",
        status: "Escalated",
        categories: ["Weapon suspicion", "Threat / intimidation"],
        studentCode: "9A-02",
        studentClass: "9A",
        location: "Classroom 112",
        hasEvidence: true,
        description:
          "Staff received credible concern that a student may be carrying a sharp object in a backpack. Student was calm but refused to open bag when asked. Situation contained; leadership notified.",
      }),
      makeDemoReport({
        severity: "Medium",
        status: "New",
        categories: ["Bullying / harassment"],
        studentCode: "7B-11",
        studentClass: "7B",
        location: "Cafeteria",
        description:
          "Repeated verbal harassment reported during lunch. Target student moved seats. Staff collected factual notes and asked witnesses for support.",
      }),
      makeDemoReport({
        severity: "Low",
        status: "In review",
        categories: ["Unauthorized visitor"],
        studentCode: "—",
        studentClass: "Other / Not sure",
        location: "Main entrance",
        description:
          "Unidentified adult attempted to enter through student door. Entry denied. Staff reminded reception to verify visitors and log entries.",
      }),
    ];

    // Append (don’t overwrite)
    allReports = (Array.isArray(allReports) ? allReports : []).concat(demo);
    saveReports();

    toast(
      "Demo created",
      `Added ${demo.length} demo reports${existing ? " (appended)" : ""}.`
    );
    init();
  }

  // -------- clear filters --------
  function clearFilters() {
    if (qEl) qEl.value = "";
    if (sortEl) sortEl.value = "newest";
    if (sevEl) sevEl.value = "";
    if (statusEl) statusEl.value = "";
    if (classEl) classEl.value = "";
    if (evidenceEl) evidenceEl.checked = false;
    selectedCats.clear();
    renderCategoryFilter();
    applyAndRender();
  }

  // -------- main render cycle --------
  function applyAndRender(keepSelection = false, opts = {}) {
    applyFilters();

    if (!keepSelection) {
      // If selected report isn’t in filtered results, clear selection
      if (selectedId && !filtered.some((r) => r.id === selectedId)) {
        selectedId = null;
      }
    }

    renderSummary();
    renderList();

    // If there is a selection, render its detail from filtered
    if (selectedId) {
      const r = filtered.find((x) => x.id === selectedId) || null;
      renderDetail(r);
    } else {
      renderDetail(null);
    }

    if (!opts.silent) {
      // no-op (kept for future)
    }
    updateFilterBadges();
  }

  function updateFilterBadges() {
    const q = norm(qEl?.value);
    const sev = sevEl?.value || "";
    const st = statusEl?.value || "";
    const cls = norm(classEl?.value);
    const evidenceOnly = !!evidenceEl?.checked;
    const sort = sortEl?.value || "newest";
    const cats = selectedCats.size;

    const counts = {
      sev: sev ? 1 : 0,
      status: st ? 1 : 0,
      class: cls ? 1 : 0,
      evidence: evidenceOnly ? 1 : 0,
      sort: sort !== "newest" ? 1 : 0,
      q: q ? 1 : 0,
      cats: cats ? 1 : 0, // count categories as 1 active filter
    };

    const active =
      counts.sev +
      counts.status +
      counts.class +
      counts.evidence +
      counts.sort +
      counts.q +
      counts.cats;

    if (activeFilterCount) {
      activeFilterCount.hidden = active === 0;
      activeFilterCount.textContent = String(active);
    }

    function setChip(el, n) {
      if (!el) return;
      el.hidden = !n;
      el.textContent = String(n);
    }

    setChip(chipSevCount, counts.sev);
    setChip(chipStatusCount, counts.status);
    setChip(chipClassCount, counts.class);
    setChip(chipCatsCount, selectedCats.size ? selectedCats.size : 0);
    setChip(chipEvidenceCount, counts.evidence);
    setChip(chipSortCount, counts.sort);
  }

  function bindFilterEvents() {
    [qEl, sortEl, sevEl, statusEl, classEl].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", () => applyAndRender());
      el.addEventListener("change", () => applyAndRender());
    });

    if (evidenceEl)
      evidenceEl.addEventListener("change", () => applyAndRender());

    if (clearFiltersBtn)
      clearFiltersBtn.addEventListener("click", clearFilters);

    if (generateDemoBtn)
      generateDemoBtn.addEventListener("click", generateDemoReports);
    if (emptyGenerateBtn)
      emptyGenerateBtn.addEventListener("click", generateDemoReports);

    // ✅ chips open panels
    chips.forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePanel(chip.getAttribute("data-panel"), chip);
      });
    });

    // ✅ click outside closes panels
    document.addEventListener("click", (e) => {
      const target = e.target;
      const insidePanel = panels.some((p) => p.contains(target));
      const insideChip = chips.some((c) => c.contains(target));
      if (!insidePanel && !insideChip) hideAllPanels();
    });

    // ✅ close case file
    if (closeCaseBtn) closeCaseBtn.addEventListener("click", closeCase);

    // ✅ category quick search
    if (catSearch) {
      catSearch.addEventListener("input", () => {
        const q = norm(catSearch.value);
        catWrap
          ?.querySelectorAll("label.snCheck[data-cat-row]")
          .forEach((row) => {
            const name = row.getAttribute("data-name") || "";
            row.hidden = q ? !norm(name).includes(q) : false;
          });
      });
    }
  }

  function init() {
    loadReports();
    // normalize stored data (ensure admin fields exist)
    allReports = allReports.map(ensureAdminFields);
    saveReports();

    renderCategoryFilter();
    applyAndRender();

    setSplit(false);
    renderDetail(null);
    updateFilterBadges();
  }
  document.addEventListener("DOMContentLoaded", () => {
    bindPickers();
    bindFilterEvents();
    attachListKeyboardNav();
    init();
  });
})();
