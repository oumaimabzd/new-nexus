/* ============================================
   lesson-2.js — Lesson 2 Controller
   ============================================ */
const LessonApp = (() => {
  "use strict";

  const state = {
    currentStep: "1",
    totalSteps: 6,
    completedSteps: new Set(),
    quizSubmitted: false,
    quizScore: 0,
    matchedPairs: [],
    selectedLeft: null,
    selectedRight: null,
  };

  const CORRECT = {
    q1: "b",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "a",
    q6: "b",
    q7: "b",
    q8: "c",
  };

  const EXPLAIN = {
    q1: "Dehumanisation allows perpetrators to see the victim as less than human, enabling moral disengagement. This makes it psychologically easier to commit violence without guilt or empathy.",
    q2: "During adolescence, the socio-emotional system (reward-seeking) matures faster than the prefrontal cortex (impulse control), creating an imbalance that increases the risk of impulsive and risky behaviour.",
    q3: "Risk factors in schools often share common underlying causes such as social isolation or lack of trust. One risk can trigger others in a chain reaction, making a holistic approach essential.",
    q4: "Bullying directly harms the victim through physical and psychological ill health, but can also create revenge motives leading to targeted violence, or drive the victim to self-harm or suicide.",
    q5: "Digital threats are not a separate category — they are extensions of the same risks that exist in the physical world. Cyberbullying can lead to physical violence, and online recruitment results in real crimes.",
    q6: "Different cultures have varying norms around consent, modesty, and boundaries. Without cultural understanding, schools may fail to detect abuse or create safe reporting channels for all students.",
    q7: "Empathy acts as a natural counterweight to dehumanisation. By building students' ability to see the full humanity of others, it becomes psychologically harder to harm them.",
    q8: "Security systems without trust and shared responsibility can actually create fear rather than safety. Real security arises when everyone shares awareness, warning signs are taken seriously, and security becomes a natural part of everyday life.",
  };

  function stepperIndex(step) {
    const s = String(step);
    if (s === "4b") return 4;
    return parseInt(s);
  }

  function init() {
    bindStepperClicks();
    bindQuiz();
    bindMatching();
    bindAccordions();
    showStep("1");
    updateStepper();
  }

  function goToStep(n) {
    const s = String(n);
    const curr = String(state.currentStep);
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

      let isCompleted = false;
      if (num === 4) {
        isCompleted =
          state.completedSteps.has("4") && state.completedSteps.has("4b");
      } else {
        isCompleted = state.completedSteps.has(String(num));
      }

      if (num < activeIdx) {
        if (num === 4) {
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

  /* ═══════════════════════════════════
     EXERCISE 1: QUIZ (8 questions)
     ═══════════════════════════════════ */
  function bindQuiz() {
    // submitQuiz is called via onclick in HTML
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

    // Enable continue to exercise 2
    const btn = document.getElementById("exo1Continue");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Exercise 2 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  /* ═══════════════════════════════════
     EXERCISE 2: MATCHING (6 pairs)
     ═══════════════════════════════════ */
  function bindMatching() {
    document.querySelectorAll(".matching-column").forEach((col, colIdx) => {
      const side = colIdx === 0 ? "left" : "right";
      col.querySelectorAll(".matching-item").forEach((item) => {
        item.addEventListener("click", () => selectMatching(item, side));
      });
    });
  }

  function selectMatching(element, side) {
    if (element.classList.contains("matched")) return;

    if (side === "left") {
      if (state.selectedLeft) state.selectedLeft.classList.remove("selected");
      state.selectedLeft = element;
      element.classList.add("selected");
    } else {
      if (state.selectedRight) state.selectedRight.classList.remove("selected");
      state.selectedRight = element;
      element.classList.add("selected");
    }

    if (state.selectedLeft && state.selectedRight) {
      checkMatch();
    }
  }

  function checkMatch() {
    const leftId = state.selectedLeft.dataset.id;
    const rightId = state.selectedRight.dataset.id;

    if (leftId === rightId) {
      state.selectedLeft.classList.add("matched");
      state.selectedRight.classList.add("matched");
      state.selectedLeft.classList.remove("selected");
      state.selectedRight.classList.remove("selected");
      state.matchedPairs.push(leftId);
      updateMatchProgress();

      if (state.matchedPairs.length === 6) {
        setTimeout(() => {
          const btn = document.getElementById("exerciseContinue");
          if (btn) {
            btn.disabled = false;
            btn.removeAttribute("aria-disabled");
            btn.innerHTML =
              'Continue to Reflection <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
          }
        }, 500);
      }
    } else {
      state.selectedLeft.classList.add("incorrect");
      state.selectedRight.classList.add("incorrect");
      const l = state.selectedLeft;
      const r = state.selectedRight;
      setTimeout(() => {
        l.classList.remove("incorrect", "selected");
        r.classList.remove("incorrect", "selected");
      }, 800);
    }

    state.selectedLeft = null;
    state.selectedRight = null;
  }

  function updateMatchProgress() {
    const el = document.getElementById("matchCount");
    if (el) el.textContent = state.matchedPairs.length;
  }

  /* ═══════════════════════════════════
     ACCORDIONS
     ═══════════════════════════════════ */
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

  /* ═══════════════════════════════════
     CONFETTI
     ═══════════════════════════════════ */
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

  return { init, goToStep, goToExercise2, submitQuiz };
})();

document.addEventListener("DOMContentLoaded", LessonApp.init);
