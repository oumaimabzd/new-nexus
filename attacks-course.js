/* =========================
   attacks-course.js — Risk-clone scaffold (same layout + styling)
   ✅ Uses the SAME HTML structure + course.css classes as your Risk course
   ✅ Same step ids: intro → videos → factsheet → caseStudy → quiz → complete
   ✅ Quiz step contains 3-quiz sequence (1 → 2 → 3)
   ✅ Content slots are clearly marked for your Attacks content
========================= */

"use strict";

/* =========================
   COURSE CONFIG
========================= */
const courseConfig = {
  courseId: "teacher-attacks-basics-001",
  title: "School Safety — Attacks (Prevention & Response)",
  role: "teacher",
  progressRules: { contributesPercent: 10 },
  steps: [
    {
      id: "intro",
      label: "Intro",
      title: "Course Introduction",
      hint: "Overview & how to use this module",
    },
    {
      id: "videos",
      label: "Videos",
      title: "Video Lessons",
      hint: "Short modules",
    },
    {
      id: "factsheet",
      label: "Text",
      title: "Reading Material",
      hint: "Translated to English",
    },
    {
      id: "caseStudy",
      label: "Case Study",
      title: "Case Study",
      hint: "Scenario-based exercise",
    },
    {
      id: "artifacts",
      label: "Artifacts",
      title: "Interactive artifacts",
      hint: "Tools you can reuse anytime",
    },

    {
      id: "complete",
      label: "Complete",
      title: "Completed",
      hint: "Confirmation",
    },
  ],
  videos: [
    {
      id: "a1",
      title: "Targeted School Violence",
      desc: "",
      duration: "~3 min",
      videoSrc: "assets/videos/Video11TargetedSchoolViolence.mp4",
    },
    {
      id: "a2",
      title: "How Swedish Schools Can Prevent Tragedy",
      desc: "",
      duration: "~4 min",
      videoSrc: "assets/videos/Video11HowSwedishSchoolsCanPreventTragedy.mp4",
    },
  ],
};

/* =========================
   ATTACKS TEXT CONTENT
  
========================= */
const attacksText = {
  coreMessage: "✅ PASTE ATTACKS CORE MESSAGE HERE",

  concepts: {
    title: "1. Central concepts and frameworks",
    blocks: [
      {
        heading: "✅ Concept block title",
        paragraphs: ["✅ Paragraph 1", "✅ Paragraph 2"],
        bullets: ["✅ bullet 1", "✅ bullet 2"],
        conclusion: "✅ Optional conclusion line",
      },
    ],
  },

  mainSections: {
    title: "2. Key content sections",
    items: [
      {
        name: "✅ Section title (e.g., Prevention in school environments)",
        hint: "✅ short hint",
        body: ["✅ paragraph 1", "✅ paragraph 2"],
      },
      // add more sections...
    ],
  },

  swedishContext: {
    title: "Special Swedish context",
    items: [{ lead: "✅ Lead:", text: "✅ Text" }],
  },

  philosophy: {
    title: "Preventive philosophy",
    paragraphs: ["✅ paragraph 1", "✅ paragraph 2"],
  },
};

const ATTACKS_MODULES = [
  {
    title: "Basic Concepts and Definitions",
    color: "navy",
    goals: [
      "Define targeted school violence (TSV)",
      "Understand the scope and forms of TSV",
      "Distinguish between common misconceptions and reality",
    ],
    blocks: [
      { type: "heading", text: "Definition of TSV:" },
      {
        type: "p",
        text: "Events where an individual deliberately plans and carries out acts of violence against specific persons or groups in a school environment. Often motivated by perceived grievances, violations, or ideological beliefs.",
      },
      { type: "heading", text: "Forms of TSV:" },
      {
        type: "ul",
        items: [
          "Shootings with firearms",
          "Knife or stabbing attacks",
          "Attacks with improvised weapons",
          "Explosives, arson, or methods for mass casualties",
        ],
      },
      {
        type: "box",
        variant: "warn",
        title: "Critical Misconception:",
        text: 'Most schools act reactively ("after the shots have been fired"), but attacks develop in three phases:',
        listStyle: "ol",
        items: [
          "Planning/preparation (months–years) ← primary focus for preventive work",
          "Execution (minutes)",
          "Aftermath/recovery (lifetime)",
        ],
      },
      { type: "heading", text: "Swedish Terms:" },
      {
        type: "ul",
        items: [
          "Targeted lethal violence in school environments",
          "Targeted violence in schools",
          "Deliberate lethal violence in school environments",
        ],
      },
    ],
  },

  {
    title: "The Threat Triangle – Motive, Opportunity, and Means",
    color: "green",
    goals: [
      "Apply the motive-opportunity-means framework",
      "Identify visible warning signs",
      "Understand typical attack patterns",
    ],
    blocks: [
      { type: "heading", text: "🔺 The Threat Triangle:" },
      {
        type: "p",
        text: "Almost all TSV cases show visible warning signs within all three areas:",
      },
      {
        type: "ul",
        items: [
          "Motive: grievances, bullying, ideological beliefs, desire for fame",
          "Opportunity: access to the school, knowledge of routines, vulnerable times",
          "Means: access to weapons, planning materials, tactical knowledge",
        ],
      },
      { type: "heading", text: "🚨 Observable Warning Signs:" },
      {
        type: "ul",
        items: [
          "Worrying behavioural changes",
          "Fixation on violence, weapons, or previous attacks",
          "Disturbing language or content on social media",
          "Drastic changes in appearance or social isolation",
        ],
      },
      { type: "heading", text: "Typical Attack Pattern:" },
      {
        type: "ul",
        items: [
          "Perpetrators enter via regular entrances during school hours",
          "Violence begins indoors (hallways, classrooms)",
          "Visible preparations: changing clothes, retrieving weapons, adjusting cameras",
          "Often occurs in toilets or secluded areas",
        ],
      },
      { type: "heading", text: "Staff's Role:" },
      {
        type: "p",
        text: "Teachers and school staff are uniquely placed to detect early warning signs – especially since most attackers are current or former students.",
      },
    ],
  },

  {
    title: "The Security Model 5D + 1R",
    color: "slate",
    goals: [
      "Understand a layer-based security mindset",
      "Use each level in the school context",
      "Balance security with the learning environment",
    ],
    blocks: [
      { type: "heading", text: "🛡️ The Model:" },
      {
        type: "ul",
        items: [
          "Detect: Identify threats before harm occurs",
          "Deter: Reduce the school's attractiveness as a target",
          "Deny: Restrict access to school and vulnerable areas",
          "Delay: Delay the attacker's movements to create response time",
          "Defend: Protect lives during an ongoing incident",
          "+1R: Recover: Handle psychological, operational, and legal consequences",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "Practical Applications:",
        items: [
          "Greeting students at entrances (detect abnormal behaviour)",
          "Restricting access during school hours (deny/delay)",
          "Staff training on behavioural warning signs (detect)",
          "Emergency routines (defend)",
          "Aftercare support for staff and students (recover)",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "💡 Philosophy:",
        text: "The purpose is not to create fortresses – but systems that reduce opportunities and increase the chance of early intervention.",
      },
    ],
  },

  {
    title: "International Case Studies – Lessons from Tragedies",
    color: "gold",
    goals: [
      "Draw preventive lessons from major attacks",
      'Understand the "copycat" phenomenon and cultural scripts',
      "Recognise universal patterns despite different contexts",
    ],
    blocks: [
      {
        type: "box",
        variant: "case",
        title: "📖 Case: Columbine (1999)",
        items: [
          "13 dead, over 20 injured",
          "Original plan: bombs in cafeteria (failed), then shooting",
          "Misconception: not just revenge for bullying – complex motives (psychopathy, depression, fame)",
          "Warning signs: violent threats, disturbing web content, violent school projects, prior arrest",
          "Lesson: several people knew parts of the plan but the information was not shared",
          'Legacy: created a "cultural script" that inspired future attackers globally',
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "📖 Case: Christchurch (2019)",
        items: [
          "51 dead in mosque attacks (not a school, but strong impact)",
          "Livestream, manifesto, extremist symbols",
          "Copycat effect: referenced by several school attacks (including Eslöv 2021)",
        ],
      },
      { type: "heading", text: "Lessons for Schools:" },
      {
        type: "ul",
        items: [
          "Online radicalisation is real",
          "Manifestos and symbolism matter",
          "Livestreaming as a terror tactic",
          "Lone actors are not radicalised in isolation",
        ],
      },
      { type: "heading", text: "Other Significant Attacks:" },
      {
        type: "ul",
        items: [
          "Virginia Tech (2007): failures in information sharing and mental healthcare",
          "Sandy Hook (2012): primary schools also need security; access to family weapons",
          "Finland (2007–2008): online leakage, influence from Columbine",
          "Norway/Utøya (2011): lone-actor terrorism overlaps with school attack scripts",
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "🌍 Universal Pattern:",
        text: "Cultural scripts spread across borders – attacks in one country directly inspire followers in others.",
      },
    ],
  },

  {
    title: "Swedish Case Studies – National Context",
    color: "navy",
    goals: [
      "Understand TSV in Swedish context",
      "Identify recurring patterns in Swedish cases",
      "Apply lessons in local preventive work",
    ],
    blocks: [
      {
        type: "box",
        variant: "case",
        title: "🇸🇪 Trollhättan (2015)",
        items: [
          "Sword attack, 2 dead",
          "Racist/xenophobic motive, targeted at diversity school",
          'Perpetrator in costume ("dark knight" appearance)',
          "Lone-actor terrorism, online radicalisation",
          "Lesson: symbolic schools can become ideological targets",
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "🇸🇪 Eslöv (2021)",
        items: [
          "15-year-old student, knife attack against teacher",
          "Skull mask, tactical clothing",
          "Livestream on Discord",
          "References to Columbine and Christchurch",
          "Lesson: threats and videos online were not reported",
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "🇸🇪 Malmö Latin (2022)",
        items: [
          "18-year-old student, axe/knife, two teachers killed",
          "Called police to confess afterwards",
          "Fixation on Columbine, limited external communication",
          "Lesson: insider threat, social isolation significant",
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "🇸🇪 Kristianstad (2022)",
        items: [
          "16-year-old, knife attack",
          "Online contact with Eslöv perpetrator",
          "Columbine fixation, copycat elements",
          "Lesson: young attackers network online",
        ],
      },
      {
        type: "box",
        variant: "case",
        title: "🇸🇪 Örebro/Campus Risbergska (2025)",
        items: [
          "35-year-old former student, 10 dead",
          "Legal firearms, smoke grenades",
          "Mental illness, suicidal thoughts",
          "Not ideological – personal crisis/despair",
          "Lesson: former students pose risk; weapon access and preparedness crucial",
        ],
      },
      { type: "heading", text: "🔍 Swedish Patterns:" },
      {
        type: "ul",
        items: [
          "Lone actors (mainly men, teenagers/young adults)",
          "Motives: bullying, isolation, perceived injustices",
          "Cultural scripts: Columbine and Christchurch recur",
          "Weapons: knives, axes, legally owned firearms",
          "Online leakage connects several perpetrators",
        ],
      },
    ],
  },

  {
    title: "Psychological and Behavioural Risk Factors",
    color: "green",
    goals: [
      "Identify psychological warning signs",
      "Understand developmental factors",
      "Recognise crisis points",
    ],
    blocks: [
      {
        type: "box",
        variant: "warn",
        title: "⚠️ No Simple Profile:",
        text: "There is no reliable checklist of characteristics that predicts attackers. Age, gender, grades, and social status vary greatly. Focus instead on: observable behaviours and context",
      },
      { type: "heading", text: "🧠 Common Psychological Symptoms:" },
      {
        type: "ul",
        items: [
          "Depression, anxiety, suicidal thoughts",
          "Behavioural problems: defiance, rule-breaking",
          "Developmental aspects: cognitive difficulties, learning problems, autism spectrum traits",
          "About 50% had prior contact with psychiatry",
        ],
      },
      { type: "heading", text: "🎯 Concerning Interests (approx. 50%):" },
      {
        type: "ul",
        items: [
          "Unusual fascination with violence or previous attacks",
          "Fixation on Columbine, Nazism, or violent media",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "Key Question:",
        text: "Why this fixation? How does it affect thinking and behaviour?",
      },
      { type: "heading", text: "💥 Social Stressors and Crises:" },
      {
        type: "ul",
        items: [
          "Many attackers were in acute crisis before attack",
          "Triggers: bullying, separations, family conflicts",
          "Crisis often culminates within days/hours",
          "Implication: all staff must be able to detect signs of crisis",
        ],
      },
      { type: "heading", text: "🏠 Risk Factors in Home Environment:" },
      {
        type: "ul",
        items: [
          "Parental separation, abuse, neglect",
          "Important: risk markers, not predictors",
          "Context determines how the student is understood",
        ],
      },
      {
        type: "box",
        variant: "warn",
        title: "🎯 Bullying – Central Factor:",
        text: "Over 80% of attackers were long-term bullied. Conclusion: effective anti-bullying programmes are non-negotiable",
      },
      { type: "heading", text: "💬 Communicated Intentions:" },
      {
        type: "ul",
        items: [
          "Almost all attackers showed concerning behaviours and expressed their intention",
          "Threats, concerning posts, disturbing drawings",
          "Problem: often ignored or misunderstood",
        ],
      },
    ],
  },

  {
    title: "Complex Motives and Multiple Factors",
    color: "slate",
    goals: [
      "Understand composite motivational layers",
      "Recognise that TSV rarely has a single cause",
      "Identify interacting factors",
    ],
    blocks: [
      { type: "heading", text: "🎯 Common Driving Forces:" },
      {
        type: "ul",
        items: [
          "Conflicts with peers (often related to bullying)",
          "Disputes with staff",
          "Romantic conflicts",
          "Family crises",
          "Desire to kill/gain attention",
          "Suicidal thoughts + violent outlet",
        ],
      },
      { type: "heading", text: "🔫 Weapon Access:" },
      {
        type: "ul",
        items: [
          "USA: most weapons from home despite security measures",
          "Sweden: knives and legally owned firearms",
          "Shared responsibility: schools, parents, and police must collaborate",
        ],
      },
      { type: "heading", text: "⚖️ Discipline and Police Contact:" },
      {
        type: "ul",
        items: [
          "Many attackers had prior disciplinary measures or police contact",
          "Critical: punishment in itself does not prevent violence",
          "Suspension can increase risk",
          "Discipline must be followed by support measures",
        ],
      },
      { type: "heading", text: "⏱️ Attack Progression:" },
      {
        type: "ul",
        items: [
          "Most end within minutes",
          "Many end without police intervention",
          "Ended by perpetrator themselves or staff",
          "Implication: teachers/staff are often the first responders",
        ],
      },
    ],
  },

  {
    title: "Cultural Scripts and Online Influence",
    color: "gold",
    goals: [
      "Understand how violent ideologies spread",
      "Identify patterns of online radicalisation",
      "Recognise signs of copycat behaviour",
    ],
    blocks: [
      { type: "heading", text: "📝 Cultural Script Formation:" },
      {
        type: "ul",
        items: [
          "Perpetrators design attacks to inspire others",
          "Creates manifestos, uses symbolism, music, clothing",
          'Builds a "legacy" through violence',
        ],
      },
      { type: "heading", text: "💻 Pathways to Online Radicalisation:" },
      {
        type: "ul",
        items: [
          "Fringe forums offer extremist ideas",
          "Violence cults glorify previous attackers",
          "Isolated youth find identity in violence",
          "Forums share and archive films, memes, manifestos",
        ],
      },
      { type: "heading", text: "📄 Manifestos and Symbolism:" },
      {
        type: "ul",
        items: [
          "Borrowed phrases, ideas, clothing styles",
          "Mix of personal grievances and extremism",
          "Can be ideological or non-ideological",
        ],
      },
      { type: "heading", text: "📹 Livestreaming as Tactic:" },
      {
        type: "ul",
        items: [
          "Amplifies attack's effect",
          "Gives perpetrator attention",
          "School attacks sometimes imitate this pattern",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "🛡️ Preventive Implications:",
        items: [
          "Digital competence training",
          "Critical examination of extremist content",
          "Open dialogue (not solely censorship)",
          "Report concerning behaviour of peers",
        ],
      },
    ],
  },

  {
    title: "Preventive Strategies and School Responsibility",
    color: "green",
    goals: [
      "Develop a comprehensive preventive approach",
      "Understand collective responsibility",
      "Implement proactive measures",
    ],
    blocks: [
      { type: "heading", text: "✅ Basic Prevention Principles:" },
      {
        type: "ul",
        items: [
          "Assess risks on school premises",
          "Train all staff to detect warning signs",
          "Build trust so students dare to report concerns",
          "Ensure every report leads to action",
          "Have regular contact with external partners",
          "Provide long-term support to students",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "🔍 Threat Assessment Method:",
        items: [
          "Not: Who someone is",
          "But: What someone does",
          "Questions: What behaviours are visible? What stressors/grievances exist? How is the situation developing?",
          "Fact- and behaviour-based, not profile-based",
        ],
      },
      {
        type: "box",
        variant: "practical",
        title: "🤝 Building a Culture of Trust:",
        items: [
          '"See, say, and act" mentality',
          "Students know how and where to report (even anonymously)",
          "Clear routines for handling reports",
          "Consistent follow-up",
        ],
      },
      { type: "heading", text: "❓ Critical Questions for Schools:" },
      {
        type: "ul",
        items: [
          "Does every student know how to report concerns?",
          "Are there clear and tested routines for threat assessment and crisis response?",
          "Are school counsellors and police reliable partners?",
          "Is anti-bullying work alive and active (not just policy)?",
        ],
      },
      { type: "heading", text: "👥 Staff's Role:" },
      {
        type: "ul",
        items: [
          "Not as guards or investigators",
          "But: uniquely placed to notice when something is not right",
          "Daily contact and observation of subtle changes",
          "Courage to ask questions and act",
        ],
      },
    ],
  },
];

/* =========================
   STORAGE KEYS (same pattern as Risk)
========================= */
const STORAGE = {
  state: (courseId) => `sn.course.${courseId}.state`,
  watched: (courseId) => `sn.course.${courseId}.watchedVideos`,
};

function nowISO() {
  return new Date().toISOString();
}
function formatLocalDateTime(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

/* =========================
   DOM HELPERS (same)
========================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function")
      node.addEventListener(k.slice(2), v);
    else if (v === null || v === undefined) return;
    else node.setAttribute(k, v);
  });
  children.forEach((c) =>
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c)
  );
  return node;
}

function smoothScrollToTop(target) {
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderModuleAccordionItem(mod, idx) {
  const item = el("section", {
    class: "modItem",
    "data-acc-item": "true",
    "data-mod-color": mod.color || "navy",
  });

  const headerId = `modHead_${idx + 1}`;
  const panelId = `modPanel_${idx + 1}`;

  const btn = el("button", {
    class: "modHead",
    type: "button",
    id: headerId,
    "data-acc-button": "true",
    "aria-expanded": "false",
    "aria-controls": panelId,
  });

  btn.appendChild(
    el("div", { class: "modTitle" }, [
      el("div", { class: "modTitle__kicker" }, [`MODUL ${idx + 1}`]),
      el("div", { class: "modTitle__text" }, [mod.title]),
    ])
  );

  btn.appendChild(
    el("div", { class: "modArrow", "aria-hidden": "true" }, ["▼"])
  );

  const panel = el("div", {
    class: "modBody",
    id: panelId,
    role: "region",
    "aria-labelledby": headerId,
    "data-acc-panel": "true",
    style: "max-height:0px;",
  });

  const inner = el("div", { class: "modBody__inner" });

  // 1) Learning goals
  inner.appendChild(
    el("section", { class: "modGoals" }, [
      el("div", { class: "modGoals__title" }, [
        "📚 ",
        el("span", {}, ["Learning Goals:"]),
      ]),
      el(
        "ul",
        {},
        (mod.goals || []).map((g) => el("li", {}, [g]))
      ),
    ])
  );

  // 2) Content blocks (headings + paragraphs + lists + highlight boxes)
  (mod.blocks || []).forEach((b) => {
    if (b.type === "heading") {
      inner.appendChild(el("h4", { class: "modH" }, [b.text]));
    }
    if (b.type === "p") {
      inner.appendChild(el("p", { class: "modP" }, [b.text]));
    }
    if (b.type === "ul") {
      inner.appendChild(
        el(
          "ul",
          {},
          (b.items || []).map((it) => el("li", {}, [it]))
        )
      );
    }
    if (b.type === "ol") {
      inner.appendChild(
        el(
          "ol",
          {},
          (b.items || []).map((it) => el("li", {}, [it]))
        )
      );
    }
    if (b.type === "box") {
      inner.appendChild(renderHighlightBox(b));
    }
  });

  panel.appendChild(inner);

  item.appendChild(btn);
  item.appendChild(panel);
  return item;
}

function renderHighlightBox(b) {
  const variant = b.variant || "case"; // warn | case | practical
  const cls =
    variant === "warn"
      ? "hiBox hiBox--warn"
      : variant === "practical"
      ? "hiBox hiBox--practical"
      : "hiBox hiBox--case";

  const icon =
    variant === "warn" ? "⚠️" : variant === "practical" ? "💡" : "🔍";

  const box = el("section", { class: cls });

  box.appendChild(
    el("div", { class: "hiBox__title" }, [
      `${icon} `,
      el("span", {}, [b.title || "Important"]),
    ])
  );

  if (b.text) {
    box.appendChild(el("p", { class: "modP" }, [b.text]));
  }

  if (Array.isArray(b.items) && b.items.length) {
    // choose list style
    if (b.listStyle === "ol") {
      box.appendChild(
        el(
          "ol",
          {},
          b.items.map((it) => el("li", {}, [it]))
        )
      );
    } else {
      box.appendChild(
        el(
          "ul",
          {},
          b.items.map((it) => el("li", {}, [it]))
        )
      );
    }
  }

  return box;
}

/**
 * Single-open accordion behavior:
 * - click header => open that panel
 * - opening a new one closes the previous
 * - smooth max-height transition
 */
function initSingleOpenAccordion(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const items = Array.from(root.querySelectorAll('[data-acc-item="true"]'));
  if (!items.length) return;

  function closeItem(item) {
    const btn = item.querySelector('[data-acc-button="true"]');
    const panel = item.querySelector('[data-acc-panel="true"]');
    if (!btn || !panel) return;

    item.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
  }

  function openItem(item) {
    const btn = item.querySelector('[data-acc-button="true"]');
    const panel = item.querySelector('[data-acc-panel="true"]');
    if (!btn || !panel) return;

    // close all others first (single-open)
    items.forEach((it) => {
      if (it !== item) closeItem(it);
    });

    item.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");

    // measure inner height for smooth expansion
    const inner = panel.firstElementChild;
    const targetHeight = inner ? inner.scrollHeight : panel.scrollHeight;
    panel.style.maxHeight = `${targetHeight}px`;

    // If content changes (fonts, images), recalc once
    window.setTimeout(() => {
      const inner2 = panel.firstElementChild;
      const h2 = inner2 ? inner2.scrollHeight : panel.scrollHeight;
      panel.style.maxHeight = `${h2}px`;
    }, 60);
  }

  // Wire clicks
  items.forEach((item) => {
    const btn = item.querySelector('[data-acc-button="true"]');
    if (!btn) return;

    // prevent double-binding
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  // Optional: open first module by default (comment out if you want all closed)
  // openItem(items[0]);
}

/* =========================
   STATE (same)
========================= */
function defaultState() {
  return {
    currentStepIndex: 0,
    completedStepIds: [],
    completedAt: null,
  };
}

function clampIndex(i) {
  const max = courseConfig.steps.length - 1;
  if (typeof i !== "number" || Number.isNaN(i)) return 0;
  return Math.max(0, Math.min(max, i));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE.state(courseConfig.courseId));
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      currentStepIndex: clampIndex(parsed.currentStepIndex),
      completedStepIds: Array.isArray(parsed.completedStepIds)
        ? parsed.completedStepIds
        : [],
    };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(
    STORAGE.state(courseConfig.courseId),
    JSON.stringify(state)
  );
}

function loadWatchedVideos() {
  const raw = localStorage.getItem(STORAGE.watched(courseConfig.courseId));
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveWatchedVideos(ids) {
  localStorage.setItem(
    STORAGE.watched(courseConfig.courseId),
    JSON.stringify(ids)
  );
}

function stepIndexById(id) {
  return courseConfig.steps.findIndex((s) => s.id === id);
}
function isCompleted(state, stepId) {
  return state.completedStepIds.includes(stepId);
}
function markStepComplete(state, stepId) {
  if (!stepId) return;
  if (!state.completedStepIds.includes(stepId)) {
    state.completedStepIds.push(stepId);
    saveState(state);
  }
}

/* =========================
   TOAST (same)
========================= */
function ensureToastWrap() {
  if ($("#toastWrap")) return;
  const wrap = el("div", {
    id: "toastWrap",
    class: "toastWrap",
    "aria-live": "polite",
  });
  document.body.appendChild(wrap);
}
function toast(title, msg) {
  ensureToastWrap();
  const wrap = $("#toastWrap");
  if (!wrap) return;

  const item = el("div", { class: "toast", role: "status" }, [
    el("p", { class: "toast__title" }, [title]),
    el("p", { class: "toast__msg" }, [msg]),
  ]);
  wrap.appendChild(item);

  window.setTimeout(() => {
    item.style.opacity = "0";
    item.style.transform = "translateY(4px)";
  }, 3200);
  window.setTimeout(() => item.remove(), 3800);
}

/* =========================
   QUIZ STORAGE HELPERS (same behavior)
========================= */
function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function setItem(key, val) {
  localStorage.setItem(key, val);
}
function removeItem(key) {
  localStorage.removeItem(key);
}

/* =========================
   QUIZ SEQUENCE + GATING (same)
========================= */
let appState = loadState();

/* =========================
   RENDER: Stepper rail (uses injected #stepper)
========================= */
function renderStepper(state) {
  const stepper = $("#stepper");
  if (!stepper) return;

  stepper.innerHTML = "";

  courseConfig.steps.forEach((step, idx) => {
    const isCurrent = idx === state.currentStepIndex;
    const isStepCompleted = isCompleted(state, step.id);
    const status = isCurrent
      ? "current"
      : isStepCompleted
      ? "complete"
      : "upcoming";

    const li = el("li", { class: "stepper__item" });

    const btn = el("button", {
      class: `stepper__btn is-${status}`,
      type: "button",
      "data-step-index": String(idx),
      role: "tab",
      "aria-selected": isCurrent ? "true" : "false",
      title: step.title,
    });

    if (isCurrent) btn.setAttribute("aria-current", "step");

    const rail = el("span", { class: "stepper__rail", "aria-hidden": "true" });
    const dot = el("span", { class: "stepper__dot", "aria-hidden": "true" });

    if (!isCurrent && isStepCompleted)
      dot.appendChild(
        el("span", { class: "stepper__check", "aria-hidden": "true" })
      );
    else dot.textContent = String(idx + 1);

    rail.appendChild(dot);

    const content = el("span", { class: "stepper__content" });
    const head = el("span", { class: "stepper__head" });
    head.appendChild(el("span", { class: "stepper__name" }, [step.title]));

    const chips = el("span", { class: "stepper__chips" });

    if (!isCurrent && isStepCompleted) {
      chips.appendChild(
        el("span", { class: "stepper__chip stepper__chip--done" }, [
          "Completed",
        ])
      );
    }

    head.appendChild(chips);
    content.appendChild(head);
    content.appendChild(el("span", { class: "stepper__hint" }, [step.hint]));

    btn.appendChild(rail);
    btn.appendChild(content);

    btn.addEventListener("click", () => handleStepSelect(idx));

    li.appendChild(btn);
    stepper.appendChild(li);
  });

  syncAriaTabs(state);
}

/* =========================
   Header (same IDs you already use)
========================= */
function renderHeader(state) {
  const step = courseConfig.steps[state.currentStepIndex];

  $("#stepTitle") && ($("#stepTitle").textContent = step.title);
  $("#stepSubtitle") &&
    ($("#stepSubtitle").textContent = getStepMicrocopy(step.id));

  const badge = $("#stepBadge");
  if (badge) {
    badge.textContent =
      step.id === "intro"
        ? "~3 min"
        : step.id === "videos"
        ? "~10 min"
        : step.id === "factsheet"
        ? "~8 min"
        : step.id === "caseStudy"
        ? "~6 min"
        : step.id === "artifacts"
        ? "~7 min"
        : "Done";
  }

  const saveBadge = $("#saveBadge");
  if (saveBadge) saveBadge.setAttribute("hidden", "true");
}

function getStepMicrocopy(stepId) {
  switch (stepId) {
    case "intro":
      return "This module covers prevention and response related to attacks. Use the reading step to scan key frameworks, then reflect in the questionnaire.";
    case "videos":
      return "Short modules designed for busy schedules. You can pause and return later.";
    case "factsheet":
      return "Full reading material translated to English. Structured for scanning and comfortable reading.";
    case "caseStudy":
      return "Scenario-based practice. Work through a guided case to connect the material to real school situations.";
    case "artifacts":
      return "Use these interactive artifacts as practical tools. They are not graded and can be reused anytime.";

    case "complete":
      return "Training recorded. You can review the reading or your questionnaire answers.";
    default:
      return "";
  }
}

/* =========================
   MAIN STEP RENDER
========================= */
function renderStep(state) {
  const viewport = $("#stepViewport");
  if (!viewport) return;

  viewport.innerHTML = "";

  const step = courseConfig.steps[state.currentStepIndex];
  const pane = el("section", {
    class: "stepPane",
    "data-step-id": step.id,
    id: "activeStep",
  });
  const body = el("div", { class: "stepPane__body" });

  if (step.id === "intro") body.appendChild(renderIntroStep(state));
  if (step.id === "videos") body.appendChild(renderVideosStep(state));
  if (step.id === "factsheet")
    body.appendChild(renderAttacksReadingStep(state));
  if (step.id === "caseStudy") body.appendChild(renderCaseStudyStep(state));
  if (step.id === "artifacts") body.appendChild(renderArtifactsStep(state));
  if (step.id === "complete") body.appendChild(renderCompleteStep(state));

  pane.appendChild(body);
  viewport.appendChild(pane);

  syncFooterButtons(state);
}

/* =========================
   INTRO (same UI pattern)
========================= */
function renderIntroStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Verified training • Reading material",
      ]),
      el("h3", { class: "readingTitle" }, [courseConfig.title]),
      el("p", { class: "readingSub" }, [
        "You will read a translated text with key concepts, context, and prevention philosophy. Take your time — this step prepares you for reflection.",
      ]),
      el("div", { class: "readingDivider", "aria-hidden": "true" }),
      el("p", { class: "readingP" }, [
        "How to use this module: scan the headings, expand categories you want to focus on, and come back anytime. The questionnaire is not a test — it helps document understanding and next actions.",
      ]),
    ])
  );

  hold.appendChild(
    el("section", { class: "readingCard is-soft" }, [
      el("div", { class: "readingCard__top" }, [
        el("h4", { class: "readingH2" }, ["Core message"]),
      ]),
      el("p", { class: "readingP" }, [attacksText.coreMessage]),
    ])
  );

  hold.appendChild(
    el(
      "div",
      {
        style:
          "display:flex; gap: var(--s12); flex-wrap:wrap; align-items:center;",
      },
      [
        el(
          "button",
          {
            class: "btn btn--primary",
            type: "button",
            onclick: () => goNext(),
          },
          ["Continue to reading"]
        ),
        el("p", { class: "caption", style: "margin:0;" }, [
          "Progress is saved automatically on this device.",
        ]),
      ]
    )
  );

  wrap.appendChild(hold);

  if (!state.completedStepIds.includes("intro")) {
    markStepComplete(state, "intro");
    renderHeader(state);
    renderStepper(state);
  }

  return wrap;
}

/* =========================
   VIDEOS (same behavior + modal hooks)
========================= */
function renderVideosStep(state) {
  const container = el("div", { class: "courseContent" });
  const videos = Array.isArray(courseConfig.videos) ? courseConfig.videos : [];

  if (!videos.length) {
    container.appendChild(
      el("div", { class: "emptyState" }, [
        el("div", { class: "emptyState__title" }, ["No videos in this module"]),
        el("p", { class: "emptyState__desc", style: "margin:0;" }, [
          "This training step has no video content. You can continue to the reading material.",
        ]),
      ])
    );
    markStepComplete(state, "videos");
    return container;
  }

  const watched = new Set(loadWatchedVideos());
  const grid = el("div", { class: "videoGrid", role: "list" });

  videos.slice(0, 3).forEach((v) => {
    const card = el("article", { class: "videoCard", role: "listitem" });

    const openThisVideo = () => {
      if (typeof openModal === "function") {
        openModal({
          title: v.title,
          hint: v.desc,
          videoId: v.id,
          videoSrc: v.videoSrc,
        });
      } else {
        toast(
          "Missing modal helper",
          "openModal() is not available in this file yet."
        );
      }
    };

    const thumb = el("div", { class: "videoCard__thumb" }, [
      el(
        "button",
        {
          class: "videoCard__play",
          type: "button",
          "aria-label": `Play video: ${v.title}`,
          onclick: openThisVideo,
        },
        [typeof playIcon === "function" ? playIcon() : "▶"]
      ),
    ]);

    const body = el("div", { class: "videoCard__body" }, [
      el("h3", { class: "videoCard__title" }, [v.title]),
      el("p", { class: "videoCard__desc" }, [v.desc]),
    ]);

    const footer = el("div", { class: "videoCard__footer" }, [
      el("div", { class: "videoMeta" }, [v.duration || "~3 min"]),
      el(
        "button",
        {
          class: "btn btn--tertiary btn--small",
          type: "button",
          onclick: openThisVideo,
        },
        [watched.has(v.id) ? "Rewatch" : "Play"]
      ),
    ]);

    if (watched.has(v.id)) card.classList.add("is-watched");

    card.appendChild(thumb);
    card.appendChild(body);
    card.appendChild(footer);
    grid.appendChild(card);
  });

  container.appendChild(grid);

  if (loadWatchedVideos().length > 0) {
    markStepComplete(state, "videos");
    renderHeader(state);
    renderStepper(state);
  }

  return container;
}

/* =========================
   READING (Risk-like cards + accordion)
========================= */
function renderAttacksReadingStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  // Top intro for reading step
  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Reading • Interactive fact sheet",
      ]),
      el("h3", { class: "readingTitle" }, ["Reading Material"]),
      el("p", { class: "readingSub" }, [
        "About This Material: This interactive fact sheet offers a comprehensive overview of nine critical modules for understanding and preventing targeted violence in schools. Click on each module to explore learning objectives and key content.",
      ]),
    ])
  );

  // Accordion list container
  const list = el("div", { class: "modList", id: "attacksModules" });

  ATTACKS_MODULES.forEach((mod, idx) => {
    list.appendChild(renderModuleAccordionItem(mod, idx));
  });

  hold.appendChild(list);
  wrap.appendChild(hold);

  // Mark the reading step complete once the user visits it (same “shell” behavior)
  if (!state.completedStepIds.includes("factsheet")) {
    markStepComplete(state, "factsheet");
    renderHeader(state);
    renderStepper(state);
  }

  // After mount, wire the one-open accordion behavior
  queueMicrotask(() => initSingleOpenAccordion("#attacksModules"));

  return wrap;
}
/* =========================================================
   ARTIFACTS — School Nexus tools (no saving, reusable)
   - Risk calculator (scored checklist)
   - Scenario generator (with recommended actions reveal)
   - Quick guide search (filter cards)
   - Case analysis (interactive MCQ + explanations)
========================================================= */

/* ---------- DATA (copied from your Fyrtorn logic) ---------- */

const SN_SCENARIOS = {
  behavioral: [
    {
      title: "Concerning Behavior in Classroom",
      description:
        "A 16-year-old student has over the past two weeks started wearing black clothes with military symbols. He has drawn disturbing pictures in his notebook showing violence against specific classmates. When the teacher tries to talk to him, he becomes hostile and says 'you will see soon'.",
      questions: [
        "What warning signs do you see?",
        "What immediate actions should be taken?",
        "Who should be contacted?",
      ],
      recommendedActions: [
        "Document everything (drawings, statements, clothing)",
        "Contact student health team immediately",
        "Inform principal/security team",
        "Contact guardians same day",
        "Consider police contact for concrete threats",
      ],
    },
    {
      title: "Social Isolation and Fixation",
      description:
        "A 15-year-old student has gradually isolated himself from all friends. The school counselor discovers that the student has a private Instagram account where he posts pictures of Columbine perpetrators and writes about 'revenge' and 'justice'. The student has also searched for weapon information on school computers.",
      questions: [
        "How serious is the situation?",
        "What are the most important risk factors?",
        "What response is required?",
      ],
      recommendedActions: [
        "HIGH RISK — act immediately",
        "Convene security team urgently",
        "Secure digital evidence (screenshots)",
        "Police contact for assessment",
        "Report to social services",
        "Investigate weapon access at home",
        "Keep student under supervision",
      ],
    },
  ],

  online: [
    {
      title: "Discord Activity Reported",
      description:
        "A classmate reports that a 17-year-old student in a Discord group has shared videos from school attacks and written 'would be cool to do something similar here'. The student has also asked if anyone knows where to get weapons.",
      questions: [
        "Is this a credible threat?",
        "What should be done first?",
        "Which authorities should be involved?",
      ],
      recommendedActions: [
        "Take reports from students seriously",
        "Collect digital evidence immediately",
        "Contact police — this is a concrete threat",
        "Inform principal and security team",
        "Contact guardians",
        "Report to social services",
        "Document everything",
      ],
    },
    {
      title: "Livestream Planning",
      description:
        "IT staff discovers that a student has searched for 'how to livestream on Twitch' and 'best camera for action'. In the same web history are searches for 'Christchurch attack video' and 'Eslov school attack'. The student has also bought an action camera online.",
      questions: [
        "What cultural scripts are visible here?",
        "How urgent is the situation?",
        "What action plan is needed?",
      ],
      recommendedActions: [
        "CRITICAL situation — copycat pattern",
        "Call police immediately",
        "Activate crisis preparedness",
        "Document all digital activity",
        "Contact guardians urgently",
        "Keep student under supervision until police assessment",
        "Inform staff about situation",
      ],
    },
  ],

  crisis: [
    {
      title: "Acute Separation Crisis",
      description:
        "A 16-year-old student has just been dumped by his girlfriend. He sends threatening messages to her and her new boyfriend. At school, he has told friends that 'they will regret it' and 'I have nothing to lose anymore'. His parents have also recently separated.",
      questions: [
        "What crisis triggers exist?",
        "How do you assess the risk?",
        "What is appropriate response?",
      ],
      recommendedActions: [
        "Acute crisis — multiple stressors simultaneously",
        "Contact student health team same day",
        "Talk to student (crisis management conversation)",
        "Contact guardians",
        "Assess suicide risk",
        "Consider Child and Adolescent Psychiatry contact",
        "Protect potential targets (girlfriend, new boyfriend)",
        "Daily follow-up",
      ],
    },
  ],

  weapon: [
    {
      title: "Weapon Access at Home",
      description:
        "A teacher hears students talking about a 15-year-old classmate who has 'shown pictures of his dad's weapons'. The student has previously shown interest in shootings and has been bullied. Upon investigation, it turns out the father is a hunter with several weapons at home.",
      questions: [
        "How to handle suspicion of weapon access?",
        "What are the legal aspects?",
        "What should be said to parents?",
      ],
      recommendedActions: [
        "Contact police — they can check weapon license and storage",
        "Document all information",
        "Talk to guardians about safe storage",
        "Inform about weapon storage laws",
        "Contact student health team",
        "Assess other risk factors (bullying, interest in violence)",
        "Follow-up to ensure safe storage is established",
      ],
    },
  ],
};

const SN_CASES = {
  case1: {
    title: "Case 1: Isolated Student with Online Activity",
    description:
      "Marcus, 16 years old, has over recent months become increasingly isolated. His teacher notices that he no longer socializes with his previous friends. A classmate reports that Marcus has a private TikTok account where he posts videos with violent content and music from extreme metal bands. On the school computer, IT staff have seen that he searched for 'famous school shooters' and 'how Columbine was planned'.",
    observations: [
      "Social isolation — previously had friends, now alone",
      "Online activity with violent content",
      "Searches about school attacks",
      "Fascination with Columbine",
    ],
    questions: [
      {
        question: "What is the MOST concerning warning sign in this case?",
        options: [
          "That he listens to metal music",
          "The combination of isolation and fascination with school attacks",
          "That he has a private TikTok account",
          "That he has lost contact with friends",
        ],
        correctIndex: 1,
        explanation:
          "The most concerning factor is the combination of warning signs: isolation + active interest in school attacks + violent online content. This cluster appears in known cases.",
      },
      {
        question: "What should be the FIRST action?",
        options: [
          "Ignore it — many teenagers have strange interests",
          "Contact parents directly",
          "Document observations and contact the student health team immediately",
          "Confront Marcus yourself",
        ],
        correctIndex: 2,
        explanation:
          "Start with documentation and the student health team. They coordinate structured assessment and next steps.",
      },
      {
        question: "Should police be contacted at this stage?",
        options: [
          "No, there are no concrete threats yet",
          "Yes, immediately",
          "Yes, after initial student health team assessment",
          "Only if parents consent",
        ],
        correctIndex: 2,
        explanation:
          "Police involvement can be appropriate after initial school assessment to ensure a structured response and complete evidence collection.",
      },
    ],
  },

  case2: {
    title: "Case 2: Bullied Student with Weapon Interest",
    description:
      "Sara, 15 years old, has been subjected to systematic bullying for over a year. Staff have tried to intervene but the bullying continues, often via social media. Sara has become increasingly withdrawn. She has recently started wearing military-like clothing and has drawn pictures of weapons in her notebooks. A teacher hears Sara say to another student: 'Soon they will see what it feels like'.",
    observations: [
      "Long-term bullying (over 1 year)",
      "Behavior change: military clothing",
      "Draws weapons",
      "Verbal threat: 'Soon they will see'",
    ],
    questions: [
      {
        question: "How do you assess the risk level in this case?",
        options: [
          "Low — just an expression of frustration",
          "Medium — needs monitoring",
          "High — requires immediate action",
          "Critical — acute threat",
        ],
        correctIndex: 2,
        explanation:
          "This is HIGH risk: long-term bullying + weapon interest + threats + behavior change. It requires immediate coordinated action.",
      },
      {
        question: "What is the biggest contributing factor to the risk?",
        options: [
          "That she wears military clothing",
          "The long-term bullying",
          "That she draws weapons",
          "That she is 15 years old",
        ],
        correctIndex: 1,
        explanation:
          "Long-term bullying is a major recurring factor in school violence cases. Combined with other signs, risk increases substantially.",
      },
      {
        question: "What action is MOST critical right now?",
        options: [
          "Stop the bullying",
          "Convene security team and conduct threat assessment",
          "Give Sara psychological support",
          "Punish the bullies",
        ],
        correctIndex: 1,
        explanation:
          "All matter, but the immediate priority is coordinated threat assessment to manage acute safety and protective measures.",
      },
    ],
  },

  case3: {
    title: "Case 3: Former Student Returns",
    description:
      "Johan, 28 years old, was a student at the school 10 years ago. He has been unemployed in recent years and has mental health problems. Staff notice that he has started appearing outside the school, sometimes sitting in his car looking at the building. One day he comes into the reception and asks if he can 'look around a bit'. He seems unpredictable and says he 'has unfinished business here'.",
    observations: [
      "Former student",
      "Unemployed, mental health problems",
      "Recurring presence outside school",
      "Requests access",
      "Statement about 'unfinished business'",
    ],
    questions: [
      {
        question: "How should staff handle his request to come in?",
        options: [
          "Let him in — he was a student here",
          "Politely but firmly deny according to visitor policy",
          "Call police immediately",
          "Let him in but follow him",
        ],
        correctIndex: 1,
        explanation:
          "Visitor/access routines exist to reduce unauthorized entry. Deny access politely and escalate internally with documentation.",
      },
      {
        question: "What does the statement 'unfinished business here' suggest?",
        options: [
          "He wants to visit old teachers",
          "Possible intent/motive — should be taken seriously",
          "He forgot something 10 years ago",
          "Nothing to worry about",
        ],
        correctIndex: 1,
        explanation:
          "Combined with other indicators, this statement can signal motive/intent and should be documented and escalated.",
      },
      {
        question: "What actions should be taken after the incident?",
        options: [
          "Forget about it — he probably won't come back",
          "Document, inform staff, contact police for assessment, increase vigilance",
          "Just tell the principal",
          "Wait and see if he comes back",
        ],
        correctIndex: 1,
        explanation:
          "The safe response is structured: document, inform relevant staff, request assessment/support, and adjust access vigilance.",
      },
    ],
  },

  // You can paste your real Case 4 later — placeholder keeps UI stable:
  case4: {
    title: "Case 4: Acute Crisis and Threat",
    description:
      "Emil, 17 years old, has just found out that his parents are separating. At school, he has been suspended for starting a fight. His girlfriend has broken up with him. On Instagram, he posted a picture of himself with the text 'today's last day' and 'they will all regret it'. A friend reports that Emil asked if his dad has guns at home.",
    observations: [
      "Multiple acute crises simultaneously (separation, suspension, breakup)",
      "Post that may indicate suicide or violence",
      "Asks about access to weapons",
      "Verbal threat: 'they will regret it'",
    ],
    questions: [
      {
        question: "How acute is this situation?",
        options: [
          "Not acute - just teenage drama",
          "Medium risk - needs follow-up",
          "High risk - act within 24 hours",
          "CRITICAL - requires immediate action NOW",
        ],
        correctIndex: 3,
        explanation:
          "This is a CRITICAL situation. Multiple acute crises + indication of possible suicide/violence + questions about weapons + threat = immediate need for action. Many attacks occur within days after a culminating crisis.",
      },
      {
        question: "What should be done FIRST?",
        options: [
          "Wait until the next day and talk to him",
          "Contact the parents",
          "Locate Emil immediately and ensure he is not alone",
          "Take a screenshot of the Instagram post",
        ],
        correctIndex: 2,
        explanation:
          "FIRST priority is to locate Emil and ensure he is not alone. In parallel: call emergency services (112) if the threat is direct, contact parents, activate crisis preparedness. His safety (and others') is critical.",
      },
      {
        question: "Should the suspension be revoked in this situation?",
        options: [
          "No, punishment is punishment",
          "Yes, immediately - keeping him at school under supervision may be safer",
          "It doesn't matter",
          "Let the parents decide",
        ],
        correctIndex: 1,
        explanation:
          "In this acute situation, it may be safer to keep Emil under the school's supervision rather than leaving him alone at home. Safety takes precedence over disciplinary measures. However, this requires coordination with parents and potentially police/child and adolescent psychiatry.",
      },
    ],
  },
};

/* ---------- ARTIFACTS STEP RENDER ---------- */

function renderArtifactsStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, ["Tools • Interactive artifacts"]),
      el("h3", { class: "readingTitle" }, ["Interactive Artifacts"]),
      el("p", { class: "readingSub" }, [
        "Reusable tools for practice and decision support. Nothing is graded. Use these any time during training — and come back when you need a refresher.",
      ]),
      el("div", { class: "readingDivider", "aria-hidden": "true" }),
      el("p", { class: "readingP" }, [
        "These tools provide guidance and structure. They do not replace professional assessment or local procedures.",
      ]),
    ])
  );

  const toolsShell = el("section", { class: "readingCard snTools" });

  // Tabs
  const tabs = [
    { id: "risk", label: "Risk Assessment" },
    { id: "scenario", label: "Scenario Generator" },
    { id: "reference", label: "Quick Guide" },
    { id: "case", label: "Case Analysis" },
  ];

  const tabRow = el("div", {
    class: "snTabs snSegTabs",
    role: "tablist",
    id: "snArtifactsTabs",
  });

  // Add the moving pill background
  tabRow.appendChild(
    el("span", {
      class: "snSegTabs__pill",
      id: "snSegPill",
      "aria-hidden": "true",
    })
  );

  const panesWrap = el("div", { class: "snPanes" });

  const paneEls = {};

  tabs.forEach((t, idx) => {
    const tabBtn = el(
      "button",
      {
        class: `snTab snSegTabs__btn ${idx === 0 ? "is-active" : ""}`,
        type: "button",
        role: "tab",
        "aria-selected": idx === 0 ? "true" : "false",
        "aria-controls": `snPane_${t.id}`,
        id: `snTab_${t.id}`,
        "data-tab": t.id,
      },
      [t.label]
    );

    tabRow.appendChild(tabBtn);

    const pane = el("div", {
      class: `snPane ${idx === 0 ? "is-active" : ""}`,
      role: "tabpanel",
      id: `snPane_${t.id}`,
      "aria-labelledby": `snTab_${t.id}`,
    });

    paneEls[t.id] = pane;
    panesWrap.appendChild(pane);

    tabBtn.addEventListener("click", () => {
      // deactivate all
      $$(".snTab", toolsShell).forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      $$(".snPane", toolsShell).forEach((p) => p.classList.remove("is-active"));

      // activate
      tabBtn.classList.add("is-active");
      tabBtn.setAttribute("aria-selected", "true");
      pane.classList.add("is-active");
      snMoveSegPill(tabRow, tabBtn);
    });
  });

  toolsShell.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, ["Training Tools"]),
      el("p", { class: "readingP", style: "margin:0;" }, [
        "Choose a tool tab. You can use each tool multiple times during one session.",
      ]),
    ])
  );

  toolsShell.appendChild(tabRow);
  toolsShell.appendChild(panesWrap);

  // Build panes
  buildRiskPane(paneEls.risk);
  buildScenarioPane(paneEls.scenario);
  buildReferencePane(paneEls.reference);
  buildCasePane(paneEls.case);

  hold.appendChild(toolsShell);
  wrap.appendChild(hold);

  // Mark complete on visit (same behavior as your reading step)
  if (!state.completedStepIds.includes("artifacts")) {
    markStepComplete(state, "artifacts");
    renderHeader(state);
    renderStepper(state);
  }
  queueMicrotask(() => {
    const first =
      tabRow.querySelector(".snSegTabs__btn.is-active") ||
      tabRow.querySelector(".snSegTabs__btn");
    if (first) snMoveSegPill(tabRow, first);
  });

  return wrap;
}

/* ---------- TOOL: Risk calculator ---------- */

function buildRiskPane(root) {
  root.innerHTML = "";

  root.appendChild(
    el("h3", { class: "snToolTitle" }, ["Risk Assessment Calculator"])
  );
  root.appendChild(
    el("p", { class: "snToolSub" }, [
      "Use this tool to assess risk based on observed behaviors and factors. This is a guiding tool and does not replace professional assessment.",
    ])
  );

  const form = el("div", { class: "snForm" });

  // Age (now contributes slightly to score)
  const ageSelect = el("select", { class: "snSelect", id: "snAge" }, [
    el("option", { value: "" }, ["Select age"]),
    el("option", { value: "0" }, ["Under 13"]),
    el("option", { value: "1" }, ["13–15"]),
    el("option", { value: "2" }, ["16–18"]),
    el("option", { value: "3" }, ["19+"]),
  ]);

  form.appendChild(
    el("div", { class: "snField" }, [
      el("label", { class: "snLabel", for: "snAge" }, ["Student's age"]),
      ageSelect,
    ])
  );

  // groups
  form.appendChild(
    renderCheckGroup("Behavioral warning signs", [
      {
        id: "behavior1",
        label: "Fixation on violence/previous attacks",
        value: 3,
      },
      { id: "behavior2", label: "Concerning behavioral changes", value: 2 },
      { id: "behavior3", label: "Threats or violent statements", value: 3 },
      { id: "behavior4", label: "Social isolation/withdrawal", value: 2 },
      { id: "behavior5", label: "Drastic changes in appearance", value: 2 },
      {
        id: "behavior6",
        label: "Concerning content on social media",
        value: 3,
      },
    ])
  );

  form.appendChild(
    renderCheckGroup("Psychological factors", [
      { id: "psych1", label: "Depression/anxiety", value: 2 },
      { id: "psych2", label: "Suicidal thoughts", value: 3 },
      {
        id: "psych3",
        label: "Previous contact with Child and Adolescent Psychiatry",
        value: 2,
      },
      { id: "psych4", label: "Emotional instability", value: 2 },
    ])
  );

  form.appendChild(
    renderCheckGroup("Social stressors", [
      { id: "social1", label: "Long-term bullying", value: 3 },
      { id: "social2", label: "Acute crisis (separation, death)", value: 2 },
      { id: "social3", label: "Family conflicts", value: 2 },
      { id: "social4", label: "Romantic conflict/rejection", value: 2 },
    ])
  );

  form.appendChild(
    renderCheckGroup("Access to means", [
      { id: "means1", label: "Known weapon access", value: 4 },
      {
        id: "means2",
        label: "Seeks information about weapons/explosives",
        value: 3,
      },
      { id: "means3", label: "Plans/explores methods", value: 3 },
    ])
  );

  form.appendChild(
    renderCheckGroup("Communication of intent", [
      { id: "comm1", label: "Direct threats against person/school", value: 4 },
      { id: "comm2", label: "Indirect threats/warnings", value: 3 },
      { id: "comm3", label: "Disturbing drawings/writings", value: 3 },
      { id: "comm4", label: "Expresses fascination with attacks", value: 2 },
    ])
  );

  const actions = el("div", { class: "snActions" });
  const calcBtn = el("button", { class: "btn btn--primary", type: "button" }, [
    "Calculate risk",
  ]);
  const resetBtn = el(
    "button",
    { class: "btn btn--secondary", type: "button" },
    ["Reset"]
  );

  actions.appendChild(calcBtn);
  actions.appendChild(resetBtn);

  const result = el("div", { class: "snResult", id: "snRiskResult" });

  calcBtn.addEventListener("click", () => {
    const total = computeRiskScore(form, ageSelect);
    const payload = getRiskInterpretation(total);
    result.innerHTML = "";
    result.appendChild(renderRiskResult(payload, total));
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetBtn.addEventListener("click", () => {
    $$('input[type="checkbox"]', form).forEach((cb) => (cb.checked = false));
    ageSelect.value = "";
    result.innerHTML = "";
  });

  root.appendChild(form);
  root.appendChild(actions);
  root.appendChild(result);
}

function renderCheckGroup(title, items) {
  const group = el("section", { class: "snGroup" });
  group.appendChild(el("h4", { class: "snGroupTitle" }, [title]));

  const grid = el("div", { class: "snCheckGrid" });

  items.forEach((it) => {
    const id = `sn_${it.id}`;
    const row = el("label", { class: "snCheckRow", for: id }, [
      el("input", { type: "checkbox", id, value: String(it.value) }),
      el("span", { class: "snCheckText" }, [it.label]),
      el("span", { class: "snCheckPill", "aria-hidden": "true" }, [
        `+${it.value}`,
      ]),
    ]);
    grid.appendChild(row);
  });

  group.appendChild(grid);
  return group;
}

function computeRiskScore(formRoot, ageSelect) {
  let total = 0;

  // age contributes lightly (0..3)
  const ageVal = ageSelect.value === "" ? 0 : Number(ageSelect.value) || 0;
  total += ageVal;

  $$('input[type="checkbox"]:checked', formRoot).forEach((cb) => {
    total += Number(cb.value) || 0;
  });

  return total;
}

function getRiskInterpretation(score) {
  if (score <= 5) {
    return {
      level: "Low risk",
      tone: "ok",
      bullets: [
        "Continue regular observation",
        "Document observations",
        "Maintain positive contact with the student",
        "Inform student health team if changes increase",
      ],
      note: "This is a guiding tool. When in doubt, contact the student health team and follow local routines.",
    };
  }
  if (score <= 12) {
    return {
      level: "Medium risk",
      tone: "mid",
      bullets: [
        "Contact the student health team promptly",
        "Document observations carefully (quotes + context)",
        "Increase support and structured follow-up",
        "Contact guardians for a discussion",
        "Consider Child and Adolescent Psychiatry involvement when appropriate",
      ],
      note: "Use coordinated follow-up. Escalate if new information emerges (threats, weapon access, concrete plans).",
    };
  }
  if (score <= 20) {
    return {
      level: "High risk",
      tone: "high",
      bullets: [
        "Urgent: convene relevant team (student health/security leadership)",
        "Contact guardians the same day",
        "Report to social services where required",
        "Consider police contact if threats or concrete planning appears",
        "Ensure the student is not left alone",
        "Investigate weapon access information via proper channels",
        "Establish protective measures for potential targets",
        "Daily follow-up until stabilised",
      ],
      note: "High-risk situations require structured coordination and documentation. Use local procedures and professional support.",
    };
  }
  return {
    level: "Critical risk",
    tone: "critical",
    bullets: [
      "If direct threats or weapon access are present: call emergency services",
      "Activate crisis preparedness",
      "Ensure immediate supervision and safety planning",
      "Contact guardians immediately",
      "Police report immediately where required",
      "Report to social services when duty applies",
      "Protect potential targets",
      "Document everything meticulously",
    ],
    note: "If you feel unsure, act. Escalate through the safest channel available and follow school routines.",
  };
}

function renderRiskResult(payload, total) {
  const toneClass =
    payload.tone === "critical"
      ? "snResultBox is-critical"
      : payload.tone === "high"
      ? "snResultBox is-high"
      : payload.tone === "mid"
      ? "snResultBox is-mid"
      : "snResultBox is-ok";

  const box = el("section", { class: toneClass });

  box.appendChild(
    el("div", { class: "snResultTop" }, [
      el("div", { class: "snResultKicker" }, ["Assessment result"]),
      el("h4", { class: "snResultTitle" }, [payload.level]),
      el("p", { class: "snResultMeta" }, [`Total score: ${total}`]),
    ])
  );

  box.appendChild(
    el(
      "ul",
      { class: "snResultList" },
      payload.bullets.map((b) => el("li", {}, [b]))
    )
  );

  box.appendChild(
    el(
      "div",
      { class: "hiBox hiBox--practical", style: "margin-top: var(--s12);" },
      [
        el("div", { class: "hiBox__title" }, [
          "💡 ",
          el("span", {}, ["Important"]),
        ]),
        el("p", { class: "modP", style: "margin:0;" }, [payload.note]),
      ]
    )
  );

  return box;
}

/* ---------- TOOL: Scenario generator ---------- */

function buildScenarioPane(root) {
  root.innerHTML = "";

  root.appendChild(el("h3", { class: "snToolTitle" }, ["Scenario Generator"]));
  root.appendChild(
    el("p", { class: "snToolSub" }, [
      "Generate training scenarios to practice assessment and response. Reveal recommended actions when you’re ready.",
    ])
  );

  const typeSelect = el("select", { class: "snSelect", id: "snScenarioType" }, [
    el("option", { value: "random" }, ["Random"]),
    el("option", { value: "behavioral" }, ["Behavioral warnings"]),
    el("option", { value: "online" }, ["Online activity"]),
    el("option", { value: "crisis" }, ["Acute crisis"]),
    el("option", { value: "weapon" }, ["Weapon access"]),
  ]);

  const controls = el("div", { class: "snActions" }, [
    el("div", { class: "snField", style: "flex:1; min-width: 220px;" }, [
      el("label", { class: "snLabel", for: "snScenarioType" }, [
        "Scenario type",
      ]),
      typeSelect,
    ]),
    el("button", { class: "btn btn--primary", type: "button" }, ["Generate"]),
  ]);

  const output = el("div", { class: "snResult" });

  controls.querySelector("button").addEventListener("click", () => {
    const type = typeSelect.value || "random";
    const scenario = pickScenario(type);
    output.innerHTML = "";
    output.appendChild(renderScenarioCard(scenario));
    output.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  root.appendChild(controls);
  root.appendChild(output);
}

function pickScenario(type) {
  const types = ["behavioral", "online", "crisis", "weapon"];
  if (type === "random") {
    const t = types[Math.floor(Math.random() * types.length)];
    const arr = SN_SCENARIOS[t] || [];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const arr = SN_SCENARIOS[type] || [];
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderScenarioCard(s) {
  if (!s)
    return el("div", { class: "emptyState" }, [
      el("div", { class: "emptyState__title" }, ["No scenario available"]),
      el("p", { class: "emptyState__desc", style: "margin:0;" }, [
        "Add scenarios to SN_SCENARIOS.",
      ]),
    ]);

  const card = el("section", { class: "snScenarioCard" });

  card.appendChild(el("h4", { class: "snScenarioTitle" }, [s.title]));
  card.appendChild(el("p", { class: "snScenarioDesc" }, [s.description]));

  card.appendChild(
    el("h5", { class: "snMiniTitle" }, ["Reflection questions"])
  );
  card.appendChild(
    el(
      "ul",
      { class: "snList" },
      (s.questions || []).map((q) => el("li", {}, [q]))
    )
  );

  const revealBtn = el(
    "button",
    { class: "btn btn--secondary", type: "button" },
    ["Show recommended actions"]
  );
  const solution = el("div", { class: "snSolution", hidden: "true" }, [
    el("div", { class: "snSolutionHead" }, [
      el("span", { class: "chip chip--active" }, ["Recommended actions"]),
      el("span", { class: "miniMuted" }, [
        "Use local routines when escalating",
      ]),
    ]),
    el(
      "ul",
      { class: "snList" },
      (s.recommendedActions || []).map((a) => el("li", {}, [a]))
    ),
  ]);

  revealBtn.addEventListener("click", () => {
    solution.removeAttribute("hidden");
    revealBtn.disabled = true;
    revealBtn.textContent = "Actions shown";
  });

  card.appendChild(
    el("div", { class: "snActions", style: "justify-content:flex-start;" }, [
      revealBtn,
    ])
  );
  card.appendChild(solution);

  return card;
}

/* ---------- TOOL: Quick guide search ---------- */

/* =========================
   Quick Guide - Redesigned Interactive Digital Artifact
   Replaces the text-heavy document with scannable, structured UI
========================= */
function buildReferencePane(root) {
  root.innerHTML = "";

  root.appendChild(el("h3", { class: "snToolTitle" }, ["Quick Guide"]));
  root.appendChild(
    el("p", { class: "snToolSub" }, [
      "Interactive reference for prevention, response, and reporting. Designed for quick scanning during critical situations.",
    ])
  );

  const guideContainer = el("div", { class: "snRefGuide" });

  // Sticky Navigation
  const nav = el("nav", {
    class: "snRefNav",
    "aria-label": "Quick guide sections",
  });
  const sections = [
    { id: "warning-signals", label: "Early Warning" },
    { id: "frameworks", label: "Preventive Models" },
    { id: "response", label: "Response Actions" },
    { id: "documentation", label: "Documentation" },
    { id: "reporting", label: "Reporting Flow" },
    { id: "anti-bullying", label: "Anti-Bullying" },
  ];

  sections.forEach((s) => {
    const btn = el(
      "button",
      {
        class: "snRefNav__btn",
        type: "button",
        "data-scroll-to": s.id,
      },
      [s.label]
    );
    nav.appendChild(btn);
  });

  guideContainer.appendChild(nav);

  // 1. Observable Warning Signals
  const warningSection = el("section", {
    class: "snRefSection",
    id: "warning-signals",
  });

  warningSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(220,38,38,0.1);color:rgba(220,38,38,0.95);">⚠️</span>
        Observable Warning Signals
      </h4>
      <span class="snRefSection__priority priority--high">High Priority</span>
    </div>
    <div class="snRefSection__body">
      <div class="snSignalGrid">
        <div class="snSignalCard">
          <h5 class="snSignalCard__title">👤 Behavior</h5>
          <ul class="snSignalCard__items">
            <li class="snSignalCard__item">Fixation on violence</li>
            <li class="snSignalCard__item">Previous attacks interest</li>
            <li class="snSignalCard__item">Weapons fascination</li>
          </ul>
        </div>
        <div class="snSignalCard">
          <h5 class="snSignalCard__title">👥 Social</h5>
          <ul class="snSignalCard__items">
            <li class="snSignalCard__item">Isolation / withdrawal</li>
            <li class="snSignalCard__item">Drastic social changes</li>
            <li class="snSignalCard__item">Loss of friendships</li>
          </ul>
        </div>
        <div class="snSignalCard">
          <h5 class="snSignalCard__title">💬 Communication</h5>
          <ul class="snSignalCard__items">
            <li class="snSignalCard__item">Direct threats</li>
            <li class="snSignalCard__item">Violent statements</li>
            <li class="snSignalCard__item">Disturbing content</li>
          </ul>
        </div>
        <div class="snSignalCard">
          <h5 class="snSignalCard__title">🎨 Appearance</h5>
          <ul class="snSignalCard__items">
            <li class="snSignalCard__item">Drastic style changes</li>
            <li class="snSignalCard__item">Military/tactical clothing</li>
            <li class="snSignalCard__item">Symbolic accessories</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(warningSection);

  // 2. Preventive Frameworks
  const frameworksSection = el("section", {
    class: "snRefSection",
    id: "frameworks",
  });

  frameworksSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(47,91,255,0.1);color:rgba(47,91,255,0.95);">🛡️</span>
        Preventive Frameworks
      </h4>
      <span class="snRefSection__priority priority--core">Core Strategy</span>
    </div>
    <div class="snRefSection__body">
      <div class="snFrameworkGrid">
        <div class="snModelCard">
          <h5 class="snModelCard__title">SD+1R Security Model</h5>
          <div class="snModelSteps">
            <div class="snModelStep">
              <div class="snModelStep__key">D</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Detect</h6>
                <p class="snModelStep__desc">Identify threats before harm occurs</p>
              </div>
            </div>
            <div class="snModelStep">
              <div class="snModelStep__key">D</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Deter</h6>
                <p class="snModelStep__desc">Reduce school's attractiveness as target</p>
              </div>
            </div>
            <div class="snModelStep">
              <div class="snModelStep__key">D</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Deny</h6>
                <p class="snModelStep__desc">Prevent access to vulnerable areas</p>
              </div>
            </div>
            <div class="snModelStep">
              <div class="snModelStep__key">D</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Delay</h6>
                <p class="snModelStep__desc">Create time for emergency response</p>
              </div>
            </div>
            <div class="snModelStep">
              <div class="snModelStep__key">D</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Defend</h6>
                <p class="snModelStep__desc">Protect lives during incident</p>
              </div>
            </div>
            <div class="snModelStep">
              <div class="snModelStep__key">R</div>
              <div class="snModelStep__content">
                <h6 class="snModelStep__name">Recover</h6>
                <p class="snModelStep__desc">Handle psychological & operational aftermath</p>
              </div>
            </div>
          </div>
        </div>

        <div class="snTriangleCard">
          <h5 class="snTriangleCard__title">Threat Triangle</h5>
          <div class="snTriangleVisual">
            <div class="snTriangle">
              <div class="snTriangle__point snTriangle__point--motive">
                <div class="snTriangle__label">Motive</div>
              </div>
              <div class="snTriangle__point snTriangle__point--means">
                <div class="snTriangle__label">Means</div>
              </div>
              <div class="snTriangle__point snTriangle__point--opportunity">
                <div class="snTriangle__label">Opportunity</div>
              </div>
              <div class="snTriangle__connector snTriangle__connector--1"></div>
              <div class="snTriangle__connector snTriangle__connector--2"></div>
              <div class="snTriangle__connector snTriangle__connector--3"></div>
            </div>
          </div>
          <div class="snTrianglePrinciple">
            <p class="snTrianglePrinciple__text">All three components must converge for an attack to occur</p>
          </div>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(frameworksSection);

  // 3. Acute Response Actions
  const responseSection = el("section", {
    class: "snRefSection",
    id: "response",
  });

  responseSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(245,158,11,0.1);color:rgba(245,158,11,0.95);">🚨</span>
        Acute Response Actions
      </h4>
      <span class="snRefSection__priority priority--urgent">Immediate Action</span>
    </div>
    <div class="snRefSection__body">
      <div class="snResponseGrid">
        <div class="snResponseCard snResponseCard--lockdown">
          <div class="snResponseCard__icon snResponseCard__icon--lockdown">🔒</div>
          <h5 class="snResponseCard__title">Lockdown</h5>
          <ul class="snResponseCard__items">
            <li class="snResponseCard__item">Stay in place</li>
            <li class="snResponseCard__item">Lock all doors</li>
            <li class="snResponseCard__item">Lights off</li>
            <li class="snResponseCard__item">Stay quiet</li>
          </ul>
        </div>
        <div class="snResponseCard snResponseCard--evacuation">
          <div class="snResponseCard__icon snResponseCard__icon--evacuation">🚪</div>
          <h5 class="snResponseCard__title">Evacuation</h5>
          <ul class="snResponseCard__items">
            <li class="snResponseCard__item">Leave via safe routes</li>
            <li class="snResponseCard__item">Assembly point</li>
            <li class="snResponseCard__item">Account for all</li>
            <li class="snResponseCard__item">Follow leaders</li>
          </ul>
        </div>
        <div class="snResponseCard snResponseCard--shelter">
          <div class="snResponseCard__icon snResponseCard__icon--shelter">🛡️</div>
          <h5 class="snResponseCard__title">Shelter-in-Place</h5>
          <ul class="snResponseCard__items">
            <li class="snResponseCard__item">Protect on site</li>
            <li class="snResponseCard__item">External threats</li>
            <li class="snResponseCard__item">Secure perimeter</li>
            <li class="snResponseCard__item">Await instructions</li>
          </ul>
        </div>
        <div class="snResponseCard snResponseCard--call">
          <div class="snResponseCard__icon snResponseCard__icon--call">📞</div>
          <h5 class="snResponseCard__title">Call 112</h5>
          <ul class="snResponseCard__items">
            <li class="snResponseCard__item">Provide clear info</li>
            <li class="snResponseCard__item">Location details</li>
            <li class="snResponseCard__item">Situation status</li>
            <li class="snResponseCard__item">Immediate needs</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(responseSection);

  // 4. Documentation Protocol
  const documentationSection = el("section", {
    class: "snRefSection",
    id: "documentation",
  });

  documentationSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(17,24,39,0.1);color:rgba(17,24,39,0.95);">📋</span>
        Documentation Protocol
      </h4>
    </div>
    <div class="snRefSection__body">
      <div class="snProtocol">
        <div class="snProtocolPrinciple">
          <p class="snProtocolPrinciple__text">All concerns must be documented with these 6 elements:</p>
        </div>
        <div class="snProtocolGrid">
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">When</div>
            <p class="snProtocolItem__value">Date and time of observation</p>
          </div>
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">Who</div>
            <p class="snProtocolItem__value">Observer/reporter identity</p>
          </div>
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">What</div>
            <p class="snProtocolItem__value">Description (direct quotes preferred)</p>
          </div>
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">Where</div>
            <p class="snProtocolItem__value">Context and location</p>
          </div>
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">Actions</div>
            <p class="snProtocolItem__value">Immediate measures taken</p>
          </div>
          <div class="snProtocolItem">
            <div class="snProtocolItem__label">Others</div>
            <p class="snProtocolItem__value">Names of other involved persons</p>
          </div>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(documentationSection);

  // 5. Reporting Structure Flow
  const reportingSection = el("section", {
    class: "snRefSection",
    id: "reporting",
  });

  reportingSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(31,138,96,0.1);color:rgba(31,138,96,0.95);">🔄</span>
        Reporting Structure
      </h4>
    </div>
    <div class="snRefSection__body">
      <div class="snReportingFlow">
        <div class="snReportingStep">
          <div class="snReportingStep__number">1</div>
          <h5 class="snReportingStep__title">Internal</h5>
          <p class="snReportingStep__desc">School leadership, counselor, nurse</p>
        </div>
        <div class="snReportingStep">
          <div class="snReportingStep__number">2</div>
          <h5 class="snReportingStep__title">Social Services</h5>
          <p class="snReportingStep__desc">When risk of violence exists</p>
        </div>
        <div class="snReportingStep">
          <div class="snReportingStep__number">3</div>
          <h5 class="snReportingStep__title">Police</h5>
          <p class="snReportingStep__desc">Weapons, threats, or concrete plans</p>
        </div>
        <div class="snReportingStep">
          <div class="snReportingStep__number">4</div>
          <h5 class="snReportingStep__title">BUP</h5>
          <p class="snReportingStep__desc">Mental illness and support needs</p>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(reportingSection);

  // 6. Anti-Bullying Focus
  const antiBullyingSection = el("section", {
    class: "snRefSection",
    id: "anti-bullying",
  });

  antiBullyingSection.innerHTML = `
    <div class="snRefSection__head">
      <h4 class="snRefSection__title">
        <span class="snRefSection__icon" style="background:rgba(31,138,96,0.1);color:rgba(31,138,96,0.95);">🤝</span>
        Anti-Bullying Priority
      </h4>
    </div>
    <div class="snRefSection__body">
      <div class="snAntiBullying">
        <div class="snAntiBullying__actions">
          <div class="snAntiBullying__action">
            <div class="snAntiBullying__actionCheck">✓</div>
            <p class="snAntiBullying__actionText"><strong>Central factor:</strong> Over 80% of attackers experienced long-term bullying</p>
          </div>
          <div class="snAntiBullying__action">
            <div class="snAntiBullying__actionCheck">✓</div>
            <p class="snAntiBullying__actionText"><strong>Active intervention:</strong> React immediately to repeated incidents</p>
          </div>
          <div class="snAntiBullying__action">
            <div class="snAntiBullying__actionCheck">✓</div>
            <p class="snAntiBullying__actionText"><strong>Student empowerment:</strong> Ensure students know how to report safely</p>
          </div>
        </div>
        <div class="snAntiBullying__stats">
          <p class="snAntiBullying__stat">80%+</p>
          <p class="snAntiBullying__statLabel">of attackers were bullied</p>
          <p style="margin-top:var(--s12);font-size:12px;color:var(--text-500);">Effective anti-bullying programs are non-negotiable for prevention</p>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(antiBullyingSection);

  // Interactive Expandable Section for New Laws
  const lawsExpandable = el("details", { class: "snExpandable" });
  lawsExpandable.innerHTML = `
    <summary class="snExpandable__btn">
      <span>📜 New Legal Requirements 2025 (Click to expand)</span>
      <span class="snExpandable__icon" aria-hidden="true">▼</span>
    </summary>
    <div class="snExpandable__content">
      <div class="snProtocolGrid">
        <div class="snProtocolItem">
          <div class="snProtocolItem__label">Requirement</div>
          <p class="snProtocolItem__value">Emergency preparedness plan</p>
        </div>
        <div class="snProtocolItem">
          <div class="snProtocolItem__label">Requirement</div>
          <p class="snProtocolItem__value">Access control systems</p>
        </div>
        <div class="snProtocolItem">
          <div class="snProtocolItem__label">Duty</div>
          <p class="snProtocolItem__value">Principal must report crimes</p>
        </div>
        <div class="snProtocolItem">
          <div class="snProtocolItem__label">Authority</div>
          <p class="snProtocolItem__value">Search of student belongings</p>
        </div>
        <div class="snProtocolItem">
          <div class="snProtocolItem__label">Protection</div>
          <p class="snProtocolItem__value">"Assault of official" penalties</p>
        </div>
      </div>
    </div>
  `;

  guideContainer.appendChild(lawsExpandable);

  // Quick Access Emergency Button
  const quickAccess = el("div", { class: "snQuickAccess" });
  quickAccess.innerHTML = `
    <button class="snQuickAccess__btn" id="snQuickAccessBtn" aria-label="Emergency quick access">⚡</button>
    <div class="snQuickAccess__menu" id="snQuickAccessMenu">
      <button class="snQuickAccess__menuItem" data-scroll-to="response">
        <span class="snQuickAccess__menuIcon">🚨</span>
        Emergency Actions
      </button>
      <button class="snQuickAccess__menuItem" data-scroll-to="warning-signals">
        <span class="snQuickAccess__menuIcon">⚠️</span>
        Warning Signs
      </button>
      <button class="snQuickAccess__menuItem" onclick="window.print()">
        <span class="snQuickAccess__menuIcon">🖨️</span>
        Print Guide
      </button>
    </div>
  `;

  guideContainer.appendChild(quickAccess);

  root.appendChild(guideContainer);

  // Initialize interactivity after a short delay
  setTimeout(() => {
    // Navigation scroll
    const navButtons = guideContainer.querySelectorAll(".snRefNav__btn");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-scroll-to");
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update active nav
          navButtons.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
        }
      });
    });

    // Quick access menu
    const quickAccessBtn = document.getElementById("snQuickAccessBtn");
    const quickAccessMenu = document.getElementById("snQuickAccessMenu");
    if (quickAccessBtn && quickAccessMenu) {
      quickAccessBtn.addEventListener("click", () => {
        quickAccessMenu.classList.toggle("is-open");
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !quickAccessBtn.contains(e.target) &&
          !quickAccessMenu.contains(e.target)
        ) {
          quickAccessMenu.classList.remove("is-open");
        }
      });

      // Quick access menu items
      const menuItems = quickAccessMenu.querySelectorAll("button");
      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          const targetId = item.getAttribute("data-scroll-to");
          if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
          quickAccessMenu.classList.remove("is-open");
        });
      });
    }

    // Intersection Observer for active nav (if supported)
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              navButtons.forEach((b) => b.classList.remove("is-active"));
              const correspondingBtn = guideContainer.querySelector(
                `.snRefNav__btn[data-scroll-to="${id}"]`
              );
              if (correspondingBtn) {
                correspondingBtn.classList.add("is-active");
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      // Observe all sections
      sections.forEach((s) => {
        const section = document.getElementById(s.id);
        if (section) observer.observe(section);
      });
    }
  }, 100);
}

/* ---------- TOOL: Case analysis ---------- */

/* =========================
   Case Analysis Tool — Redesigned (matches screenshot structure)
========================= */

function buildCasePane(root) {
  root.innerHTML = "";

  root.appendChild(el("h3", { class: "snToolTitle" }, ["Case Analysis Tool"]));
  root.appendChild(
    el("p", { class: "snToolSub" }, [
      "Analyze cases, identify warning signs, and choose appropriate actions. All questions for each case are shown below the scenario.",
    ])
  );

  const tool = el("div", { class: "snCaseTool" });

  // Scenario selection
  const selectSection = el("div", { class: "snCaseSelect" });
  selectSection.appendChild(
    el("h4", { class: "snCaseSelect__label" }, ["Select a scenario"])
  );

  const caseList = el("div", { class: "snCaseSelect__list" });

  const cases = [
    {
      id: "case1",
      title: "Case 1: Isolated Student with Online Activity",
      hint: "Social isolation + online violent content",
    },
    {
      id: "case2",
      title: "Case 2: Bullied Student with Weapon Interest",
      hint: "Long-term bullying + weapon fixation",
    },
    {
      id: "case3",
      title: "Case 3: Former Student Returns",
      hint: "Former student + unpredictable behavior",
    },
    {
      id: "case4",
      title: "Case 4: Acute Crisis and Threat",
      hint: "Placeholder case",
    },
  ];

  let selectedCaseId = null;

  cases.forEach((c) => {
    const btn = el(
      "button",
      {
        class: "snCaseSelect__btn",
        type: "button",
        "data-case-id": c.id,
      },
      [
        el("div", { class: "snCaseSelect__title" }, [c.title]),
        el("p", { class: "snCaseSelect__hint" }, [c.hint]),
      ]
    );

    btn.addEventListener("click", () => {
      // Update selection
      $$(".snCaseSelect__btn", caseList).forEach((b) =>
        b.classList.remove("is-selected")
      );
      btn.classList.add("is-selected");
      selectedCaseId = c.id;

      // Load and display the case
      const caseData = SN_CASES[c.id];
      if (caseData) {
        displayCase(caseData);
      }
    });

    caseList.appendChild(btn);
  });

  selectSection.appendChild(caseList);
  tool.appendChild(selectSection);

  // Case display area
  const caseDisplay = el("div", { class: "snCaseDisplay" });
  tool.appendChild(caseDisplay);

  // Function to display a case (enhanced version with dropdown)
  function displayCase(caseData) {
    caseDisplay.innerHTML = "";

    // Enhanced Case file (scenario description)
    const caseFile = el("section", {
      class: "snCaseFile snCaseFile--enhanced",
    });

    const head = el("div", {
      class: "snCaseFile__head snCaseFile__head--enhanced",
    });

    const meta = el("div", { class: "snCaseFile__meta" });
    meta.appendChild(
      el("span", { class: "snCaseFile__badge" }, ["Case Analysis"])
    );

    head.appendChild(meta);
    head.appendChild(
      el("h4", { class: "snCaseFile__title snCaseFile__title--enhanced" }, [
        caseData.title,
      ])
    );

    const desc = el("div", { class: "snCaseFile__body--enhanced" });
    desc.appendChild(
      el("p", { class: "snCaseFile__desc snCaseFile__desc--enhanced" }, [
        caseData.description,
      ])
    );

    caseFile.appendChild(head);
    caseFile.appendChild(desc);
    caseDisplay.appendChild(caseFile);

    // Observations section (if available)
    if (caseData.observations && caseData.observations.length > 0) {
      const obsSection = el("div", {
        class: "snCaseFile__section snCaseFile__section--enhanced",
      });

      obsSection.appendChild(
        el(
          "h5",
          { class: "snCaseFile__subtitle snCaseFile__subtitle--enhanced" },
          ["Observed Factors"]
        )
      );

      const obsList = el("ul", {
        class: "snCaseFile__list snCaseFile__list--enhanced",
      });
      caseData.observations.forEach((obs) => {
        obsList.appendChild(el("li", {}, [obs]));
      });
      obsSection.appendChild(obsList);
      desc.appendChild(obsSection);
    }

    // Add visual separator
    if (caseData.questions && caseData.questions.length > 0) {
      desc.appendChild(
        el("hr", { class: "snSectionDivider", "aria-hidden": "true" })
      );
    }

    // Questions section
    if (!caseData.questions || caseData.questions.length === 0) {
      const placeholder = el(
        "section",
        { class: "snCaseFile snCaseFile--enhanced" },
        [
          el("div", { class: "snCaseFile__head snCaseFile__head--enhanced" }, [
            el(
              "h4",
              { class: "snCaseFile__title snCaseFile__title--enhanced" },
              ["Case content not added yet"]
            ),
          ]),
          el("div", { class: "snCaseFile__body--enhanced" }, [
            el("p", { class: "snCaseFile__desc snCaseFile__desc--enhanced" }, [
              "This case is a placeholder. Paste your full case questions to activate interactive analysis.",
            ]),
          ]),
        ]
      );
      caseDisplay.appendChild(placeholder);
      return;
    }

    // All questions container (enhanced)
    const questionsContainer = el("div", {
      class: "snQuestions snQuestions--enhanced",
    });

    caseData.questions.forEach((q, index) => {
      questionsContainer.appendChild(renderEnhancedCaseQuestion(q, index + 1));
    });

    caseDisplay.appendChild(questionsContainer);

    // Scroll to case display
    caseDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Function to render enhanced individual question
  function renderEnhancedCaseQuestion(q, questionNumber) {
    const questionEl = el("section", {
      class: "snQuestion snQuestion--enhanced",
    });

    // Question header with counter
    questionEl.appendChild(
      el("div", { class: "snQuestion__head snQuestion__head--enhanced" }, [
        el(
          "div",
          { class: "snQuestion__counter snQuestion__counter--enhanced" },
          [`${questionNumber}`]
        ),
        el("h5", { class: "snQuestion__title snQuestion__title--enhanced" }, [
          q.question,
        ]),
      ])
    );

    // Answer options
    const optionsContainer = el("div", {
      class: "snQuestion__options snQuestion__options--enhanced",
    });

    let selectedOption = null;
    let answered = false;

    q.options.forEach((option, optionIndex) => {
      const optionBtn = el(
        "button",
        {
          class: "snQuestion__option snQuestion__option--enhanced",
          type: "button",
          "data-option-index": optionIndex,
        },
        [option]
      );

      optionBtn.addEventListener("click", () => {
        if (answered) return;

        // Mark all options
        $$(".snQuestion__option", optionsContainer).forEach((btn) => {
          btn.classList.remove("is-selected", "is-correct", "is-wrong");
          btn.disabled = false;
        });

        // Mark selected option
        optionBtn.classList.add("is-selected");
        selectedOption = optionIndex;
        answered = true;

        // Show correct/wrong styling
        $$(".snQuestion__option", optionsContainer).forEach((btn, idx) => {
          if (idx === q.correctIndex) {
            btn.classList.add("is-correct");
          } else if (idx === optionIndex && idx !== q.correctIndex) {
            btn.classList.add("is-wrong");
          }
          btn.disabled = true;
        });

        // Show feedback
        showEnhancedFeedback(q, optionIndex === q.correctIndex, questionEl);
      });

      optionsContainer.appendChild(optionBtn);
    });

    questionEl.appendChild(optionsContainer);

    // Feedback area (hidden initially)
    const feedbackEl = el("div", {
      class: "snQuestion__feedback snQuestion__feedback--enhanced",
      id: `feedback-${questionNumber}`,
    });
    questionEl.appendChild(feedbackEl);

    // Reset button
    const resetBtn = el(
      "button",
      {
        class: "btn btn--secondary btn--small",
        type: "button",
      },
      ["Reset question"]
    );

    resetBtn.addEventListener("click", () => {
      // Reset this question
      $$(".snQuestion__option", optionsContainer).forEach((btn) => {
        btn.classList.remove("is-selected", "is-correct", "is-wrong");
        btn.disabled = false;
      });

      feedbackEl.className =
        "snQuestion__feedback snQuestion__feedback--enhanced";
      feedbackEl.style.display = "none";
      feedbackEl.innerHTML = "";

      answered = false;
      selectedOption = null;
    });

    questionEl.appendChild(
      el("div", { class: "snQuestion__reset snQuestion__reset--enhanced" }, [
        resetBtn,
      ])
    );

    return questionEl;
  }

  // Function to show enhanced feedback
  function showEnhancedFeedback(questionData, isCorrect, questionEl) {
    const feedbackEl = questionEl.querySelector(".snQuestion__feedback");
    if (!feedbackEl) return;

    feedbackEl.className = `snQuestion__feedback snQuestion__feedback--enhanced is-visible ${
      isCorrect ? "is-correct" : "is-wrong"
    }`;

    const feedbackTitle = el(
      "div",
      {
        class: `snQuestion__feedbackTitle snQuestion__feedbackTitle--enhanced ${
          isCorrect ? "is-correct" : "is-wrong"
        }`,
      },
      [isCorrect ? "Correct" : "Not quite"]
    );

    const feedbackText = el(
      "div",
      { class: "snQuestion__feedbackText snQuestion__feedbackText--enhanced" },
      [questionData.explanation || ""]
    );

    feedbackEl.innerHTML = "";
    feedbackEl.appendChild(feedbackTitle);
    feedbackEl.appendChild(feedbackText);
  }

  root.appendChild(tool);

  // Select first case by default
  if (cases.length > 0) {
    const firstBtn = caseList.querySelector(".snCaseSelect__btn");
    if (firstBtn) {
      firstBtn.classList.add("is-selected");
      selectedCaseId = cases[0].id;
      const caseData = SN_CASES[cases[0].id];
      if (caseData) {
        displayCase(caseData);
      }
    }
  }
}

function renderCaseCard(holder, c) {
  const wrap = document.createElement("section");
  wrap.className = "snCaseFile";
  wrap.setAttribute("aria-label", "Selected case");

  const obs = Array.isArray(c.observations) ? c.observations : [];
  const obsList = obs.length
    ? `<ul class="snCaseFacts__list">${obs
        .map((o) => `<li>${o}</li>`)
        .join("")}</ul>`
    : `<p class="snCaseFacts__empty">No observed factors provided.</p>`;

  wrap.innerHTML = `
    <div class="snCaseFile__head">
      <h4 class="snCaseFile__title">${c.title}</h4>
      <div class="snCaseFile__pill">Case file</div>
    </div>

    <div class="snCaseFile__body">
      <div class="snCaseBlock">
        <div class="snCaseBlock__label">Scenario description</div>
        <p class="snCaseBlock__text">${c.description}</p>
      </div>

      <div class="snCaseBlock snCaseFacts">
        <div class="snCaseBlock__label">Observed factors</div>
        ${obsList}
      </div>
    </div>
  `;

  holder.appendChild(wrap);
}

function renderCaseQuestions(holder, c) {
  const questions = Array.isArray(c.questions) ? c.questions : [];
  const total = questions.length;

  if (!total) {
    holder.innerHTML = `<div class="snEmpty">No questions for this case.</div>`;
    return;
  }

  const head = document.createElement("div");
  head.className = "snCaseQHead";
  head.innerHTML = `
    <div>
      <h4 class="snCaseQHead__title">Questions & answers</h4>
      <p class="snCaseQHead__hint">Select an option to get feedback. You can change your selection anytime.</p>
    </div>
    <div class="snCaseQHead__count">${total} questions</div>
  `;
  holder.appendChild(head);

  questions.forEach((q, i) => {
    holder.appendChild(renderCaseQuestionCard(q, i, total));
  });
}

function renderCaseQuestionCard(q, index, total) {
  const card = document.createElement("section");
  card.className = "snCaseQ";
  card.setAttribute("aria-label", `Question ${index + 1} of ${total}`);

  const opts = Array.isArray(q.options) ? q.options : [];
  const correct = typeof q.correct === "number" ? q.correct : -1;

  card.innerHTML = `
    <div class="snCaseQ__top">
      <div class="snCaseQ__label">Question ${index + 1} of ${total}</div>
      <div class="snCaseQ__status" aria-live="polite"></div>
    </div>

    <h5 class="snCaseQ__title">${q.question}</h5>

    <div class="snCaseOpts" role="radiogroup" aria-label="Answer options">
      ${opts
        .map(
          (t, i) => `
        <button type="button" class="snCaseOpt" data-opt="${i}" role="radio" aria-checked="false">
          <span class="snCaseOpt__bullet" aria-hidden="true"></span>
          <span class="snCaseOpt__text">${t}</span>
        </button>`
        )
        .join("")}
    </div>

    <div class="snCaseFeedback" hidden>
      <div class="snCaseFeedback__title"></div>
      <div class="snCaseFeedback__text"></div>
    </div>
  `;

  const statusEl = card.querySelector(".snCaseQ__status");
  const feedbackEl = card.querySelector(".snCaseFeedback");
  const fbTitle = card.querySelector(".snCaseFeedback__title");
  const fbText = card.querySelector(".snCaseFeedback__text");
  const optBtns = Array.from(card.querySelectorAll(".snCaseOpt"));

  function clearStates() {
    optBtns.forEach((b) => {
      b.classList.remove(
        "is-selected",
        "is-correct",
        "is-wrong",
        "is-correctAnswer"
      );
      b.setAttribute("aria-checked", "false");
    });
    feedbackEl.classList.remove("is-good", "is-warn");
  }

  function applyFeedback(isCorrect) {
    const explanation = q.explanation ? `${q.explanation}` : "";
    const correctText = correct >= 0 && opts[correct] ? opts[correct] : "";

    feedbackEl.hidden = false;

    if (isCorrect) {
      feedbackEl.classList.add("is-good");
      fbTitle.textContent = "Correct";
      fbText.textContent = explanation || "Good assessment.";
      statusEl.textContent = "Answered correctly";
      return;
    }

    feedbackEl.classList.add("is-warn");
    fbTitle.textContent = "Not quite";
    // Keep content unchanged — only surface the correct option that already exists in the data.
    fbText.innerHTML = `
      <div class="snCaseFeedback__line"><strong>Correct answer:</strong> ${correctText}</div>
      ${
        explanation
          ? `<div class="snCaseFeedback__line">${explanation}</div>`
          : ""
      }
    `;
    statusEl.textContent = "Answered — see feedback";
  }

  optBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const picked = Number(btn.dataset.opt);

      clearStates();

      // selected
      btn.classList.add("is-selected");
      btn.setAttribute("aria-checked", "true");

      // reveal correct/wrong states
      if (picked === correct) {
        btn.classList.add("is-correct");
        applyFeedback(true);
      } else {
        btn.classList.add("is-wrong");
        const correctBtn = optBtns.find(
          (b) => Number(b.dataset.opt) === correct
        );
        if (correctBtn) correctBtn.classList.add("is-correctAnswer");
        applyFeedback(false);
      }
    });
  });

  return card;
}

/* =========================
   CASE STUDY (Shell only)
   - Uses the SAME reading layout primitives as other steps
   - Content will be implemented later (as requested)
========================= */

function renderCaseStudyStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold snCaseStudy" });

  // ------------------------------------------------------
  // Case Study Database (translated from Swedish → English)
  // Notes:
  // - Tone and level of detail preserved (no summarising).
  // - Filtering + search logic mirrors your reference code.
  // ------------------------------------------------------
  const CASES = [
    {
      id: 1,
      title: "Columbine High School",
      year: 1999,
      location: "Littleton, Colorado, USA",
      region: "usa",
      victims: "13 dead, 20+ injured",
      perpetrators: "Eric Harris and Dylan Klebold (both 18 years old)",
      weapons: "Firearms, homemade bombs",
      motive: "mixed",
      motiveDesc:
        "Complex: psychopathy (Harris), depression/suicide (Klebold), desire for fame, bullying",
      summary:
        "Two students carried out one of history’s most notorious school attacks. The original plan was bombs in the cafeteria; when that failed, a shooting followed. The attack lasted 49 minutes.",
      warnings: [
        "Open violent threats and disturbing texts",
        "Harris had a website with violent fantasies and threats",
        "Both created school projects with graphic violent content",
        "1998: arrested for burglary, contact with the justice system",
        "Several people knew parts of the plan but the information was not shared",
      ],
      lessons: [
        "No single warning sign can predict violence — it requires a combined assessment",
        "Several people knew parts of the plan but the information was not shared systematically",
        "Created a ‘cultural script’ that has inspired perpetrators globally",
        "Led to the development of threat assessment teams and security plans worldwide",
        "The importance of students trusting adults enough to report concerns",
      ],
      tags: [
        "USA",
        "Cultural script",
        "Bombs",
        "Psychopathy",
        "Depression",
        "Turning point",
      ],
      keyFactor:
        "Created the most influential ‘cultural script’ for future school attacks",
    },
    {
      id: 2,
      title: "Virginia Tech",
      year: 2007,
      location: "Blacksburg, Virginia, USA",
      region: "usa",
      victims: "32 dead",
      perpetrators: "Seung-Hui Cho (23 years old, student)",
      weapons: "Firearms",
      motive: "mental",
      motiveDesc: "Mental illness, paranoid delusions, social isolation",
      summary:
        "Still the deadliest school shooting in U.S. history. A student killed 32 people on campus before taking his own life.",
      warnings: [
        "Prior violent threats and concerning behaviour",
        "Disturbing creative writing projects",
        "Two separate stalking incidents",
        "Treated for mental illness, but information was not shared",
      ],
      lessons: [
        "Failures in information sharing between campus mental health, administration, and police",
        "The importance of identifying concerning behaviour among adult students — not only minors",
        "Clarifying how privacy laws interact with threat reporting",
        "Led to new crisis management policies and mass notification systems",
      ],
      tags: [
        "USA",
        "University campus",
        "Information sharing",
        "Mental illness",
        "Adult students",
      ],
      keyFactor:
        "Exposed critical failures in information sharing and campus safety",
    },
    {
      id: 3,
      title: "Sandy Hook Elementary",
      year: 2012,
      location: "Newtown, Connecticut, USA",
      region: "usa",
      victims: "26 dead (20 children, 6 staff)",
      perpetrators: "Adam Lanza (20 years old)",
      weapons: "Firearms (from home)",
      motive: "mental",
      motiveDesc:
        "Severe mental illness, social isolation, obsession with violence",
      summary:
        "A lone perpetrator attacked an elementary school and killed 20 very young children and 6 adults. The world was shocked by the victims’ young age.",
      warnings: [
        "Long-term mental illness and autism",
        "Extremely isolated — lived in the house without contact with his mother",
        "Obsession with mass murder cases",
        "Weapons accessible at home despite known mental illness",
      ],
      lessons: [
        "Elementary schools also need robust security — not only secondary schools",
        "Attackers may choose symbolic ‘soft’ targets",
        "Critical importance of secure firearm storage in homes with severe mental illness",
        "Family responsibility for firearm safety",
        "Reignited debate on firearm laws and mental health screening",
      ],
      tags: [
        "USA",
        "Elementary school",
        "Young children",
        "Family firearms",
        "Mental illness",
      ],
      keyFactor:
        "The victims’ young age created a global shockwave and debate on firearm safety",
    },
    {
      id: 4,
      title: "Christchurch Mosque Attacks",
      year: 2019,
      location: "Christchurch, New Zealand",
      region: "oceania",
      victims: "51 dead, dozens injured",
      perpetrators: "Brenton Tarrant (28 years old, Australian)",
      weapons: "Semi-automatic weapons",
      motive: "ideological",
      motiveDesc:
        "Far-right extremism, racism, anti-immigration, white power ideology",
      summary:
        "Terror attack against two mosques. Livestreamed on Facebook. Although the target was not a school, the attack has directly inspired several school attacks, especially Eslöv 2021.",
      warnings: [
        "Extremist online activity on 8chan/4chan",
        "Published a manifesto encouraging copycat violence",
        "References to Anders Breivik",
        "Used memes and symbolism from far-right forums",
      ],
      lessons: [
        "Online radicalisation is real and can happen quickly",
        "Manifestos and symbolism are designed to inspire copycats",
        "Livestreaming as a terror strategy — increases reach and impact",
        "Lone actors are not radicalised alone — they network online",
        "Extremist ideology can be mixed with personal motives",
        "Directly inspired Swedish school attacks (Eslöv)",
      ],
      tags: [
        "New Zealand",
        "Terrorism",
        "Far-right extremism",
        "Livestream",
        "Cultural script",
        "Copycat inspiration",
      ],
      keyFactor:
        "Created a modern ‘cultural script’ for extremist violence through livestreaming",
    },
    {
      id: 5,
      title: "Utøya/Oslo Attacks",
      year: 2011,
      location: "Oslo and Utøya, Norway",
      region: "europe",
      victims: "77 dead (mostly young people)",
      perpetrators: "Anders Behring Breivik (32 years old)",
      weapons: "Bomb and firearms",
      motive: "ideological",
      motiveDesc:
        "Far-right extremism, anti-Islam, anti-immigration, culturally conservative extremism",
      summary:
        "First a bomb in Oslo, then a massacre at a youth camp. The most extensive lone-actor terror attack in modern times. Inspired later perpetrators including Christchurch.",
      warnings: [
        "Extensive manifesto (1500 pages) published online",
        "Years of planning and preparation",
        "Bought chemicals and weapons legally",
        "Online activity in extremist forums",
      ],
      lessons: [
        "Overlap between lone-actor terrorism and school-attack scripts",
        "Youth settings can become symbolic targets for ideological violence",
        "Long planning periods enable prevention if signs are noticed",
        "Manifestos and ‘ideological’ explanations as legitimisation",
        "A direct inspiration source for Christchurch and others",
      ],
      tags: [
        "Norway",
        "Terrorism",
        "Far-right extremism",
        "Youth camp",
        "Manifesto",
        "Lone actor",
      ],
      keyFactor:
        "Changed how Europe views lone-actor terrorism and far-right extremism",
    },
    {
      id: 6,
      title: "Trollhättan (Kronan School)",
      year: 2015,
      location: "Trollhättan, Sweden",
      region: "sweden",
      victims: "2 dead (1 teacher, 1 student), 1 teacher injured",
      perpetrators: "Anton Lundin Pettersson (21 years old)",
      weapons: "Sword",
      motive: "ideological",
      motiveDesc: "Racism, xenophobia, anti-immigration",
      summary:
        "A 21-year-old attacked a multicultural school with a sword. Wore a mask and cape (‘dark knight’). Deliberately chose a school with many students with foreign backgrounds.",
      warnings: [
        "Online activity in far-right forums",
        "Isolation and no occupation",
        "No direct threats, but clear online radicalisation",
      ],
      lessons: [
        "First major ideologically motivated school attack in Sweden",
        "Symbolic schools can become ideological targets",
        "Performance element: posed for a photo before the attack",
        "The importance of entrance control — entered without being stopped",
        "Led to a national review of school safety and visitor policies",
      ],
      tags: [
        "Sweden",
        "Far-right extremism",
        "Racism",
        "Sword",
        "Symbolic target",
      ],
      keyFactor:
        "Sweden’s first major ideologically motivated school attack — a turning point",
    },
    {
      id: 7,
      title: "Eslöv (Källeberg School)",
      year: 2021,
      location: "Eslöv, Sweden",
      region: "sweden",
      victims: "0 dead, 1 teacher seriously injured",
      perpetrators: "15-year-old student",
      weapons: "Knife",
      motive: "mixed",
      motiveDesc:
        "A mix of bullying, isolation, and extremist inspiration (Columbine/Christchurch)",
      summary:
        "A 15-year-old student attacked a teacher wearing a skull mask and tactical clothing. Livestreamed on Discord. Planned further violence but was stopped by police.",
      warnings: [
        "Long-term bullying and isolation",
        "Fascination with Columbine and Christchurch",
        "Online activity with threats and violent fantasies — NOT REPORTED",
        "Communicated plans with peers online",
        "Posted warnings and videos that were ignored",
      ],
      lessons: [
        "Clear copycat effect from Columbine and Christchurch",
        "Critical failure: online threats were not reported by those who saw them",
        "Livestreaming as imitation of the Christchurch pattern",
        "Shows that attacks do not require firearms to be deadly",
        "The importance of taking students’ fascination with attacks seriously",
        "Need for teachers’ digital competence",
      ],
      tags: [
        "Sweden",
        "Copycat",
        "Online threats",
        "Livestream",
        "Bullying",
        "Discord",
      ],
      keyFactor:
        "The clearest Swedish example of Columbine/Christchurch inspiration",
    },
    {
      id: 8,
      title: "Malmö Latin",
      year: 2022,
      location: "Malmö, Sweden",
      region: "sweden",
      victims: "2 dead (both teachers)",
      perpetrators: "18-year-old student",
      weapons: "Axe and knife",
      motive: "mixed",
      motiveDesc:
        "Social isolation, fascination with school attacks (especially Columbine), personal crisis",
      summary:
        "An 18-year-old student killed two teachers with an axe and knife. Called the police to confess. Very limited online leakage — kept plans mostly to himself.",
      warnings: [
        "Social isolation — no close friends",
        "Known fascination with school shootings, especially Columbine",
        "Very little external communication — ‘quiet planning’",
        "No previous violent behaviour",
      ],
      lessons: [
        "Insider threat is the biggest — current/former students",
        "Not all perpetrators ‘leak’ plans online or to others",
        "Social isolation + fascination with violence = warning sign",
        "Even ‘quiet’ students can pose risk",
        "The importance of noticing students who express admiration for known attacks",
        "The challenge of detecting ‘lone planners’",
      ],
      tags: [
        "Sweden",
        "Insider",
        "Columbine fascination",
        "Social isolation",
        "Teachers as targets",
      ],
      keyFactor:
        "Demonstrated that not all threats are preceded by extensive online leakage",
    },
    {
      id: 9,
      title: "Kristianstad (NTI Upper Secondary)",
      year: 2022,
      location: "Kristianstad, Sweden",
      region: "sweden",
      victims: "2 injured (1 teacher, 1 student)",
      perpetrators: "16-year-old student",
      weapons: "Knife",
      motive: "mixed",
      motiveDesc:
        "Extremist inspiration, contact with the Eslöv perpetrator, personal problems",
      summary:
        "A 16-year-old attacked with a knife while wearing a mask and tactical clothing. Had online contact with the Eslöv perpetrator. Clear copycat elements.",
      warnings: [
        "Direct online contact with the Eslöv perpetrator",
        "Shared fascination with Columbine",
        "Discussed violent fantasies in online groups",
        "Previous mental illness and discipline problems",
        "Similar outfit to Eslöv (mask, clothing)",
      ],
      lessons: [
        "Young perpetrators can network and inspire each other online",
        "Copycat effects can be direct and fast (within a year)",
        "The importance of monitoring extremist online communities",
        "Parents and schools must understand young people’s digital lives",
        "Need for rapid response when copycat patterns are detected",
        "School attacks can ‘cluster’ after an initial event",
      ],
      tags: [
        "Sweden",
        "Copycat",
        "Online networks",
        "Eslöv link",
        "Youth extremism",
      ],
      keyFactor:
        "Showed direct networking between young potential perpetrators",
    },
    {
      id: 10,
      title: "Örebro (Robecka School)",
      year: 2023,
      location: "Örebro, Sweden",
      region: "sweden",
      victims: "Several injured, 0 dead",
      perpetrators: "15-year-old student",
      weapons: "Hunting firearms and smoke grenades",
      motive: "mental",
      motiveDesc: "Mental illness, social isolation, no clear ideology",
      summary:
        "A 15-year-old attacked the school with legally owned hunting firearms (via a family licence) and smoke grenades. Several were injured before he surrendered.",
      warnings: [
        "Severe social isolation",
        "Signs of mental illness",
        "Access to family firearms despite concern",
        "Searches about previous attacks",
        "Smoke grenades and weapons acquired/planned in advance",
      ],
      lessons: [
        "Even in Sweden, access to firearms exists via hunting and sport shooting licences",
        "The importance of secure firearm storage even in licensed homes",
        "Families must be aware of young people’s mental health",
        "Smoke grenades were used to create chaos — shows planning",
        "Non-ideological violence can be just as deadly",
        "Collaboration between home, school, and police is crucial",
      ],
      tags: [
        "Sweden",
        "Family firearms",
        "Mental illness",
        "Smoke grenades",
        "Firearm safety",
      ],
      keyFactor:
        "Highlighted the problem of firearm access via family licences in Sweden",
    },
    {
      id: 11,
      title: "Örebro (Campus Risbergska)",
      year: 2025,
      location: "Örebro, Sweden",
      region: "sweden",
      victims: "10 dead, 6 injured",
      perpetrators: "Rickard Andersson (35 years old, former student)",
      weapons: "Legal firearms (3 long guns), smoke grenades",
      motive: "mental",
      motiveDesc:
        "Mental illness, suicidal thoughts, frustration over reduced benefits, long-term unemployment",
      summary:
        "Sweden’s deadliest school-related attack. A 35-year-old former student (studied 2013–2021) attacked adult education. Changed clothes in a toilet, fired 70 shots, died by suicide before police contact.",
      warnings: [
        "Long-term unemployed since 2016",
        "Mental illness and suicidal thoughts",
        "Recently bought ammunition and equipment",
        "Former student who knew the building",
        "No clear ideological motives despite speculation",
      ],
      lessons: [
        "Former students can pose risk — not only current ones",
        "Even a legal firearm licence can be misused during crisis",
        "Non-ideological violence driven by despair can be just as deadly",
        "The school’s preparedness plan and lockdown saved lives",
        "Rapid police response (6 minutes), but the attack was already ongoing",
        "The importance of monitoring former students who return",
        "Led to proposals for stricter firearm control in Sweden",
      ],
      tags: [
        "Sweden",
        "Former student",
        "Legal firearms",
        "Adult education",
        "Suicide",
        "Largest Swedish attack",
      ],
      keyFactor:
        "Sweden’s deadliest school attack — showed that the threat can come from former students",
    },
    {
      id: 12,
      title: "Kerch Polytechnic College",
      year: 2018,
      location: "Kerch, Crimea",
      region: "europe",
      victims: "20 dead",
      perpetrators: "Vladislav Roslyakov (18 years old, student)",
      weapons: "Firearms and bombs",
      motive: "mixed",
      motiveDesc: "Bullying, social isolation, fascination with Columbine",
      summary:
        "A student attacked his college with weapons and bombs. Dressed like the Columbine perpetrators. Clear copycat attack.",
      warnings: [
        "Long-term bullying",
        "Social exclusion",
        "Direct imitation of Columbine (clothing, methods)",
        "Posted photos before the attack",
      ],
      lessons: [
        "The Columbine script spreads globally, even to the former Soviet sphere",
        "Shows the universality of certain risk factors (bullying, isolation)",
        "Cultural scripts can cross language and culture",
        "Online sharing of attacks creates global sources of inspiration",
      ],
      tags: [
        "Crimea",
        "Copycat",
        "Columbine inspiration",
        "Bullying",
        "College",
      ],
      keyFactor:
        "Demonstrated Columbine’s global reach beyond the Western world",
    },
    {
      id: 13,
      title: "Jokela & Kauhajoki (Finland)",
      year: "2007 & 2008",
      location: "Jokela & Kauhajoki, Finland",
      region: "europe",
      victims: "18 dead (8 + 10)",
      perpetrators: "Pekka-Eric Auvinen (18) and Matti Saari (22)",
      weapons: "Firearms",
      motive: "mixed",
      motiveDesc:
        "Social isolation, depression, fascination with violence and Columbine",
      summary:
        "Two separate school shootings within 11 months. Both perpetrators cited Columbine and posted threat videos online before the attacks.",
      warnings: [
        "Both posted videos with threats on YouTube before the attacks",
        "Manifestos and texts published online",
        "Open fascination with Columbine and violence",
        "Videos were reported, but measures were insufficient",
      ],
      lessons: [
        "Online leakage can provide clear warnings if it is noticed",
        "Led Finland to tighten firearm licences and threat assessment",
        "Improved mental health services for young people",
        "Manifestos and videos as warning signs must be taken seriously",
        "The second attack (Kauhajoki) happened despite increased awareness after Jokela",
      ],
      tags: ["Finland", "Two attacks", "Online videos", "Manifesto", "YouTube"],
      keyFactor:
        "Two attacks within a year — showed the need for a national response",
    },
  ];

  // Pattern analysis (translated)
  const PATTERN = {
    lead: "Analysis of recurring patterns, risk factors, and lessons across all case studies.",
    cards: [
      {
        title: "Bullying as a factor",
        pct: "80%+",
        text: "Of perpetrators had experienced long-term bullying",
      },
      {
        title: "Communicated intent",
        pct: "~100%",
        text: "Showed warning signs or communicated threats before the attack",
      },
      {
        title: "Online activity",
        pct: "70%+",
        text: "Had an online presence with violent or extremist content",
      },
      {
        title: "Mental illness",
        pct: "~50%",
        text: "Had prior contact with psychiatric care",
      },
      {
        title: "Lone perpetrators",
        pct: "95%+",
        text: "Acted alone, even if they may have had online contacts",
      },
      {
        title: "Cultural scripts",
        pct: "60%+",
        text: "Were inspired by or referred to earlier attacks",
      },
    ],
    topWarningsTitle: "Most recurring warning signs",
    topWarnings: [
      {
        strong: "Fascination with earlier attacks",
        text: "Especially Columbine and Christchurch",
      },
      {
        strong: "Social isolation and withdrawal",
        text: "Gradual or sudden",
      },
      {
        strong: "Online activity with violent content",
        text: "Forums, videos, manifestos",
      },
      {
        strong: "Communicated threats or intentions",
        text: "Direct or indirect",
      },
      {
        strong: "Perceived injustice or revenge",
        text: "Bullying, rejection, conflicts",
      },
      {
        strong: "Seeking information about weapons/methods",
        text: "Online searches, questions",
      },
      {
        strong: "Behaviour changes",
        text: "Clothing, attitude, routines",
      },
      {
        strong: "Acute crises",
        text: "Breakups, bereavement, exclusion",
      },
    ],
    preventTitle: "Most effective preventive measures",
    preventList: [
      {
        strong: "Early detection and reporting",
        text: "A ‘see, say, act’ culture",
      },
      {
        strong: "Structured threat assessment",
        text: "Professional teams, not profile-based",
      },
      {
        strong: "Effective anti-bullying programmes",
        text: "Active, not just policy",
      },
      {
        strong: "Digital competence and monitoring",
        text: "Recognise online radicalisation",
      },
      {
        strong: "Access to mental health care",
        text: "Early interventions during crisis",
      },
      {
        strong: "Weapon control and secure storage",
        text: "Collaboration with families",
      },
      {
        strong: "Physical security (5D+1R)",
        text: "Layers of protection",
      },
      {
        strong: "Multi-agency collaboration",
        text: "School, police, social services, youth mental health services",
      },
    ],
    centralInsightTitle: "Central insight from all cases",
    centralInsight:
      "There is no simple ‘profile’ of a perpetrator, but there are clear behavioural patterns that can be observed. Almost all attacks are preceded by visible warning signs that are often shared with others. The key to preventive work is building cultures where these signals are taken seriously and where structured threat assessment leads to early intervention.",
    geoTitle: "Geographic and cultural lessons",
    geoLead: "Swedish vs international cases:",
    geoList: [
      {
        text: "Sweden: fewer firearms, more knife/axe attacks, but the same warning-signal patterns",
      },
      {
        text: "USA: high weapon availability increases lethality, but motives and behaviour resemble other countries",
      },
      {
        text: "Europe: mix of ideologically and personally motivated violence",
      },
      {
        strong: "Universal:",
        text: "Cultural scripts (Columbine, Christchurch) spread globally via the internet",
      },
    ],
  };

  // ---- UI helpers (kept local so it won’t affect other steps)
  function makeSelect(label, id, options) {
    const field = el("div", { class: "snField" });
    const lab = el("label", { class: "miniStrong", for: id }, [label]);
    const sel = el("select", { class: "snInput", id });
    options.forEach(([value, text]) => {
      sel.appendChild(el("option", { value }, [text]));
    });
    field.appendChild(lab);
    field.appendChild(sel);
    return field;
  }

  function statBox(label, id, value) {
    return el("div", { class: "snStat" }, [
      el("div", { class: "snStat__label" }, [label]),
      el("div", { class: "snStat__value", id }, [value]),
    ]);
  }

  function segBtn(text, view, active) {
    return el(
      "button",
      {
        class: `snSegTabs__btn${active ? " is-active" : ""}`,
        type: "button",
        role: "tab",
        "aria-selected": active ? "true" : "false",
        tabindex: active ? 0 : -1,
        "data-view": view,
      },
      [text]
    );
  }

  function motiveLabel(key) {
    switch (key) {
      case "ideological":
        return "Ideological / extremism";
      case "bullying":
        return "Bullying / revenge";
      case "mental":
        return "Mental illness";
      case "mixed":
      default:
        return "Mixed / complex";
    }
  }

  function factBox(label, value, tone) {
    return el("div", { class: `snFact${tone ? ` is-${tone}` : ""}` }, [
      el("div", { class: "snFact__k" }, [label]),
      el("div", { class: "snFact__v" }, [value]),
    ]);
  }

  function buildCaseModal() {
    const wrap = el("div", { class: "snModalWrap" });

    const modal = el("div", {
      class: "snModal",
      hidden: true,
      "aria-hidden": "true",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "snCaseModalTitle",
    });

    const backdrop = el("div", {
      class: "snModal__backdrop",
      "data-sn-close": "true",
    });

    const panel = el("div", { class: "snModal__panel", role: "document" });

    const head = el("div", { class: "snModal__head" }, [
      el("div", { class: "miniMuted", id: "snCaseModalTitle" }, [
        "Case details",
      ]),
      el(
        "button",
        {
          class: "btn btn--tertiary btn--small",
          type: "button",
          id: "snCaseClose",
        },
        ["Close"]
      ),
    ]);

    const body = el("div", { class: "snModal__body", id: "snCaseModalBody" });

    panel.appendChild(head);
    panel.appendChild(body);

    modal.appendChild(backdrop);
    modal.appendChild(panel);

    wrap.appendChild(modal);
    return wrap;
  }
  // ---- Header (consistent with your course reading layout)
  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, ["Practice • Case studies"]),
      el("h3", { class: "readingTitle" }, ["Case Studies Database"]),
      el("p", { class: "readingSub" }, [
        "Use filters and search to explore real cases. Open a case to review warning signs, lessons, and key factors.",
      ]),
    ])
  );

  // ---- Controls card
  const controls = el("section", { class: "readingCard snCaseControls" });

  const top = el("div", { class: "snCaseControls__top" }, [
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, ["Filter and search"]),
      el("p", { class: "readingP snCaseControls__hint" }, [
        "Filters update instantly. Search matches any text inside a case.",
      ]),
    ]),
  ]);

  const filters = el("div", { class: "snCaseFilters" });

  const regionSel = makeSelect("Region", "snRegion", [
    ["all", "All regions"],
    ["sweden", "Sweden"],
    ["usa", "USA"],
    ["europe", "Europe (other)"],
    ["oceania", "Oceania"],
  ]);

  const periodSel = makeSelect("Time period", "snPeriod", [
    ["all", "All years"],
    ["before2000", "Before 2000"],
    ["2000-2010", "2000–2010"],
    ["2010-2020", "2010–2020"],
    ["2020-2025", "2020–2025"],
  ]);

  const motiveSel = makeSelect("Motive type", "snMotive", [
    ["all", "All motives"],
    ["ideological", "Ideological / extremism"],
    ["bullying", "Bullying / revenge"],
    ["mental", "Mental illness"],
    ["mixed", "Mixed / complex"],
  ]);

  const searchField = el("div", { class: "snField" }, [
    el("label", { class: "miniStrong", for: "snSearch" }, ["Search"]),
    el("div", { class: "snSearch" }, [
      el("span", { class: "snSearch__icon", "aria-hidden": "true" }, ["⌕"]),
      el("input", {
        class: "snInput",
        id: "snSearch",
        type: "text",
        placeholder: "Search case studies…",
        autocomplete: "off",
      }),
    ]),
  ]);

  filters.appendChild(regionSel);
  filters.appendChild(periodSel);
  filters.appendChild(motiveSel);
  filters.appendChild(searchField);

  // Stats
  const stats = el("div", { class: "snCaseStats", role: "group" }, [
    statBox("Total", "snTotal", String(CASES.length)),
    statBox("Showing", "snShowing", String(CASES.length)),
    statBox(
      "Sweden",
      "snSweden",
      String(CASES.filter((c) => c.region === "sweden").length)
    ),
    statBox("Estimated fatalities", "snFatal", "—"),
  ]);

  controls.appendChild(top);
  controls.appendChild(filters);
  controls.appendChild(stats);

  // ---- Views (segmented tabs)
  const viewRoot = el("div", { class: "snCaseViews" });

  const tabs = el("div", { class: "snSegTabs", id: "snCaseTabs" }, [
    el("div", { class: "snSegTabs__track" }, [
      el("div", { class: "snSegTabs__pill", id: "snSegPill" }),
      segBtn("Cards", "cards", true),
      segBtn("Pattern analysis", "patterns", false),
    ]),
  ]);

  const cardsWrap = el("div", { class: "snCaseGrid", id: "snCards" });
  const patternsWrap = el("div", {
    class: "snPatterns",
    id: "snPatterns",
    hidden: true,
  });

  viewRoot.appendChild(tabs);
  viewRoot.appendChild(cardsWrap);
  viewRoot.appendChild(patternsWrap);

  // ---- Modal (case detail)
  const modal = buildCaseModal();

  hold.appendChild(controls);
  hold.appendChild(viewRoot);
  hold.appendChild(modal);

  wrap.appendChild(hold);

  // ---- Local state + logic (mirrors your reference)
  const ui = {
    region: regionSel.querySelector("select"),
    period: periodSel.querySelector("select"),
    motive: motiveSel.querySelector("select"),
    search: searchField.querySelector("input"),
    total: stats.querySelector("#snTotal"),
    showing: stats.querySelector("#snShowing"),
    sweden: stats.querySelector("#snSweden"),
    fatal: stats.querySelector("#snFatal"),
    cards: cardsWrap,
    patterns: patternsWrap,
    modal: modal.querySelector(".snModal"),
    modalBody: modal.querySelector("#snCaseModalBody"),
    closeBtn: modal.querySelector("#snCaseClose"),
    tabsRoot: tabs,
    controls: controls,
  };

  let currentView = "cards";
  let filtered = [...CASES];

  function parseYearStart(y) {
    if (typeof y === "number") return y;
    const m = String(y).match(/\d{4}/);
    return m ? parseInt(m[0], 10) : 0;
  }

  function sumDead(casesList) {
    let sum = 0;
    for (const c of casesList) {
      const s = String(c.victims);
      const m = s.match(/(\d+)\s*dead/i);
      if (m) sum += parseInt(m[1], 10);
    }
    return sum;
  }

  function normKey(v) {
    return String(v ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function normRegion(v) {
    const k = normKey(v);
    if (!k || k === "all") return "all";
    if (["sverige", "sweden", "se"].includes(k)) return "sweden";
    if (["usa", "us", "unitedstates", "united states"].includes(k))
      return "usa";
    if (["europa", "europe", "eu"].includes(k)) return "europe";
    if (["oceanian", "oceania", "oceanien"].includes(k)) return "oceania";
    return k;
  }

  function normMotive(v) {
    const k = normKey(v);
    if (!k || k === "all") return "all";
    if (["ideologiskt", "ideological", "extremism"].includes(k))
      return "ideological";
    if (["mobbning", "bullying", "revenge", "hamnd"].includes(k))
      return "bullying";
    if (["psykisk", "mental", "mentalillness", "mental illness"].includes(k))
      return "mental";
    if (["blandat", "mixed", "complex"].includes(k)) return "mixed";
    return k;
  }

  function parseYearStartLoose(yearVal) {
    const s = String(yearVal ?? "");
    const m = s.match(/(\d{4})/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function matchesFilters(c) {
    const region = normRegion(ui.region.value);
    const period = normKey(ui.period.value);
    const motive = normMotive(ui.motive.value);
    const search = normKey(ui.search.value);

    const cRegion = normRegion(c.region);
    const cMotive = normMotive(c.motive);

    let ok = true;

    if (region !== "all" && cRegion !== region) ok = false;

    if (period !== "all") {
      const year = parseYearStartLoose(c.year);
      if (period === "before2000" && year >= 2000) ok = false;
      if (period === "2000-2010" && (year < 2000 || year > 2010)) ok = false;
      if (period === "2010-2020" && (year < 2010 || year > 2020)) ok = false;
      if (period === "2020-2025" && (year < 2020 || year > 2025)) ok = false;
    }

    if (motive !== "all" && cMotive !== motive) ok = false;

    if (search) {
      // search through visible strings, but normalized
      const hay = normKey(JSON.stringify(c));
      if (!hay.includes(search)) ok = false;
    }

    return ok;
  }

  function applyFilters() {
    filtered = CASES.filter(matchesFilters);
    renderCurrent();
    ui.showing.textContent = String(filtered.length);
    ui.fatal.textContent = String(sumDead(filtered));
  }

  function renderEmpty(target, msg) {
    target.innerHTML = "";
    target.appendChild(
      el("div", { class: "snEmpty" }, [
        el("div", { class: "snEmpty__title" }, ["No matches"]),
        el("p", { class: "snEmpty__text" }, [msg]),
      ])
    );
  }

  function renderCards() {
    ui.cards.innerHTML = "";
    if (!filtered.length) {
      renderEmpty(ui.cards, "No case studies match your filters.");
      return;
    }

    filtered.forEach((c) => {
      const card = el("button", {
        class: "snCaseCard",
        type: "button",
      });
      card.addEventListener("click", () => openCase(c));

      const head = el("div", { class: "snCaseCard__head" }, [
        el("div", { class: "snCaseCard__title" }, [c.title]),
        el("div", { class: "snCaseCard__year" }, [String(c.year)]),
      ]);

      const meta = el("div", { class: "snCaseCard__meta" }, [
        el("span", { class: "snCaseCard__pin", "aria-hidden": "true" }, ["📍"]),
        el("span", { class: "snCaseCard__loc" }, [c.location]),
      ]);

      const sum = el("p", { class: "snCaseCard__summary" }, [c.summary]);

      const tags = el(
        "div",
        { class: "snCaseCard__tags" },
        c.tags.map((t) => el("span", { class: "chip chip--muted" }, [t]))
      );

      const victims = el("div", { class: "snCaseCard__strip is-critical" }, [
        el("div", { class: "miniStrong" }, ["Victims"]),
        el("div", { class: "miniMuted" }, [c.victims]),
      ]);

      const key = el("div", { class: "snCaseCard__strip is-soft" }, [
        el("div", { class: "miniStrong" }, ["Key factor"]),
        el("div", { class: "miniMuted" }, [c.keyFactor]),
      ]);

      card.appendChild(head);
      card.appendChild(meta);
      card.appendChild(sum);
      card.appendChild(tags);
      card.appendChild(victims);
      card.appendChild(key);

      ui.cards.appendChild(card);
    });
  }

  function renderPatterns() {
    ui.patterns.innerHTML = "";

    const head = el("div", { class: "snPatterns__head" }, [
      el("h4", { class: "readingH2" }, ["Pattern analysis and common factors"]),
      el("p", { class: "readingP" }, [PATTERN.lead]),
    ]);
    ui.patterns.appendChild(head);

    const grid = el("div", { class: "snPatternGrid" });
    PATTERN.cards.forEach((p) => {
      const card = el("div", { class: "snPatternCard" }, [
        el("div", { class: "snPatternCard__title" }, [p.title]),
        el("div", { class: "snPatternCard__pct" }, [p.pct]),
        el("p", { class: "snPatternCard__text" }, [p.text]),
      ]);
      grid.appendChild(card);
    });
    ui.patterns.appendChild(grid);

    ui.patterns.appendChild(
      el("section", { class: "snDetailCard" }, [
        el("h4", { class: "snDetailCard__title" }, [PATTERN.topWarningsTitle]),
        el(
          "ol",
          { class: "snList" },
          PATTERN.topWarnings.map((w) =>
            el("li", {}, [
              el("strong", {}, [w.strong]),
              w.text ? ` — ${w.text}` : "",
            ])
          )
        ),
      ])
    );

    ui.patterns.appendChild(
      el("section", { class: "snDetailCard" }, [
        el("h4", { class: "snDetailCard__title" }, [PATTERN.preventTitle]),
        el(
          "ul",
          { class: "snList" },
          PATTERN.preventList.map((p) =>
            el("li", {}, [
              el("strong", {}, [p.strong]),
              p.text ? ` — ${p.text}` : "",
            ])
          )
        ),
      ])
    );

    ui.patterns.appendChild(
      el("section", { class: "snInsight" }, [
        el("h4", { class: "snInsight__title" }, [PATTERN.centralInsightTitle]),
        el("p", { class: "readingP" }, [PATTERN.centralInsight]),
      ])
    );

    ui.patterns.appendChild(
      el("section", { class: "snDetailCard" }, [
        el("h4", { class: "snDetailCard__title" }, [PATTERN.geoTitle]),
        el("p", { class: "readingP" }, [PATTERN.geoLead]),
        el(
          "ul",
          { class: "snList" },
          PATTERN.geoList.map((g) =>
            el("li", {}, [
              g.strong ? el("strong", {}, [g.strong]) : "",
              g.text ? `${g.strong ? " " : ""}${g.text}` : "",
            ])
          )
        ),
      ])
    );
  }

  function renderCurrent() {
    if (currentView === "cards") renderCards();
    if (currentView === "patterns") renderPatterns();
  }

  function setView(next) {
    currentView = next;

    // Cards view shows filter/search + case cards.
    // Pattern analysis replaces the section content in-place.
    // KEEP cards always visible
    ui.cards.hidden = false;

    // timeline is removed / optional (avoid crashing if missing)
    if (ui.timeline) ui.timeline.hidden = true;

    // patterns lives below cards; only reveal it when needed
    ui.patterns.hidden = next !== "patterns";

    // update buttons
    const btns = ui.tabsRoot.querySelectorAll(".snSegTabs__btn");
    btns.forEach((b) => {
      const isActive = b.dataset.view === next;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
      b.tabIndex = isActive ? 0 : -1;
    });

    const active = ui.tabsRoot.querySelector(".snSegTabs__btn.is-active");
    if (active) snMoveSegPill(ui.tabsRoot, active);

    renderCurrent();

    // keep the user anchored at the top of the tool
    // after rendering, scroll to Pattern Analysis when requested
    if (next === "patterns") {
      // let the DOM update first so scroll lands correctly
      setTimeout(() => {
        ui.patterns.hidden = false;
        ui.patterns.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }

  function openCase(c) {
    ui.modalBody.innerHTML = "";

    ui.modalBody.appendChild(
      el("h3", { class: "snModal__title" }, [`${c.title} (${c.year})`])
    );
    ui.modalBody.appendChild(
      el("p", { class: "snModal__sub" }, [
        el("span", { "aria-hidden": "true" }, ["📍 "]),
        c.location,
      ])
    );

    ui.modalBody.appendChild(
      el("section", { class: "snDetailCard" }, [
        el("h4", { class: "snDetailCard__title" }, ["Summary"]),
        el("p", { class: "readingP" }, [c.summary]),
      ])
    );

    // Key facts grid
    const facts = el("div", { class: "snFacts" }, [
      factBox("Victims", c.victims, "critical"),
      factBox("Perpetrator", c.perpetrators, "warn"),
      factBox("Weapons", c.weapons, "muted"),
    ]);
    ui.modalBody.appendChild(facts);

    ui.modalBody.appendChild(
      el("section", { class: "snDetailCard" }, [
        el("h4", { class: "snDetailCard__title" }, ["Motive"]),
        el("p", { class: "readingP" }, [
          el("strong", {}, ["Category:"]),
          " ",
          motiveLabel(c.motive),
        ]),
        el("p", { class: "readingP" }, [c.motiveDesc]),
      ])
    );

    ui.modalBody.appendChild(
      el("section", { class: "snDetailCard is-warn" }, [
        el("h4", { class: "snDetailCard__title" }, [
          "Warning signs before the attack",
        ]),
        el(
          "ul",
          { class: "snList" },
          c.warnings.map((w) => el("li", {}, [w]))
        ),
      ])
    );

    ui.modalBody.appendChild(
      el("section", { class: "snDetailCard is-safe" }, [
        el("h4", { class: "snDetailCard__title" }, ["Key lessons"]),
        el(
          "ul",
          { class: "snList" },
          c.lessons.map((l) => el("li", {}, [l]))
        ),
      ])
    );

    ui.modalBody.appendChild(
      el("section", { class: "snInsight" }, [
        el("h4", { class: "snInsight__title" }, ["Key factor"]),
        el("p", { class: "readingP" }, [el("strong", {}, [c.keyFactor])]),
      ])
    );

    ui.modalBody.appendChild(
      el(
        "div",
        { class: "snTags" },
        c.tags.map((t) => el("span", { class: "chip chip--muted" }, [t]))
      )
    );

    ui.modal.hidden = false;
    ui.modal.setAttribute("aria-hidden", "false");
    ui.closeBtn.focus();
  }

  function closeCase() {
    ui.modal.hidden = true;
    ui.modal.setAttribute("aria-hidden", "true");
  }

  function renderCurrentOnOpen() {
    ui.showing.textContent = String(filtered.length);
    ui.fatal.textContent = String(sumDead(filtered));
    setView("cards");
    renderPatterns(); // prebuild once (cheap)
  }

  // events (guarded so Case Study never "disappears" due to a null ref)
  [ui.region, ui.period, ui.motive].forEach((x) => {
    if (x) x.addEventListener("change", applyFilters);
  });
  if (ui.search) ui.search.addEventListener("input", applyFilters);

  // Tabs: Cards / Pattern analysis
  if (ui.tabsRoot) {
    ui.tabsRoot.querySelectorAll(".snSegTabs__btn").forEach((b) => {
      b.addEventListener("click", () => {
        const view = b.dataset.view;

        // Use the real function that already exists in your file
        // (this also scrolls to the top of the tool)
        if (typeof setView === "function") {
          setView(view);
          return;
        }

        // ultra-safe fallback (should never be needed)
        if (view === "patterns" && ui.patterns) {
          ui.patterns.hidden = false;
          ui.patterns.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (hold) {
          hold.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Modal close wiring
  if (ui.closeBtn) ui.closeBtn.addEventListener("click", closeCase);

  if (ui.modal) {
    ui.modal.addEventListener("click", (e) => {
      if (e.target && e.target.matches("[data-sn-close='true']")) closeCase();
    });
  }

  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape" && ui.modal && ui.modal.hidden === false)
        closeCase();
    },
    { passive: true }
  );

  // Safer than queueMicrotask if anything renders slightly later
  setTimeout(() => {
    if (!ui.tabsRoot) return;
    const active = ui.tabsRoot.querySelector(".snSegTabs__btn.is-active");
    if (active) snMoveSegPill(ui.tabsRoot, active);
  }, 0);

  renderCurrentOnOpen();

  return wrap;
}

function snMoveSegPill(root, activeBtn) {
  const track = root.querySelector(".snSegTabs__track") || root;
  const pill =
    track.querySelector("#snSegPill") || root.querySelector("#snSegPill");
  if (!pill || !activeBtn) return;

  const trackBox = track.getBoundingClientRect();
  const btnBox = activeBtn.getBoundingClientRect();

  const segPad =
    parseFloat(getComputedStyle(track).getPropertyValue("--seg-pad")) || 6;

  const x = btnBox.left - trackBox.left - segPad;
  pill.style.setProperty("--seg-x", `${x}px`);
  pill.style.width = `${btnBox.width}px`;
}

window.addEventListener("resize", () => {
  ["snArtifactsTabs", "snCaseTabs"].forEach((id) => {
    const root = document.getElementById(id);
    if (!root) return;
    const cur = root.querySelector(".snSegTabs__btn.is-active");
    if (cur) snMoveSegPill(root, cur);
  });
});

/* =========================
   QUIZ
   (unchanged from your existing file below this point)
========================= */
/* --------------- PLACEHOLDER ---------------
   Your file already contains the full quiz engine,
   handlers (goNext/goBack/handleStepSelect/etc),
   and renderCompleteStep + footer syncing.

   Keep everything below as-is.
-------------------------------------------- */

/* =========================
   (the rest of your existing attacks-course.js content continues here)
   NOTE: I am not removing any of your quiz logic / flow.
========================= */

/* =========================
   The remaining functions are assumed present in your original file:
   - handleStepSelect, goNext, goBack
   - syncFooterButtons
   - renderQuizStep
   - renderCompleteStep
   - etc.
========================= */

/* === SN STEPPER RAIL INJECTION (owned by attacks-course.js) ===
   Purpose:
   - Ensure the course stepper lives ONLY in the course JS (not navRail).
   - Reuses the exact markup + ids/hooks used in the Risks course.
   Notes:
   - Injects the stepper panel markup into <div data-sn-sidebar></div>
     or, if missing, inserts after .navRail inside .layout.
   - Keeps the SAME ids/hooks the course JS uses (#stepper, #courseTitle, etc.)
========================================================= */
(function snInjectStepperRail() {
  "use strict";

  const SIDEBAR_HTML = `
    <aside class="utilityPanel stepperPanel" aria-label="Course progress" data-sn-sidebar-panel>
      <div class="utilityPanel__inner">
        <div class="stepperTop">
          <div class="stepperTop__titles">
            <h2 class="h3" id="courseTitle">Course</h2>
            <div class="trustMeta" title="Progress is saved automatically">
              <span class="trustMeta__icon" aria-hidden="true">✓</span>
              <span id="courseRoleMeta">Teacher training</span>
            </div>
          </div>

          <p class="caption" id="courseMicrocopy">
            Follow the steps. You can return later — your progress is saved.
          </p>
        </div>

        <div class="stepperCard" role="group" aria-labelledby="stepperLabel">
          <div class="sr-only" id="stepperLabel">Course steps</div>

          <ol class="stepper" id="stepper" role="list" aria-describedby="stepperHelp">
            <!-- injected by JS -->
          </ol>

          <p class="caption stepperHelp" id="stepperHelp">
            Tip: You may jump between steps.
          </p>
        </div>

        <!-- Session card -->
        <section class="miniCard sessionCard" aria-label="Session">
          <div class="miniCard__header">
            <div class="miniCard__icon" aria-hidden="true"></div>
            <div>
              <div class="miniCard__title">Session</div>
              <div class="miniMuted" id="sessionHint">Loaded from local storage</div>
            </div>
          </div>

          <div class="miniCard__divider" aria-hidden="true"></div>

          <div class="miniCard__body">
            <div class="miniRow">
              <div class="miniStrong">Step</div>
              <div class="miniMuted" id="sessionStep">—</div>
            </div>

            <div class="miniRow">
              <div class="miniStrong">Completion</div>
              <div class="miniMuted" id="sessionPct">—</div>
            </div>

            <div class="progressBar__track" aria-hidden="true">
              <div class="progressBar__fill" id="sessionBar" style="width:0%"></div>
            </div>

            <div class="levelRow" aria-hidden="true">
              <span class="chip chip--muted">Saved</span>
              <span class="chip chip--active">In progress</span>
            </div>
          </div>

          <div class="miniCard__footer">
            <button class="btn btn--secondary btn--small btn--full" id="resetProgressBtn" type="button">
              Reset progress (demo)
            </button>
          </div>
        </section>
      </div>
    </aside>
  `;

  function alreadyInserted() {
    return !!document.querySelector("[data-sn-sidebar-panel]");
  }

  function mountAtPlaceholder() {
    const mount = document.querySelector("[data-sn-sidebar]");
    if (!mount) return false;
    mount.insertAdjacentHTML("beforebegin", SIDEBAR_HTML);
    mount.remove();
    return true;
  }

  function mountAfterNavRail() {
    const layout = document.querySelector(".layout");
    if (!layout) return false;

    const nav = layout.querySelector(".navRail");
    if (nav) {
      nav.insertAdjacentHTML("afterend", SIDEBAR_HTML);
      return true;
    }

    layout.insertAdjacentHTML("afterbegin", SIDEBAR_HTML);
    return true;
  }

  function wireResetProgressButton() {
    const btn = document.getElementById("resetProgressBtn");
    if (!btn || btn.dataset.wired === "1") return;

    btn.dataset.wired = "1";
    btn.addEventListener("click", () => {
      try {
        localStorage.removeItem(STORAGE.state(courseConfig.courseId));
        localStorage.removeItem(STORAGE.watched(courseConfig.courseId));
      } catch (e) {}

      appState = defaultState();
      saveState(appState);

      renderAll();

      const active =
        document.getElementById("activeStep") ||
        document.getElementById("stepViewport");
      active && smoothScrollToTop(active);

      try {
        toast("Reset", "Course progress was reset on this device.");
      } catch {}
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!alreadyInserted()) {
      if (!mountAtPlaceholder()) {
        mountAfterNavRail();
      }
    }
    wireResetProgressButton();

    // Ensure the stepper renders even if init ran before injection.
    try {
      renderStepper(appState);
    } catch {}
  });

  const obs = new MutationObserver(() => {
    if (document.getElementById("resetProgressBtn")) {
      wireResetProgressButton();
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
})();
/* =========================
   NAV + FOOTER + APP RENDER
   (required for Next/Back and stepper clicks)
========================= */

function syncAriaTabs(state) {
  // Minimal, non-breaking: keep aria-selected updated.
  const btns = $$("[data-step-index]");
  btns.forEach((b) => {
    const idx = Number(b.getAttribute("data-step-index"));
    const isCurrent = idx === state.currentStepIndex;
    b.setAttribute("aria-selected", isCurrent ? "true" : "false");
    if (isCurrent) b.setAttribute("aria-current", "step");
    else b.removeAttribute("aria-current");
  });
}

function syncFooterButtons(state) {
  const backBtn = $("#backBtn");
  const nextBtn = $("#nextBtn");
  const saveBtn = $("#saveStepBtn");

  if (backBtn) backBtn.disabled = state.currentStepIndex === 0;
  if (nextBtn)
    nextBtn.disabled = state.currentStepIndex >= courseConfig.steps.length - 1;

  // Keep save enabled (Risk pattern)
  if (saveBtn) saveBtn.disabled = false;
}

function updateSessionCard(state) {
  const step = courseConfig.steps[state.currentStepIndex];
  const stepEl = $("#sessionStep");
  const pctEl = $("#sessionPct");
  const barEl = $("#sessionBar");

  if (stepEl) stepEl.textContent = step ? step.title : "—";

  const total = courseConfig.steps.length;
  const done = Array.isArray(state.completedStepIds)
    ? state.completedStepIds.length
    : 0;
  const pct = Math.round((done / total) * 100);

  if (pctEl) pctEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
}

function renderAll() {
  renderHeader(appState);
  renderStepper(appState);
  renderStep(appState);
  updateSessionCard(appState);
}

function handleStepSelect(targetIndex) {
  const idx = clampIndex(Number(targetIndex));
  if (idx === appState.currentStepIndex) return;

  appState.currentStepIndex = idx;
  saveState(appState);
  renderAll();

  const active = $("#activeStep") || $("#stepViewport");
  active && smoothScrollToTop(active);
}

function goNext() {
  const next = clampIndex(appState.currentStepIndex + 1);

  appState.currentStepIndex = next;
  saveState(appState);
  renderAll();

  const active = $("#activeStep") || $("#stepViewport");
  active && smoothScrollToTop(active);
}

function goBack() {
  const prev = clampIndex(appState.currentStepIndex - 1);
  appState.currentStepIndex = prev;
  saveState(appState);
  renderAll();

  const active = $("#activeStep") || $("#stepViewport");
  active && smoothScrollToTop(active);
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const backBtn = $("#backBtn");
  const nextBtn = $("#nextBtn");
  const saveBtn = $("#saveStepBtn");

  if (backBtn) backBtn.addEventListener("click", goBack);
  if (saveBtn)
    saveBtn.addEventListener("click", () => {
      toast("Saved", "Progress saved on this device.");
      saveState(appState);
      renderAll();
    });
  if (nextBtn) nextBtn.addEventListener("click", () => goNext());

  renderAll();
});
/* =========================================================
   HOTFIX PATCH — Attacks course
   Fixes hard crashes caused by missing helpers:
   - snWireSegTabs (was called but not defined)
   - renderCompleteStep (if missing in your merged file)
   - openModal / closeModal (video modal used by Videos step)
   - playIcon (optional)
========================================================= */

(function attacksHotfixPatch() {
  "use strict";

  // ---------- 1) Prevent hard crash on Case Study ----------
  // You call snWireSegTabs() but it may not exist in this file.
  // Define a no-op fallback so navigation never breaks.
  if (typeof window.snWireSegTabs !== "function") {
    window.snWireSegTabs = function snWireSegTabs() {
      // intentionally empty — segmented tabs are wired directly in renderArtifactsStep()
      // this exists only to avoid ReferenceError when navigating to Case Study
    };
  }

  // ---------- 2) Ensure a modal exists for Videos ----------
  // If your Risk file had the modal in HTML, keep it.
  // If not, we inject a compatible modal here.
  function ensureVideoModal() {
    if (document.getElementById("snVideoModal")) return;

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "snVideoModal";
    modal.hidden = true;

    modal.innerHTML = `
      <div class="modal__backdrop" data-modal-close="1" aria-hidden="true"></div>
      <section class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="snModalTitle">
        <header class="modal__head">
          <div>
            <div class="miniMuted" id="snModalHint" style="margin-bottom:4px;"></div>
            <h3 class="h3" id="snModalTitle" style="margin:0;">Video</h3>
          </div>
          <button class="btn btn--secondary btn--small" type="button" data-modal-close="1">Close</button>
        </header>

        <div class="modal__body">
          <div class="videoPlayer">
            <div class="videoPlayer__frame">
              <video id="snModalVideo" class="videoEl" controls playsinline style="width:100%; height:100%; display:block;"></video>
            </div>
            <div class="videoPlayer__meta">
              <div class="miniMuted" id="snModalMeta">—</div>
            </div>
          </div>
        </div>

        <footer class="modal__foot">
          <button class="btn btn--primary" type="button" data-modal-done="1">Mark as watched</button>
          <button class="btn btn--secondary" type="button" data-modal-close="1">Close</button>
        </footer>
      </section>
    `;

    document.body.appendChild(modal);

    // close behavior
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-modal-close") === "1") {
        window.closeModal?.();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const m = document.getElementById("snVideoModal");
        if (m && !m.hidden) window.closeModal?.();
      }
    });
  }

  // ---------- 3) Provide openModal/closeModal if missing ----------
  // Your renderVideosStep already checks typeof openModal === "function"
  // but having it restores full behavior (watched state + completion).
  if (typeof window.openModal !== "function") {
    window.openModal = function openModal(payload) {
      try {
        ensureVideoModal();

        const modal = document.getElementById("snVideoModal");
        const title = document.getElementById("snModalTitle");
        const hint = document.getElementById("snModalHint");
        const meta = document.getElementById("snModalMeta");
        const video = document.getElementById("snModalVideo");

        if (!modal || !video) return;

        const vidId = payload?.videoId || "";
        const vidSrc = payload?.videoSrc || "";

        // set text
        if (title) title.textContent = payload?.title || "Video";
        if (hint) hint.textContent = payload?.hint || "";
        if (meta) meta.textContent = vidId ? `Video ID: ${vidId}` : "—";

        // set video src
        video.pause();
        video.removeAttribute("src");
        video.load();
        if (vidSrc) {
          video.src = vidSrc;
          video.load();
          video.play().catch(() => {});
        }

        // wire "done"
        const doneBtn = modal.querySelector('[data-modal-done="1"]');
        if (doneBtn && doneBtn.dataset.bound !== "1") {
          doneBtn.dataset.bound = "1";
          doneBtn.addEventListener("click", () => {
            if (!vidId) {
              window.toast?.("Saved", "Marked watched.");
              window.closeModal?.();
              return;
            }
            try {
              const watched = new Set(window.loadWatchedVideos?.() || []);
              watched.add(vidId);
              window.saveWatchedVideos?.(Array.from(watched));
              window.toast?.("Saved", "Video marked as watched.");
            } catch {}
            window.closeModal?.();

            // If videos step is active, re-render to show watched styles + completion.
            try {
              window.renderAll?.();
            } catch {}
          });
        }

        modal.hidden = false;
        document.body.style.overflow = "hidden";
      } catch (e) {
        window.toast?.("Modal error", String(e?.message || e));
      }
    };
  }

  if (typeof window.closeModal !== "function") {
    window.closeModal = function closeModal() {
      const modal = document.getElementById("snVideoModal");
      const video = document.getElementById("snModalVideo");
      if (video) {
        video.pause();
      }
      if (modal) modal.hidden = true;
      document.body.style.overflow = "";
    };
  }

  // ---------- 4) Optional playIcon helper ----------
  if (typeof window.playIcon !== "function") {
    window.playIcon = function playIcon() {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.textContent = "▶";
      return span;
    };
  }

  // ---------- 5) Ensure renderCompleteStep exists (common merge casualty) ----------
  // If your full file already has it, we do nothing.
  if (typeof window.renderCompleteStep !== "function") {
    window.renderCompleteStep = function renderCompleteStep(state) {
      const wrap = window.el
        ? el("div", { class: "courseContent" })
        : document.createElement("div");
      if (!window.el) {
        wrap.className = "courseContent";
        wrap.textContent =
          "Complete step placeholder (renderCompleteStep was missing).";
        return wrap;
      }

      const hold = el("div", { class: "readingHold" });

      hold.appendChild(
        el("section", { class: "readingHead" }, [
          el("div", { class: "readingKicker" }, ["Complete • Confirmation"]),
          el("h3", { class: "readingTitle" }, ["Training completed"]),
          el("p", { class: "readingSub" }, [
            "Your progress is saved on this device. You can revisit any step anytime.",
          ]),
        ])
      );

      const doneAt = state?.completedAt
        ? formatLocalDateTime(state.completedAt)
        : "—";

      hold.appendChild(
        el("section", { class: "readingCard is-good" }, [
          el("div", { class: "readingCard__top" }, [
            el("h4", { class: "readingH2" }, ["Saved progress"]),
          ]),
          el("p", { class: "readingP" }, [
            `Completed steps: ${(state?.completedStepIds || []).length} / ${
              courseConfig.steps.length
            }`,
          ]),
          el("p", { class: "readingP" }, [`Completion time: ${doneAt}`]),
          el("div", { class: "readingDivider", "aria-hidden": "true" }),
          el(
            "button",
            {
              class: "btn btn--secondary",
              type: "button",
              onclick: () => {
                // mark completion timestamp if not set
                try {
                  if (!state.completedAt) {
                    state.completedAt = nowISO();
                    saveState(state);
                  }
                  toast("Saved", "Completion recorded.");
                  renderAll();
                } catch {}
              },
            },
            ["Save completion"]
          ),
        ])
      );

      // mark step complete when visited
      try {
        if (!state.completedStepIds.includes("complete")) {
          markStepComplete(state, "complete");
          if (!state.completedAt) state.completedAt = nowISO();
          saveState(state);
        }
      } catch {}

      wrap.appendChild(hold);
      return wrap;
    };
  }
})();
