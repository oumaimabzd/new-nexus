/* ============================================
   lesson-1.js — Lesson 1 Controller
   ============================================ */
const LessonApp = (() => {
  "use strict";

  // Steps: 1=Intro, 2=Video, 3=FactSheet, 4=Exercise1, "4b"=Exercise2, 5=Reflection, 6=Completion
  // Internally we track 4b as a sub-step; the stepper always shows step 4 as active for both.
  const state = {
    currentStep: "1",
    totalSteps: 6,
    completedSteps: new Set(),
    flippedCards: new Set(),
    quizSubmitted: false,
    quizScore: 0,
  };

  const CORRECT = { q1: "b", q2: "c", q3: "b", q4: "b", q5: "b" };
  const EXPLAIN = {
    q1: "The most important difference is intent. Security addresses intentional, malicious threats while safety addresses unintentional harm.",
    q2: "The seven elements are: People, Communication, Routines, Information, Physical Elements, Technology, and Leadership.",
    q3: "5D+1R stands for Deter, Detect, Deny, Delay, Defend + Recover — the core functions of physical security.",
    q4: "The crime model consists of Motive (why), Opportunity (when/where), and Means (how/with what).",
    q5: "See, Say, Act promotes a culture where everyone observes risks, communicates concerns, and takes appropriate action.",
  };

  // Map step identifiers to stepper button index (1-based)
  function stepperIndex(step) {
    const s = String(step);
    if (s === "4b") return 4; // 4b shows "Exercises" active on stepper
    return parseInt(s);
  }

  function init() {
    bindStepperClicks();
    bindFlipCards();
    bindQuiz();
    bindAccordions();
    showStep("1");
    updateStepper();
  }

  function goToStep(n) {
    const s = String(n);
    const curr = String(state.currentStep);

    // Mark current as completed if moving forward
    const currNum = curr === "4b" ? 4.5 : parseFloat(curr);
    const nextNum = s === "4b" ? 4.5 : parseFloat(s);
    if (nextNum > currNum) {
      state.completedSteps.add(curr);
    }

    state.currentStep = s;
    showStep(s);
    updateStepper();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToExercise2() {
    goToStep("4b");
  }

  function showStep(s) {
    const id = s === "4b" ? "step-4b" : "step-" + s;
    document
      .querySelectorAll(".lesson-step")
      .forEach((el) => el.classList.remove("active"));
    const target = document.getElementById(id);
    if (target)
      requestAnimationFrame(() => {
        target.classList.add("active");
        if (s === "6") setTimeout(launchConfetti, 400);
      });
  }

  function updateStepper() {
    const names = [
      "Introduction",
      "Video",
      "Fact Sheet",
      "Exercises",
      "Reflection",
      "Completion",
    ];
    const activeIdx = stepperIndex(state.currentStep);

    document.querySelectorAll(".stepper-step").forEach((btn, i) => {
      const num = i + 1;
      btn.classList.remove("active", "completed");
      btn.removeAttribute("aria-current");

      // Check if this step number is completed
      // Step 4 is completed only if both "4" and "4b" are completed
      let isCompleted = false;
      if (num === 4) {
        isCompleted =
          state.completedSteps.has("4") && state.completedSteps.has("4b");
      } else {
        isCompleted = state.completedSteps.has(String(num));
      }

      // Also mark as completed if it's before the current active step
      if (num < activeIdx) {
        if (num === 4) {
          // Step 4 only shows completed if we're past exercise 2
          if (
            activeIdx > 4 ||
            (activeIdx === 4 &&
              state.currentStep === "4b" &&
              state.completedSteps.has("4"))
          ) {
            // Don't mark 4 as completed if we're on 4b
          }
          if (activeIdx > 4) isCompleted = true;
        } else {
          isCompleted = true;
        }
      }

      if (isCompleted) {
        btn.classList.add("completed");
        btn.setAttribute(
          "aria-label",
          "Step " + num + ": " + names[i] + " — completed",
        );
      } else if (num === activeIdx) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "step");
        btn.setAttribute(
          "aria-label",
          "Step " + num + ": " + names[i] + " — current step",
        );
      } else {
        btn.setAttribute("aria-label", "Step " + num + ": " + names[i]);
      }
    });

    // Update connector lines
    document.querySelectorAll(".stepper-line-fill").forEach((line, i) => {
      const stepNum = i + 1;
      let filled = false;
      if (stepNum < activeIdx) filled = true;
      if (stepNum === 4 && String(state.currentStep) === "4b") filled = false;
      if (stepNum === 4 && activeIdx > 4) filled = true;
      line.style.width = filled ? "100%" : "0%";
    });
  }

  function bindStepperClicks() {
    // Steps are not clickable — navigation is via buttons only
  }

  function bindFlipCards() {
    document.querySelectorAll(".flip-card").forEach((card, i) => {
      const handler = (e) => {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        if (e.type === "keydown") e.preventDefault();
        card.classList.toggle("flipped");
        if (card.classList.contains("flipped")) state.flippedCards.add(i);
        updateFlipProgress();
        checkExo1Completion();
      };
      card.addEventListener("click", handler);
      card.addEventListener("keydown", handler);
    });
  }

  function updateFlipProgress() {
    const el = document.getElementById("flipProgress");
    if (el) el.textContent = state.flippedCards.size + " of 5 reviewed";
  }

  function checkExo1Completion() {
    const btn = document.getElementById("exo1Continue");
    if (state.flippedCards.size >= 5 && btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Exercise 2 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  function bindQuiz() {
    const btn = document.getElementById("submitQuiz");
    if (btn) btn.addEventListener("click", submitQuiz);
  }

  function submitQuiz() {
    if (state.quizSubmitted) return;
    let score = 0;
    const total = Object.keys(CORRECT).length;
    let allAnswered = true;
    for (const [q, c] of Object.entries(CORRECT)) {
      const sel = document.querySelector('input[name="' + q + '"]:checked');
      if (!sel) {
        allAnswered = false;
        continue;
      }
      if (sel.value === c) score++;
    }
    if (!allAnswered) {
      for (const q of Object.keys(CORRECT)) {
        if (!document.querySelector('input[name="' + q + '"]:checked')) {
          const el = document.querySelector('[data-question="' + q + '"]');
          el.style.outline = "2px solid var(--error-br)";
          el.style.borderRadius = "var(--radius-md)";
          setTimeout(() => {
            el.style.outline = "none";
          }, 2000);
        }
      }
      return;
    }
    state.quizSubmitted = true;
    state.quizScore = score;
    for (const [q, c] of Object.entries(CORRECT)) {
      const sel = document.querySelector('input[name="' + q + '"]:checked');
      const isOk = sel && sel.value === c;
      const qEl = document.querySelector('[data-question="' + q + '"]');
      qEl.querySelectorAll(".quiz-option").forEach((opt) => {
        const inp = opt.querySelector("input");
        if (inp.value === c) opt.classList.add("correct-answer");
        else if (inp.checked && !isOk) opt.classList.add("wrong-answer");
        opt.style.pointerEvents = "none";
      });
      const fb = document.getElementById("fb-" + q);
      if (fb) {
        fb.className = "quiz-feedback show " + (isOk ? "correct" : "incorrect");
        fb.innerHTML =
          "<strong>" +
          (isOk ? "Correct" : "Incorrect") +
          ".</strong> " +
          EXPLAIN[q];
      }
    }
    const res = document.getElementById("quizResult");
    if (res) {
      res.classList.add("show");
      res.style.display = "block";
      res.innerHTML =
        '<div class="quiz-score">Your score: ' +
        score +
        " / " +
        total +
        " (" +
        Math.round((score / total) * 100) +
        "%)</div>";
    }
    const sb = document.getElementById("submitQuiz");
    if (sb) sb.style.display = "none";

    // Enable continue button
    const btn = document.getElementById("exerciseContinue");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Reflection <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  function bindAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach((t) => {
      t.addEventListener("click", () => {
        const exp = t.getAttribute("aria-expanded") === "true";
        const c = t.nextElementSibling;
        t.setAttribute("aria-expanded", !exp);
        c.setAttribute("aria-hidden", exp);
        c.classList.toggle("open", !exp);
      });
    });
  }

  function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const card = canvas.parentElement;
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
    const colors = [
      "#2e7d5a",
      "#456b6f",
      "#c96a4a",
      "#ffd166",
      "#1a5c3a",
      "#f6f4ee",
      "#3a8f6a",
    ];
    const particles = [];
    const cx = canvas.width / 2,
      cy = 120;
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed * (0.5 + Math.random()),
        vy: Math.sin(angle) * speed * (0.5 + Math.random()) - 3,
        w: 4 + Math.random() * 6,
        h: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.12 + Math.random() * 0.06,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.004,
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive++;
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.opacity -= p.decay;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      frame++;
      if (alive > 0 && frame < 300) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
  }

  return { init, goToStep, goToExercise2 };
})();

document.addEventListener("DOMContentLoaded", LessonApp.init);
