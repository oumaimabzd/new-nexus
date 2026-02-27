(function () {
  // ---------- tiny toast ----------
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

  // ---------- nav stubs ----------
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".navRail__iconBtn")
        .forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      toast("Navigation", `${btn.getAttribute("data-nav")} (stub)`);
    });
  });

  // ---------- wizard core ----------
  const form = document.getElementById("incidentForm");
  const panels = Array.from(document.querySelectorAll(".snStepPanel"));
  const steps = Array.from(document.querySelectorAll(".snStep"));
  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const clearFormBtn = document.getElementById("clearFormBtn");

  const successState = document.getElementById("successState");
  const incidentIdEl = document.getElementById("incidentId");
  const reportAnotherBtn = document.getElementById("reportAnotherBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Step 2 helpers
  const highSeverityNote = document.getElementById("highSeverityNote");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const studentsWrap = document.getElementById("studentsWrap");

  const err = {
    reporterName: document.getElementById("errReporterName"),
    reporterEmail: document.getElementById("errReporterEmail"),
    studentCode: document.getElementById("errStudentCode"),
    studentClass: document.getElementById("errStudentClass"),
    severity: document.getElementById("errSeverity"),
    category: document.getElementById("errCategory"),
    incidentDate: document.getElementById("errIncidentDate"),
    location: document.getElementById("errLocation"),
    description: document.getElementById("errDescription"),
  };

  function show(el) {
    if (el) el.hidden = false;
  }
  function hide(el) {
    if (el) el.hidden = true;
  }
  function resetErrors() {
    Object.values(err).forEach(hide);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }
  function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : "";
  }
  function getCheckedValues(name) {
    return Array.from(
      document.querySelectorAll(`input[name="${name}"]:checked`),
    ).map((i) => i.value);
  }

  // date max today
  const incidentDateInput = document.getElementById("incidentDate");
  if (incidentDateInput) {
    const todayISO = new Date().toISOString().split("T")[0];
    incidentDateInput.max = todayISO;
  }

  let currentStep = 0;

  function setStep(index) {
    currentStep = Math.max(0, Math.min(index, panels.length - 1));
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    // panels
    panels.forEach((p, i) => (p.hidden = i !== currentStep));

    // stepper
    steps.forEach((s, i) => {
      s.classList.toggle("is-active", i === currentStep);
      s.classList.toggle("is-complete", i < currentStep);
      if (i === currentStep) s.setAttribute("aria-current", "step");
      else s.removeAttribute("aria-current");
    });

    // buttons
    backBtn.disabled = currentStep === 0;
    const isLast = currentStep === panels.length - 1;
    nextBtn.hidden = isLast;
    submitBtn.hidden = !isLast;

    // success visibility: keep success separate
    if (successState) successState.hidden = true;

    // build review on step 4
    if (currentStep === 3) buildReview();
  }

  // ---------- Step 2: High severity note ----------
  document.querySelectorAll('input[name="severity"]').forEach((r) => {
    r.addEventListener("change", () => {
      const v = getRadioValue("severity");
      if (highSeverityNote) highSeverityNote.hidden = v !== "High";
      hide(err.severity);
      saveDraft();
    });
  });

  // categories: clear error on change + autosave
  document.querySelectorAll('input[name="category"]').forEach((c) => {
    c.addEventListener("change", () => {
      hide(err.category);
      saveDraft();
    });
  });

  // ---------- Add another student (repeatable UI, minimal) ----------
  let studentRowCount = 1;
  function makeStudentRow(index) {
    const wrap = document.createElement("div");
    wrap.className = "snStudentRow";
    wrap.setAttribute("data-student-row", String(index));
    wrap.innerHTML = `
      <div class="snGrid2">
        <div class="snField">
          <label class="snLabel">Additional student (code/initials)</label>
          <input class="snInput" type="text" name="studentCodeExtra" placeholder="e.g., 7A-05 / AB" />
          <div class="snHelp">Optional — use codes/initials only.</div>
        </div>
        <div class="snField">
          <label class="snLabel">Additional class/group</label>
          <select class="snInput" name="studentClassExtra">
            <option value="">Select class…</option>
            <option value="7A">7A</option><option value="7B">7B</option>
            <option value="8A">8A</option><option value="8B">8B</option>
            <option value="9A">9A</option><option value="9B">9B</option>
            <option value="Other">Other / Not sure</option>
          </select>
          <div class="snHelp">Optional.</div>
        </div>
      </div>
      <div class="snRowActions snRowActions--right">
        <button class="btn btn--tertiary" type="button" data-remove-student>Remove</button>
      </div>
    `;

    wrap
      .querySelectorAll("input,select")
      .forEach((el) => el.addEventListener("input", saveDraft));
    const rm = wrap.querySelector("[data-remove-student]");
    rm.addEventListener("click", () => {
      wrap.remove();
      saveDraft();
    });

    return wrap;
  }

  if (addStudentBtn && studentsWrap) {
    addStudentBtn.addEventListener("click", () => {
      const row = makeStudentRow(studentRowCount++);
      studentsWrap.appendChild(row);
      saveDraft();
    });
  }

  // ---------- validation per step ----------
  function validateStep(stepIndex) {
    resetErrors();
    let ok = true;

    if (stepIndex === 0) {
      const reporterName = document.getElementById("reporterName").value.trim();
      const reporterEmail = document
        .getElementById("reporterEmail")
        .value.trim();
      if (!reporterName) {
        show(err.reporterName);
        ok = false;
      }
      if (!isValidEmail(reporterEmail)) {
        show(err.reporterEmail);
        ok = false;
      }
    }

    if (stepIndex === 1) {
      const studentCode = document.getElementById("studentCode").value.trim();
      const studentClass = document.getElementById("studentClass").value;
      const severity = getRadioValue("severity");
      const categories = getCheckedValues("category");

      if (!studentCode) {
        show(err.studentCode);
        ok = false;
      }
      if (!studentClass) {
        show(err.studentClass);
        ok = false;
      }
      if (!severity) {
        show(err.severity);
        ok = false;
      }
      if (!categories.length) {
        show(err.category);
        ok = false;
      }
    }

    if (stepIndex === 2) {
      const incidentDate = document.getElementById("incidentDate").value;
      const location = document.getElementById("location").value.trim();
      const description = document.getElementById("description").value.trim();

      // date must not be future if max isn't supported
      if (!incidentDate) {
        show(err.incidentDate);
        ok = false;
      }
      if (!location) {
        show(err.location);
        ok = false;
      }
      if (!description) {
        show(err.description);
        ok = false;
      }
    }

    return ok;
  }

  // ---------- review ----------
  function buildReview() {
    const box = document.getElementById("reviewBox");
    if (!box) return;

    const studentCode = document.getElementById("studentCode").value.trim();
    const studentClass = document.getElementById("studentClass").value;
    const severity = getRadioValue("severity");
    const categories = getCheckedValues("category");
    const incidentDate = document.getElementById("incidentDate").value || "";
    const incidentTime = document.getElementById("incidentTime").value || "";
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    box.innerHTML = `
      <div class="snReviewRow"><strong>Student</strong> <span>${escapeHTML(
        studentCode || "—",
      )} (${escapeHTML(studentClass || "—")})</span></div>
      <div class="snReviewRow"><strong>Severity</strong> <span>${escapeHTML(
        severity || "—",
      )}</span></div>
      <div class="snReviewRow"><strong>Categories</strong> <span>${escapeHTML(
        categories.join(", ") || "—",
      )}</span></div>
      <div class="snReviewRow"><strong>Date/Time</strong> <span>${escapeHTML(
        incidentDate || "—",
      )} ${escapeHTML(incidentTime || "")}</span></div>
      <div class="snReviewRow"><strong>Location</strong> <span>${escapeHTML(
        location || "—",
      )}</span></div>
      <div class="snReviewBlock"><strong>Description</strong><div>${escapeHTML(
        description || "—",
      )}</div></div>
    `;
  }

  // ---------- autosave draft ----------
  const DRAFT_KEY = "sn_incident_draft_v1";
  function saveDraft() {
    try {
      const data = {
        reporterName: document.getElementById("reporterName")?.value || "",
        reporterEmail: document.getElementById("reporterEmail")?.value || "",
        studentCode: document.getElementById("studentCode")?.value || "",
        studentClass: document.getElementById("studentClass")?.value || "",
        severity: getRadioValue("severity"),
        categories: getCheckedValues("category"),
        incidentDate: document.getElementById("incidentDate")?.value || "",
        incidentTime: document.getElementById("incidentTime")?.value || "",
        location: document.getElementById("location")?.value || "",
        description: document.getElementById("description")?.value || "",
        witnesses: document.getElementById("witnesses")?.value || "",
        hasEvidence: document.getElementById("hasEvidence")?.checked || false,
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {}
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);

      if (document.getElementById("reporterName"))
        document.getElementById("reporterName").value = d.reporterName || "";
      if (document.getElementById("reporterEmail"))
        document.getElementById("reporterEmail").value = d.reporterEmail || "";
      if (document.getElementById("studentCode"))
        document.getElementById("studentCode").value = d.studentCode || "";
      if (document.getElementById("studentClass"))
        document.getElementById("studentClass").value = d.studentClass || "";

      // severity
      document.querySelectorAll('input[name="severity"]').forEach((r) => {
        r.checked = r.value === (d.severity || "");
      });
      if (highSeverityNote)
        highSeverityNote.hidden = (d.severity || "") !== "High";

      // categories
      document.querySelectorAll('input[name="category"]').forEach((c) => {
        c.checked = Array.isArray(d.categories)
          ? d.categories.includes(c.value)
          : false;
      });

      if (document.getElementById("incidentDate"))
        document.getElementById("incidentDate").value = d.incidentDate || "";
      if (document.getElementById("incidentTime"))
        document.getElementById("incidentTime").value = d.incidentTime || "";
      if (document.getElementById("location"))
        document.getElementById("location").value = d.location || "";
      if (document.getElementById("description"))
        document.getElementById("description").value = d.description || "";
      if (document.getElementById("witnesses"))
        document.getElementById("witnesses").value = d.witnesses || "";
      if (document.getElementById("hasEvidence"))
        document.getElementById("hasEvidence").checked = !!d.hasEvidence;
    } catch {}
  }

  // autosave on input
  form.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("input", saveDraft);
    el.addEventListener("change", saveDraft);
  });

  // ---------- actions ----------
  backBtn.addEventListener("click", () => setStep(currentStep - 1));

  nextBtn.addEventListener("click", () => {
    const ok = validateStep(currentStep);
    if (!ok) {
      toast(
        "Check fields",
        "Please review the highlighted items before continuing.",
      );
      return;
    }
    setStep(currentStep + 1);
  });

  // ---------- submit (no loading state) ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // validate all steps quickly
    for (let s = 0; s < 3; s++) {
      if (!validateStep(s)) {
        toast(
          "Check fields",
          "Please review the highlighted items before submitting.",
        );
        setStep(s);
        return;
      }
    }

    // "submit" stub
    const incidentId = `INC-${String(
      Math.floor(100000 + Math.random() * 900000),
    )}`;
    incidentIdEl.textContent = incidentId;

    // show success
    successState.hidden = false;
    panels.forEach((p) => (p.hidden = true));
    steps.forEach((st) => st.classList.remove("is-active"));
    toast("Submitted", "Report submitted successfully.");
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  });

  // clear
  function clearFormWithConfirm() {
    const ok = window.confirm("Are you sure you want to clear the form?");
    if (!ok) return;
    form.reset();
    resetErrors();
    if (highSeverityNote) highSeverityNote.hidden = true;
    // remove extra student rows
    if (studentsWrap) {
      studentsWrap
        .querySelectorAll('[data-student-row]:not([data-student-row="0"])')
        .forEach((n) => n.remove());
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    setStep(0);
    toast("Form", "Form cleared.");
  }
  if (clearFormBtn)
    clearFormBtn.addEventListener("click", clearFormWithConfirm);

  reportAnotherBtn?.addEventListener("click", () => {
    form.reset();
    resetErrors();
    if (highSeverityNote) highSeverityNote.hidden = true;
    if (studentsWrap) {
      studentsWrap
        .querySelectorAll('[data-student-row]:not([data-student-row="0"])')
        .forEach((n) => n.remove());
    }
    successState.hidden = true;
    setStep(0);
  });

  closeBtn?.addEventListener("click", () => {
    toast("Close", "Close action (stub).");
    console.log("[CLOSE] success panel close clicked");
  });

  // init
  loadDraft();
  render();
})();
