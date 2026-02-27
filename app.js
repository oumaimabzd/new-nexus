/* =========================================================
  School Nexus — app.js
  - Chat behavior unchanged
  - Move police stubs to new Police module under incident
  - Modern toast (no alerts)
========================================================= */

(function () {
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

  /* ------------------------------
    Nav rail stubs + clearer active state
  ------------------------------ */
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".navRail__iconBtn")
        .forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.getAttribute("data-nav");
      toast("Navigation", `${key} (stub)`);
      console.log("[NAV]", key);
    });
  });

  /* ------------------------------
    Utility panel stubs
  ------------------------------ */
  const completeCourseBtn = document.getElementById("completeCourseBtn");
  if (completeCourseBtn) {
    completeCourseBtn.addEventListener("click", () => {
      window.location.href = "training-library.html";
    });
  }

  const viewAllCoursesBtn = document.getElementById("viewAllCoursesBtn");
  if (viewAllCoursesBtn) {
    viewAllCoursesBtn.addEventListener("click", () => {
      toast("Navigation", "All courses & trainings → /courses (stub)");
      console.log("[ROUTE] /courses");
    });
  }

  document.querySelectorAll("[data-news]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-news");
      toast("Open", `News item → ${key} (stub)`);
      console.log("[NEWS] open:", key);
    });
  });
  const reviewReportsBtn = document.getElementById("reviewReportsBtn");
  if (reviewReportsBtn) {
    reviewReportsBtn.addEventListener("click", () => {
      window.location.href = "behaviorNEW1.html#dashboard";
    });
  }

  /* ------------------------------
    Incident reporting stubs (existing)
  ------------------------------ */
  const createReportBtn = document.getElementById("createReportBtn");
  if (createReportBtn) {
    createReportBtn.addEventListener("click", () => {
      window.location.href = "behaviorNEW1.html#report";
    });
  }

  const viewDraftsBtn = document.getElementById("viewDraftsBtn");
  if (viewDraftsBtn) {
    viewDraftsBtn.addEventListener("click", () => {
      toast("Navigation", "View drafts → DEMO");
      console.log("[ROUTE] /reports/drafts");
    });
  }

  /* ------------------------------
    NEW Police module stubs (moved under incident)
  ------------------------------ */
  const viewAllPoliceUpdatesBtn = document.getElementById(
    "viewAllPoliceUpdatesBtn",
  );
  if (viewAllPoliceUpdatesBtn) {
    viewAllPoliceUpdatesBtn.addEventListener("click", () => {
      toast("Navigation", "Police updates → /police/updates (stub)");
      console.log("[ROUTE] /police/updates");
    });
  }

  /* ------------------------------
    Training CTA stub (kept)
  ------------------------------ */
  const startTrainingBtn = document.getElementById("startTrainingBtn");
  if (startTrainingBtn) {
    startTrainingBtn.addEventListener("click", () => {
      toast("Navigation", "Start training → De-escalation Basics (stub)");
      console.log("[ROUTE] start training");
    });
  }

  /* ------------------------------
    Chat behavior (unchanged)
  ------------------------------ */
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatList = document.getElementById("chatList");
  const relatedTraining = document.getElementById("relatedTraining");
  const promptSugs = document.getElementById("promptSugs");

  let scenarioTriggered = false;

  function showRelatedTraining() {
    if (!relatedTraining) return;
    relatedTraining.classList.remove("is-hidden");
    relatedTraining.hidden = false;
  }
  /* ------------------------------
    Police → AI guidance (FAKE demo scenarios)
  ------------------------------ */
  const POLICE_SCENARIO_URGENT =
    "Police alert: Increased activity near school routes during arrival/pickup. What should I do right now as staff on duty?";

  const POLICE_SCENARIO_CRITICAL =
    "Police alert: Reported weapon threat near the school perimeter. What immediate steps should we take at school, who do we notify, and how do we keep students safe?";

  function focusAI() {
    const ai = document.querySelector(".aiShell");
    if (ai) ai.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-police-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-police-action");

      // Create a “user question” that looks like a teacher reaching out
      const teacherPrompt =
        type === "critical" ? POLICE_SCENARIO_CRITICAL : POLICE_SCENARIO_URGENT;

      focusAI();
      addMessage("teacher", teacherPrompt);

      window.setTimeout(() => {
        // Reuse the existing fake mechanism + keywords.
        // If you want a dedicated response per type, we can override here:
        if (type === "critical") {
          addMessage(
            "ai",
            [
              "This is a severe situation. Do not act alone.",
              "",
              "1) Follow your school’s emergency escalation procedure immediately.",
              "2) Notify the principal/school leadership and call emergency services if required by your protocol.",
              "3) Prioritize safety: keep students supervised, limit movement, and avoid confrontation.",
              "4) Document key observations and actions taken for follow-up reporting.",
              "",
              "If you tell me your role (teacher/mentor/leader) I can show the correct next-step checklist (demo).",
            ].join("\n"),
          );
          return;
        }

        // Urgent (yellow) – calmer advice
        addMessage(
          "ai",
          [
            "This is urgent, but not necessarily a direct threat.",
            "",
            "Recommended actions (demo):",
            "• Increase adult presence at entrances and pickup/arrival zones.",
            "• Reinforce ID / visitor routines and keep external doors monitored.",
            "• Share a short note with staff: what to watch for, who to contact, and how to report concerns.",
            "• If anything escalates, switch to your school’s escalation procedure immediately.",
          ].join("\n"),
        );
      }, 420);
    });
  });

  function setSendEnabled() {
    if (!sendBtn || !chatInput) return;
    sendBtn.disabled = chatInput.value.trim().length === 0;
  }

  function autoGrow(el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }

  function addMessage(role, text) {
    if (!chatList) return;
    chatList.classList.remove("chat--empty");
    const empty = chatList.querySelector(".chatEmpty");
    if (empty) empty.remove();

    const li = document.createElement("li");
    li.className = role === "teacher" ? "msg msg--teacher" : "msg msg--ai";

    const avatar = document.createElement("div");
    avatar.className =
      role === "teacher" ? "msg__avatar" : "msg__avatar msg__avatar--ai";
    avatar.setAttribute("aria-hidden", "true");

    if (role === "teacher") {
      avatar.textContent = "T";
    } else {
      avatar.innerHTML = `<img src="lighthouse.png" alt="" aria-hidden="true" />`;
    }

    const bubble = document.createElement("div");
    bubble.className =
      role === "teacher" ? "msg__bubble" : "msg__bubble msg__bubble--ai";
    bubble.innerHTML = text; // plain text only
    if (role === "ai") {
      const readMoreBtn = document.createElement("button");
      readMoreBtn.className = "readMoreBtn";
      readMoreBtn.textContent = "Read more";

      readMoreBtn.addEventListener("click", () => {
        addMessage(
          "ai",
          "Additional explanatory content will be provided here. This is placeholder text for testing layout, hierarchy, and interaction flow.",
        );
        readMoreBtn.disabled = true;
      });

      bubble.appendChild(document.createElement("br"));
      bubble.appendChild(readMoreBtn);
    }

    li.appendChild(avatar);
    li.appendChild(bubble);
    chatList.appendChild(li);
    // Only auto-scroll if the user is already near the bottom
    const threshold = 40; // px
    const isNearBottom =
      chatList.scrollHeight - chatList.scrollTop - chatList.clientHeight <
      threshold;

    if (isNearBottom) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }
  // ------------------------------
  // Prompt suggestions (FAKE quick questions)
  // ------------------------------
  const QUICK_PROMPTS = {
    lockdown: {
      q: "How do I handle a lockdown?",
      a: `
  <p>
    A lockdown is initiated when an immediate threat exists within or is approaching the school premises.
    The guiding principle is <strong>"Stay inside – lock the door"</strong> (Stanna inne – lås dörren).
    Speed is prioritized over shelter quality, as the most critical factor is moving out of sight immediately.
  </p>

  <h4>Immediate actions (first 30 seconds)</h4>
  <ul>
    <li><strong>Give a clear command:</strong> Use a firm, authoritative voice to tell students, “Stay inside now. Everyone sit down”.</li>
    <li><strong>Secure the entrance:</strong> Immediately close and lock the classroom door.</li>
    <li><strong>Control visibility:</strong> Turn off the lights and immediately cover any vision panels or door windows with pre-sized opaque materials.</li>
    <li><strong>Conceal the group:</strong> Move everyone to a corner away from doors and windows to break the line of sight.</li>
    <li><strong>Use cover:</strong> Position students on the floor, behind or under sturdy furniture.</li>
    <li><strong>Maintain silence:</strong> Establish complete silence and use hand signals to communicate; a silent room provides no acoustic cues to a threat.</li>
  </ul>

  <h4>Accountability and communication</h4>
  <ul>
    <li><strong>Visual headcount:</strong> Perform a rapid visual count of students without calling names aloud.</li>
    <li><strong>Report status:</strong> Use a mobile phone to send a brief text to administration following the short-format protocol:
      <em>“Room [X], [#] students, injuries Y/N”.</em>
    </li>
    <li><strong>Silence devices:</strong> Ensure all mobile phones are silenced.</li>
  </ul>
  `,
    },

    act6a: {
      q: "What is School Act chapter 6a?",
      a: [
        "Chapter 6a of the Swedish Education Act (Säkerhetsarbete i brottsförebyggande syfte) was adopted to equip schools with legal tools to manage security threats and prevent crime. Most provisions took effect on July 1, 2025, with mandated action plans required by January 1, 2026.",
        "",
        "Key sections include:",
        "• Section 3: Requires schools to have an emergency preparedness plan for serious violent incidents and maintain ongoing readiness.",
        "• Section 4: Empowers principals to restrict unauthorized access to school premises during operating hours.",
        "• Section 5: Grants authority to inspect bags and belongings if justified to mitigate risks of disorder, harassment, or crime (effective for groups on July 1, 2026).",
        "• Section 7 & 8: Allows for the confiscation of dangerous items, which must generally be returned by the end of the day unless they pose an ongoing risk.",
        "• Section 10: Mandates that the principal report suspected crimes committed in connection with school activities to the police.",
      ].join("\n"),
    },
    police: {
      q: "How do I report a crime to the police?",
      a: [
        "Under Chapter 6a, Section 10 of the Education Act, the principal has a legal obligation to report suspected crimes committed by students in connection with school activities.",
        "",
        "Contact Methods:",
        "• In an emergency: Always call 112.",
        "• Non-urgent matters: Call 114 14 or report online via www.polisen.se.",
        "• Confiscated items: If weapons or narcotics are found during an inspection, the school must secure the item and contact the police immediately. The school is not permitted to store narcotics and must hand them over to police as soon as possible.",
        "",
        "When reporting, be prepared to provide student details, a description of what was found, and the names of witnesses.",
      ].join("\n"),
    },
  };

  function hidePromptSuggestions() {
    if (!promptSugs) return;
    promptSugs.classList.add("is-hidden");
    promptSugs.setAttribute("aria-hidden", "true");
  }

  function wirePromptSuggestions() {
    if (!promptSugs) return;

    promptSugs.querySelectorAll(".promptSug").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-sug");
        const item = QUICK_PROMPTS[key];
        if (!item) return;

        // Post the question as teacher
        addMessage("teacher", item.q);

        // Remove just this suggestion
        btn.remove();

        // If none left, hide the whole row
        if (!promptSugs.querySelector(".promptSug")) hidePromptSuggestions();

        // Post the fake AI answer
        window.setTimeout(() => {
          addMessage("ai", item.a);
        }, 420);
      });
    });
  }

  const dangerKeywords = [
    "knife",
    "knif",
    "weapon",
    "wepon",
    "bag",
    "backpack",
    "back pack",
    "search",
    "serch",
    "student",
    "studant",
    "danger",
    "threat",
  ];
  const FAKE_SCENARIO_RESPONSE = `
<p>
If you find a knife in a student's bag, you must follow the protocol for
<strong>Category 2 Weapons</strong> (knives &gt; 6 cm) or
<strong>Category 4 Prohibited Items</strong> (knives &lt; 6 cm)
exactly as outlined in the school’s procedures.
</p>

<h4>Immediate safety actions</h4>
<ul>
  <li><strong>Stay calm:</strong> Do not panic or escalate the situation.</li>
  <li><strong>Create distance:</strong> Ask the student to step away from the bag and the item.</li>
  <li><strong>Assess the threat level:</strong> Determine immediately whether the student is aggressive or calm.</li>
</ul>

<h4>If the student is aggressive or threatening</h4>
<ul>
  <li><strong>Abort the inspection:</strong> Stop immediately and ensure all staff leave the room.</li>
  <li><strong>Contact emergency services:</strong> Call <strong>112</strong> and state there is an
    <em>“active threat with a weapon.”</em>
  </li>
  <li><strong>Initiate lockdown:</strong> Activate lockdown procedures if necessary to protect the rest of the school.</li>
</ul>

<h4>If the student is calm</h4>
<ul>
  <li><strong>Secure the item:</strong> The Inspection Leader should put on protective gloves, place the knife in an evidence or plastic bag, and label it with the date, time, and student’s name.</li>
  <li><strong>Safe storage:</strong> Store the labeled item in a locked security cabinet or safe accessible only to the principal or designated staff.</li>
  <li><strong>Police contact:</strong> For a knife longer than 6 cm, contact the police at <strong>114 14</strong> and keep the student supervised until the police arrive or provide further instructions.</li>
</ul>
`;

  function mockedAIResponse(userText) {
    const normalized = userText.toLowerCase();

    const dangerKeywords = [
      "knife",
      "knif",
      "weapon",
      "wepon",
      "bag",
      "backpack",
      "back pack",
      "search",
      "serch",
      "student",
      "studant",
      "danger",
      "threat",
    ];

    const matched = dangerKeywords.some((kw) => normalized.includes(kw));

    if (matched) {
      scenarioTriggered = true;
      showRelatedTraining();
      return FAKE_SCENARIO_RESPONSE;
    }

    return "I’m here to help with school safety and responsibility questions.";
  }

  if (chatInput) {
    chatInput.addEventListener("input", () => {
      autoGrow(chatInput);
      setSendEnabled();
    });

    // Enter sends, Shift+Enter newline
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm?.requestSubmit();
      }
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage("teacher", text);
      chatInput.value = "";
      autoGrow(chatInput);
      setSendEnabled();

      window.setTimeout(() => {
        addMessage("ai", mockedAIResponse(text));
      }, 420);
    });
  }
  /* =========================
   Welcome card logic
========================= */

  // Example: later this can come from auth/session
  const USER_NAME = "Anna";

  const welcomeNameEl = document.getElementById("welcomeName");
  const typingEl = document.getElementById("welcomeTyping");

  if (welcomeNameEl) {
    welcomeNameEl.textContent = USER_NAME;
  }

  // Calm system message (non-playful)
  const message = "Your school security companion is here.";

  let index = 0;
  function typeMessage() {
    if (!typingEl) return;
    if (index < message.length) {
      typingEl.textContent += message.charAt(index);
      index++;
      setTimeout(typeMessage, 32); // subtle, professional speed
    }
  }
  /* =========================
   Learning progress pie (radial)
   - smooth fill on page load
   - reusable across modules
========================= */
  function initProgressPie() {
    const pie = document.getElementById("progressPie");
    const fill = document.getElementById("progressPieFill");
    const levelEl = document.getElementById("progressLevel");
    const pctEl = document.getElementById("progressPct");
    if (!pie || !fill) return;

    // DEMO values (wire real data later)
    const percent = 10;
    const level = "Exploring";

    if (levelEl) levelEl.textContent = level;
    if (pctEl) pctEl.textContent = percent + "%";

    const r = Number(fill.getAttribute("r")) || 60;
    const circumference = 2 * Math.PI * r;

    fill.style.strokeDasharray = String(circumference);
    fill.style.strokeDashoffset = String(circumference); // start empty

    // Force layout then animate
    fill.getBoundingClientRect();

    requestAnimationFrame(() => {
      const offset = circumference * (1 - percent / 100);
      fill.style.strokeDashoffset = String(offset);
      pie.setAttribute("aria-valuenow", String(percent));

      // Completion state
      if (percent >= 100) {
        pie.classList.add("is-complete");
      }
    });
  }

  initProgressPie();
  /* =========================
   Dashboard Calendar (Month grid + modal)
   - Monday start (Sweden)
   - Today highlighted
   - Event days get a dot
========================= */

  (function initDashboardCalendar() {
    const elDays = document.getElementById("calDays");
    const elMonth = document.getElementById("calMonth");
    const elSub = document.getElementById("calSub");
    const elDow = document.getElementById("calDow");
    const btnPrev = document.getElementById("calPrev");
    const btnNext = document.getElementById("calNext");

    // If calendar isn't on this page, stop safely
    if (!elDays || !elMonth || !btnPrev || !btnNext || !elDow) return;

    // Example events (replace later with real data / API / Inbox sync)
    // date format: YYYY-MM-DD
    const events = [
      {
        date: formatISO(new Date()),
        title: "Staff meeting",
        time: "14:00",
        type: "Important",
        details: "Safety coordination & weekly priorities.",
      },
      {
        date: addDaysISO(formatISO(new Date()), 2),
        title: "Training deadline",
        time: "End of day",
        type: "Reminder",
        details: "Complete: Fire Safety Basics module.",
      },
    ];

    const eventMap = groupByDate(events);

    // Monday-first weekday labels
    const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    elDow.innerHTML = weekday.map((d) => `<span>${d}</span>`).join("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth(); // 0-11

    render();

    btnPrev.addEventListener("click", () => {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      render();
    });

    btnNext.addEventListener("click", () => {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      render();
    });

    function render() {
      const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
        new Date(viewYear, viewMonth, 1),
      );
      elMonth.textContent = `${monthName} ${viewYear}`;

      const todayNice = new Intl.DateTimeFormat("en", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      }).format(new Date());
      elSub.textContent = `Today · ${todayNice}`;

      // Build a 6-week grid (42 cells)
      const firstOfMonth = new Date(viewYear, viewMonth, 1);
      const startIndex = mondayIndex(firstOfMonth); // 0..6 (Mon..Sun)

      // Start date = Monday of the week containing the 1st
      const gridStart = new Date(viewYear, viewMonth, 1 - startIndex);
      gridStart.setHours(0, 0, 0, 0);

      elDays.innerHTML = "";

      for (let i = 0; i < 42; i++) {
        const d = new Date(gridStart);
        d.setDate(gridStart.getDate() + i);

        const iso = formatISO(d);
        const isThisMonth = d.getMonth() === viewMonth;
        const isToday = d.getTime() === today.getTime();
        const hasEvent = Boolean(eventMap[iso]?.length);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calDay";
        btn.textContent = String(d.getDate());

        if (!isThisMonth) btn.classList.add("calDay--muted");
        if (isToday) btn.classList.add("calDay--today");
        if (hasEvent) btn.classList.add("calDay--hasEvent");

        btn.setAttribute(
          "aria-label",
          new Intl.DateTimeFormat("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(d),
        );

        btn.addEventListener("click", () =>
          openCalendarModal(d, eventMap[iso] || []),
        );

        elDays.appendChild(btn);
      }
    }

    function mondayIndex(date) {
      // JS getDay(): Sun=0..Sat=6
      // We want Mon=0..Sun=6
      const day = date.getDay();
      return (day + 6) % 7;
    }

    function groupByDate(list) {
      return list.reduce((acc, item) => {
        (acc[item.date] ||= []).push(item);
        return acc;
      }, {});
    }

    function formatISO(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    function addDaysISO(iso, days) {
      const [y, m, d] = iso.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      dt.setDate(dt.getDate() + days);
      return formatISO(dt);
    }
  })();

  /* =========================
   Calendar Modal (popup)
========================= */

  function openCalendarModal(dateObj, dayEvents) {
    const modal = document.getElementById("calModal");
    const title = document.getElementById("calModalTitle");
    const body = document.getElementById("calModalBody");
    if (!modal || !title || !body) return;

    const nice = new Intl.DateTimeFormat("en", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dateObj);

    title.textContent = nice;

    if (!dayEvents.length) {
      body.innerHTML = `
      <div style="padding:10px 12px;border-radius:14px;border:1px solid rgba(17,24,39,.08);background:rgba(17,24,39,.02)">
        <div style="font-weight:760;color:rgba(17,24,39,.8)">No scheduled events</div>
        <div style="margin-top:6px;color:rgba(17,24,39,.55);font-size:13px">You're clear for this day.</div>
      </div>
    `;
    } else {
      body.innerHTML = dayEvents
        .map(
          (e) => `
        <div style="padding:12px 12px;border-radius:14px;border:1px solid rgba(17,24,39,.10);background:rgba(255,255,255,.92)">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
            <div style="font-weight:820;color:rgba(17,24,39,.88)">${escapeHtml(e.title)}</div>
            <div style="font-size:12px;color:rgba(17,24,39,.55)">${escapeHtml(e.time || "")}</div>
          </div>
          <div style="margin-top:6px;font-size:13px;color:rgba(17,24,39,.65)">${escapeHtml(e.details || "")}</div>
          <div style="margin-top:10px;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:rgba(17,24,39,.55)">
            ${escapeHtml(e.type || "Event")}
          </div>
        </div>
      `,
        )
        .join("");
    }

    // open
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // close handlers
    const closeEls = modal.querySelectorAll("[data-cal-close]");
    closeEls.forEach((el) =>
      el.addEventListener("click", closeCalendarModal, { once: true }),
    );

    // ESC close (once)
    const onKey = (ev) => {
      if (ev.key === "Escape") {
        closeCalendarModal();
        document.removeEventListener("keydown", onKey);
      }
    };
    document.addEventListener("keydown", onKey);
  }

  function closeCalendarModal() {
    const modal = document.getElementById("calModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // initProgressPie is called inline after its definition above

  typeMessage();

  setSendEnabled();
  wirePromptSuggestions();

  /* =========================
     Demo: Learning Progress level slider
     4 levels with badge, percentage, and level name
  ========================= */
  (function initDemoLevelSlider() {
    const slider = document.getElementById("demoLevelSlider");
    const valEl = document.getElementById("demoLevelVal");
    if (!slider) return;

    const LEVELS = [
      { badge: "level1.png", level: "Exploring", pct: 10 },
      { badge: "level2.png", level: "Building", pct: 35 },
      { badge: "level3.png", level: "Advancing", pct: 65 },
      { badge: "level4.png", level: "Mastering", pct: 100 },
    ];

    function applyLevel(index) {
      const L = LEVELS[index];
      const pie = document.getElementById("progressPie");
      const fill = document.getElementById("progressPieFill");
      const levelEl = document.getElementById("progressLevel");
      const pctEl = document.getElementById("progressPct");
      const badge = pie ? pie.querySelector(".progressPie__badge") : null;
      if (!pie || !fill) return;

      // Update badge
      if (badge) badge.src = L.badge;

      // Update text
      if (levelEl) levelEl.textContent = L.level;
      if (pctEl) pctEl.textContent = L.pct + "%";
      if (valEl) valEl.textContent = index + 1;

      // Animate arc
      const r = Number(fill.getAttribute("r")) || 60;
      const circumference = 2 * Math.PI * r;
      fill.style.strokeDasharray = String(circumference);
      const offset = circumference * (1 - L.pct / 100);
      fill.style.strokeDashoffset = String(offset);
      pie.setAttribute("aria-valuenow", String(L.pct));

      // Completion state
      if (L.pct >= 100) {
        pie.classList.add("is-complete");
      } else {
        pie.classList.remove("is-complete");
      }
    }

    slider.addEventListener("input", function () {
      applyLevel(parseInt(this.value, 10));
    });
  })();

  /* =========================
     Demo: Police alerts slider
     0 = clear, 1 = one urgent, 2 = multiple alerts
  ========================= */
  (function initDemoPoliceSlider() {
    const slider = document.getElementById("demoPoliceSlider");
    const valEl = document.getElementById("demoPoliceVal");
    if (!slider) return;

    const LABELS = ["Clear", "Severe"];

    slider.addEventListener("input", function () {
      const v = parseInt(this.value, 10);
      if (valEl) valEl.textContent = LABELS[v];

      for (let i = 0; i <= 1; i++) {
        const el = document.getElementById("policeState" + i);
        if (el) {
          if (i === v) {
            el.classList.remove("is-hidden");
            el.removeAttribute("hidden");
          } else {
            el.classList.add("is-hidden");
            el.setAttribute("hidden", "");
          }
        }
      }
    });
  })();
})();
