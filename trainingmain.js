/* app.js — School Nexus Training Hub (Vanilla JS)
   - LocalStorage namespace: "schoolNexusTraining:*"
   - Accessible modals + focus trap
   - Tabs, lesson preview modal, scheduling modal, notifications drawer
*/

(() => {
  "use strict";

  /* ---------------------------
   * Storage
   * --------------------------- */
  const NS = "schoolNexusTraining:";
  const KEYS = {
    user: NS + "user",
    lessons: NS + "lessons",
    schedule: NS + "schedule", // array of schedule items
    answers: NS + "answers", // per lesson questionnaire answers
    events: NS + "events", // for notifications: completion, etc.
  };

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    del(key) {
      localStorage.removeItem(key);
    },
  };

  /* ---------------------------
   * Utils
   * --------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const pad2 = (n) => String(n).padStart(2, "0");

  function nowISO() {
    return new Date().toISOString();
  }

  function parseDateTimeLocalToISO(dtLocal) {
    // dtLocal like "2026-01-08T14:30"
    if (!dtLocal) return null;
    const d = new Date(dtLocal);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString();
  }

  function formatDateTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    const hh = pad2(d.getHours());
    const mm = pad2(d.getMinutes());
    return `${y}-${m}-${day} ${hh}:${mm}`;
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    return `${y}-${m}-${day}`;
  }

  function isPast(iso) {
    if (!iso) return false;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return false;
    return d.getTime() < Date.now();
  }

  function minutesFromNow(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    const diffMs = d.getTime() - Date.now();
    return Math.round(diffMs / 60000);
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function uid(prefix = "id") {
    return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }

  /* ---------------------------
   * Seed / Data model
   * --------------------------- */
  const DEFAULT_USER = {
    name: "Oumaima",
    role: "teacher", // "teacher" | "leadership"
    year: 2026,
  };

  function seedLessons(role) {
    // 15 total lessons; mandatory differs by role
    const base = Array.from({ length: 15 }, (_, i) => {
      const n = i + 1;
      return {
        id: `L${n}`,
        title: `Lesson ${n}: Topic placeholder`,
        duration: 20,
        category: "mandatory", // may become optional/ai later
        status: "not_started", // not_started | in_progress | completed
        lastPositionStep: 0,
        completionDate: null,
        dueDate: null,
        tags: ["compliance", "safety"],
      };
    });

    // Set due dates for mandatory lessons (spread through the year)
    const year = DEFAULT_USER.year;
    const start = new Date(Date.UTC(year, 0, 15, 9, 0, 0)); // Jan 15
    const intervalDays = 18; // gentle cadence
    base.forEach((l, idx) => {
      const d = new Date(start.getTime());
      d.setUTCDate(d.getUTCDate() + idx * intervalDays);
      l.dueDate = d.toISOString();
    });

    // Convert some lessons to optional for teacher
    if (role === "teacher") {
      // teacher: 10 mandatory + 5 optional
      base.forEach((l, idx) => {
        if (idx >= 10) {
          l.category = "optional";
          l.dueDate = null; // optional doesn't contribute to compliance schedule
          l.tags = ["recommended"];
        }
      });
    } else {
      // leadership: all 15 mandatory
      base.forEach((l) => (l.category = "mandatory"));
    }

    // Add a couple AI-suggested lesson entries (same pool but categorized AI)
    // In reality these might point to existing lessons; here they are "ai" category items.
    const ai = [
      {
        id: "AI1",
        title: "AI suggestion: Extremism awareness (micro-course)",
        duration: 20,
        category: "ai",
        status: "not_started",
        lastPositionStep: 0,
        completionDate: null,
        dueDate: null,
        tags: ["ai_suggested", "micro-course"],
      },
      {
        id: "AI2",
        title: "AI suggestion: Conflict de-escalation refresher",
        duration: 20,
        category: "ai",
        status: "not_started",
        lastPositionStep: 0,
        completionDate: null,
        dueDate: null,
        tags: ["ai_suggested", "micro-course"],
      },
    ];

    return base.concat(ai);
  }

  function ensureSeed() {
    const user = store.get(KEYS.user, null);
    if (!user) store.set(KEYS.user, DEFAULT_USER);

    const lessons = store.get(KEYS.lessons, null);
    if (!lessons || !Array.isArray(lessons) || lessons.length < 10) {
      const u = store.get(KEYS.user, DEFAULT_USER);
      store.set(KEYS.lessons, seedLessons(u.role));
    }

    const schedule = store.get(KEYS.schedule, null);
    if (!schedule || !Array.isArray(schedule)) store.set(KEYS.schedule, []);

    const answers = store.get(KEYS.answers, null);
    if (!answers || typeof answers !== "object") store.set(KEYS.answers, {});

    const events = store.get(KEYS.events, null);
    if (!events || !Array.isArray(events)) store.set(KEYS.events, []);
  }

  /* ---------------------------
   * DOM: expected IDs/classes
   * --------------------------- */
  const dom = {
    // header
    roleBadge: $("#roleBadge"),
    yearLabel: $("#yearLabel"),
    // progress overview
    progressValue: $("#progressValue"),
    progressLabel: $("#progressLabel"),
    lessonsRemaining: $("#lessonsRemaining"),
    statusChip: $("#statusChip"),
    primaryCTA: $("#primaryCTA"),
    viewPlanBtn: $("#viewPlanBtn"),
    manageRemindersBtn: $("#manageRemindersBtn"),
    // next scheduled
    nextCard: $("#nextScheduledCard"),
    nextTitle: $("#nextLessonTitle"),
    nextMeta: $("#nextLessonMeta"),
    nextStartBtn: $("#nextStartBtn"),
    nextReschedBtn: $("#nextRescheduleBtn"),
    nextSnoozeBtn: $("#nextSnoozeBtn"),
    // mini schedule list
    scheduleList: $("#scheduleList"),
    // tabs
    tabList: $("#lessonTabs"),
    tabBtns: $$("#lessonTabs [role='tab']"),
    tabPanels: $$("[role='tabpanel']"),
    // lesson lists
    listMandatory: $("#listMandatory"),
    listOptional: $("#listOptional"),
    listAI: $("#listAI"),
    // guidance panel (static)
    // notifications
    notifBtn: $("#notifBtn"),
    notifDrawer: $("#notifDrawer"),
    notifList: $("#notifList"),
    notifClose: $("#notifClose"),
    // modals
    modalOverlay: $("#modalOverlay"),
    modalContainer: $("#modalContainer"),
    lessonModal: $("#lessonModal"),
    scheduleModal: $("#scheduleModal"),
    // Lesson modal parts
    lessonModalTitle: $("#lessonModalTitle"),
    lessonModalMeta: $("#lessonModalMeta"),
    lessonStartBtn: $("#lessonStartBtn"),
    lessonCompleteBtn: $("#lessonCompleteBtn"),
    lessonSaveAnswersBtn: $("#lessonSaveAnswersBtn"),
    lessonQForm: $("#lessonQuestionnaireForm"),
    lessonCloseBtns: $$(".js-modal-close"),
    // Schedule modal parts
    scheduleModalTitle: $("#scheduleModalTitle"),
    scheduleLessonName: $("#scheduleLessonName"),
    scheduleDatetime: $("#scheduleDatetime"),
    remind24h: $("#remind24h"),
    remind1h: $("#remind1h"),
    scheduleSaveBtn: $("#scheduleSaveBtn"),
    scheduleCancelBtn: $("#scheduleCancelBtn"),
    snoozeMinutes: $("#snoozeMinutes"),
    snoozeSaveBtn: $("#snoozeSaveBtn"),
    // toast
    toast: $("#toast"),
  };

  /* ---------------------------
   * Accessible modal utilities
   * --------------------------- */
  let activeModal = null;
  let lastFocus = null;

  const FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  function getFocusable(root) {
    return $$(FOCUSABLE, root).filter((el) => el.offsetParent !== null);
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    lastFocus = document.activeElement;

    dom.modalOverlay?.classList.add("is-open");
    dom.modalContainer?.classList.add("is-open");

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    activeModal = modalEl;

    // Trap focus
    const focusables = getFocusable(modalEl);
    const target = focusables[0] || modalEl;
    target.focus({ preventScroll: true });

    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove("is-open");
    activeModal.setAttribute("aria-hidden", "true");
    activeModal = null;

    dom.modalOverlay?.classList.remove("is-open");
    dom.modalContainer?.classList.remove("is-open");
    document.body.classList.remove("modal-open");

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  }

  function onModalKeydown(e) {
    if (!activeModal) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key !== "Tab") return;

    const focusables = getFocusable(activeModal);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------------------------
   * Notifications drawer
   * --------------------------- */
  let drawerOpen = false;

  function openDrawer() {
    drawerOpen = true;
    dom.notifDrawer?.classList.add("is-open");
    dom.notifDrawer?.setAttribute("aria-hidden", "false");
    dom.notifBtn?.setAttribute("aria-expanded", "true");
    // focus first item
    setTimeout(() => {
      const f = getFocusable(dom.notifDrawer || document.body)[0];
      f?.focus?.({ preventScroll: true });
    }, 0);
  }

  function closeDrawer() {
    drawerOpen = false;
    dom.notifDrawer?.classList.remove("is-open");
    dom.notifDrawer?.setAttribute("aria-hidden", "true");
    dom.notifBtn?.setAttribute("aria-expanded", "false");
    dom.notifBtn?.focus?.({ preventScroll: true });
  }

  function toggleDrawer() {
    drawerOpen ? closeDrawer() : openDrawer();
  }

  /* ---------------------------
   * State selectors
   * --------------------------- */
  function getUser() {
    return store.get(KEYS.user, DEFAULT_USER);
  }

  function setUser(u) {
    store.set(KEYS.user, u);
  }

  function getLessons() {
    return store.get(KEYS.lessons, []);
  }

  function setLessons(lessons) {
    store.set(KEYS.lessons, lessons);
  }

  function getSchedule() {
    return store.get(KEYS.schedule, []);
  }

  function setSchedule(items) {
    store.set(KEYS.schedule, items);
  }

  function getAnswers() {
    return store.get(KEYS.answers, {});
  }

  function setAnswers(obj) {
    store.set(KEYS.answers, obj);
  }

  function getEvents() {
    return store.get(KEYS.events, []);
  }

  function addEvent(evt) {
    const events = getEvents();
    events.unshift(evt);
    store.set(KEYS.events, events.slice(0, 50));
  }

  function findLesson(lessonId) {
    const lessons = getLessons();
    return lessons.find((l) => l.id === lessonId) || null;
  }

  function updateLesson(lessonId, patch) {
    const lessons = getLessons();
    const idx = lessons.findIndex((l) => l.id === lessonId);
    if (idx === -1) return;
    lessons[idx] = { ...lessons[idx], ...patch };
    setLessons(lessons);
  }

  /* ---------------------------
   * Progress + status logic
   * --------------------------- */
  function mandatoryCountForRole(role) {
    return role === "leadership" ? 15 : 10;
  }

  function mandatoryLessonsForRole(lessons, role) {
    // For teacher: category === "mandatory" only (seed ensures 10)
    // For leadership: all mandatory category (15)
    return lessons.filter((l) => l.category === "mandatory");
  }

  function completedMandatoryCount(lessons, role) {
    const mandatory = mandatoryLessonsForRole(lessons, role);
    return mandatory.filter((l) => l.status === "completed").length;
  }

  function inProgressLesson(lessons, role) {
    // Prefer in-progress mandatory; if none, any in-progress
    const mandatory = mandatoryLessonsForRole(lessons, role).find(
      (l) => l.status === "in_progress"
    );
    if (mandatory) return mandatory;
    return lessons.find((l) => l.status === "in_progress") || null;
  }

  function nextMandatoryLesson(lessons, role) {
    const mandatory = mandatoryLessonsForRole(lessons, role);

    // Not completed, sort by due date (nulls last)
    const pending = mandatory
      .filter((l) => l.status !== "completed")
      .slice()
      .sort((a, b) => {
        const da = a.dueDate
          ? new Date(a.dueDate).getTime()
          : Number.POSITIVE_INFINITY;
        const db = b.dueDate
          ? new Date(b.dueDate).getTime()
          : Number.POSITIVE_INFINITY;
        return da - db;
      });

    return pending[0] || null;
  }

  function calcProgressPercent(user, lessons) {
    const total = mandatoryCountForRole(user.role);
    const done = completedMandatoryCount(lessons, user.role);
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return clamp(pct, 0, 100);
  }

  function lessonsRemaining(user, lessons) {
    const total = mandatoryCountForRole(user.role);
    const done = completedMandatoryCount(lessons, user.role);
    return Math.max(0, total - done);
  }

  function determineTrackStatus(user, lessons, scheduleItems) {
    // Status logic:
    // - If any mandatory dueDate passed and not completed => "Overdue"
    // - Else if next due within 7 days and nothing scheduled => "At risk"
    // - Else "On track"
    const mandatory = mandatoryLessonsForRole(lessons, user.role);

    const overdue = mandatory.some(
      (l) => l.dueDate && isPast(l.dueDate) && l.status !== "completed"
    );
    if (overdue) return "Overdue";

    const next = nextMandatoryLesson(lessons, user.role);
    if (next?.dueDate) {
      const mins = minutesFromNow(next.dueDate);
      const days = mins == null ? null : mins / (60 * 24);
      const hasUpcomingScheduled = scheduleItems.some(
        (s) => !isPast(s.datetimeISO)
      );
      if (days != null && days <= 7 && !hasUpcomingScheduled) return "At risk";
    }

    return "On track";
  }

  /* ---------------------------
   * Schedule logic
   * --------------------------- */
  function getNextScheduled(scheduleItems) {
    const upcoming = scheduleItems
      .filter((s) => s?.datetimeISO && !isPast(s.datetimeISO))
      .slice()
      .sort(
        (a, b) =>
          new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime()
      );
    return upcoming[0] || null;
  }

  function upsertScheduleItem({ lessonId, datetimeISO, reminderSettings }) {
    const items = getSchedule();
    const existingIdx = items.findIndex((s) => s.lessonId === lessonId);

    const base = {
      id: existingIdx !== -1 ? items[existingIdx].id : uid("sched"),
      lessonId,
      datetimeISO,
      reminderSettings: reminderSettings || { r24h: false, r1h: true },
    };

    if (existingIdx !== -1) {
      items[existingIdx] = { ...items[existingIdx], ...base };
    } else {
      items.push(base);
    }

    setSchedule(items);
    return base;
  }

  function snoozeAllReminders(minutes) {
    // shift the next scheduled event forward by minutes (simple mock)
    const items = getSchedule();
    const next = getNextScheduled(items);
    if (!next) return null;

    const d = new Date(next.datetimeISO);
    d.setMinutes(d.getMinutes() + minutes);

    next.datetimeISO = d.toISOString();
    setSchedule(items);

    return next;
  }

  function removeSchedule(lessonId) {
    const items = getSchedule().filter((s) => s.lessonId !== lessonId);
    setSchedule(items);
  }

  /* ---------------------------
   * Notifications content
   * --------------------------- */
  function buildNotifications(user, lessons, scheduleItems) {
    const notifs = [];

    // Upcoming lesson reminder (if scheduled)
    const next = getNextScheduled(scheduleItems);
    if (next) {
      const l = findLesson(next.lessonId);
      notifs.push({
        type: "upcoming",
        title: "Upcoming training",
        body: `${l ? l.title : "Lesson"} • ${formatDateTime(next.datetimeISO)}`,
        timeISO: next.datetimeISO,
      });
    }

    // Overdue warnings (mandatory due dates passed)
    const mandatory = mandatoryLessonsForRole(lessons, user.role);
    const overdue = mandatory
      .filter((l) => l.dueDate && isPast(l.dueDate) && l.status !== "completed")
      .slice(0, 3);

    overdue.forEach((l) => {
      notifs.push({
        type: "overdue",
        title: "Lesson overdue",
        body: `${l.title} • Due ${formatDate(l.dueDate)}`,
        timeISO: l.dueDate,
      });
    });

    // Completion confirmations (from events)
    const events = getEvents();
    events
      .filter((e) => e.type === "completed")
      .slice(0, 3)
      .forEach((e) => {
        const l = findLesson(e.lessonId);
        notifs.push({
          type: "completed",
          title: "Training completed",
          body: `${l ? l.title : "Lesson"} • Completed ${formatDateTime(
            e.timeISO
          )}`,
          timeISO: e.timeISO,
        });
      });

    // Sort newest first by timeISO (nulls last)
    notifs.sort((a, b) => {
      const ta = a.timeISO ? new Date(a.timeISO).getTime() : 0;
      const tb = b.timeISO ? new Date(b.timeISO).getTime() : 0;
      return tb - ta;
    });

    return notifs;
  }

  /* ---------------------------
   * Rendering helpers
   * --------------------------- */
  function setChip(el, label, variant) {
    if (!el) return;
    el.textContent = label;
    el.dataset.variant = variant || "default";
  }

  function setProgressRing(pct) {
    // Supports:
    // - an SVG ring with #progressRingCircle (stroke-dasharray)
    // - a progress bar fallback (#progressBarFill)
    const circle = $("#progressRingCircle");
    const bar = $("#progressBarFill");

    if (circle) {
      const r = circle.r.baseVal.value;
      const c = 2 * Math.PI * r;
      const offset = c - (pct / 100) * c;
      circle.style.strokeDasharray = `${c} ${c}`;
      circle.style.strokeDashoffset = `${offset}`;
      circle.setAttribute("aria-valuenow", String(pct));
    } else if (bar) {
      bar.style.width = `${pct}%`;
    }
  }

  function toast(msg) {
    if (!dom.toast) return;
    dom.toast.textContent = msg;
    dom.toast.classList.add("is-open");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => dom.toast.classList.remove("is-open"), 2400);
  }

  function lessonStatusLabel(status) {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In progress";
      default:
        return "Not started";
    }
  }

  function lessonStatusVariant(status) {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "warning";
      default:
        return "neutral";
    }
  }

  function createLessonRow(lesson, { onOpen, onSchedule }) {
    const row = document.createElement("article");
    row.className = "lesson-row";
    row.setAttribute("data-lesson-id", lesson.id);

    const left = document.createElement("div");
    left.className = "lesson-row__left";

    const title = document.createElement("h3");
    title.className = "lesson-row__title";
    title.textContent = lesson.title;

    const meta = document.createElement("p");
    meta.className = "lesson-row__meta";
    meta.textContent = `${
      lesson.duration || 20
    } min • Placeholder description for this lesson content.`;

    const tags = document.createElement("div");
    tags.className = "lesson-row__tags";
    (lesson.tags || []).slice(0, 3).forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "chip chip--tiny";
      chip.textContent = t;
      tags.appendChild(chip);
    });

    left.appendChild(title);
    left.appendChild(meta);
    left.appendChild(tags);

    const right = document.createElement("div");
    right.className = "lesson-row__right";

    const status = document.createElement("span");
    status.className = "chip";
    status.dataset.variant = lessonStatusVariant(lesson.status);
    status.textContent = lessonStatusLabel(lesson.status);
    right.appendChild(status);

    if (lesson.status === "completed" && lesson.completionDate) {
      const date = document.createElement("div");
      date.className = "lesson-row__date";
      date.textContent = `Completed: ${formatDate(lesson.completionDate)}`;
      right.appendChild(date);
    }

    const actions = document.createElement("div");
    actions.className = "lesson-row__actions";

    const btnOpen = document.createElement("button");
    btnOpen.type = "button";
    btnOpen.className = "btn btn--secondary";
    btnOpen.textContent = lesson.status === "completed" ? "Review" : "Open";
    btnOpen.addEventListener("click", () => onOpen(lesson.id));

    const btnSchedule = document.createElement("button");
    btnSchedule.type = "button";
    btnSchedule.className = "btn btn--tertiary";
    btnSchedule.textContent = "Schedule";
    btnSchedule.addEventListener("click", () => onSchedule(lesson.id));

    actions.appendChild(btnOpen);
    actions.appendChild(btnSchedule);

    // If completed, keep schedule but allow open/review.
    right.appendChild(actions);

    row.appendChild(left);
    row.appendChild(right);

    // Whole row clickable (but don’t steal button clicks)
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-label", `Open ${lesson.title}`);
    row.addEventListener("click", (e) => {
      const isButton =
        e.target && (e.target.closest("button") || e.target.closest("a"));
      if (isButton) return;
      onOpen(lesson.id);
    });
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(lesson.id);
      }
    });

    return row;
  }

  function renderLessonLists() {
    const lessons = getLessons();

    const mandatory = lessons.filter((l) => l.category === "mandatory");
    const optional = lessons.filter((l) => l.category === "optional");
    const ai = lessons.filter((l) => l.category === "ai");

    const mount = (rootEl, list) => {
      if (!rootEl) return;
      rootEl.innerHTML = "";
      if (!list.length) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = `<p class="muted">No lessons found.</p>`;
        rootEl.appendChild(empty);
        return;
      }

      list.forEach((lesson) => {
        rootEl.appendChild(
          createLessonRow(lesson, {
            onOpen: (id) => openLessonPreview(id),
            onSchedule: (id) => openScheduleForLesson(id),
          })
        );
      });
    };

    mount(dom.listMandatory, mandatory);
    mount(dom.listOptional, optional);
    mount(dom.listAI, ai);
  }

  function renderScheduleMiniList() {
    const items = getSchedule()
      .slice()
      .sort(
        (a, b) =>
          new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime()
      );

    if (!dom.scheduleList) return;
    dom.scheduleList.innerHTML = "";

    if (!items.length) {
      const li = document.createElement("li");
      li.className = "schedule-item schedule-item--empty";
      li.innerHTML = `<span class="muted">No scheduled sessions yet.</span>`;
      dom.scheduleList.appendChild(li);
      return;
    }

    items.slice(0, 5).forEach((s) => {
      const l = findLesson(s.lessonId);
      const li = document.createElement("li");
      li.className = "schedule-item";
      li.innerHTML = `
        <div class="schedule-item__main">
          <strong>${l ? l.title : "Lesson"}</strong>
          <span class="muted">${formatDateTime(s.datetimeISO)} • ${
        l?.duration ?? 20
      } min</span>
        </div>
        <div class="schedule-item__actions">
          <button type="button" class="btn btn--tertiary btn--small" data-action="open" data-id="${
            s.lessonId
          }">Open</button>
          <button type="button" class="btn btn--tertiary btn--small" data-action="edit" data-id="${
            s.lessonId
          }">Edit</button>
          <button type="button" class="btn btn--tertiary btn--small" data-action="clear" data-id="${
            s.lessonId
          }">Clear</button>
        </div>
      `;
      dom.scheduleList.appendChild(li);
    });

    // Delegate actions
    dom.scheduleList.addEventListener(
      "click",
      (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === "open") openLessonPreview(id);
        if (action === "edit") openScheduleForLesson(id);
        if (action === "clear") {
          removeSchedule(id);
          toast("Schedule cleared.");
          renderAll();
        }
      },
      { once: true }
    ); // avoid double binding; rerender rebinds
  }

  function renderProgressAndHeader() {
    const user = getUser();
    const lessons = getLessons();
    const scheduleItems = getSchedule();

    // Header badges
    if (dom.roleBadge) {
      const label =
        user.role === "leadership" ? "Leadership" : "Teacher/Mentor";
      dom.roleBadge.textContent = label;
    }
    if (dom.yearLabel)
      dom.yearLabel.textContent = `Annual Training ${user.year}`;

    // Progress calc
    const pct = calcProgressPercent(user, lessons);
    setProgressRing(pct);

    if (dom.progressValue) dom.progressValue.textContent = `${pct}%`;
    if (dom.progressLabel) {
      const total = mandatoryCountForRole(user.role);
      const done = completedMandatoryCount(lessons, user.role);
      dom.progressLabel.textContent = `${done} / ${total} lessons completed`;
    }
    if (dom.lessonsRemaining) {
      dom.lessonsRemaining.textContent = `${lessonsRemaining(
        user,
        lessons
      )} lessons remaining`;
    }

    // Status chip
    const status = determineTrackStatus(user, lessons, scheduleItems);
    if (dom.statusChip) {
      const variant =
        status === "On track"
          ? "success"
          : status === "At risk"
          ? "warning"
          : "danger";
      setChip(dom.statusChip, status, variant);
    }

    // Primary CTA
    const inProg = inProgressLesson(lessons, user.role);
    const next = nextMandatoryLesson(lessons, user.role);
    if (dom.primaryCTA) {
      dom.primaryCTA.textContent = inProg
        ? "Resume lesson"
        : "Continue training";
      dom.primaryCTA.onclick = () => {
        const target = inProg?.id || next?.id;
        if (target) openLessonPreview(target);
        else toast("All mandatory lessons completed.");
      };
    }

    // Secondary actions
    if (dom.viewPlanBtn)
      dom.viewPlanBtn.onclick = () =>
        toast("Training plan view is UI-only in this build.");
    if (dom.manageRemindersBtn)
      dom.manageRemindersBtn.onclick = () =>
        openScheduleForLesson(next?.id || inProg?.id);
  }

  function renderNextScheduledCard() {
    const scheduleItems = getSchedule();
    const next = getNextScheduled(scheduleItems);

    if (!dom.nextCard) return;

    if (!next) {
      dom.nextTitle.textContent = "No session scheduled";
      dom.nextMeta.textContent = "Schedule a lesson to get reminders here.";
      dom.nextStartBtn.disabled = true;
      dom.nextReschedBtn.disabled = true;
      dom.nextSnoozeBtn.disabled = true;
      return;
    }

    const lesson = findLesson(next.lessonId);
    dom.nextTitle.textContent = lesson ? lesson.title : "Scheduled lesson";
    dom.nextMeta.textContent = `${formatDateTime(next.datetimeISO)} • ${
      lesson?.duration ?? 20
    } min`;

    dom.nextStartBtn.disabled = false;
    dom.nextReschedBtn.disabled = false;
    dom.nextSnoozeBtn.disabled = false;

    dom.nextStartBtn.onclick = () => openLessonPreview(next.lessonId);
    dom.nextReschedBtn.onclick = () => openScheduleForLesson(next.lessonId);
    dom.nextSnoozeBtn.onclick = () => openSnoozeModal();
  }

  function renderNotifications() {
    const user = getUser();
    const lessons = getLessons();
    const scheduleItems = getSchedule();
    const notifs = buildNotifications(user, lessons, scheduleItems);

    if (!dom.notifList) return;
    dom.notifList.innerHTML = "";

    if (!notifs.length) {
      const li = document.createElement("li");
      li.className = "notif notif--empty";
      li.innerHTML = `<span class="muted">No notifications right now.</span>`;
      dom.notifList.appendChild(li);
      return;
    }

    notifs.slice(0, 8).forEach((n) => {
      const li = document.createElement("li");
      li.className = `notif notif--${n.type}`;
      li.innerHTML = `
        <div class="notif__head">
          <strong>${n.title}</strong>
          <span class="muted">${
            n.timeISO ? formatDateTime(n.timeISO) : ""
          }</span>
        </div>
        <p class="notif__body">${n.body}</p>
      `;
      dom.notifList.appendChild(li);
    });
  }

  /* ---------------------------
   * Tabs (segmented control)
   * --------------------------- */
  function activateTab(tabId) {
    dom.tabBtns.forEach((btn) => {
      const selected = btn.id === tabId;
      btn.setAttribute("aria-selected", selected ? "true" : "false");
      btn.tabIndex = selected ? 0 : -1;
      btn.classList.toggle("is-active", selected);
    });

    dom.tabPanels.forEach((panel) => {
      const controlledBy = panel.getAttribute("aria-labelledby");
      const show = controlledBy === tabId;
      panel.hidden = !show;
    });
  }

  function bindTabs() {
    if (!dom.tabList) return;

    dom.tabList.addEventListener("click", (e) => {
      const btn = e.target.closest("[role='tab']");
      if (!btn) return;
      activateTab(btn.id);
    });

    dom.tabList.addEventListener("keydown", (e) => {
      const currentIdx = dom.tabBtns.findIndex(
        (b) => b.getAttribute("aria-selected") === "true"
      );
      if (currentIdx === -1) return;

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextIdx =
          (currentIdx + dir + dom.tabBtns.length) % dom.tabBtns.length;
        const nextBtn = dom.tabBtns[nextIdx];
        activateTab(nextBtn.id);
        nextBtn.focus();
      }
    });
  }

  /* ---------------------------
   * Lesson Preview Modal
   * --------------------------- */
  let currentLessonId = null;

  function hydrateLessonModal(lessonId) {
    const lesson = findLesson(lessonId);
    if (!lesson) return;

    currentLessonId = lessonId;

    if (dom.lessonModalTitle) dom.lessonModalTitle.textContent = lesson.title;
    if (dom.lessonModalMeta) {
      dom.lessonModalMeta.textContent = `${
        lesson.duration ?? 20
      } min • ${lessonStatusLabel(lesson.status)}`;
    }

    // Prefill questionnaire answers
    const allAnswers = getAnswers();
    const ans = allAnswers[lessonId] || {};
    if (dom.lessonQForm) {
      const q1 = $("#q1", dom.lessonQForm);
      const q2 = $("#q2", dom.lessonQForm);
      const q3 = $("#q3", dom.lessonQForm);
      if (q1) q1.value = ans.q1 || "";
      if (q2) q2.value = ans.q2 || "";
      if (q3) q3.checked = !!ans.q3;
    }

    // Buttons
    if (dom.lessonStartBtn) {
      dom.lessonStartBtn.textContent =
        lesson.status === "in_progress" ? "Continue lesson" : "Start lesson";
      dom.lessonStartBtn.disabled = lesson.status === "completed";
      dom.lessonStartBtn.onclick = () => {
        updateLesson(lessonId, {
          status: "in_progress",
          lastPositionStep: Math.max(1, lesson.lastPositionStep || 0),
        });
        toast("Lesson set to in progress.");
        renderAll();
        // keep modal open
        hydrateLessonModal(lessonId);
      };
    }

    if (dom.lessonCompleteBtn) {
      dom.lessonCompleteBtn.disabled = false;
      dom.lessonCompleteBtn.onclick = () => {
        const completionDate = nowISO();
        updateLesson(lessonId, {
          status: "completed",
          completionDate,
          lastPositionStep: 0,
        });
        addEvent({ type: "completed", lessonId, timeISO: completionDate });
        toast("Marked as completed.");
        renderAll();
        hydrateLessonModal(lessonId);
      };
    }

    if (dom.lessonSaveAnswersBtn) {
      dom.lessonSaveAnswersBtn.onclick = () =>
        saveQuestionnaireAnswers(lessonId);
    }
  }

  function saveQuestionnaireAnswers(lessonId) {
    if (!dom.lessonQForm) return;
    const q1 = $("#q1", dom.lessonQForm)?.value?.trim() ?? "";
    const q2 = $("#q2", dom.lessonQForm)?.value?.trim() ?? "";
    const q3 = !!$("#q3", dom.lessonQForm)?.checked;

    const all = getAnswers();
    all[lessonId] = { q1, q2, q3, savedAtISO: nowISO() };
    setAnswers(all);

    toast("Answers saved locally.");
  }

  function openLessonPreview(lessonId) {
    const lesson = findLesson(lessonId);
    if (!lesson) return;
    hydrateLessonModal(lessonId);
    openModal(dom.lessonModal);
  }

  /* ---------------------------
   * Schedule Modal (Schedule/Reschedule)
   * --------------------------- */
  let schedulingLessonId = null;

  function hydrateScheduleModal(lessonId) {
    const lesson = findLesson(lessonId);
    schedulingLessonId = lessonId;

    if (dom.scheduleModalTitle)
      dom.scheduleModalTitle.textContent = "Schedule lesson";
    if (dom.scheduleLessonName)
      dom.scheduleLessonName.textContent = lesson ? lesson.title : "Lesson";

    // Get existing schedule item if any
    const items = getSchedule();
    const item = items.find((s) => s.lessonId === lessonId) || null;

    if (dom.scheduleDatetime) {
      // datetime-local expects local time; we’ll set it roughly from ISO
      if (item?.datetimeISO) {
        const d = new Date(item.datetimeISO);
        const yyyy = d.getFullYear();
        const mm = pad2(d.getMonth() + 1);
        const dd = pad2(d.getDate());
        const hh = pad2(d.getHours());
        const mi = pad2(d.getMinutes());
        dom.scheduleDatetime.value = `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
      } else {
        dom.scheduleDatetime.value = "";
      }
    }

    if (dom.remind24h) dom.remind24h.checked = !!item?.reminderSettings?.r24h;
    if (dom.remind1h)
      dom.remind1h.checked = item?.reminderSettings?.r1h ?? true;

    if (dom.scheduleSaveBtn) {
      dom.scheduleSaveBtn.onclick = () => {
        const dtLocal = dom.scheduleDatetime?.value || "";
        const iso = parseDateTimeLocalToISO(dtLocal);
        if (!iso) {
          toast("Please choose a valid date/time.");
          dom.scheduleDatetime?.focus();
          return;
        }
        const reminderSettings = {
          r24h: !!dom.remind24h?.checked,
          r1h: !!dom.remind1h?.checked,
        };
        upsertScheduleItem({ lessonId, datetimeISO: iso, reminderSettings });
        toast("Schedule saved.");
        closeModal();
        renderAll();
      };
    }

    if (dom.scheduleCancelBtn) {
      dom.scheduleCancelBtn.onclick = () => closeModal();
    }
  }

  function openScheduleForLesson(lessonId) {
    if (!lessonId) {
      toast("Pick a lesson to schedule.");
      return;
    }
    hydrateScheduleModal(lessonId);
    openModal(dom.scheduleModal);
  }

  /* ---------------------------
   * Snooze modal (re-uses schedule modal area if present)
   * --------------------------- */
  function openSnoozeModal() {
    // If you have a separate snooze modal, use it.
    // Here we assume scheduleModal has a snooze section.
    if (!dom.scheduleModal) return;
    if (dom.scheduleModalTitle)
      dom.scheduleModalTitle.textContent = "Snooze reminders";
    if (dom.scheduleLessonName)
      dom.scheduleLessonName.textContent = "Next scheduled session";

    // Hide schedule fields if your HTML supports it (optional)
    $("#scheduleForm")?.classList.add("is-hidden");
    $("#snoozeForm")?.classList.remove("is-hidden");

    if (dom.snoozeMinutes) dom.snoozeMinutes.value = "30";

    if (dom.snoozeSaveBtn) {
      dom.snoozeSaveBtn.onclick = () => {
        const mins = parseInt(dom.snoozeMinutes?.value || "30", 10);
        const m = Number.isFinite(mins) ? clamp(mins, 5, 240) : 30;
        const updated = snoozeAllReminders(m);
        if (!updated) {
          toast("No upcoming session to snooze.");
          closeModal();
          renderAll();
          return;
        }
        toast(`Snoozed by ${m} minutes.`);
        closeModal();
        renderAll();
      };
    }

    // ensure cancel returns view state
    if (dom.scheduleCancelBtn) {
      const original = dom.scheduleCancelBtn.onclick;
      dom.scheduleCancelBtn.onclick = () => {
        // restore UI
        $("#scheduleForm")?.classList.remove("is-hidden");
        $("#snoozeForm")?.classList.add("is-hidden");
        // restore cancel behavior
        dom.scheduleCancelBtn.onclick = original || (() => closeModal());
        closeModal();
      };
    }

    openModal(dom.scheduleModal);
  }

  function restoreScheduleModalUI() {
    $("#scheduleForm")?.classList.remove("is-hidden");
    $("#snoozeForm")?.classList.add("is-hidden");
  }

  /* ---------------------------
   * Bind global events
   * --------------------------- */
  function bindGlobal() {
    // Modals
    document.addEventListener("keydown", onModalKeydown);

    dom.modalOverlay?.addEventListener("click", () => {
      closeModal();
      restoreScheduleModalUI();
    });

    dom.lessonCloseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal();
        restoreScheduleModalUI();
      });
    });

    // Notifications
    dom.notifBtn?.addEventListener("click", toggleDrawer);
    dom.notifClose?.addEventListener("click", closeDrawer);

    document.addEventListener("click", (e) => {
      if (!drawerOpen) return;
      const inside =
        e.target.closest("#notifDrawer") || e.target.closest("#notifBtn");
      if (!inside) closeDrawer();
    });

    document.addEventListener("keydown", (e) => {
      if (drawerOpen && e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
    });

    // Next scheduled buttons may rely on renderNextScheduledCard binding

    // Tabs
    bindTabs();
  }

  /* ---------------------------
   * Render all
   * --------------------------- */
  function renderAll() {
    renderProgressAndHeader();
    renderNextScheduledCard();
    renderLessonLists();
    renderScheduleMiniList();
    renderNotifications();
  }

  /* ---------------------------
   * Init
   * --------------------------- */
  function init() {
    ensureSeed();
    bindGlobal();

    // Default tab
    const defaultTab = dom.tabBtns?.[0]?.id;
    if (defaultTab) activateTab(defaultTab);

    renderAll();
  }

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
