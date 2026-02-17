/* =========================================================
   course.js — Teacher School Security Course
   Handles: intro slide flow, course overview state,
   lesson cards, progress bar.
   Assumes course.html + course.css + globals.css are loaded.
========================================================= */

(function () {
  "use strict";

  /* ═══════════════════════════════════
     LESSON DATA
     ═══════════════════════════════════ */
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

  /* ═══════════════════════════════════
     STATE
     ═══════════════════════════════════ */
  var TOTAL_SLIDES = 6;
  var currentSlide = 0;

  // Check if user has completed the intro
  var introCompleted = localStorage.getItem("sn_intro_done") === "true";

  var progress = {
    started: false,
    completedLessons: 0,
    currentLesson: 1,
    completed: false,
  };

  /* ═══════════════════════════════════
     DOM REFS
     ═══════════════════════════════════ */
  var $introFlow = document.getElementById("introFlow");
  var $courseOverview = document.getElementById("courseOverview");
  var $introProgress = document.getElementById("introProgress");
  var $introLabel = document.getElementById("introProgressLabel");
  var $introFinishBtn = document.getElementById("introFinishBtn");

  // Course overview refs
  var $resumeStrip = document.getElementById("resumeStrip");
  var $completionBanner = document.getElementById("completionBanner");
  var $firstTimeCta = document.getElementById("firstTimeCta");
  var $resumeInfo = document.getElementById("resumeInfo");
  var $resumeMeta = document.getElementById("resumeMeta");
  var $progressFill = document.getElementById("progressFill");
  var $progressLabel = document.getElementById("progressLabel");
  var $progressMeta = document.getElementById("progressMeta");
  var $progressTicks = document.getElementById("progressTicks");
  var $lessonsGrid = document.getElementById("lessonsGrid");

  /* ═══════════════════════════════════
     INTRO FLOW — Slide Navigation
     ═══════════════════════════════════ */

  function getAllSlides() {
    return $introFlow.querySelectorAll(".introSlide");
  }

  function getDots() {
    return $introFlow.querySelectorAll(".introFlow__dot");
  }

  function goToSlide(index, direction) {
    if (index < 0 || index >= TOTAL_SLIDES) return;

    var slides = getAllSlides();
    var dots = getDots();
    var prev = slides[currentSlide];
    var next = slides[index];

    direction = direction || (index > currentSlide ? "forward" : "backward");

    // Hide current
    prev.classList.remove("is-active");
    prev.style.display = "none";

    // Show next with animation direction
    next.style.display = "";
    next.classList.add("is-active");

    // Set animation direction
    if (direction === "backward") {
      next.style.animation = "none";
      // Force reflow
      void next.offsetWidth;
      next.style.animation =
        "slideInReverse 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards";
    } else {
      next.style.animation = "none";
      void next.offsetWidth;
      next.style.animation =
        "slideIn 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards";
    }

    // Update dots
    dots.forEach(function (dot, i) {
      dot.classList.remove("is-active");
      dot.classList.remove("is-done");
      if (i === index) {
        dot.classList.add("is-active");
      } else if (i < index) {
        dot.classList.add("is-done");
      }
    });

    // Update label
    $introLabel.textContent = index + 1 + " of " + TOTAL_SLIDES;

    currentSlide = index;

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1, "forward");
  }

  function prevSlide() {
    goToSlide(currentSlide - 1, "backward");
  }

  function completeIntro() {
    localStorage.setItem("sn_intro_done", "true");
    introCompleted = true;
    showCourseOverview();

    // Navigate to lesson 1
    setTimeout(function () {
      window.location.href = "lesson-1.html";
    }, 400);
  }

  function showIntro() {
    $introFlow.style.display = "";
    $courseOverview.style.display = "none";
    currentSlide = 0;

    // Reset all slides
    var slides = getAllSlides();
    slides.forEach(function (s, i) {
      s.classList.remove("is-active");
      s.style.display = "none";
      s.style.animation = "";
    });
    slides[0].style.display = "";
    slides[0].classList.add("is-active");

    // Reset dots
    var dots = getDots();
    dots.forEach(function (d, i) {
      d.classList.remove("is-active", "is-done");
      if (i === 0) d.classList.add("is-active");
    });

    $introLabel.textContent = "1 of " + TOTAL_SLIDES;
  }

  function showCourseOverview() {
    $introFlow.style.display = "none";
    $courseOverview.style.display = "";
    renderState();
  }

  /* ═══════════════════════════════════
     INTRO EVENT LISTENERS
     ═══════════════════════════════════ */

  // Next / Prev buttons via delegation
  $introFlow.addEventListener("click", function (e) {
    if (e.target.closest("[data-next-slide]")) {
      e.preventDefault();
      nextSlide();
      return;
    }
    if (e.target.closest("[data-prev-slide]")) {
      e.preventDefault();
      prevSlide();
      return;
    }
  });

  // Dot navigation
  getDots().forEach(function (dot) {
    dot.addEventListener("click", function () {
      var idx = parseInt(this.getAttribute("data-slide"), 10);
      goToSlide(idx, idx > currentSlide ? "forward" : "backward");
    });
  });

  // Finish intro → go to lesson 1
  if ($introFinishBtn) {
    $introFinishBtn.addEventListener("click", function (e) {
      e.preventDefault();
      completeIntro();
    });
  }

  /* ═══════════════════════════════════
     COURSE OVERVIEW — Progress & Lessons
     ═══════════════════════════════════ */

  // Build progress ticks (9 dividers)
  (function buildTicks() {
    for (var i = 0; i < 9; i++) {
      var tick = document.createElement("span");
      tick.className = "courseProgress__tick";
      $progressTicks.appendChild(tick);
    }
  })();

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

  function renderLessons() {
    $lessonsGrid.innerHTML = "";

    LESSONS.forEach(function (lesson, i) {
      var status, chipCls, extraCls;

      if (lesson.n <= progress.completedLessons) {
        status = "Completed";
        chipCls = "lessonCard__chip--completed";
        extraCls = "lessonCard--completed";
      } else if (lesson.n === progress.currentLesson && progress.started) {
        status = "In progress";
        chipCls = "lessonCard__chip--inprogress";
        extraCls = "lessonCard--current";
      } else if (!lesson.avail || lesson.n > progress.completedLessons + 1) {
        status = "Locked";
        chipCls = "lessonCard__chip--locked";
        extraCls = "lessonCard--locked";
      } else {
        status = "Not started";
        chipCls = "";
        extraCls = "";
      }

      var isLocked = extraCls === "lessonCard--locked";
      var pct =
        lesson.n <= progress.completedLessons
          ? 100
          : lesson.n === progress.currentLesson && progress.started
            ? 40
            : 0;

      var card = document.createElement("div");
      card.className = "lessonCard " + extraCls;

      var lockHtml = isLocked
        ? '<div class="lessonCard__lock"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>'
        : "";

      card.innerHTML =
        '<div class="lessonCard__img">' +
        '<div class="lessonCard__imgIcon">' +
        ICONS[i] +
        "</div>" +
        '<div class="lessonCard__imgNum">' +
        String(lesson.n).padStart(2, "0") +
        "</div>" +
        lockHtml +
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

      if (!isLocked) {
        card.addEventListener("click", function () {
          var exp = document.getElementById("expand-" + lesson.n);
          exp.classList.toggle("is-open");
        });
      }

      $lessonsGrid.appendChild(card);
    });
  }

  function renderState() {
    // Reset visibility
    $resumeStrip.classList.remove("is-visible");
    $completionBanner.classList.remove("is-visible");
    $firstTimeCta.style.display = "";

    if (!progress.started) {
      // STATE A — first time on overview, show CTA
      $firstTimeCta.style.display = "";
    } else if (!progress.completed) {
      // STATE B — in progress
      $firstTimeCta.style.display = "none";
      $resumeStrip.classList.add("is-visible");
      $resumeInfo.textContent =
        "You are currently on Lesson " +
        progress.currentLesson +
        " — " +
        LESSONS[progress.currentLesson - 1].title;
      $resumeMeta.textContent =
        progress.completedLessons + "/10 lessons completed";
    } else {
      // STATE C — completed
      $firstTimeCta.style.display = "none";
      $completionBanner.classList.add("is-visible");
    }

    renderProgress();
    renderLessons();
  }

  /* ═══════════════════════════════════
     ACTIONS
     ═══════════════════════════════════ */

  function handleCta() {
    alert("Navigating to: lesson-" + progress.currentLesson + ".html");
  }

  function smoothScrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Event delegation for overview buttons
  document.addEventListener("click", function (e) {
    var target = e.target.closest("[data-scroll]");
    if (target) {
      e.preventDefault();
      smoothScrollTo(target.getAttribute("data-scroll"));
      return;
    }
  });

  // Overview CTA buttons
  var $resumeBtn = document.getElementById("resumeCtaBtn");
  if ($resumeBtn) $resumeBtn.addEventListener("click", handleCta);

  var $firstTimeCtaBtn = document.getElementById("firstTimeCtaBtn");
  if ($firstTimeCtaBtn) {
    $firstTimeCtaBtn.addEventListener("click", function () {
      window.location.href = "lesson-1.html";
    });
  }

  /* ═══════════════════════════════════
     DEMO CONTROLS
     ═══════════════════════════════════ */
  var $demoSlider = document.getElementById("demoSlider");
  var $demoSliderVal = document.getElementById("demoSliderVal");
  var $demoResetIntro = document.getElementById("demoResetIntro");
  var $demoSkipIntro = document.getElementById("demoSkipIntro");

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

      // Make sure we're viewing overview
      if ($courseOverview.style.display === "none") {
        showCourseOverview();
      } else {
        renderState();
      }
    });
  }

  if ($demoResetIntro) {
    $demoResetIntro.addEventListener("click", function () {
      localStorage.removeItem("sn_intro_done");
      introCompleted = false;
      progress = {
        started: false,
        completedLessons: 0,
        currentLesson: 1,
        completed: false,
      };
      $demoSlider.value = 0;
      $demoSliderVal.textContent = "0";
      showIntro();
    });
  }

  if ($demoSkipIntro) {
    $demoSkipIntro.addEventListener("click", function () {
      localStorage.setItem("sn_intro_done", "true");
      introCompleted = true;
      showCourseOverview();
    });
  }

  /* ═══════════════════════════════════
     KEYBOARD NAVIGATION (intro slides)
     ═══════════════════════════════════ */
  document.addEventListener("keydown", function (e) {
    if ($introFlow.style.display === "none") return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (currentSlide < TOTAL_SLIDES - 1) nextSlide();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      if (currentSlide > 0) prevSlide();
    }
  });

  /* ═══════════════════════════════════
     INIT
     ═══════════════════════════════════ */
  if (introCompleted) {
    showCourseOverview();
  } else {
    showIntro();
  }
})();
