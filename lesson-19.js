/* lesson-19.js — Lesson 19 Controller */
const LessonApp = (() => {
  "use strict";
  const state = {
    currentStep: "1",
    completedSteps: new Set(),
    quizDone: false,
    assessDone: false,
  };

  const QUIZ = {
    q1: {
      c: "b",
      e: "Research consistently shows that speed of concealment is more important than barrier strength. Perpetrators experience tunnel vision and react to visible targets.",
    },
    q2: {
      c: "c",
      e: "Every second of visibility increases risk. The 45 seconds spent discussing positions are 45 seconds students remain exposed to danger. Move first, refine positions afterwards.",
    },
    q3: {
      c: "b",
      e: "Follow the school's verification procedure. You cannot be certain who is at the door, and opening creates vulnerability for everyone already secured inside.",
    },
    q4: {
      c: "c",
      e: "Relocation should only occur for clear, objective safety reasons such as fire, structural damage, or explicit instructions from emergency services — not anxiety about staying.",
    },
  };
  const ASSESS = {
    a1: {
      c: "b",
      e: "The target time is 30 seconds. This is ambitious but achievable with practice and clear routines.",
    },
    a2: {
      c: "b",
      e: "Text maintains silence in the classroom and does not occupy phone lines that emergency services may need. Sound discipline is critical.",
    },
    a3: {
      c: "c",
      e: "The student rule is: Lock and stay. Bathrooms provide immediate lockable protection. Moving through corridors to reach a classroom increases exposure significantly.",
    },
    a4: {
      c: "c",
      e: "Report their names and last known locations to school leadership. Never leave your secured classroom — rescue of locked-out students should be organised by leadership with designated trained staff.",
    },
    a5: {
      c: "b",
      e: "Children lack physical capacity to overpower an attacker, the attempt increases their exposure to direct danger, and instructing them to prepare for confrontation causes deep and lasting psychological harm.",
    },
  };

  function stepperIndex(s) {
    return String(s) === "4b" ? 4 : parseInt(s);
  }
  function init() {
    showStep("1");
    updateStepper();
  }

  function goToStep(n) {
    const s = String(n),
      curr = String(state.currentStep);
    if (
      (s === "4b" ? 4.5 : parseFloat(s)) >
      (curr === "4b" ? 4.5 : parseFloat(curr))
    )
      state.completedSteps.add(curr);
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
    const t = document.getElementById(id);
    if (t)
      requestAnimationFrame(() => {
        t.classList.add("active");
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
    const ai = stepperIndex(state.currentStep);
    document.querySelectorAll(".stepper-step").forEach((btn, i) => {
      const n = i + 1;
      btn.classList.remove("active", "completed");
      btn.removeAttribute("aria-current");
      let done =
        n === 4
          ? state.completedSteps.has("4") && state.completedSteps.has("4b")
          : state.completedSteps.has(String(n));
      if (n < ai) {
        if (n === 4 && ai > 4) done = true;
        else if (n !== 4) done = true;
      }
      if (done) btn.classList.add("completed");
      else if (n === ai) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "step");
      }
    });
    document.querySelectorAll(".stepper-line-fill").forEach((l, i) => {
      const sn = i + 1;
      let f = sn < ai;
      if (sn === 4 && String(state.currentStep) === "4b") f = false;
      if (sn === 4 && ai > 4) f = true;
      l.style.width = f ? "100%" : "0%";
    });
  }

  function runQuiz(
    answers,
    prefix,
    doneFlag,
    submitId,
    resultId,
    continueId,
    nextLabel,
  ) {
    if (state[doneFlag]) return;
    const keys = Object.keys(answers);
    let score = 0,
      all = true;
    for (const q of keys) {
      if (!document.querySelector('input[name="' + q + '"]:checked')) {
        all = false;
        break;
      }
    }
    if (!all) {
      for (const q of keys) {
        if (!document.querySelector('input[name="' + q + '"]:checked')) {
          const el = document.querySelector('[data-question="' + q + '"]');
          el.style.outline = "2px solid var(--error-br)";
          el.style.borderRadius = "var(--radius-md)";
          setTimeout(() => (el.style.outline = "none"), 2000);
        }
      }
      return;
    }
    state[doneFlag] = true;
    for (const [q, d] of Object.entries(answers)) {
      const sel = document.querySelector('input[name="' + q + '"]:checked');
      const ok = sel && sel.value === d.c;
      if (ok) score++;
      const qEl = document.querySelector('[data-question="' + q + '"]');
      qEl.querySelectorAll(".quiz-option").forEach((o) => {
        const inp = o.querySelector("input");
        if (inp.value === d.c) o.classList.add("correct-answer");
        else if (inp.checked && !ok) o.classList.add("wrong-answer");
        o.style.pointerEvents = "none";
      });
      const fb = document.getElementById("fb-" + q);
      if (fb) {
        fb.className = "quiz-feedback show " + (ok ? "correct" : "incorrect");
        fb.innerHTML =
          "<strong>" + (ok ? "Correct" : "Incorrect") + ".</strong> " + d.e;
      }
    }
    const r = document.getElementById(resultId);
    if (r) {
      r.classList.add("show");
      r.style.display = "block";
      r.innerHTML =
        '<div class="quiz-score">Your score: ' +
        score +
        " / " +
        keys.length +
        " (" +
        Math.round((score / keys.length) * 100) +
        "%)</div>";
    }
    document.getElementById(submitId).style.display = "none";
    const btn = document.getElementById(continueId);
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        nextLabel +
        ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  function submitQuiz() {
    runQuiz(
      QUIZ,
      "q",
      "quizDone",
      "submitQuiz",
      "quizResult",
      "exo1Continue",
      "Continue to Assessment",
    );
  }
  function submitAssessment() {
    runQuiz(
      ASSESS,
      "a",
      "assessDone",
      "submitAssess",
      "assessResult",
      "exerciseContinue",
      "Continue to Reflection",
    );
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
      const a = Math.random() * Math.PI * 2,
        sp = 2 + Math.random() * 6;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp * (0.5 + Math.random()),
        vy: Math.sin(a) * sp * (0.5 + Math.random()) - 3,
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

  return { init, goToStep, goToExercise2, submitQuiz, submitAssessment };
})();
document.addEventListener("DOMContentLoaded", LessonApp.init);
