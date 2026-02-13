/* =========================================================
   course.js — Teacher School Security Course
   Page logic: state management, lesson cards, progress bar.
   Assumes course.html + course.css + globals.css are loaded.
========================================================= */

(function () {
  "use strict";

  /* ─── Lesson data ─── */
  var LESSONS = [
    {
      n: 1,
      title: "Foundations of School Security",
      avail: true,
      desc: "Understand the core principles of school security, roles, and why a proactive approach matters.",
    },
    {
      n: 2,
      title: "Risks and Threat Awareness",
      avail: true,
      desc: "Learn to identify risks and warning signs before they escalate into incidents.",
    },
    {
      n: 3,
      title: "Legal Framework and Responsibilities",
      avail: true,
      desc: "Understand the laws, policies, and procedures that govern school security in Sweden.",
    },
    {
      n: 4,
      title: "Extremism",
      avail: false,
      desc: "Recognize signs of radicalization and understand prevention strategies.",
    },
    {
      n: 5,
      title: "Gang Criminality",
      avail: false,
      desc: "Learn about gang dynamics and how they affect school environments.",
    },
    {
      n: 6,
      title: "Deadly Violence",
      avail: false,
      desc: "Prepare for and respond to serious violent incidents.",
    },
    {
      n: 7,
      title: "Digital Risks",
      avail: false,
      desc: "Address cyberbullying, online threats, and digital safety.",
    },
    {
      n: 8,
      title: "Behaviour Management & Early Intervention",
      avail: false,
      desc: "Support positive behaviour and intervene before issues escalate.",
    },
    {
      n: 9,
      title: "Incident & Emergency Management",
      avail: false,
      desc: "Respond effectively during emergencies and critical incidents.",
    },
    {
      n: 10,
      title: "Crisis Recovery",
      avail: false,
      desc: "Help your school community recover after a crisis.",
    },
  ];

  /* Per-lesson SVG icons */
  var ICONS = [
    '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  ];

  /* ─── State ─── */
  var progress = {
    started: false,
    completedLessons: 0,
    currentLesson: 1,
    completed: false,
  };

  /* ─── DOM refs ─── */
  var $resumeStrip = document.getElementById("resumeStrip");
  var $completionBanner = document.getElementById("completionBanner");
  var $heroSection = document.getElementById("heroSection");
  var $heroCtaLabel = document.getElementById("heroCtaLabel");
  var $heroCta = document.getElementById("heroCta");
  var $resumeInfo = document.getElementById("resumeInfo");
  var $resumeMeta = document.getElementById("resumeMeta");
  var $progressFill = document.getElementById("progressFill");
  var $progressLabel = document.getElementById("progressLabel");
  var $progressMeta = document.getElementById("progressMeta");
  var $progressBar = document.getElementById("courseProgress");
  var $progressTicks = document.getElementById("progressTicks");
  var $lessonsGrid = document.getElementById("lessonsGrid");
  var $infoSection = document.getElementById("infoSection");

  /* ─── Build progress ticks (9 dividers for 10 segments) ─── */
  (function buildTicks() {
    for (var i = 0; i < 9; i++) {
      var tick = document.createElement("span");
      tick.className = "courseProgress__tick";
      $progressTicks.appendChild(tick);
    }
  })();

  /* ─── Render: progress bar ─── */
  function renderProgress() {
    var pct = Math.round((progress.completedLessons / 10) * 100);
    $progressFill.style.width = pct + "%";
    $progressMeta.textContent =
      progress.completedLessons + "/10 lessons completed";
    $progressLabel.textContent =
      pct === 100 ? "Completed" : "Course completion";
    document
      .getElementById("courseProgress")
      .setAttribute("aria-valuenow", pct);
  }

  /* ─── Render: lesson cards ─── */
  function renderLessons() {
    $lessonsGrid.innerHTML = "";

    LESSONS.forEach(function (lesson, i) {
      var status, chipCls, cta;

      if (lesson.n <= progress.completedLessons) {
        status = "Completed";
        chipCls = "lessonCard__chip--completed";
        cta = "Review";
      } else if (lesson.n === progress.currentLesson && progress.started) {
        status = "In progress";
        chipCls = "lessonCard__chip--inprogress";
        cta = "Continue";
      } else if (!lesson.avail) {
        status = "Coming soon";
        chipCls = "lessonCard__chip--locked";
        cta = "";
      } else {
        status = "Not started";
        chipCls = "";
        cta = "Start";
      }

      var isLocked = !lesson.avail && lesson.n > progress.completedLessons;
      var pct =
        lesson.n <= progress.completedLessons
          ? 100
          : lesson.n === progress.currentLesson && progress.started
            ? 40
            : 0;

      var card = document.createElement("div");
      card.className = "lessonCard" + (isLocked ? " lessonCard--locked" : "");
      card.innerHTML =
        '<div class="lessonCard__img">' +
        '<div class="lessonCard__imgIcon">' +
        ICONS[i] +
        "</div>" +
        '<div class="lessonCard__imgNum">' +
        String(lesson.n).padStart(2, "0") +
        "</div>" +
        "</div>" +
        '<div class="lessonCard__body">' +
        '<div class="lessonCard__head">' +
        '<span class="lessonCard__number">Lesson ' +
        lesson.n +
        "</span>" +
        '<span class="lessonCard__chip ' +
        chipCls +
        '">' +
        status +
        "</span>" +
        "</div>" +
        '<div class="lessonCard__title">' +
        lesson.title +
        "</div>" +
        '<div class="lessonCard__footer">' +
        '<span class="lessonCard__duration">' +
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        "~25 min" +
        "</span>" +
        '<div class="lessonCard__miniProgress">' +
        '<div class="lessonCard__miniProgressFill" style="width:' +
        pct +
        '%"></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="lessonCard__expand" id="expand-' +
        lesson.n +
        '">' +
        '<div class="lessonCard__expandInner">' +
        lesson.desc +
        "</div>" +
        "</div>";

      /* Click: expand detail or navigate */
      if (!isLocked) {
        card.addEventListener("click", function () {
          var exp = document.getElementById("expand-" + lesson.n);
          exp.classList.toggle("is-open");
        });
      }

      $lessonsGrid.appendChild(card);
    });
  }

  /* ─── Render: full page state ─── */
  function renderState() {
    /* Reset visibility */
    $resumeStrip.classList.remove("is-visible");
    $completionBanner.classList.remove("is-visible");
    $heroSection.style.display = "";
    $infoSection.style.display = "";

    if (!progress.started) {
      /* STATE A */
      $heroCtaLabel.textContent = "Start with Lesson 1";
    } else if (!progress.completed) {
      /* STATE B */
      $heroCtaLabel.textContent = "Continue Lesson " + progress.currentLesson;
      $resumeStrip.classList.add("is-visible");
      $resumeInfo.textContent =
        "You are currently on Lesson " +
        progress.currentLesson +
        " — " +
        LESSONS[progress.currentLesson - 1].title;
      $resumeMeta.textContent =
        progress.completedLessons + "/10 lessons completed";
    } else {
      /* STATE C */
      $heroCtaLabel.textContent = "Review lessons";
      $completionBanner.classList.add("is-visible");
    }

    renderProgress();
    renderLessons();
  }

  /* ─── Actions ─── */
  function handleCta() {
    /* In production: window.location.href = 'lesson-' + progress.currentLesson + '.html'; */
    alert("Navigating to: lesson-" + progress.currentLesson + ".html");
  }

  function smoothScrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleAbout() {
    $heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll(".aboutToggle").forEach(function (btn) {
      btn.classList.toggle("is-expanded");
    });
  }

  /* ─── Event delegation ─── */
  document.addEventListener("click", function (e) {
    var target = e.target.closest("[data-scroll]");
    if (target) {
      e.preventDefault();
      smoothScrollTo(target.getAttribute("data-scroll"));
      return;
    }

    if (e.target.closest("[data-toggle-about]")) {
      e.preventDefault();
      toggleAbout();
      return;
    }
  });

  /* Hero CTA + Resume CTA */
  $heroCta.addEventListener("click", handleCta);
  var $resumeBtn = document.getElementById("resumeCtaBtn");
  if ($resumeBtn) $resumeBtn.addEventListener("click", handleCta);

  /* ─── Demo controls ─── */
  var $demoSlider = document.getElementById("demoSlider");
  var $demoSliderVal = document.getElementById("demoSliderVal");

  if ($demoSlider) {
    $demoSlider.addEventListener("input", function () {
      var v = parseInt(this.value, 10);
      $demoSliderVal.textContent = v;

      if (v === 0) {
        progress = {
          started: false,
          completedLessons: 0,
          currentLesson: 1,
          completed: false,
        };
      } else if (v >= 3) {
        progress = {
          started: true,
          completedLessons: 3,
          currentLesson: 3,
          completed: true,
        };
      } else {
        progress = {
          started: true,
          completedLessons: v,
          currentLesson: v + 1,
          completed: false,
        };
      }

      renderState();
    });
  }

  /* ─── Init ─── */
  renderState();
})();
