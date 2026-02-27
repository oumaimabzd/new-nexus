/* ============================================
   lesson-3.js — Lesson 3 Controller
   ============================================ */
const LessonApp = (() => {
  "use strict";

  const state = {
    currentStep: "1",
    totalSteps: 6,
    completedSteps: new Set(),
    scenariosSubmitted: false,
    quizSubmitted: false,
  };

  /* ═══ SCENARIOS (Exercise 1) ═══ */
  const SCENARIOS = [
    {
      title: "Scenario 1: Suspected Weapons Possession",
      text: "A teacher receives a tip from several students that a Year 8 student has brought a knife in their bag. The student has not threatened anyone, but the rumour is spreading rapidly and causing concern. The principal is contacted immediately.",
      question:
        "Which legislation gives the principal the right to act, and what measures should be taken?",
      options: [
        {
          id: "s1a",
          text: "Chapter 6a \u00a75 — The principal may conduct a bag search",
          correct: true,
        },
        {
          id: "s1b",
          text: "Chapter 6a \u00a77 — The principal may confiscate the item",
          correct: true,
        },
        {
          id: "s1c",
          text: "Chapter 6a \u00a78 — Weapons must be reported to police immediately",
          correct: true,
        },
        {
          id: "s1d",
          text: "Weapons Act (1996:67) — Prohibits weapons in school environments",
          correct: true,
        },
        {
          id: "s1e",
          text: "Inform guardians first before taking action",
          correct: false,
        },
        {
          id: "s1f",
          text: "GDPR Art. 9 — Requires student consent before bag search",
          correct: false,
        },
        {
          id: "s1g",
          text: "Work Environment Act — The school must await the safety representative's decision before action",
          correct: false,
        },
      ],
      analysis: {
        correct: "Chapter 6a \u00a75, \u00a77, \u00a78 and the Weapons Act.",
        wrong:
          "NOT guardians first, NOT awaiting safety representative, and GDPR does not regulate bag searches.",
        refs: [
          {
            t: "Chapter 6a \u00a75",
            d: "Gives the principal the right to conduct bag searches when there is risk of crime or security threats. Searches must be reasonable and proportionate.",
          },
          {
            t: "Chapter 6a \u00a77",
            d: "The principal or designated staff may confiscate items found during a search if it is necessary for safety.",
          },
          {
            t: "Chapter 6a \u00a78",
            d: "Items subject to seizure under the Criminal Code (e.g. weapons, narcotics) must be reported to police IMMEDIATELY. The school may retain the item pending the police decision.",
          },
          {
            t: "Weapons Act (1996:67)",
            d: "Prohibits weapons in public spaces, including schools. This strengthens the school's mandate to act.",
          },
        ],
        note: "When weapons are suspected, the school must act immediately. Guardians are informed, but NOT before safety measures are taken. GDPR Art. 9 concerns sensitive personal data and has nothing to do with bag searches. The Work Environment Act does not require awaiting a safety representative for acute security threats.",
      },
    },
    {
      title: "Scenario 2: Child Suspected of Being Harmed",
      text: "A mentor notices that a Year 6 student has started arriving at school with bruises, is unusually withdrawn, and has begun performing poorly. When the teacher carefully asks, the student says everything is fine at home but avoids eye contact.",
      question:
        "Which legislation governs the school's responsibility and what measures must be taken?",
      options: [
        {
          id: "s2a",
          text: "Social Services Act Ch. 14 \u00a71 — Mandatory reporting obligation",
          correct: true,
        },
        {
          id: "s2b",
          text: "The threshold is low — suspicion is sufficient for reporting",
          correct: true,
        },
        {
          id: "s2c",
          text: "The school should investigate the situation thoroughly before reporting",
          correct: false,
        },
        {
          id: "s2d",
          text: "Guardians must always be informed before reporting",
          correct: false,
        },
        {
          id: "s2e",
          text: "UN Convention on the Rights of the Child — The best interests of the child shall guide the decision",
          correct: true,
        },
        {
          id: "s2f",
          text: "Public Access and Secrecy Act prevents the school from sharing information with social services",
          correct: false,
        },
        {
          id: "s2g",
          text: "The Education Act requires the student's written consent before a concern report is made",
          correct: false,
        },
      ],
      analysis: {
        correct:
          "Social Services Act Ch. 14 \u00a71, low threshold, and the UN Convention on the Rights of the Child.",
        wrong:
          "NOT investigate themselves, NOT always inform guardians first, the secrecy act does NOT prevent reporting, and the student's consent is NOT required.",
        refs: [
          {
            t: "Social Services Act Ch. 14 \u00a71",
            d: "School staff have a MANDATORY reporting obligation when they suspect a child is being harmed. This applies regardless of whether the event occurred within or outside school.",
          },
          {
            t: "Low threshold",
            d: "Suspicion is sufficient — the school does not need to prove that the child is being harmed. It is social services' task to investigate, not the school's.",
          },
          {
            t: "UN Convention on the Rights of the Child (from 2020)",
            d: "The best interests of the child shall guide all decisions. This strengthens the requirement to report when there is suspicion.",
          },
        ],
        note: "The school must NOT conduct its own investigation — that is not their role. Guardians are often informed, but NOT always before reporting, especially if they may be the perpetrators. The Public Access and Secrecy Act contains an exception (Ch. 10 \u00a728) that allows information to be shared with social services for concern reports. The student's consent is never required for a concern report.",
      },
    },
    {
      title: "Scenario 3: Physical Intervention During a Fight",
      text: "During break time, a physical fight breaks out between two students. A teacher witnesses the situation and needs to quickly intervene to separate the students who are fighting. One of the students has received a bloody nose.",
      question:
        "Which legislation gives the teacher the right to physically intervene and which principles must be followed?",
      options: [
        {
          id: "s3a",
          text: "Education Act 5:6 — Gives the right to physical intervention",
          correct: true,
        },
        {
          id: "s3b",
          text: "The trade union must approve physical intervention in advance",
          correct: false,
        },
        { id: "s3c", text: "Must be reasonable and necessary", correct: true },
        { id: "s3d", text: "Must be proportionate", correct: true },
        {
          id: "s3e",
          text: "May be used as punishment afterwards",
          correct: false,
        },
        {
          id: "s3f",
          text: "Criminal Code 24:1 & 24:4 — Necessity and self-defence provisions support the action",
          correct: true,
        },
        {
          id: "s3g",
          text: "The Discrimination Act requires that both students are isolated in separate rooms",
          correct: false,
        },
      ],
      analysis: {
        correct:
          "Education Act 5:6, reasonable and necessary, proportionate, and Criminal Code 24:1 & 24:4.",
        wrong:
          "NOT as punishment, trade unions do NOT need to approve acute interventions, and the Discrimination Act does NOT regulate physical interventions.",
        refs: [
          {
            t: "Education Act 5:6",
            d: "Gives teachers the right to take immediate and temporary measures that are reasonable and necessary to ensure student safety and prevent violence. This explicitly includes physical intervention.",
          },
          {
            t: "Reasonable and necessary",
            d: "The measure may only be used when non-physical alternatives are insufficient, e.g. to separate fighting students or prevent someone from harming themselves or others.",
          },
          {
            t: "Proportionate",
            d: "The force and duration must be proportionate — just enough to achieve the lawful purpose, no more. The measure must be mild and brief.",
          },
          {
            t: "Criminal Code 24:1 & 24:4",
            d: "Necessity and self-defence provisions in the Criminal Code also support interventions in acute dangerous situations.",
          },
        ],
        note: "Physical intervention may NEVER be used as punishment or a disciplinary measure. It is only permitted for immediate safety. The student's dignity must always be preserved. Trade unions are not involved in acute security situations. The Discrimination Act concerns equal treatment, not how physical interventions are handled.",
      },
    },
  ];

  /* ═══ QUIZ (Exercise 2) ═══ */
  const CORRECT = {
    q1: "c",
    q2: "b",
    q3: "b",
    q4: "c",
    q5: "b",
    q6: "c",
    q7: "b",
  };
  const EXPLAIN = {
    q1: "Chapter 6a was introduced to give schools explicit mandate for crime-preventive security work. Previously, schools could handle bullying but lacked a clear mandate for broader security threats such as weapons, intrusions, and criminal activity.",
    q2: "The four areas are Prevent (systematic work against radicalisation), Avert (intelligence-based interventions), Protect (strengthened protection), and Manage (prepared measures for incidents).",
    q3: "According to Chapter 6a \u00a74, parents do NOT have automatic right of entry. The principal shall assess whether the visit is compatible with the students' interest and safety.",
    q4: "According to \u00a7\u00a77-8, items may be kept for a maximum of 4 days with notification to guardians. Weapons and narcotics must be reported to police immediately.",
    q5: "Physical intervention under Education Act 5:6 is only permitted when it is reasonable, necessary, proportionate, not used as punishment, and non-physical alternatives have been tried.",
    q6: "The new offence 'insulting a public official', effective from 2 July 2025, can result in fines or up to 6 months imprisonment.",
    q7: "The UN Convention on the Rights of the Child requires that the best interests of the child shall guide all decisions concerning children. This means all decisions and measures in school must be based on what is best for the child, not what is most convenient for adults.",
  };

  /* ═══ TIMELINE DATA ═══ */
  const TIMELINE = [
    {
      date: "The best interests of the child as a legal principle",
      title:
        "UN Convention on the Rights of the Child gains full legal force (2020)",
      desc: '<p><strong>Core concept:</strong> "The best interests of the child" is now a legally binding principle in Swedish law. All decisions concerning children must be based on what is best for the child, not what is most convenient for adults or institutions.</p><p><strong>Paradigm shift:</strong> From being a guiding document to having full legal force in courts and decision-making.</p><p><strong>Significance for schools:</strong> All decisions and measures in school must now be based on the best interests of the child. This strengthens the requirement for security, safety, and protection against abuse. Schools can no longer prioritise administrative conveniences over the child\'s safety.</p>',
    },
    {
      date: "Criminalisation of exploitation",
      title: "Recruitment of minors becomes a crime (2023)",
      desc: "<p><strong>Core concept:</strong> It is now explicitly illegal to recruit persons under 18 to criminal activity. This recognises minors' particular vulnerability and gangs' systematic exploitation of young people.</p><p><strong>Legal innovation:</strong> Previously, only the crime itself could be punished. Now the recruitment process itself is criminalised.</p><p><strong>Significance for schools:</strong> Provides tools to counter gang recruitment. Schools can report suspected recruitment to police and social services even before a crime has been committed.</p>",
    },
    {
      date: "Prevention as core strategy",
      title: "National strategy against extremism (2024)",
      desc: "<p><strong>Core concept:</strong> The strategy is built on four interconnected areas — Prevent, Avert, Protect, and Manage. This represents a shift from solely reactive response to proactive prevention.</p><p><strong>Systematic work:</strong> Focuses on tackling the root causes of radicalisation rather than just the symptoms.</p><p><strong>Significance for schools:</strong> Schools become important actors in preventing radicalisation through early interventions and cooperation with other authorities. Prevention happens in the classroom, not just at the police station.</p>",
    },
    {
      date: "Crime as a national threat",
      title: "Strategy against organised crime (2024)",
      desc: "<p><strong>Core concept:</strong> First strategy to formally define organised crime as a <em>national threat</em> requiring a society-wide response, not just police work.</p><p><strong>Five strategic goals:</strong> Stop criminal careers, limit weapons, break the criminal economy, strengthen societal resilience, improve information sharing.</p><p><strong>Significance for schools:</strong> Schools are integrated into the national security strategy as the frontline against recruitment. Schools are no longer just educational institutions but security actors.</p>",
    },
    {
      date: "Schools as the first line of defence",
      title: '"Barriers Against Crime" — Early intervention (2024)',
      desc: "<p><strong>Core concept:</strong> Social crime prevention strategy that places prevention before repression. Recognises that society must act BEFORE young people come into contact with the justice system.</p><p><strong>Multi-level model:</strong> Early, selective, and indicated prevention — from general health-promoting measures to targeted interventions for high-risk groups.</p><p><strong>Significance for schools:</strong> Schools become the FIRST LINE OF DEFENCE — responsible for identifying vulnerable students, cooperating with authorities, and applying evidence-based measures before legal sanctions are required. Prevention happens in everyday life, not after the fact.</p>",
    },
    {
      date: "Staff protection as a work environment issue",
      title: "AFS 2023:2 — Systematic risk management (2025)",
      desc: "<p><strong>Core concept:</strong> Threats and violence are not acceptable workplace risks. Systematic risk assessment is mandatory, not optional.</p><p><strong>Holistic view:</strong> Requires planning, alarm systems, crisis support, first aid, and restrictions on risky lone working.</p><p><strong>Significance for schools:</strong> Schools must now integrate security risk assessments into their work environment activities. This protects both staff and students by recognising that safe staff create a safe learning environment.</p>",
    },
    {
      date: "From inquiry to law",
      title: "Proposition 2024/25:160 — The school's new mandate (2025)",
      desc: "<p><strong>Core concept:</strong> Recognition that schools need explicit statutory mandate for crime-preventive security work. Previous laws focused on bullying and order — not on broader security threats.</p><p><strong>Content:</strong> Preparedness plans, access control, bag searches, confiscation, police reporting, and cooperation.</p><p><strong>Paradigm shift:</strong> First time schools receive a statutory right and obligation to act as security actors, not just pedagogical institutions.</p>",
    },
    {
      date: "Parliamentary mandate",
      title: "Parliament adopts Chapter 6a — Historic reform (2025)",
      desc: "<p><strong>Core concept:</strong> Political consensus that schools must be more than educational institutions — they are the frontline of national security.</p><p><strong>Historic significance:</strong> One of the most comprehensive legal changes in Swedish school security. Makes schools statutory actors in national security work.</p><p><strong>Integration:</strong> Links all three national strategies by giving schools concrete tools for implementation.</p>",
    },
    {
      date: "Concrete powers activated",
      title: "Chapter 6a in practice — Security as school activity (2025)",
      desc: "<p><strong>Core concept:</strong> Security work becomes part of the school's core mission, not a side activity.</p><p><strong>\u00a73:</strong> Preparedness for serious violent situations — schools shall be prepared, not reactive</p><p><strong>\u00a74:</strong> Access control — safety takes precedence over unconditional welcome. Parents do NOT have automatic right to be on school grounds</p><p><strong>\u00a7\u00a77-8:</strong> Confiscation of items — schools may act immediately on security threats. Weapons/narcotics reported directly to police</p><p><strong>Significance:</strong> From this day, schools have a clear legal basis for security measures. Uncertainty is replaced by legal clarity.</p>",
    },
    {
      date: "Protection of professional boundaries",
      title: "Insulting a public official — Respect for authority (2025)",
      desc: "<p><strong>Core concept:</strong> Recognition that teachers must be able to carry out their duties without fear of verbal attacks. Professional authority requires legal protection.</p><p><strong>Scope:</strong> Protects teachers when performing official duties such as grading, disciplining, or reporting.</p><p><strong>Cultural change:</strong> Signals that society values teachers' role and does not tolerate harassment.</p><p><strong>Significance for schools:</strong> Strengthens teachers' position and ability to act professionally without being subjected to verbal abuse.</p>",
    },
  ];

  function stepperIndex(step) {
    return String(step) === "4b" ? 4 : parseInt(step);
  }

  function init() {
    buildScenarios();
    buildTimeline();
    bindAccordions();
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

  /* ═══ BUILD SCENARIOS ═══ */
  function buildScenarios() {
    const c = document.getElementById("scenarioContainer");
    if (!c) return;
    let html = "";
    SCENARIOS.forEach((s, idx) => {
      const shuffled = [...s.options].sort(() => Math.random() - 0.5);
      html += '<div class="scenario-block" id="scenario-' + idx + '">';
      html += '<h3 class="card-heading">' + s.title + "</h3>";
      html += '<div class="scenario-narrative">' + s.text + "</div>";
      html += '<p class="scenario-question">' + s.question + "</p>";
      html += '<div class="scenario-options">';
      shuffled.forEach((o) => {
        html +=
          '<label class="scenario-option" data-id="' +
          o.id +
          '" data-correct="' +
          o.correct +
          '">';
        html +=
          '<input type="checkbox" name="s' + idx + '" value="' + o.id + '"/>';
        html +=
          '<span class="scenario-option-text">' + o.text + "</span></label>";
      });
      html += "</div>";
      html += '<div class="scenario-analysis" id="analysis-' + idx + '"></div>';
      html += "</div>";
    });
    c.innerHTML = html;
  }

  function submitScenarios() {
    if (state.scenariosSubmitted) return;
    state.scenariosSubmitted = true;
    let totalCorrect = 0,
      totalPossible = 0,
      totalWrong = 0;
    SCENARIOS.forEach((s, idx) => {
      const block = document.getElementById("scenario-" + idx);
      const labels = block.querySelectorAll(".scenario-option");
      const correctIds = s.options.filter((o) => o.correct).map((o) => o.id);
      totalPossible += correctIds.length;
      labels.forEach((label) => {
        const cb = label.querySelector("input");
        const isCorrect = label.dataset.correct === "true";
        if (cb.checked && isCorrect) {
          label.classList.add("correct-selected");
          totalCorrect++;
        } else if (cb.checked && !isCorrect) {
          label.classList.add("wrong-selected");
          totalWrong++;
        } else if (!cb.checked && isCorrect) {
          label.classList.add("missed");
        }
        cb.disabled = true;
      });
      // Show analysis
      const aEl = document.getElementById("analysis-" + idx);
      let aHTML = "<h4>" + s.title + " — Analysis</h4>";
      aHTML +=
        "<p><strong>Correct choices:</strong> " + s.analysis.correct + "</p>";
      aHTML +=
        '<p style="color:var(--error);"><strong>Incorrect options:</strong> ' +
        s.analysis.wrong +
        "</p>";
      s.analysis.refs.forEach((r) => {
        aHTML +=
          '<div class="scenario-ref"><strong>' +
          r.t +
          ":</strong> " +
          r.d +
          "</div>";
      });
      aHTML += "<p><strong>Important:</strong> " + s.analysis.note + "</p>";
      aEl.innerHTML = aHTML;
      aEl.classList.add("show");
    });
    // Show overall result
    const res = document.getElementById("scenarioResults");
    res.style.display = "block";
    res.innerHTML =
      '<div class="quiz-score">Scenario results: ' +
      totalCorrect +
      " of " +
      totalPossible +
      " correct selections \u00b7 " +
      totalWrong +
      " incorrect selections</div>";
    document.getElementById("submitScenarios").style.display = "none";
    // Enable continue
    const btn = document.getElementById("exo1Continue");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Exercise 2 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  /* ═══ QUIZ ═══ */
  function submitQuiz() {
    if (state.quizSubmitted) return;
    const total = Object.keys(CORRECT).length;
    let score = 0,
      allAnswered = true;
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
    document.getElementById("submitQuiz").style.display = "none";
    const btn = document.getElementById("exerciseContinue");
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
      btn.innerHTML =
        'Continue to Reflection <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    }
  }

  /* ═══ TIMELINE ═══ */
  function buildTimeline() {
    const w = document.getElementById("timelineWrapper");
    if (!w) return;
    let html = "";
    TIMELINE.forEach((t, i) => {
      html += '<div class="timeline-entry"><div class="timeline-dot"></div>';
      html +=
        '<div class="timeline-card" onclick="LessonApp.toggleTimeline(' +
        i +
        ')" id="tl-' +
        i +
        '">';
      html +=
        '<div class="timeline-date">' +
        t.date +
        ' <span class="tl-toggle">+</span></div>';
      html += '<div class="timeline-title">' + t.title + "</div>";
      html +=
        '<div class="timeline-details" id="tld-' + i + '">' + t.desc + "</div>";
      html += "</div></div>";
    });
    w.innerHTML = html;
  }

  function toggleTimeline(i) {
    const card = document.getElementById("tl-" + i);
    const det = document.getElementById("tld-" + i);
    const icon = card.querySelector(".tl-toggle");
    const open = det.classList.contains("open");
    det.classList.toggle("open", !open);
    card.classList.toggle("expanded", !open);
    icon.textContent = open ? "+" : "\u2212";
  }

  /* ═══ ACCORDIONS ═══ */
  function bindAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach((t) => {
      t.addEventListener("click", () => {
        const exp = t.getAttribute("aria-expanded") === "true";
        const c = t.nextElementSibling;
        t.setAttribute("aria-expanded", !exp);
        c.setAttribute("aria-hidden", exp);
        if (!exp) {
          c.style.maxHeight = c.scrollHeight + 2000 + "px";
          c.style.padding = "14px 20px 16px";
        } else {
          c.style.maxHeight = "0";
          c.style.padding = "0 20px";
        }
      });
    });
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
    submitScenarios,
    submitQuiz,
    toggleTimeline,
  };
})();

document.addEventListener("DOMContentLoaded", LessonApp.init);
