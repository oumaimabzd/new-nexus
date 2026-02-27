/* ============================================
   lesson-4.js — Lesson 4 Controller
   ============================================ */
const LessonApp = (() => {
  "use strict";

  const state = {
    currentStep: "1",
    completedSteps: new Set(),
    quizSubmitted: false,
  };

  /* ═══ QUIZ ═══ */
  // q4 and q7 are multi-select (checkbox); rest are single (radio)
  const CORRECT = {
    q1: "b",
    q2: "c",
    q3: "b",
    q4: ["a", "b", "c"], // d is wrong
    q5: "b",
    q6: "b",
    q7: ["a", "b", "c", "d"], // all correct
    q8: "b",
  };
  const EXPLAIN = {
    q1: "The most fundamental principle is that these threats are interconnected and mutually reinforce each other. They can even amplify one another, blur the boundaries between them, and intensify the overall effect.",
    q2: "The internet and social media are THE CRITICAL CONNECTING FACTOR between all these risks. They are used for communication, planning, radicalisation, and recruitment.",
    q3: "Gangs in Sweden are not infrequently driven by extremist ideologies and use radical interpretations for criminal purposes. Furthermore, extremist organisations often exploit gangs for contract killings, disinformation, and destabilisation.",
    q4: "All statements except the last are correct. The majority of school attacks are carried out by individuals driven by extremist ideologies, a significant proportion are preceded by online radicalisation, and many perpetrators have announced their plans online. School attacks are NOT spontaneous — they often have preceding warning signs.",
    q5: "The growth of one form of extremism can fuel the growth of another, particularly those perceived as each other's polar opposites. This creates a mutual reinforcement effect.",
    q6: "Children and minors are particularly vulnerable to recruitment. Both criminal gangs and extremist groups actively attempt to recruit children.",
    q7: "All options are correct. Extremist organisations and gangs use social media for communication, planning, radicalisation, recruitment of children, spreading disinformation, and tragically also livestreaming attacks.",
    q8: "It is particularly the involvement of minors in gang criminality that places Sweden among the countries in Europe with the highest rates of shootings and bombings. This is especially concerning because children are used to carry out serious violent crimes.",
  };

  /* ═══ THREAT MAP CONNECTIONS ═══ */
  const CONNECTIONS = {
    gang: {
      title: "Criminal Gangs — Connections to Other Threats",
      items: [
        {
          from: "Gangs",
          to: "Extremism",
          desc: "Gangs in Sweden are not infrequently driven by extremist ideologies and use radical interpretations of religion and ideology to further their criminal purposes.",
        },
        {
          from: "Gangs",
          to: "Digital Threats",
          desc: "Criminal gangs exploit the internet and social media strategically for communication, planning, coordination, and recruitment of children.",
        },
        {
          from: "Extremist Organisations",
          to: "Gangs",
          desc: "Extremist regimes exploit gangs for contract killings (often carried out by children), disinformation, riots, and attempts to destabilise the country.",
        },
      ],
    },
    extremism: {
      title: "Extremism — Connections to Other Threats",
      items: [
        {
          from: "Extremism",
          to: "Gangs",
          desc: "Extremist ideologies drive many gangs. Furthermore, gangs are used by extremist organisations for violence and destabilisation.",
        },
        {
          from: "Extremism",
          to: "School Attacks",
          desc: "The majority of school shootings and large-scale attacks are carried out by individuals — often minors — driven by extremist ideologies.",
        },
        {
          from: "Extremism",
          to: "Digital Threats",
          desc: "Extremist groups exploit social media for radicalisation and recruitment of children. Online radicalisation often precedes acts of violence.",
        },
        {
          from: "One form of extremism",
          to: "Another form",
          desc: "The growth of one form of extremism can fuel the growth of another, particularly those perceived as each other's polar opposites.",
        },
      ],
    },
    digital: {
      title: "Digital Threats — The Connecting Factor",
      items: [
        {
          from: "Digital Platforms",
          to: "All Threats",
          desc: "The internet and social media are THE CRITICAL CONNECTING FACTOR between all these risks.",
        },
        {
          from: "Social Media",
          to: "Gangs + Extremism",
          desc: "Used strategically for communication, planning, coordination, radicalisation, and recruitment of children.",
        },
        {
          from: "Online Radicalisation",
          to: "School Attacks",
          desc: "A significant proportion of school attacks are preceded by online radicalisation. Perpetrators express extreme views, announce plans, and publish manifestos online.",
        },
        {
          from: "Perpetrators",
          to: "Social Media",
          desc: "Tragically, many perpetrators have livestreamed their attacks on social platforms, creating copycat effects.",
        },
      ],
    },
    school: {
      title: "School Attacks — Consequence of Interconnected Threats",
      items: [
        {
          from: "Extremist Radicalisation",
          to: "School Attacks",
          desc: "The majority of school shootings are carried out by individuals — often minors — driven by extremist ideologies.",
        },
        {
          from: "Online Environment",
          to: "School Attacks",
          desc: "A significant proportion are preceded by online radicalisation where perpetrators express extreme views over extended periods.",
        },
        {
          from: "Perpetrators",
          to: "Manifestos + Livestreaming",
          desc: "Many have announced their plans and published manifestos online, and livestreamed their attacks on social platforms.",
        },
      ],
    },
  };

  function stepperIndex(step) {
    return String(step) === "4b" ? 4 : parseInt(step);
  }

  function init() {
    showStep("1");
    updateStepper();
  }

  function goToStep(n) {
    const s = String(n),
      curr = String(state.currentStep);
    const currNum = curr === "4b" ? 4.5 : parseFloat(curr);
    const nextNum = s === "4b" ? 4.5 : parseFloat(s);
    if (nextNum > currNum) state.completedSteps.add(curr);
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
      let done =
        num === 4
          ? state.completedSteps.has("4") && state.completedSteps.has("4b")
          : state.completedSteps.has(String(num));
      if (num < activeIdx) {
        if (num === 4) {
          if (activeIdx > 4) done = true;
        } else done = true;
      }
      if (done) {
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
      } else btn.setAttribute("aria-label", "Step " + num + ": " + names[i]);
    });
    document.querySelectorAll(".stepper-line-fill").forEach((line, i) => {
      const sn = i + 1;
      let filled = sn < activeIdx;
      if (sn === 4 && String(state.currentStep) === "4b") filled = false;
      if (sn === 4 && activeIdx > 4) filled = true;
      line.style.width = filled ? "100%" : "0%";
    });
  }

  /* ═══ QUIZ SUBMIT ═══ */
  function submitQuiz() {
    if (state.quizSubmitted) return;
    const total = Object.keys(CORRECT).length;
    let score = 0,
      allAnswered = true;

    for (const q of Object.keys(CORRECT)) {
      const isMulti = Array.isArray(CORRECT[q]);
      if (isMulti) {
        const checked = document.querySelectorAll(
          'input[name="' + q + '"]:checked',
        );
        if (checked.length === 0) {
          allAnswered = false;
          continue;
        }
      } else {
        if (!document.querySelector('input[name="' + q + '"]:checked')) {
          allAnswered = false;
          continue;
        }
      }
    }

    if (!allAnswered) {
      for (const q of Object.keys(CORRECT)) {
        const isMulti = Array.isArray(CORRECT[q]);
        const hasAnswer = isMulti
          ? document.querySelectorAll('input[name="' + q + '"]:checked')
              .length > 0
          : !!document.querySelector('input[name="' + q + '"]:checked');
        if (!hasAnswer) {
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

    for (const [q, c] of Object.entries(CORRECT)) {
      const isMulti = Array.isArray(c);
      const qEl = document.querySelector('[data-question="' + q + '"]');
      let isOk = false;

      if (isMulti) {
        const checked = [
          ...document.querySelectorAll('input[name="' + q + '"]:checked'),
        ].map((i) => i.value);
        isOk =
          checked.length === c.length && c.every((v) => checked.includes(v));
        qEl.querySelectorAll(".quiz-option").forEach((opt) => {
          const inp = opt.querySelector("input");
          const isCorrectOption = c.includes(inp.value);
          if (isCorrectOption) opt.classList.add("correct-answer");
          else if (inp.checked && !isCorrectOption)
            opt.classList.add("wrong-answer");
          opt.style.pointerEvents = "none";
        });
      } else {
        const sel = document.querySelector('input[name="' + q + '"]:checked');
        isOk = sel && sel.value === c;
        qEl.querySelectorAll(".quiz-option").forEach((opt) => {
          const inp = opt.querySelector("input");
          if (inp.value === c) opt.classList.add("correct-answer");
          else if (inp.checked && !isOk) opt.classList.add("wrong-answer");
          opt.style.pointerEvents = "none";
        });
      }

      if (isOk) score++;
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
    document.getElementById("submitQuiz").style.display = "none";

    const btn = document.getElementById("exo1Continue");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Threat Map <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  /* ═══ THREAT MAP ═══ */
  function showConnections(threat) {
    document
      .querySelectorAll(".threat-node")
      .forEach((n) => n.classList.remove("active"));
    const node = document.querySelector('[data-threat="' + threat + '"]');
    if (node) node.classList.add("active");

    const data = CONNECTIONS[threat];
    if (!data) return;
    const el = document.getElementById("connectionsDisplay");
    let html = "<h3>" + data.title + "</h3>";
    data.items.forEach((item) => {
      html +=
        '<div class="connection-item"><div class="connection-arrow">' +
        item.from +
        " &rarr; " +
        item.to +
        "</div><p>" +
        item.desc +
        "</p></div>";
    });
    el.innerHTML = html;
    el.classList.add("show");
  }

  function showAllConnections() {
    document
      .querySelectorAll(".threat-node")
      .forEach((n) => n.classList.add("active"));
    const el = document.getElementById("connectionsDisplay");
    let html = "<h3>All Connections — An Integrated Threat System</h3>";
    for (const [key, data] of Object.entries(CONNECTIONS)) {
      html +=
        '<h4 style="color:var(--slide-accent);margin:var(--s16) 0 var(--s8);font-size:14px;">' +
        data.title +
        "</h4>";
      data.items.forEach((item) => {
        html +=
          '<div class="connection-item"><div class="connection-arrow">' +
          item.from +
          " &rarr; " +
          item.to +
          "</div><p>" +
          item.desc +
          "</p></div>";
      });
    }
    el.innerHTML = html;
    el.classList.add("show");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetMap() {
    document
      .querySelectorAll(".threat-node")
      .forEach((n) => n.classList.remove("active"));
    const el = document.getElementById("connectionsDisplay");
    el.innerHTML = "";
    el.classList.remove("show");
  }

  /* ═══ CONFETTI ═══ */
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

  return {
    init,
    goToStep,
    goToExercise2,
    submitQuiz,
    showConnections,
    showAllConnections,
    resetMap,
  };
})();

document.addEventListener("DOMContentLoaded", LessonApp.init);
