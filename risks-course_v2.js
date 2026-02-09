/* =========================
   course.js — WORKING (Quiz 1 + Quiz 2 + Quiz 3)
   ✅ Keeps your original stepper/header/session/video/reading/modal/etc
   ✅ Quiz step contains 3-quiz sequence (1 → 2 → 3)
   ✅ Quiz 2 is now the multi-select scenario + “Show analysis” version (your exact text)
   ✅ Quiz 3 is matching (concept ↔ definition)
   ✅ Page loads (no missing functions)
========================= */

"use strict";

/* =========================
   COURSE CONFIG (reusable template)
========================= */
const courseConfig = {
  courseId: "teacher-safety-basics-001",
  title: "Risk Management",
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
      id: "quiz",
      label: "Quiz",
      title: "Questionnaire",
      hint: "Reflection & compliance",
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
      id: "v1",
      title: "Security Risks in Schools",
      desc: "",
      duration: "~3 min",
      videoSrc: "assets/videos/Video1.0SecurityRisksinSchools.mp4",
    },
    {
      id: "v2",
      title: "The Crime Age Curve Explained",
      desc: "",
      duration: "~4 min",
      videoSrc: "assets/videos/Video1.1TheCrimeAgeCurveExplained.mp4",
    },
    {
      id: "v3",
      title: "Dehumanization and Hate Crimes",
      desc: "What to document and how School Nexus supports the workflow.",
      duration: "~3 min",
      videoSrc: "assets/videos/Video1.2DehumanizationandHateCrimes.mp4",
    },
  ],
};

/* =========================
   RISK TEXT (Translated in full from risktext.pdf)
========================= */
const riskText = {
  coreMessage:
    "Swedish schools face a complex risk picture where safety threats are interconnected rather than isolated. Despite the school system including nearly two million students across approximately 13,000 institutions, systematic and comprehensive safety planning is still lacking compared with other sectors.",

  concepts: {
    title: "1. Central concepts and frameworks",
    blocks: [
      {
        heading: "The crime–age curve",
        paragraphs: [
          "Criminal behavior peaks in the mid-to-late teenage years (15–19 years), which is due to the brain’s developmental pattern. The socio-emotional system (reward and excitement) matures faster than the prefrontal cortex (impulse control), which creates a vulnerable window.",
          "Swedish context: Nearly half of all men have been convicted of a crime by age 64, with a peak at ages 17–19. This underscores schools’ crucial role as intervention points.",
        ],
      },
      {
        heading: "The interconnections between risks",
        paragraphs: [
          "Most safety threats in the school environment share common causes and often lead to chain reactions:",
        ],
        bullets: [
          "Gang presence → drug use and theft",
          "Digital harassment → physical bullying",
          "Bullying → targeted violence",
        ],
        conclusion:
          "Conclusion: Isolated risk management treats the symptoms, not the underlying causes.",
      },
    ],
  },

  riskCategories: {
    title: "2. Main risk categories",
    items: [
      {
        name: "Gang criminality and violent crime",
        hint: "Recruitment, escalation, and youth involvement",
        body: [
          "Criminal networks actively recruit minors. +30% suspects under 18 in gang-related shootings (2022–2023). Year 2024: 93 children under 15 suspected of murder plots — three times more than the year before.",
        ],
      },
      {
        name: "Dehumanization as a foundation for violence",
        hint: "Bullying as a pathway to targeted violence",
        body: [
          "Seeing others as less human makes moral disengagement possible. 46% of school attacks are motivated by long-term bullying. Pattern: bullying → dehumanization → loss of empathy → targeted attack.",
        ],
      },
      {
        name: "Sexual violence",
        hint: "Detection, reporting, cultural competence",
        body: [
          "~25% of cases involve perpetrators under 18. Globally: 1 in 8 girls and 1 in 11 boys are exposed before age 18. Cultural competence is crucial for detection and reporting.",
        ],
      },
      {
        name: "Self-harm and suicide",
        hint: "Early onset, prevalence, elevated risk",
        body: [
          "Suicide is the 3rd most common cause of death (15–29 years). In Stockholm: 17% have self-harmed by age 18. Age of onset: 15.7 years. Girls have 3× higher risk of hospital care.",
        ],
      },
      {
        name: "Property crime and theft",
        hint: "Power, humiliation, and secondary harm",
        body: [
          "26% of ninth graders report theft. Bullying is often hidden behind these actions — the purpose is power and humiliation. Can lead to depression and increased risk of self-harm.",
        ],
      },
      {
        name: "Digital risks",
        hint: "Fraud, coercion, harassment, cybercrime",
        body: [
          "Nearly 50% of 8–17-year-olds were deceived online (UK). American youths lost $210M in 2023 (+2500% since 2017). Sweden: +950% cybercrime (2006–2015), 30 billion SEK in losses in 2021.",
        ],
      },
      {
        name: "Violence in the home",
        hint: "Legal duties, detection, custody decisions",
        body: [
          "Since 2021 it is punishable to expose children to family violence in all environments, including schools. Schools must detect signs and handle legal custody decisions correctly.",
        ],
      },
      {
        name: "Substance use",
        hint: "Tobacco, snus, vaping, gang impact",
        body: [
          "26% of 15-year-olds have tried cigarettes, ~33% use snus, 30%+ have “vaped.” Gang presence worsens this through direct distribution and recruitment of youths with dependency.",
        ],
      },
    ],
  },

  otherCritical: {
    title: "Other critical risks",
    items: [
      {
        lead: "Arson and vandalism:",
        text: "40% of school fires in Sweden are arson",
      },
      {
        lead: "Aggression:",
        text: "1 in 40 fifteen-year-olds exposed to serious violence; 5 out of 6 reports concern threats against staff",
      },
      {
        lead: "Viral pranks:",
        text: "TikTok’s “Chromebook Challenge” (fires) and “Blackout Challenge” (deaths)",
      },
    ],
  },

  swedishContext: {
    title: "Special Swedish context",
    items: [
      {
        lead: "Legal changes 2025:",
        text: "Expanded powers, requirements for safety plans, strengthened police collaboration",
      },
      {
        lead: "Education Act §6:",
        text: "Zero tolerance for degrading treatment",
      },
      {
        lead: "New criminal classification (July 2025):",
        text: "“Insulting a public official” — fines or up to 6 months in prison",
      },
      {
        lead: "Socioeconomic differences:",
        text: "Schools in vulnerable areas are affected disproportionately hard",
      },
    ],
  },

  philosophy: {
    title: "Preventive philosophy",
    paragraphs: [
      "Effective school safety is built not primarily on technology but on culture and shared responsibility. Safety systems without trust can create fear rather than security.",
      "Real prevention emerges through a culture where everyone — teachers, students, and parents — shares a common awareness, where warning signals are taken seriously, and where safety is a natural part of everyday life without shame or stigma.",
      "The human dimension — relationships, empathy, and vigilance — is and remains the strongest line of defense against all forms of risk in school.",
    ],
  },
};

/* =========================
   STORAGE KEYS
========================= */
const STORAGE = {
  state: (courseId) => `sn.course.${courseId}.state`,
  answers: (courseId) => `sn.course.${courseId}.answers`,
  watched: (courseId) => `sn.course.${courseId}.watchedVideos`,
  // kept for backward compatibility
  quizSeq: (courseId) => `sn_course_${courseId}_questionnaire_quizzes`,
};

const QUIZ_STORAGE = {
  q1_answers: (courseId) => `sn_course_${courseId}_quiz1_answers`,
  q1_savedAt: (courseId) => `sn_course_${courseId}_quiz1_savedAt`,
  q1_locked: (courseId) => `sn_course_${courseId}_quiz1_locked`,

  q2_answers: (courseId) => `sn_course_${courseId}_quiz2_answers`,
  q2_savedAt: (courseId) => `sn_course_${courseId}_quiz2_savedAt`,
  q2_locked: (courseId) => `sn_course_${courseId}_quiz2_locked`,
  q2_analysis: (courseId) => `sn_course_${courseId}_quiz2_analysis`,

  q3_matches: (courseId) => `sn_course_${courseId}_quiz3_matches`,
  q3_savedAt: (courseId) => `sn_course_${courseId}_quiz3_savedAt`,
  q3_locked: (courseId) => `sn_course_${courseId}_quiz3_locked`,
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
   DOM HELPERS
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
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c),
  );
  return node;
}

function smoothScrollToTop(target) {
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   STATE
========================= */
function defaultState() {
  return {
    currentStepIndex: 0,
    completedStepIds: [],
    quizSavedAt: null,
    completedAt: null,

    // ✅ 3-quiz sequence state (1..3)
    quizActiveIndex: 1,
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
    JSON.stringify(state),
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
    JSON.stringify(ids),
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
   TOAST
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
   QUIZ DATA
========================= */
const QUIZ1 = {
  id: "risk_quiz_1",
  bandTitle: "Quiz 1 — Conceptual Understanding: School Safety",
  questions: [
    {
      id: "q1",
      prompt:
        "Why is dehumanization a fundamental mechanism behind several types of violence in schools?",
      options: [
        "It allows perpetrators to act without witnesses",
        "It enables moral disengagement and makes it psychologically easier to harm others",
        "It increases the physical strength of the perpetrator",
        "It prevents victims from reporting incidents",
      ],
      correct:
        "It enables moral disengagement and makes it psychologically easier to harm others",
    },
    {
      id: "q2",
      prompt:
        "Why is adolescence (ages 15–19) the most critical period for criminal behavior?",
      options: [
        "Teenagers have more time to commit crimes",
        "The socio-emotional system matures faster than the impulse-control system",
        "The justice system is more lenient toward teenagers",
        "Teenagers have greater financial needs",
      ],
      correct:
        "The socio-emotional system matures faster than the impulse-control system",
    },
    {
      id: "q3",
      prompt:
        "What is the most important reason why risks in schools should be viewed as interconnected rather than isolated?",
      options: [
        "It is administratively easier",
        "Risk factors often share common causes and trigger chain reactions",
        "It requires fewer security measures",
        "All risks have the same solution",
      ],
      correct:
        "Risk factors often share common causes and trigger chain reactions",
    },
    {
      id: "q4",
      prompt:
        "Why can bullying be considered both a risk in itself and a motive for other risks?",
      options: [
        "Bullying is always violent",
        "Bullying directly harms the victim and can also motivate revenge-based violence or self-harm",
        "Bullying only affects the perpetrator’s behavior",
        "Bullying always disappears with age",
      ],
      correct:
        "Bullying directly harms the victim and can also motivate revenge-based violence or self-harm",
    },
    {
      id: "q5",
      prompt:
        "What is the primary difference between digital and physical security threats in schools?",
      options: [
        "There is no real difference – digital threats are extensions of physical risks",
        "Digital threats are always less serious",
        "Digital threats only affect technology",
        "Physical threats cannot be influenced by digital factors",
      ],
      correct:
        "There is no real difference – digital threats are extensions of physical risks",
    },
    {
      id: "q6",
      prompt:
        "Why is cultural competence crucial in preventing sexual violence in schools?",
      options: [
        "It makes schools more politically correct",
        "Different cultures have varying views on consent and boundaries, which affects detection and reporting",
        "Cultural competence replaces security systems",
        "It reduces the need for teachers",
      ],
      correct:
        "Different cultures have varying views on consent and boundaries, which affects detection and reporting",
    },
    {
      id: "q7",
      prompt:
        "What role does empathy play in preventing targeted school violence?",
      options: [
        "Empathy has no connection to violence",
        "Empathy acts as a counterforce to dehumanization and makes it harder to harm others",
        "Empathy replaces all security measures",
        "Empathy is only relevant for teachers",
      ],
      correct:
        "Empathy acts as a counterforce to dehumanization and makes it harder to harm others",
    },
    {
      id: "q8",
      prompt:
        "What is meant by saying that school safety is built on culture rather than solely on technology?",
      options: [
        "Technology is unnecessary in schools",
        "Culture can replace all security systems",
        "True safety arises through shared awareness, trust, and responsibility—not only through equipment",
        "Culture and technology are completely separate",
      ],
      correct:
        "True safety arises through shared awareness, trust, and responsibility—not only through equipment",
    },
  ],
};

/**
 * QUIZ 2 — Multi-select scenarios + “Show analysis”
 * - Uses EXACT text you provided
 * - Intended answers: ALL options are linked risks (so any selected option = correct)
 */
const QUIZ2 = {
  id: "risk_quiz_2",
  bandTitle: "Quiz 2 — Conceptual Understanding: Risk Assessment",
  type: "multi_scenarios",
  scenarios: [
    {
      id: "s1",
      title: "Scenario 1: Online Conflict Escalation",
      description:
        "A conflict starts in a class group chat. A student is bullied through derogatory comments and memes. After school, some students begin spreading rumors about the student on social media. The student stops coming to school, and the teacher notices that the student has become withdrawn. At the same time, there are reports that older youths are hanging around the school and trying to recruit younger students.",
      question: "What risks may be linked to this situation?",
      options: [
        "Digital risks (harassment, threats, coercion)",
        "Bullying / degrading treatment (risk of escalation to violence)",
        "Risk of self-harm or mental illness for the exposed student",
        "Gang criminality (recruitment and increased risk of violence)",
        "Potential physical bullying or violence at school",
        "Risk of normalizing violence through dehumanization and loss of empathy",
      ],
      explanationBullets: [
        "Digital risks: harassment/rumors/memes are online harm channels.",
        "Bullying/degrading treatment: social exclusion can escalate.",
        "Self-harm/mental illness risk: withdrawal + absence can signal serious distress.",
        "Gang criminality: recruitment near school increases risk and vulnerability.",
        "Physical bullying/violence: online conflicts often spill into real-life confrontations.",
        "Dehumanization/empathy loss: repeated ridicule can reduce empathy and normalize harm.",
      ],
    },
    {
      id: "s2",
      title: "Scenario 2: Unsafe Behavior and Fire Risk",
      description:
        "Several students start lighting small fires in the bathrooms as “a joke.” A trend on TikTok encourages students to destroy school property and film it. One day, a fire gets out of control and part of a corridor fills with smoke. Some students start panicking, and staff find it difficult to create calm.",
      question: "What risks may be linked to this scenario?",
      options: [
        "Arson / vandalism and danger to life",
        "Viral pranks / social media challenges as a trigger",
        "Panic and reduced trust in the school’s safety work",
        "Need for both physical security and cultural work to prevent recurrence",
        "Risk of aggression and threats against staff in connection with interventions",
      ],
      explanationBullets: [
        "Arson/vandalism: direct hazard + property damage + injury risk.",
        "Viral pranks: online trends can drive real-world harmful behavior.",
        "Panic/trust: smoke + fear reduces confidence in safety and increases chaos.",
        "Culture + physical security: you need both prevention culture and practical controls.",
        "Aggression/threats: interventions can trigger confrontations toward staff.",
      ],
    },
    {
      id: "s3",
      title: "Scenario 3: Sexual Violence and Cultural Barriers",
      description:
        "A student reports that she has been touched inappropriately by another student. The girl is hesitant to talk to school staff and says that in her family it is shameful to talk about such topics. Other students claim that it was “just a joke” and that the girl is exaggerating. The school is unsure how to handle the report and how to ensure the student’s safety.",
      question: "What risks are relevant in this situation?",
      options: [
        "Risk of sexual violence and repeated boundary violations",
        "Need for cultural competence to ensure reporting and safety",
        "Risk that the victim is blamed and becomes socially excluded",
        "Risk that the school mishandles the legal duty to act and report",
        "Risk of normalization and dehumanization if the incident is downplayed",
        "Risk of mental illness and self-harm as a consequence of trauma",
      ],
      explanationBullets: [
        "Sexual violence risk: core incident + risk of repetition.",
        "Cultural competence: barriers can block disclosure and support.",
        "Victim-blaming/exclusion: “it’s a joke” can isolate the victim.",
        "Legal duty risk: school must act correctly and follow procedures.",
        "Normalization/dehumanization: minimizing harms increases future risk.",
        "Mental health/self-harm: trauma can lead to serious psychological outcomes.",
      ],
    },
  ],
};

const QUIZ3 = {
  id: "risk_quiz_3",
  bandTitle: "Quiz 3 — Match Concepts to Definitions",
  pairsTotal: 6,
  concepts: [
    "Dehumanization",
    "Crime–Age Curve",
    "Interconnection of Risks",
    "Cultural Competence",
    "Safety Culture",
    "Moral Disengagement",
  ],
  definitions: [
    "Shared awareness and responsibility where safety is a natural part of everyday life",
    "A pattern showing that criminal behavior peaks during adolescence",
    "A psychological process that allows people to act against their moral values",
    "A process where people are viewed as less than human, making violence easier",
    "The phenomenon where school risks share causes and trigger chain reactions",
    "Understanding how different cultures influence views on consent and boundaries",
  ],
  correctMap: {
    Dehumanization:
      "A process where people are viewed as less than human, making violence easier",
    "Crime–Age Curve":
      "A pattern showing that criminal behavior peaks during adolescence",
    "Interconnection of Risks":
      "The phenomenon where school risks share causes and trigger chain reactions",
    "Cultural Competence":
      "Understanding how different cultures influence views on consent and boundaries",
    "Safety Culture":
      "Shared awareness and responsibility where safety is a natural part of everyday life",
    "Moral Disengagement":
      "A psychological process that allows people to act against their moral values",
  },
};

/* =========================
   QUIZ STORAGE HELPERS
========================= */
function loadQuiz1Answers() {
  const raw = localStorage.getItem(
    QUIZ_STORAGE.q1_answers(courseConfig.courseId),
  );
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function saveQuiz1Answers(obj) {
  localStorage.setItem(
    QUIZ_STORAGE.q1_answers(courseConfig.courseId),
    JSON.stringify(obj || {}),
  );
}
function loadQuiz1SavedAt() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q1_savedAt(courseConfig.courseId)) || null
  );
}
function setQuiz1SavedAt(isoOrNull) {
  if (!isoOrNull)
    localStorage.removeItem(QUIZ_STORAGE.q1_savedAt(courseConfig.courseId));
  else
    localStorage.setItem(
      QUIZ_STORAGE.q1_savedAt(courseConfig.courseId),
      isoOrNull,
    );
}
function isQuiz1Locked() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q1_locked(courseConfig.courseId)) === "1"
  );
}
function setQuiz1Locked(val) {
  localStorage.setItem(
    QUIZ_STORAGE.q1_locked(courseConfig.courseId),
    val ? "1" : "0",
  );
}

/**
 * Quiz 2 answers shape:
 * {
 *   s1: [0,2,4],
 *   s2: [1],
 *   s3: [0,1,2]
 * }
 */
function loadQuiz2Answers() {
  const raw = localStorage.getItem(
    QUIZ_STORAGE.q2_answers(courseConfig.courseId),
  );
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function saveQuiz2Answers(obj) {
  localStorage.setItem(
    QUIZ_STORAGE.q2_answers(courseConfig.courseId),
    JSON.stringify(obj || {}),
  );
}
function loadQuiz2SavedAt() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q2_savedAt(courseConfig.courseId)) || null
  );
}
function setQuiz2SavedAt(isoOrNull) {
  if (!isoOrNull)
    localStorage.removeItem(QUIZ_STORAGE.q2_savedAt(courseConfig.courseId));
  else
    localStorage.setItem(
      QUIZ_STORAGE.q2_savedAt(courseConfig.courseId),
      isoOrNull,
    );
}
function isQuiz2Locked() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q2_locked(courseConfig.courseId)) === "1"
  );
}
function setQuiz2Locked(val) {
  localStorage.setItem(
    QUIZ_STORAGE.q2_locked(courseConfig.courseId),
    val ? "1" : "0",
  );
}

/**
 * Quiz 2 analysis (per scenario reveal state)
 * {
 *   s1: true,
 *   s2: false,
 *   s3: true
 * }
 */
function loadQuiz2AnalysisState() {
  const raw = localStorage.getItem(
    QUIZ_STORAGE.q2_analysis(courseConfig.courseId),
  );
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function saveQuiz2AnalysisState(obj) {
  localStorage.setItem(
    QUIZ_STORAGE.q2_analysis(courseConfig.courseId),
    JSON.stringify(obj || {}),
  );
}
function setQuiz2ScenarioAnalysis(scenarioId, value) {
  const st = loadQuiz2AnalysisState();
  st[scenarioId] = Boolean(value);
  saveQuiz2AnalysisState(st);
}
function clearQuiz2Analysis() {
  localStorage.removeItem(QUIZ_STORAGE.q2_analysis(courseConfig.courseId));
}

function loadQuiz3Matches() {
  const raw = localStorage.getItem(
    QUIZ_STORAGE.q3_matches(courseConfig.courseId),
  );
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function isQuiz3AllCorrect() {
  const matches = loadQuiz3Matches();
  const byConcept = new Map();
  for (const p of matches) {
    if (!p || typeof p.concept !== "string") continue;
    byConcept.set(p.concept, p.definition);
  }
  return QUIZ3.concepts.every((c) => byConcept.get(c) === QUIZ3.correctMap[c]);
}

function saveQuiz3Matches(arr) {
  localStorage.setItem(
    QUIZ_STORAGE.q3_matches(courseConfig.courseId),
    JSON.stringify(Array.isArray(arr) ? arr : []),
  );
}
function loadQuiz3SavedAt() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q3_savedAt(courseConfig.courseId)) || null
  );
}
function setQuiz3SavedAt(isoOrNull) {
  if (!isoOrNull)
    localStorage.removeItem(QUIZ_STORAGE.q3_savedAt(courseConfig.courseId));
  else
    localStorage.setItem(
      QUIZ_STORAGE.q3_savedAt(courseConfig.courseId),
      isoOrNull,
    );
}
function isQuiz3Locked() {
  return (
    localStorage.getItem(QUIZ_STORAGE.q3_locked(courseConfig.courseId)) === "1"
  );
}
function setQuiz3Locked(val) {
  localStorage.setItem(
    QUIZ_STORAGE.q3_locked(courseConfig.courseId),
    val ? "1" : "0",
  );
}

/* =========================
   QUIZ SEQUENCE + GATING
========================= */
function getActiveQuizIndex() {
  // ✅ Use appState.quizActiveIndex if present and valid
  const v = Number(appState && appState.quizActiveIndex);
  if ([1, 2, 3].includes(v)) return v;

  // Fallback for old state: derive from locks
  if (!isQuiz1Locked()) return 1;
  if (!isQuiz2Locked()) return 2;
  return 3;
}

function setActiveQuizIndex(n) {
  const next = Math.max(1, Math.min(3, Number(n) || 1));
  appState.quizActiveIndex = next;
  saveState(appState);
  refreshQuizSavedBadgeState();
}

function areAllQuizzesLocked() {
  return isQuiz1Locked() && isQuiz2Locked() && isQuiz3Locked();
}

function getActiveQuizSavedAt() {
  const active = getActiveQuizIndex();
  return active === 1
    ? loadQuiz1SavedAt()
    : active === 2
      ? loadQuiz2SavedAt()
      : loadQuiz3SavedAt();
}

function refreshQuizSavedBadgeState() {
  // state.quizSavedAt drives “Quiz not saved” badge. Keep logic.
  const savedAt = getActiveQuizSavedAt();
  appState.quizSavedAt = savedAt || null;
  saveState(appState);
}

function areAllQuizzesLocked() {
  return isQuiz1Locked() && isQuiz2Locked() && isQuiz3Locked();
}

function getActiveQuizSavedAt() {
  const active = getActiveQuizIndex();
  return active === 1
    ? loadQuiz1SavedAt()
    : active === 2
      ? loadQuiz2SavedAt()
      : loadQuiz3SavedAt();
}

function refreshQuizSavedBadgeState() {
  const savedAt = getActiveQuizSavedAt();
  appState.quizSavedAt = savedAt || null;
  saveState(appState);
}

function needsQuizConfirmation(state, targetIndex) {
  const quizIndex = stepIndexById("quiz");
  const skippingForwardPastQuiz = targetIndex > quizIndex;
  if (!skippingForwardPastQuiz) return false;
  return !areAllQuizzesLocked();
}

/* =========================
   RENDER: Stepper rail (your polished version)
========================= */
function renderStepper(state) {
  const stepper = $("#stepper");
  if (!stepper) return;

  stepper.innerHTML = "";

  const quizSaved = Boolean(state.quizSavedAt);

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
    else btn.removeAttribute("aria-current");

    const rail = el("span", { class: "stepper__rail", "aria-hidden": "true" });
    const dot = el("span", { class: "stepper__dot", "aria-hidden": "true" });

    if (!isCurrent && isStepCompleted) {
      dot.appendChild(
        el("span", { class: "stepper__check", "aria-hidden": "true" }),
      );
    } else {
      dot.textContent = String(idx + 1);
    }

    rail.appendChild(dot);

    const content = el("span", { class: "stepper__content" });
    const head = el("span", { class: "stepper__head" });
    head.appendChild(el("span", { class: "stepper__name" }, [step.title]));

    const chips = el("span", { class: "stepper__chips" });

    // ✅ Quiz chip logic: never show "Completed" + "Quiz not saved" together
    if (step.id === "quiz") {
      if (!isCurrent) {
        if (isStepCompleted) {
          chips.appendChild(
            el("span", { class: "stepper__chip stepper__chip--done" }, [
              "Completed",
            ]),
          );
        } else if (!quizSaved) {
          chips.appendChild(
            el("span", { class: "stepper__chip stepper__chip--warn" }, [
              "Quiz not saved",
            ]),
          );
        }
      }
    } else {
      // non-quiz steps: normal completed chip
      if (!isCurrent && isStepCompleted) {
        chips.appendChild(
          el("span", { class: "stepper__chip stepper__chip--done" }, [
            "Completed",
          ]),
        );
      }
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
   RENDER: Top horizontal stepper (calm + structured)
   - Circles only (numbers, check on completed)
   - Green fill line moves as you progress
   - Current step pulses
========================= */
function renderTopStepper(state) {
  const list = document.getElementById("topStepper");
  const fill = document.getElementById("topStepperFill");
  if (!list) return;

  const total = courseConfig.steps.length;
  const current = state.currentStepIndex;

  // Fill width is progress between dots (0% at first, 100% at last)
  if (fill) {
    const pct = total <= 1 ? 0 : Math.round((current / (total - 1)) * 100);
    fill.style.width = pct + "%";
  }

  list.innerHTML = "";

  courseConfig.steps.forEach((step, idx) => {
    const isCurrent = idx === current;
    const isStepCompleted = isCompleted(state, step.id);

    const status = isCurrent ? "current" : isStepCompleted ? "complete" : "upcoming";

    const li = el("li", { class: `topStep is-${status}` });

    const btn = el("button", {
      class: "topStep__btn",
      type: "button",
      "data-step-index": String(idx),
      title: step.title,
      "aria-label": `${step.title}. Step ${idx + 1} of ${total}`,
    });

    if (isCurrent) btn.setAttribute("aria-current", "step");

    const circle = el("span", { class: "topStep__circle", "aria-hidden": "true" });

    // Completed steps show a checkmark (keeps it clean, still readable)
    if (!isCurrent && isStepCompleted) {
      circle.textContent = "✓";
    } else {
      circle.textContent = String(idx + 1);
    }

    btn.appendChild(circle);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

/* =========================
   WIRE: Top stepper click (single listener)
========================= */
function wireTopStepper() {
  const list = document.getElementById("topStepper");
  if (!list || list.dataset.wired === "1") return;

  list.dataset.wired = "1";
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-step-index]");
    if (!btn) return;

    const idx = Number(btn.getAttribute("data-step-index"));
    if (!Number.isFinite(idx)) return;

    handleStepSelect(idx);
  });
}


/* =========================
   RENDER: Header + session card
========================= */
function renderHeader(state) {
  $("#courseTitle") && ($("#courseTitle").textContent = courseConfig.title);
  $("#courseRoleMeta") &&
    ($("#courseRoleMeta").textContent = `${capitalize(
      courseConfig.role,
    )} training`);

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
            : step.id === "quiz"
              ? "~7 min"
              : "Done";
  }

  const saveBadge = $("#saveBadge");
  if (saveBadge) {
    if (state.quizSavedAt) {
      saveBadge.removeAttribute("hidden");
      saveBadge.textContent = "Saved";
    } else {
      saveBadge.setAttribute("hidden", "true");
    }
  }

  const sessionStep = $("#sessionStep");
  if (sessionStep)
    sessionStep.textContent = `${state.currentStepIndex + 1} / ${
      courseConfig.steps.length
    }`;

  const sessionPct = $("#sessionPct");
  if (sessionPct)
    sessionPct.textContent = `${courseConfig.progressRules.contributesPercent}% annual`;

  const bar = $("#sessionBar");
  if (bar) {
    const progress = Math.round(
      (state.completedStepIds.length / courseConfig.steps.length) * 100,
    );
    bar.style.width = `${progress}%`;
  }
}

function getStepMicrocopy(stepId) {
  switch (stepId) {
    case "intro":
      return "This module introduces how risks connect in the school environment. Use the reading step to scan categories, then reflect in the questionnaire.";
    case "videos":
      return "Short modules designed for busy schedules. You can pause and return later.";
    case "factsheet":
      return "Full reading material translated to English. Structured for scanning and comfortable reading.";
    case "quiz":
      return "Complete Quiz 1 → Quiz 2 → Quiz 3 in sequence. Save when prompted. Finish each quiz to lock and reveal results.";
    case "complete":
      return "Training saved. You can review the reading or your questionnaire answers.";
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
  if (step.id === "factsheet") body.appendChild(renderRiskReadingStep(state));
  if (step.id === "quiz") body.appendChild(renderQuizStep(state));
  if (step.id === "complete") body.appendChild(renderCompleteStep(state));

  pane.appendChild(body);
  viewport.appendChild(pane);

  syncFooterButtons(state);
}

/* =========================
   INTRO STEP
========================= */
function renderIntroStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Verified training • Reading material",
      ]),
      el("h3", { class: "readingTitle" }, [
        "School Safety — Risks and Challenges",
      ]),
      el("p", { class: "readingSub" }, [
        "You will read a translated text with key concepts, main risk categories, Swedish context, and a preventive philosophy. Take your time — this step prepares you for the reading and reflection.",
      ]),
      el("div", { class: "readingDivider", "aria-hidden": "true" }),
      el("p", { class: "readingP" }, [
        "How to use this module: scan the headings, expand categories you want to focus on, and come back anytime. The questionnaire is not a test — it helps document understanding and next actions.",
      ]),
    ]),
  );

  hold.appendChild(
    el("section", { class: "readingCard is-soft" }, [
      el("div", { class: "readingCard__top" }, [
        el("h4", { class: "readingH2" }, ["Core message"]),
      ]),
      el("p", { class: "readingP" }, [riskText.coreMessage]),
    ]),
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
          ["Continue to reading"],
        ),
        el("p", { class: "caption", style: "margin:0;" }, [
          "Progress is saved automatically on this device.",
        ]),
      ],
    ),
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
   VIDEOS STEP (unchanged)
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
      ]),
    );
    markStepComplete(state, "videos");
    return container;
  }

  const watched = new Set(loadWatchedVideos());
  const grid = el("div", { class: "videoGrid", role: "list" });

  videos.slice(0, 3).forEach((v, idx) => {
    const total = Math.min(videos.length, 3);
    const card = el("article", { class: "videoCard", role: "listitem" });

    const openThisVideo = () =>
      openModal({
        title: v.title,
        hint: v.desc,
        videoId: v.id,
        videoIndex: idx + 1,
        videoTotal: total,
        videoSrc: v.videoSrc, // ✅ important
      });

    const thumb = el("div", { class: "videoCard__thumb" }, [
      el(
        "button",
        {
          class: "videoCard__play",
          type: "button",
          "aria-label": `Play video: ${v.title}`,
          onclick: openThisVideo,
        },
        [playIcon()],
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
        [watched.has(v.id) ? "Rewatch" : "Play"],
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
   READING STEP
========================= */
function renderRiskReadingStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Reading material • Translated to English",
      ]),
      el("h3", { class: "readingTitle" }, [
        "School Safety — Risks and Challenges",
      ]),
      el("p", { class: "readingSub" }, [
        "Use the section cards to scan headings and revisit details. You can expand and collapse categories without losing your place.",
      ]),
    ]),
  );

  hold.appendChild(
    el("section", { class: "readingCard is-soft" }, [
      el("div", { class: "readingCard__top" }, [
        el("h4", { class: "readingH2" }, ["Core message"]),
      ]),
      el("p", { class: "readingP" }, [riskText.coreMessage]),
    ]),
  );

  hold.appendChild(renderConceptsCard());
  hold.appendChild(renderRiskCategoriesCard());
  hold.appendChild(renderOtherCriticalRisksCard());
  hold.appendChild(renderSwedishContextCard());
  hold.appendChild(renderPhilosophyCard());

  if (!state.completedStepIds.includes("factsheet")) {
    markStepComplete(state, "factsheet");
    renderHeader(state);
    renderStepper(state);
  }

  wrap.appendChild(hold);
  return wrap;
}

function renderConceptsCard() {
  const c = riskText.concepts;
  const card = el("section", { class: "readingCard" });

  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, [c.title]),
    ]),
  );

  c.blocks.forEach((b, idx) => {
    const block = el("div", { style: idx ? "margin-top:10px;" : "" });
    block.appendChild(el("h5", { class: "readingH3" }, [b.heading]));
    (b.paragraphs || []).forEach((p) =>
      block.appendChild(el("p", { class: "readingP" }, [p])),
    );

    if (Array.isArray(b.bullets) && b.bullets.length) {
      const ul = el("ul", { class: "readingList" });
      b.bullets.forEach((li) => ul.appendChild(el("li", {}, [li])));
      block.appendChild(ul);
    }

    if (b.conclusion)
      block.appendChild(
        el(
          "p",
          { class: "readingP", style: "margin-top:8px; font-weight:800;" },
          [b.conclusion],
        ),
      );
    card.appendChild(block);
  });

  return card;
}

function renderRiskCategoriesCard() {
  const r = riskText.riskCategories;
  const card = el("section", { class: "readingCard is-soft" });

  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, [r.title]),
    ]),
  );

  const stack = el("div", { style: "display:grid; gap: 10px;" });

  r.items.forEach((item, i) => {
    stack.appendChild(
      createAccordion({
        id: `riskCat_${i}`,
        title: item.name,
        hint: item.hint,
        paragraphs: item.body,
        defaultOpen: i === 0,
      }),
    );
  });

  card.appendChild(stack);
  return card;
}

function renderOtherCriticalRisksCard() {
  const o = riskText.otherCritical;
  const card = el("section", { class: "readingCard is-warn" });

  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, [o.title]),
    ]),
  );

  const ul = el("ul", { class: "readingList" });
  o.items.forEach((it) => {
    ul.appendChild(el("li", {}, [el("strong", {}, [it.lead + " "]), it.text]));
  });

  card.appendChild(ul);
  return card;
}

function renderSwedishContextCard() {
  const s = riskText.swedishContext;
  const card = el("section", { class: "readingCard is-soft" });

  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, [s.title]),
    ]),
  );

  const ul = el("ul", { class: "readingList" });
  s.items.forEach((it) => {
    ul.appendChild(el("li", {}, [el("strong", {}, [it.lead + " "]), it.text]));
  });

  card.appendChild(ul);
  return card;
}

function renderPhilosophyCard() {
  const p = riskText.philosophy;
  const card = el("section", { class: "readingCard is-good" });

  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, [p.title]),
    ]),
  );

  p.paragraphs.forEach((t, idx) => {
    const isLast = idx === p.paragraphs.length - 1;
    card.appendChild(
      el(
        "p",
        {
          class: "readingP",
          style: isLast ? "font-weight:900; margin-top:2px;" : "",
        },
        [t],
      ),
    );
  });

  return card;
}

/* =========================
   Accordion helper
========================= */
function createAccordion({
  id,
  title,
  hint,
  paragraphs = [],
  defaultOpen = false,
}) {
  const acc = el("div", {
    class: "readingAcc",
    "data-open": defaultOpen ? "true" : "false",
    id,
  });

  const btn = el("button", {
    class: "readingAcc__btn",
    type: "button",
    "aria-expanded": defaultOpen ? "true" : "false",
  });

  const t = el("div", { class: "readingAcc__title" }, [
    el("p", { class: "readingAcc__name" }, [title]),
    el("p", { class: "readingAcc__hint" }, [hint || ""]),
  ]);

  const chev = el("div", { class: "readingAcc__chev", "aria-hidden": "true" }, [
    chevronIcon(),
  ]);
  btn.appendChild(t);
  btn.appendChild(chev);

  const panel = el("div", {
    class: "readingAcc__panel",
    role: "region",
    "aria-label": title,
  });
  (paragraphs || []).forEach((p) =>
    panel.appendChild(el("p", { class: "readingP" }, [p])),
  );

  btn.addEventListener("click", () => {
    const open = acc.getAttribute("data-open") === "true";
    acc.setAttribute("data-open", open ? "false" : "true");
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });

  acc.appendChild(btn);
  acc.appendChild(panel);
  return acc;
}

function chevronIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = `<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`;
  return svg;
}

/* =========================
   QUIZ HEADER BAND (1/2/3)
========================= */
function renderQuizHeaderBand(activeIndex) {
  const bandTitle =
    activeIndex === 1
      ? QUIZ1.bandTitle
      : activeIndex === 2
        ? QUIZ2.bandTitle
        : QUIZ3.bandTitle;

  const band = el("div", { class: "quizBand" });
  band.appendChild(el("h3", { class: "quizBand__title" }, [bandTitle]));

  const right = el("div", { class: "quizBand__right" });
  const seq = el("div", {
    class: "quizSeq",
    "aria-label": "Quiz sequence progress",
  });

  const mkItem = (n, label, status) => {
    const item = el("div", {
      class: `quizSeq__item ${
        status === "current" ? "is-current" : status === "done" ? "is-done" : ""
      }`,
    });

    const dotClass =
      n === 1
        ? "quizDot is-oneThird"
        : n === 2
          ? "quizDot is-twoThird"
          : "quizDot is-full";

    const dot = el("div", { class: dotClass, "aria-hidden": "true" }, [
      el("div", { class: "quizDot__inner" }, [String(n)]),
    ]);

    item.appendChild(dot);
    item.appendChild(el("div", { class: "quizSeq__label" }, [label]));
    return item;
  };

  const q1s = isQuiz1Locked()
    ? "done"
    : activeIndex === 1
      ? "current"
      : "upcoming";
  const q2s = isQuiz2Locked()
    ? "done"
    : activeIndex === 2
      ? "current"
      : "upcoming";
  const q3s = isQuiz3Locked()
    ? "done"
    : activeIndex === 3
      ? "current"
      : "upcoming";

  seq.appendChild(mkItem(1, "Quiz 1", q1s));
  seq.appendChild(mkItem(2, "Quiz 2", q2s));
  seq.appendChild(mkItem(3, "Quiz 3", q3s));

  right.appendChild(seq);
  band.appendChild(right);
  return band;
}

/* =========================
   Immediate feedback helpers (MCQ)
========================= */
function clearChoiceClasses(choiceGrid) {
  if (!choiceGrid) return;
  $$(".choiceCard", choiceGrid).forEach((c) => {
    c.classList.remove("is-selected", "is-correct", "is-wrong");
  });
}

function applyImmediateFeedbackForQuestion(quizObj, qId, pickedText) {
  const section = $(`[data-q="${qId}"]`);
  if (!section) return;

  const choiceGrid = $(".choiceGrid", section);
  if (!choiceGrid) return;

  clearChoiceClasses(choiceGrid);

  const cards = $$(".choiceCard", choiceGrid);
  const q = quizObj.questions.find((x) => x.id === qId);
  if (!q) return;

  const pickedIndex = q.options.indexOf(pickedText);
  if (pickedIndex < 0) return;

  const selectedCard = cards[pickedIndex];
  if (!selectedCard) return;

  selectedCard.classList.add("is-selected");
  if (pickedText === q.correct) selectedCard.classList.add("is-correct");
  else selectedCard.classList.add("is-wrong");
}

function applyImmediateFeedbackAll(quizObj, answers) {
  quizObj.questions.forEach((qq) => {
    const picked = answers?.[qq.id] || null;
    if (picked) applyImmediateFeedbackForQuestion(quizObj, qq.id, picked);
  });
}

/* =========================
   QUIZ STEP SWITCH (active quiz)
========================= */
function renderQuizStep(state) {
  const active = getActiveQuizIndex();
  if (active === 2) return renderQuiz2ScenarioStep(state);
  if (active === 3) return renderQuiz3Step(state);
  return renderQuizMCQStep(state, { quizObj: QUIZ1, quizIndex: 1 });
}

/* =========================
   Shared MCQ renderer (Quiz 1 only)
========================= */
function renderQuizMCQStep(state, { quizObj, quizIndex }) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(renderQuizHeaderBand(quizIndex));

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Questionnaire • Quiz-by-quiz sequence",
      ]),
      el("h3", { class: "readingTitle" }, [
        "Conceptual Understanding – School Safety",
      ]),
      el("p", { class: "readingSub" }, [
        "Select one option per question. Save answers to keep progress on this device. Finish quiz to lock your answers.",
      ]),
    ]),
  );

  const savedAt = loadQuiz1SavedAt();
  const locked = isQuiz1Locked();

  const statusRow = el("div", {
    style: "display:flex; gap: var(--s12); flex-wrap:wrap; align-items:center;",
  });

  if (savedAt)
    statusRow.appendChild(
      el("div", { class: "savedStamp" }, [
        "Saved ",
        formatLocalDateTime(savedAt),
      ]),
    );
  else
    statusRow.appendChild(
      el("p", { class: "caption", style: "margin:0;" }, [
        "Not saved yet. Save to keep progress on this device.",
      ]),
    );

  if (locked)
    statusRow.appendChild(
      el("span", { class: "stepper__chip stepper__chip--done" }, ["Locked"]),
    );

  const resetBtn = el(
    "button",
    { class: "btn btn--tertiary btn--small", type: "button" },
    ["Reset this quiz"],
  );
  resetBtn.addEventListener("click", () => {
    saveQuiz1Answers({});
    setQuiz1SavedAt(null);
    setQuiz1Locked(false);

    appState.quizSavedAt = null;
    saveState(appState);

    toast("Reset", "Quiz 1 was reset on this device.");
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
  });

  statusRow.appendChild(resetBtn);
  hold.appendChild(statusRow);

  const form = el("form", {
    class: "quizForm",
    id: "quizForm",
    novalidate: "true",
  });
  form.setAttribute("data-quiz-id", quizObj.id);

  const card = el("section", { class: "readingCard is-soft" });
  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, ["Questions"]),
    ]),
  );
  card.appendChild(
    el("p", { class: "caption", style: "margin-top:0;" }, [
      "When you select an answer, it will immediately show green/red feedback.",
    ]),
  );

  const answers = loadQuiz1Answers();

  quizObj.questions.forEach((qq, idx) => {
    const section = el("section", { class: "formSection", "data-q": qq.id }, [
      el("div", { class: "formSection__head" }, [
        el("h3", { class: "formSection__title" }, [`${idx + 1}) ${qq.prompt}`]),
        el("span", { class: "req" }, ["Required"]),
      ]),
    ]);

    const choiceGrid = el("div", {
      class: "choiceGrid",
      role: "radiogroup",
      "aria-label": qq.prompt,
    });

    qq.options.forEach((optText, optIndex) => {
      const id = `${quizObj.id}_${qq.id}_${optIndex}`;
      const cardLabel = el("label", {
        class: "choiceCard",
        for: id,
        "data-choice": String(optIndex),
      });

      const input = el("input", {
        type: "radio",
        name: qq.id,
        id,
        value: optText,
        ...(answers?.[qq.id] === optText ? { checked: "true" } : {}),
        ...(locked ? { disabled: "true" } : {}),
      });

      cardLabel.appendChild(input);
      cardLabel.appendChild(
        el("div", { class: "choiceCard__title" }, [optText]),
      );
      cardLabel.appendChild(el("p", { class: "choiceCard__desc" }, [""]));
      choiceGrid.appendChild(cardLabel);
    });

    section.appendChild(choiceGrid);
    section.appendChild(
      el("p", { class: "errorText is-hidden", id: `err_${qq.id}` }, [
        "Please choose one option.",
      ]),
    );
    card.appendChild(section);
  });

  form.appendChild(card);
  hold.appendChild(form);
  wrap.appendChild(hold);
  // Pre-submit: immediate feedback as you click.
  // Post-submit (locked): show final reveal (green/red) and remove blue selected styling.
  if (locked) {
    setTimeout(() => revealMCQResults(quizObj, loadQuiz1Answers()), 0);
  } else {
    applyImmediateFeedbackAll(quizObj, answers);
  }

  wireQuizChoiceSelection({
    quizObj,
    isLocked: () => locked,
    loadAnswers: () => loadQuiz1Answers(),
    saveAnswers: (obj) => saveQuiz1Answers(obj),
    clearSavedAt: () => setQuiz1SavedAt(null),
  });

  syncFooterButtons(state);
  return wrap;
}

function wireQuizChoiceSelection({
  quizObj,
  isLocked,
  loadAnswers,
  saveAnswers,
  clearSavedAt,
}) {
  const form = $("#quizForm");
  if (!form) return;
  if (isLocked()) return;

  form.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.type !== "radio") return;

    const qId = input.name;
    const pickedText = input.value;

    const ans = loadAnswers();
    ans[qId] = pickedText;
    saveAnswers(ans);

    clearSavedAt();
    appState.quizSavedAt = null;
    saveState(appState);

    applyImmediateFeedbackForQuestion(quizObj, qId, pickedText);

    renderHeader(appState);
    renderStepper(appState);
    syncFooterButtons(appState);
  });
}

/* =========================
   QUIZ 2 — SCENARIO RENDER (multi-select + analysis)
========================= */
function renderQuiz2ScenarioStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(renderQuizHeaderBand(2));

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Questionnaire • Quiz-by-quiz sequence",
      ]),
      el("h3", { class: "readingTitle" }, [
        "Conceptual Understanding Quiz – Risk Assessment",
      ]),
      el("p", { class: "readingSub" }, [
        "Instruction: Analyze the scenario and identify linked risks in the school environment.",
      ]),
    ]),
  );

  const savedAt = loadQuiz2SavedAt();
  const locked = isQuiz2Locked();

  const statusRow = el("div", {
    style: "display:flex; gap: var(--s12); flex-wrap:wrap; align-items:center;",
  });

  if (savedAt)
    statusRow.appendChild(
      el("div", { class: "savedStamp" }, [
        "Saved ",
        formatLocalDateTime(savedAt),
      ]),
    );
  else
    statusRow.appendChild(
      el("p", { class: "caption", style: "margin:0;" }, [
        "Not saved yet. Save to keep progress on this device.",
      ]),
    );

  if (locked)
    statusRow.appendChild(
      el("span", { class: "stepper__chip stepper__chip--done" }, ["Locked"]),
    );

  const resetBtn = el(
    "button",
    { class: "btn btn--tertiary btn--small", type: "button" },
    ["Reset this quiz"],
  );
  resetBtn.addEventListener("click", () => {
    saveQuiz2Answers({});
    setQuiz2SavedAt(null);
    setQuiz2Locked(false);
    clearQuiz2Analysis();

    appState.quizSavedAt = null;
    saveState(appState);

    toast("Reset", "Quiz 2 was reset on this device.");
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
  });

  statusRow.appendChild(resetBtn);
  hold.appendChild(statusRow);

  const answers = loadQuiz2Answers();
  const analysisState = loadQuiz2AnalysisState();

  QUIZ2.scenarios.forEach((sc, idx) => {
    const card = el("section", {
      class: "readingCard is-soft",
      style: "margin-top: var(--s16);",
    });

    card.appendChild(
      el("div", { class: "readingCard__top" }, [
        el("h4", { class: "readingH2" }, [sc.title]),
        el("p", { class: "caption", style: "margin:0;" }, [
          `Question block ${idx + 1} / ${QUIZ2.scenarios.length}`,
        ]),
      ]),
    );

    card.appendChild(el("p", { class: "readingP" }, [sc.description]));
    card.appendChild(
      el("p", { class: "readingH3", style: "margin-bottom: var(--s8);" }, [
        sc.question,
      ]),
    );

    const list = el("div", { class: "checkList", "data-scenario": sc.id });

    sc.options.forEach((optText, optIdx) => {
      const chosen =
        Array.isArray(answers?.[sc.id]) && answers[sc.id].includes(optIdx);
      const reveal = Boolean(analysisState?.[sc.id]) || locked;

      const item = el("label", { class: "checkItem" });
      const input = el("input", {
        type: "checkbox",
        "data-sid": sc.id,
        "data-oid": String(optIdx),
        ...(chosen ? { checked: "true" } : {}),
        ...(locked ? { disabled: "true" } : {}),
      });

      input.addEventListener("change", () => {
        if (isQuiz2Locked()) return;

        const current = loadQuiz2Answers();
        const arr = Array.isArray(current[sc.id]) ? current[sc.id].slice() : [];

        const exists = arr.includes(optIdx);
        if (input.checked && !exists) arr.push(optIdx);
        if (!input.checked && exists)
          current[sc.id] = arr.filter((n) => n !== optIdx);
        else current[sc.id] = arr;

        current[sc.id] = Array.from(new Set(current[sc.id])).sort(
          (a, b) => a - b,
        );
        saveQuiz2Answers(current);

        // any edit => unsaved
        setQuiz2SavedAt(null);
        appState.quizSavedAt = null;
        saveState(appState);

        renderHeader(appState);
        renderStepper(appState);
        syncFooterButtons(appState);
      });

      const text = el("span", { class: "checkText" }, [optText]);
      item.appendChild(input);
      item.appendChild(text);

      // In this quiz ALL options are linked risks => selected => correct
      if (reveal && chosen) item.classList.add("is-correct");

      list.appendChild(item);
    });

    card.appendChild(list);

    // per-scenario error (for Save validation)
    const err = el("p", { class: "errorText is-hidden", id: `err_${sc.id}` }, [
      "Please select at least one option.",
    ]);
    card.appendChild(err);

    // Show analysis action row
    const actions = el("div", { class: "quizActionsRow" });

    const showBtn = el(
      "button",
      {
        class: "btn btn--primary btn--small",
        type: "button",
        ...(locked ? { disabled: "true" } : {}),
      },
      [analysisState?.[sc.id] ? "Analysis shown" : "Show analysis"],
    );

    showBtn.addEventListener("click", () => {
      if (isQuiz2Locked()) return;
      setQuiz2ScenarioAnalysis(sc.id, true);
      toast("Analysis", "Explanation revealed.");
      renderHeader(appState);
      renderStepper(appState);
      renderStep(appState);
    });

    actions.appendChild(showBtn);
    card.appendChild(actions);

    // Explanation box (shown after analysis or when locked)
    const showExplanation = Boolean(analysisState?.[sc.id]) || locked;
    const expl = el("div", {
      class: `analysisBox ${showExplanation ? "" : "is-hidden"}`,
    });

    expl.appendChild(
      el("p", { class: "readingH3", style: "margin-bottom: var(--s8);" }, [
        "Analysis",
      ]),
    );
    const ul = el("ul", { class: "analysisList" });
    (sc.explanationBullets || []).forEach((b) =>
      ul.appendChild(el("li", {}, [b])),
    );
    expl.appendChild(ul);

    card.appendChild(expl);

    hold.appendChild(card);
  });

  wrap.appendChild(hold);
  syncFooterButtons(state);
  return wrap;
}

/* =========================================================
   PART 2/2 — quiz 3 + footer/nav + modal + init
========================================================= */

/* =========================
   QUIZ 3 — MATCHING RENDER
========================= */
/* =========================
   Quiz 3 — Matching
   (targeted fixes: interaction, remove, submit/lock/reveal, clean layout)
========================= */

/* --- helper UI setters --- */
function setMatchProgressUI() {
  const pairs = normalizeQuiz3Pairs(loadQuiz3Matches());
  const elp = $("#matchProgress");
  if (elp) elp.textContent = `${pairs.length} / ${QUIZ3.pairsTotal} matched`;
}

function setMatchSelectionUI(textOrNone) {
  const els = $("#matchSelection");
  if (els) els.textContent = textOrNone || "None";
}

/* --- Quiz 3 renderer --- */
function renderQuiz3Step(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(renderQuizHeaderBand(3));

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, [
        "Questionnaire • Quiz-by-quiz sequence",
      ]),
      el("h3", { class: "readingTitle" }, ["Match concepts to definitions"]),
      el("p", { class: "readingSub" }, [
        "Select one item on either side, then select an item on the other side to create a pair. ",
        "Submit reveals correct/incorrect and locks the quiz.",
      ]),
    ]),
  );

  const savedAt = loadQuiz3SavedAt();
  const locked = isQuiz3Locked();

  const statusRow = el("div", {
    class: "matchStatus",
    style: "display:flex; gap: var(--s12); flex-wrap:wrap; align-items:center;",
  });

  if (savedAt)
    statusRow.appendChild(
      el("div", { class: "savedStamp" }, [
        "Saved ",
        formatLocalDateTime(savedAt),
      ]),
    );
  else
    statusRow.appendChild(
      el("p", { class: "caption", style: "margin:0;" }, [
        "Not saved yet. Complete all matches, then submit.",
      ]),
    );

  if (locked)
    statusRow.appendChild(
      el("span", { class: "stepper__chip stepper__chip--done" }, ["Locked"]),
    );

  const resetBtn = el(
    "button",
    { class: "btn btn--tertiary btn--small", type: "button" },
    ["Reset this quiz"],
  );
  resetBtn.addEventListener("click", () => {
    saveQuiz3Matches([]);
    setQuiz3SavedAt(null);
    setQuiz3Locked(false);

    // keep stepper badge logic consistent
    if (getActiveQuizIndex() === 3) {
      appState.quizSavedAt = null;
      saveState(appState);
    }

    toast("Reset", "Quiz 3 was reset on this device.");
    renderAll();
  });
  statusRow.appendChild(resetBtn);
  hold.appendChild(statusRow);

  const pairs = normalizeQuiz3Pairs(loadQuiz3Matches());

  const card = el("section", { class: "readingCard is-soft" });
  card.appendChild(
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, ["Matching exercise"]),
    ]),
  );
  card.appendChild(
    el("p", { class: "caption", style: "margin-top:0;" }, [
      "No duplicates: each concept and each definition can be used only once.",
    ]),
  );

  // ✅ Layout that looks sane even without custom CSS:
  // status bar (selected/progress) ABOVE, then 2 columns (concepts/definitions)
  const statusBar = el("div", { class: "matchMid" }, [
    el("div", { class: "matchMid__box" }, [
      el("p", { class: "matchMid__kicker" }, ["Selected"]),
      el("p", { class: "matchMid__value", id: "matchSelection" }, ["None"]),
      el("p", { class: "caption", style: "margin:0;" }, [
        "Pick one item on each side.",
      ]),
    ]),
    el("div", { class: "matchMid__box" }, [
      el("p", { class: "matchMid__kicker" }, ["Progress"]),
      el("p", { class: "matchMid__value", id: "matchProgress" }, [
        `${pairs.length} / ${QUIZ3.pairsTotal} matched`,
      ]),
    ]),
  ]);

  const cols = el("div", { class: "matchLayout" });

  // Concepts
  const colA = el("div", { class: "matchCol" });
  colA.appendChild(
    el("div", { class: "matchCol__head" }, [
      el("p", { class: "matchCol__title" }, ["Concepts"]),
    ]),
  );
  const listA = el("div", {
    class: "matchList",
    id: "conceptList",
    role: "list",
  });

  QUIZ3.concepts.forEach((c) => {
    const isUsed = pairs.some((p) => p.concept === c);
    const btn = el(
      "button",
      {
        class: `matchBtn ${isUsed ? "is-used" : ""}`,
        type: "button",
        role: "listitem",
        "data-type": "concept",
        "data-value": c,
        ...(locked || isUsed ? { disabled: "true" } : {}),
      },
      [c],
    );
    listA.appendChild(btn);
  });
  colA.appendChild(listA);

  // Definitions
  const colB = el("div", { class: "matchCol" });
  colB.appendChild(
    el("div", { class: "matchCol__head" }, [
      el("p", { class: "matchCol__title" }, ["Definitions"]),
    ]),
  );
  const listB = el("div", { class: "matchList", id: "defList", role: "list" });

  QUIZ3.definitions.forEach((d) => {
    const isUsed = pairs.some((p) => p.definition === d);
    const btn = el(
      "button",
      {
        class: `matchBtn ${isUsed ? "is-used" : ""}`,
        type: "button",
        role: "listitem",
        "data-type": "definition",
        "data-value": d,
        ...(locked || isUsed ? { disabled: "true" } : {}),
      },
      [d],
    );
    listB.appendChild(btn);
  });
  colB.appendChild(listB);

  cols.appendChild(colA);
  cols.appendChild(colB);

  // Table
  const tableWrap = el("div", { class: "matchTableWrap" });
  tableWrap.appendChild(el("h5", { class: "readingH3" }, ["Your matches"]));
  const table = el("div", { class: "matchTable", id: "matchTable" });
  tableWrap.appendChild(table);

  card.appendChild(statusBar);
  card.appendChild(cols);
  card.appendChild(
    el("div", { class: "readingDivider", "aria-hidden": "true" }),
  );
  card.appendChild(tableWrap);

  hold.appendChild(card);
  wrap.appendChild(hold);

  renderQuiz3Table(pairs, locked);

  // IMPORTANT: wire interactions AFTER this step is mounted into the DOM
  setTimeout(() => {
    const conceptList = document.getElementById("conceptList");
    const defList = document.getElementById("defList");
    const matches = normalizeQuiz3Pairs(loadQuiz3Matches());

    if (!conceptList || !defList) return;

    if (!isQuiz3Locked()) wireQuiz3Interactions(conceptList, defList, matches);
    // If locked, we do nothing special here — instant feedback already handled correctness.
  }, 0);

  refreshQuizSavedBadgeState();
  syncFooterButtons(state);
  return wrap;
}

/* --- Table render: reliable remove button + re-enable availability --- */
function renderQuiz3Table(pairs, locked) {
  const table = $("#matchTable");
  if (!table) return;
  table.innerHTML = "";

  if (!pairs.length) {
    table.appendChild(
      el("p", { class: "caption", style: "margin:0;" }, ["No matches yet."]),
    );
    setMatchProgressUI();
    return;
  }

  pairs.forEach((p) => {
    const row = el("div", {
      class: "matchRow",
      "data-concept": p.concept,
      "data-definition": p.definition,
    });

    const left = el("div", { class: "matchRow__left" }, [
      el("p", { class: "matchRow__concept" }, [p.concept]),
      el("p", { class: "matchRow__def" }, [p.definition]),
    ]);

    const right = el("div", { class: "matchRow__right" });

    if (!locked) {
      right.appendChild(
        el(
          "button",
          {
            class: "btn btn--tertiary btn--small matchRemoveBtn",
            type: "button",
            "data-action": "remove",
            "data-concept": p.concept,
            "data-definition": p.definition,
          },
          ["Remove"],
        ),
      );
    } else {
      right.appendChild(
        el("span", { class: "stepper__chip stepper__chip--done" }, ["Locked"]),
      );
    }

    row.appendChild(left);
    row.appendChild(right);
    table.appendChild(row);
  });

  // ✅ Single delegated handler (avoid "sometimes remove doesn't work")
  if (!locked) {
    table.addEventListener(
      "click",
      (e) => {
        const btn =
          e.target && e.target.closest
            ? e.target.closest('[data-action="remove"]')
            : null;
        if (!btn) return;

        const concept = btn.getAttribute("data-concept") || "";
        const definition = btn.getAttribute("data-definition") || "";

        const current = normalizeQuiz3Pairs(loadQuiz3Matches());
        const next = current.filter(
          (x) => !(x.concept === concept && x.definition === definition),
        );
        saveQuiz3Matches(next);

        setQuiz3SavedAt(null);
        if (getActiveQuizIndex() === 3) {
          appState.quizSavedAt = null;
          saveState(appState);
        }

        toast("Updated", "Match removed.");
        renderAll();
      },
      { once: true },
    );
  }

  setMatchProgressUI();
}

/* --- Interactions: selection flow, no duplicates, resets selection --- */

/* --- Results reveal after lock: green/red row + correct hint --- */
function revealQuiz3Results(pairs) {
  // ✅ Marks each row:
  // - correct => green on BOTH concept and definition
  // - wrong   => red on BOTH concept and definition + shows "Correct: …"
  // Returns score object for optional toast usage.

  const rows = $$("#matchTable .matchRow");
  let correctCount = 0;

  rows.forEach((row) => {
    const concept = row.getAttribute("data-concept") || "";
    const definition = row.getAttribute("data-definition") || "";
    const correctDef = QUIZ3.correctMap?.[concept];

    const ok = Boolean(correctDef && correctDef === definition);
    if (ok) correctCount += 1;

    row.classList.remove("is-correct", "is-wrong");
    row.classList.add(ok ? "is-correct" : "is-wrong");

    const conceptEl = $(".matchRow__concept", row);
    const defEl = $(".matchRow__def", row);
    if (conceptEl) conceptEl.classList.remove("is-correct", "is-wrong");
    if (defEl) defEl.classList.remove("is-correct", "is-wrong");

    if (conceptEl) conceptEl.classList.add(ok ? "is-correct" : "is-wrong");
    if (defEl) defEl.classList.add(ok ? "is-correct" : "is-wrong");

    const right = $(".matchRow__right", row);
    if (!right) return;

    right.innerHTML = "";
    right.appendChild(
      el(
        "span",
        {
          class: `stepper__chip ${
            ok ? "stepper__chip--done" : "stepper__chip--warn"
          }`,
        },
        [ok ? "Correct" : "Incorrect"],
      ),
    );

    if (!ok && correctDef) {
      right.appendChild(
        el(
          "span",
          { class: "caption", style: "display:block; margin-top:6px;" },
          ["Correct: ", correctDef],
        ),
      );
    }
  });

  // Optional: show score in the mid progress panel if present
  const progressEl = $("#matchProgress");
  if (progressEl)
    progressEl.textContent = `${correctCount} / ${QUIZ3.pairsTotal} correct`;

  return { correct: correctCount, total: QUIZ3.pairsTotal };
}

function normalizeQuiz3Pairs(matches) {
  const out = [];
  (Array.isArray(matches) ? matches : []).forEach((m) => {
    if (!m || typeof m !== "object") return;
    const concept = String(m.concept || "").trim();
    const definition = String(m.definition || "").trim();
    if (!concept || !definition) return;
    if (!QUIZ3.concepts.includes(concept)) return;
    if (!QUIZ3.definitions.includes(definition)) return;
    if (out.some((p) => p.concept === concept)) return;
    if (out.some((p) => p.definition === definition)) return;
    out.push({ concept, definition });
  });
  return out;
}

function renderQuiz3Table(pairs, locked) {
  const table = $("#matchTable");
  if (!table) return;
  table.innerHTML = "";

  if (!pairs.length) {
    table.appendChild(
      el("p", { class: "caption", style: "margin:0;" }, ["No matches yet."]),
    );
    return;
  }

  pairs.forEach((p, idx) => {
    const row = el("div", { class: "matchRow", "data-row": String(idx) });

    const left = el("div", { class: "matchRow__left" }, [
      el("p", { class: "matchRow__concept" }, [p.concept]),
      el("p", { class: "matchRow__def" }, [p.definition]),
    ]);

    const right = el("div", { class: "matchRow__right" });

    if (!locked) {
      const remove = el(
        "button",
        { class: "btn btn--tertiary btn--small", type: "button" },
        ["Remove"],
      );
      remove.addEventListener("click", () => {
        const current = normalizeQuiz3Pairs(loadQuiz3Matches());
        const next = current.filter(
          (x) => !(x.concept === p.concept && x.definition === p.definition),
        );
        saveQuiz3Matches(next);

        // unset saved state on edit
        setQuiz3SavedAt(null);
        appState.quizSavedAt = null;
        saveState(appState);

        toast("Updated", "Match removed (not saved).");
        renderHeader(appState);
        renderStepper(appState);
        renderStep(appState);
      });
      right.appendChild(remove);
    } else {
      right.appendChild(
        el("span", { class: "stepper__chip stepper__chip--done" }, ["Locked"]),
      );
    }

    row.appendChild(left);
    row.appendChild(right);
    table.appendChild(row);
  });
}

function wireQuiz3Interactions(conceptList, defList, matches) {
  const selection = {
    concept: null,
    def: null,
    conceptBtn: null,
    defBtn: null,
  };

  const conceptBtns = Array.from(conceptList.querySelectorAll(".matchBtn"));
  const defBtns = Array.from(defList.querySelectorAll(".matchBtn"));

  const findBtn = (side, value) => {
    const root = side === "concept" ? conceptList : defList;
    // ✅ your markup uses data-type, not data-side
    return Array.from(
      root.querySelectorAll(`.matchBtn[data-type="${side}"]`),
    ).find((b) => b.dataset.value === value);
  };

  const clearSelection = () => {
    if (selection.conceptBtn)
      selection.conceptBtn.classList.remove("is-selected");
    if (selection.defBtn) selection.defBtn.classList.remove("is-selected");
    selection.concept = null;
    selection.def = null;
    selection.conceptBtn = null;
    selection.defBtn = null;
    setMatchSelectionUI("None");
  };

  const setBtnCorrect = (btn) => {
    btn.classList.remove("is-selected", "is-wrong");
    btn.classList.add("is-correct", "is-used");
    btn.disabled = true;
  };

  const flashWrong = (a, b) => {
    a.classList.add("is-wrong");
    b.classList.add("is-wrong");

    // keep used/correct buttons disabled; only temporarily disable wrong picks
    a.disabled = true;
    b.disabled = true;

    window.setTimeout(() => {
      a.classList.remove("is-wrong");
      b.classList.remove("is-wrong");

      // re-enable only if not already used/correct
      if (!a.classList.contains("is-used")) a.disabled = false;
      if (!b.classList.contains("is-used")) b.disabled = false;

      clearSelection();
    }, 900);
  };

  const upsertCorrectPair = (concept, def) => {
    const idx = matches.findIndex((m) => m.concept === concept);
    if (idx >= 0) matches[idx].definition = def;
    else matches.push({ concept, definition: def });

    saveQuiz3Matches(matches);
    setMatchProgressUI();
  };

  const updateSubmitEnabled = () => {
    // ✅ your “submit” button is #nextBtn (per your footer mapping)
    const submitBtn = document.getElementById("nextBtn");
    if (!submitBtn) return;

    submitBtn.disabled = !isQuiz3AllCorrect();
  };

  // ✅ Apply persisted correct pairs (green + locked)
  for (const p of matches) {
    const cBtn = findBtn("concept", p.concept);
    const dBtn = findBtn("definition", p.definition);
    if (cBtn) setBtnCorrect(cBtn);
    if (dBtn) setBtnCorrect(dBtn);
  }

  setMatchProgressUI();
  clearSelection();
  updateSubmitEnabled();

  const attemptMatchIfReady = () => {
    if (!selection.concept || !selection.def) return;

    const correctDef = QUIZ3.correctMap[selection.concept];
    const ok = selection.def === correctDef;

    if (ok) {
      setBtnCorrect(selection.conceptBtn);
      setBtnCorrect(selection.defBtn);

      upsertCorrectPair(selection.concept, selection.def);
      clearSelection();
      updateSubmitEnabled();
      return;
    }

    flashWrong(selection.conceptBtn, selection.defBtn);
  };

  const onClickConcept = (btn) => {
    if (btn.disabled) return;

    if (selection.conceptBtn && selection.conceptBtn !== btn) {
      selection.conceptBtn.classList.remove("is-selected");
    }
    selection.concept = btn.dataset.value;
    selection.conceptBtn = btn;
    btn.classList.add("is-selected");

    setMatchSelectionUI(selection.concept);
    attemptMatchIfReady();
  };

  const onClickDef = (btn) => {
    if (btn.disabled) return;

    if (selection.defBtn && selection.defBtn !== btn) {
      selection.defBtn.classList.remove("is-selected");
    }
    selection.def = btn.dataset.value;
    selection.defBtn = btn;
    btn.classList.add("is-selected");

    setMatchSelectionUI(selection.def);
    attemptMatchIfReady();
  };

  conceptBtns.forEach((btn) =>
    btn.addEventListener("click", () => onClickConcept(btn)),
  );
  defBtns.forEach((btn) =>
    btn.addEventListener("click", () => onClickDef(btn)),
  );
}

function revealQuiz3Results(pairs) {
  // ✅ Marks each row:
  // - correct => green on BOTH concept and definition
  // - wrong   => red on BOTH concept and definition + shows "Correct: …"
  // Returns score object for optional toast usage.

  const rows = $$("#matchTable .matchRow");
  let correctCount = 0;

  rows.forEach((row) => {
    const concept = row.getAttribute("data-concept") || "";
    const definition = row.getAttribute("data-definition") || "";
    const correctDef = QUIZ3.correctMap?.[concept];

    const ok = Boolean(correctDef && correctDef === definition);
    if (ok) correctCount += 1;

    row.classList.remove("is-correct", "is-wrong");
    row.classList.add(ok ? "is-correct" : "is-wrong");

    const conceptEl = $(".matchRow__concept", row);
    const defEl = $(".matchRow__def", row);
    if (conceptEl) conceptEl.classList.remove("is-correct", "is-wrong");
    if (defEl) defEl.classList.remove("is-correct", "is-wrong");

    if (conceptEl) conceptEl.classList.add(ok ? "is-correct" : "is-wrong");
    if (defEl) defEl.classList.add(ok ? "is-correct" : "is-wrong");

    const right = $(".matchRow__right", row);
    if (!right) return;

    right.innerHTML = "";
    right.appendChild(
      el(
        "span",
        {
          class: `stepper__chip ${
            ok ? "stepper__chip--done" : "stepper__chip--warn"
          }`,
        },
        [ok ? "Correct" : "Incorrect"],
      ),
    );

    if (!ok && correctDef) {
      right.appendChild(
        el(
          "span",
          { class: "caption", style: "display:block; margin-top:6px;" },
          ["Correct: ", correctDef],
        ),
      );
    }
  });

  // Optional: show score in the mid progress panel if present
  const progressEl = $("#matchProgress");
  if (progressEl)
    progressEl.textContent = `${correctCount} / ${QUIZ3.pairsTotal} correct`;

  return { correct: correctCount, total: QUIZ3.pairsTotal };
}

/* =========================
   COMPLETE STEP
========================= */
function renderCompleteStep(state) {
  const wrap = el("div", { class: "courseContent" });
  const hold = el("div", { class: "readingHold" });

  hold.appendChild(
    el("section", { class: "readingHead" }, [
      el("div", { class: "readingKicker" }, ["Progress Saved"]),
      el("h3", { class: "readingTitle" }, ["Completed"]),
      el("p", { class: "readingSub" }, [
        "You can revisit the reading and quizzes anytime. Your local progress remains stored on this device.",
      ]),
    ]),
  );

  hold.appendChild(
    el("section", { class: "readingCard is-good" }, [
      el("div", { class: "readingCard__top" }, [
        el("h4", { class: "readingH2" }, ["Summary"]),
      ]),
      el("p", { class: "readingP" }, [" Intro + Reading completed."]),
      el("p", { class: "readingP" }, [
        "Quiz sequence finished (locked results).",
      ]),
      el("p", { class: "readingP", style: "font-weight:900;" }, [
        "Safety is built through culture: awareness, trust, and shared responsibility.",
      ]),
    ]),
  );

  const actions = el("div", {
    style: "display:flex; gap: var(--s12); flex-wrap:wrap; align-items:center;",
  });

  actions.appendChild(
    el(
      "button",
      {
        class: "btn btn--tertiary",
        type: "button",
        onclick: () => handleStepSelect(stepIndexById("factsheet")),
      },
      ["Review reading"],
    ),
  );

  actions.appendChild(
    el(
      "button",
      {
        class: "btn btn--primary",
        type: "button",
        onclick: () => handleStepSelect(stepIndexById("quiz")),
      },
      ["Review quizzes"],
    ),
  );

  hold.appendChild(actions);

  // =========================
  // Reflection questionnaire (saved locally)
  // =========================
  const reflection = loadReflection();
  const REFLECT_QUESTIONS = getReflectionQuestions();

  const reflectWrap = el("section", { class: "readingCard" }, [
    el("div", { class: "readingCard__top" }, [
      el("h4", { class: "readingH2" }, ["Classroom application check"]),
      el("p", { class: "readingP", style: "margin-top:6px;" }, [
        "Answer these to capture how you’ll apply the training. Saved locally on this device.",
      ]),
    ]),
  ]);

  const list = el("div", { class: "reflectList", style: "margin-top:12px;" });
  REFLECT_QUESTIONS.forEach((q) => {
    const saved = reflection?.answers?.[q.id] || null;
    list.appendChild(renderReflectionItem(q, saved));
  });

  const meta = el("div", { class: "caption", style: "margin-top:12px;" }, [
    reflection?.updatedAt
      ? `Last saved: ${formatLocalDateTime(reflection.updatedAt)}`
      : "Not saved yet.",
  ]);

  reflectWrap.appendChild(list);
  reflectWrap.appendChild(meta);
  hold.appendChild(reflectWrap);

  wrap.appendChild(hold);

  if (!state.completedStepIds.includes("complete")) {
    markStepComplete(state, "complete");
    state.completedAt = nowISO();
    saveState(state);
    renderHeader(state);
    renderStepper(state);
  }

  return wrap;
}

/* =========================
   REFLECTION (LOCAL SAVE)
========================= */
function getReflectionQuestions() {
  return [
    {
      id: "q1",
      text: "What is one thing you will do differently in your classroom/school starting tomorrow?",
    },
    {
      id: "q2",
      text: "Which specific situation this week could you apply what you just learned?",
    },
    {
      id: "q3",
      text: "What is the first step you will take to implement this in your daily routine?",
    },
    {
      id: "q4",
      text: "What might prevent you from applying this? How could you overcome that obstacle?",
    },
    {
      id: "q5",
      text: "What resources or support would help you implement this effectively?",
    },
    {
      id: "q6",
      text: "Is there something you think is missing that your school should implement — or something you want to know more about — to be more successful in applying what you learned?",
    },
  ];
}

function reflectionStorageKey() {
  // ✅ different storage than quiz/progress
  return `sn_reflection_${courseConfig.courseId}_v1`;
}

function loadReflection() {
  try {
    const raw = localStorage.getItem(reflectionStorageKey());
    if (!raw) return { updatedAt: null, answers: {} };
    const parsed = JSON.parse(raw);
    return {
      updatedAt: parsed?.updatedAt || null,
      answers:
        parsed?.answers && typeof parsed.answers === "object"
          ? parsed.answers
          : {},
    };
  } catch (e) {
    return { updatedAt: null, answers: {} };
  }
}

function saveReflection(next) {
  const payload = {
    updatedAt: nowISO(),
    answers: next?.answers || {},
  };
  localStorage.setItem(reflectionStorageKey(), JSON.stringify(payload));
  showMiniSavedBadge("Reflection saved");
  return payload;
}

function showMiniSavedBadge(text) {
  const saveBadge = $("#saveBadge");
  if (!saveBadge) return;

  const prevText = saveBadge.textContent;
  const wasHidden = saveBadge.hasAttribute("hidden");

  saveBadge.removeAttribute("hidden");
  saveBadge.textContent = text || "Saved";

  window.clearTimeout(showMiniSavedBadge._t);
  showMiniSavedBadge._t = window.setTimeout(() => {
    saveBadge.textContent = prevText;
    if (wasHidden) saveBadge.setAttribute("hidden", "true");
  }, 1600);
}

function formatLocalDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function renderReflectionItem(question, saved) {
  const item = el("div", { class: "reflectItem", "data-qid": question.id });

  const top = el("div", { class: "reflectTop" }, [
    el("div", { class: "reflectQ" }, [question.text]),
  ]);
  item.appendChild(top);

  const body = el("div", { class: "reflectBody" });
  item.appendChild(body);

  const renderSaved = (value, savedAt) => {
    body.innerHTML = "";
    const savedBox = el("div", { class: "reflectSaved" }, [value || "—"]);
    const actions = el("div", { class: "reflectActions" });

    const meta = el("div", { class: "caption", style: "margin-right:auto;" }, [
      savedAt ? `Saved: ${formatLocalDateTime(savedAt)}` : "Saved",
    ]);

    const editBtn = el(
      "button",
      {
        class: "btn btn--tertiary btn--small",
        type: "button",
        onclick: () => renderEdit(value),
      },
      ["Edit"],
    );

    actions.appendChild(meta);
    actions.appendChild(editBtn);

    body.appendChild(savedBox);
    body.appendChild(actions);
    item.classList.add("is-saved");
  };

  const renderEdit = (prefill) => {
    body.innerHTML = "";

    const ta = el("textarea", {
      class: "field reflectInput",
      rows: 3,
      placeholder: "Type your answer…",
    });
    ta.value = prefill || "";

    const actions = el("div", { class: "reflectActions" });

    const saveBtn = el(
      "button",
      {
        class: "btn btn--primary btn--small",
        type: "button",
        onclick: () => {
          const nextText = (ta.value || "").trim();
          const current = loadReflection();
          current.answers[question.id] = { text: nextText, savedAt: nowISO() };
          const updated = saveReflection(current);
          const entry = updated.answers[question.id];
          renderSaved(entry.text, entry.savedAt);
        },
      },
      ["Save"],
    );

    const cancelBtn = el(
      "button",
      {
        class: "btn btn--secondary btn--small",
        type: "button",
        onclick: () => {
          const cur = loadReflection();
          const entry = cur.answers[question.id];
          if (entry) renderSaved(entry.text, entry.savedAt);
          else renderEdit(ta.value);
        },
      },
      ["Cancel"],
    );

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);

    body.appendChild(ta);
    body.appendChild(actions);
    item.classList.remove("is-saved");
  };

  if (saved && typeof saved === "object") {
    renderSaved(saved.text || "", saved.savedAt || null);
  } else {
    renderEdit("");
  }

  return item;
}

/* =========================
   FOOTER BUTTONS + NAV
========================= */
function syncFooterButtons(state) {
  const backBtn = $("#backBtn");
  const saveBtn = $("#saveStepBtn"); // ✅ matches course.html
  const nextBtn = $("#nextBtn"); // primary action

  if (!backBtn || !saveBtn || !nextBtn) return;

  const stepId = courseConfig.steps[state.currentStepIndex].id;

  // -------------------------
  // Non-quiz steps: simple Back + Next
  // -------------------------
  if (stepId !== "quiz") {
    backBtn.disabled = state.currentStepIndex === 0;

    // Save button is only meaningful inside quizzes -> keep UI clean
    saveBtn.setAttribute("hidden", "true");
    saveBtn.disabled = true;

    const isLast = state.currentStepIndex === courseConfig.steps.length - 1;
    nextBtn.disabled = isLast;
    nextBtn.textContent = isLast ? "Done" : "Next";
    return;
  }

  // -------------------------
  // Quiz step: 3-quiz sequence
  // Back + Save (when not locked) + Next (Submit OR Continue)
  // -------------------------
  const active = getActiveQuizIndex();
  const locked =
    active === 1
      ? isQuiz1Locked()
      : active === 2
        ? isQuiz2Locked()
        : isQuiz3Locked();

  backBtn.disabled = false;

  if (!locked) {
    saveBtn.removeAttribute("hidden");
    saveBtn.disabled = false;
    nextBtn.textContent = "Submit / Show answers";
    nextBtn.disabled = false;
  } else {
    // once submitted/locked, saving is no longer relevant
    saveBtn.setAttribute("hidden", "true");
    saveBtn.disabled = true;

    nextBtn.textContent = active === 3 ? "Finish" : "Continue to next quiz";
    nextBtn.disabled = false;
  }
}

function goNext() {
  const target = clampIndex(appState.currentStepIndex + 1);
  handleStepSelect(target, { fromNav: true });
}
function goBack() {
  const target = clampIndex(appState.currentStepIndex - 1);
  handleStepSelect(target, { fromNav: true });
}

function handleStepSelect(targetIndex, opts = {}) {
  const fromNav = Boolean(opts.fromNav);

  if (needsQuizConfirmation(appState, targetIndex)) {
    openConfirmModal({
      title: "Finish quizzes before completing",
      message:
        "You’re trying to move past the Quiz step, but not all quizzes are finished. Please complete Quiz 1 → Quiz 2 → Quiz 3 first.",
      primaryLabel: "Go to Quiz",
      secondaryLabel: "Stay here",
      onPrimary: () => {
        appState.currentStepIndex = stepIndexById("quiz");
        saveState(appState);
        refreshQuizSavedBadgeState();
        renderAll();
      },
    });
    return;
  }

  appState.currentStepIndex = clampIndex(targetIndex);
  saveState(appState);

  // when landing on quiz step, reflect active quiz saved badge
  if (courseConfig.steps[appState.currentStepIndex].id === "quiz") {
    refreshQuizSavedBadgeState();
  }

  renderAll();

  if (fromNav) {
    const active = $("#activeStep");
    active && smoothScrollToTop(active);
  }
}

function syncAriaTabs(state) {
  // optional a11y sync — safe no-op if your markup differs
  const stepper = $("#stepper");
  if (!stepper) return;
  const buttons = $$("[data-step-index]", stepper);
  buttons.forEach((b, idx) => {
    b.setAttribute(
      "aria-selected",
      idx === state.currentStepIndex ? "true" : "false",
    );
    if (idx === state.currentStepIndex) b.setAttribute("tabindex", "0");
    else b.setAttribute("tabindex", "-1");
  });
}

function wireStepperKeyboard() {
  const stepper = $("#stepper");
  if (!stepper) return;

  stepper.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!["ArrowUp", "ArrowDown", "Home", "End", "Enter", " "].includes(key))
      return;

    const items = $$("[data-step-index]", stepper);
    const current = items.findIndex(
      (b) => b.getAttribute("aria-selected") === "true",
    );
    let next = current;

    if (key === "ArrowUp") next = Math.max(0, current - 1);
    if (key === "ArrowDown") next = Math.min(items.length - 1, current + 1);
    if (key === "Home") next = 0;
    if (key === "End") next = items.length - 1;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      if (current >= 0) handleStepSelect(current);
      return;
    }

    e.preventDefault();
    items[next]?.focus();
  });
}

/* =========================
   QUIZ ACTIONS (SAVE / FINISH / CONTINUE)
========================= */
function validateMCQAnswers(quizObj, answers) {
  const missing = [];
  quizObj.questions.forEach((qq) => {
    const picked = answers?.[qq.id];
    if (!picked) missing.push(qq.id);
  });
  return missing;
}

function showMissingErrors(missingIds) {
  missingIds.forEach((id) => {
    const err = $(`#err_${id}`);
    if (err) err.classList.remove("is-hidden");
  });
}

function clearAllErrors() {
  $$(".errorText").forEach((e) => e.classList.add("is-hidden"));
}

function scoreMCQ(quizObj, answers) {
  let correct = 0;
  quizObj.questions.forEach((qq) => {
    if (answers?.[qq.id] === qq.correct) correct += 1;
  });
  return { correct, total: quizObj.questions.length };
}

function revealMCQResults(quizObj, answers) {
  // ✅ Required behavior:
  // - lock UI immediately (disable inputs)
  // - remove pre-submit selected styling as the *only* state
  // - always mark correct option green
  // - if wrong chosen: chosen red + correct green
  // - if correct chosen: chosen green
  // - no navigation / no reload

  if (!quizObj || !Array.isArray(quizObj.questions)) return;

  quizObj.questions.forEach((q) => {
    const chosen = answers ? answers[q.id] : null;
    const correct = q.correct;

    // Support both old/new markup: .quizQuestion (current) OR .questionBlock (legacy)
    const block =
      document.querySelector(`[data-q="${q.id}"]`) ||
      document.querySelector(`.quizQuestion[data-q="${q.id}"]`) ||
      document.querySelector(`.questionBlock[data-q="${q.id}"]`);
    if (!block) return;

    const cards = block.querySelectorAll(".choiceCard");
    cards.forEach((card) => {
      // reset ALL states first
      card.classList.remove("is-selected", "is-correct", "is-wrong");

      const input = card.querySelector('input[type="radio"]');
      const val = input ? input.value : card.getAttribute("data-value") || "";

      // Disable inputs so user can't change after submit
      if (input) input.disabled = true;
      card.setAttribute("aria-disabled", "true");
      card.style.pointerEvents = "none"; // prevents label toggling even if browser still reacts

      // Always highlight correct answer
      if (val === correct) {
        card.classList.add("is-correct");
      }

      // Highlight chosen answer
      if (chosen && val === chosen) {
        if (val === correct) {
          card.classList.add("is-correct");
        } else {
          card.classList.add("is-wrong");
        }
      }
    });
  });
}

function handleSaveQuiz() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;
  if (stepId !== "quiz") return;

  const active = getActiveQuizIndex();

  if (active === 1) {
    clearAllErrors();
    const answers = loadQuiz1Answers();
    const missing = validateMCQAnswers(QUIZ1, answers);
    if (missing.length) {
      showMissingErrors(missing);
      toast("Incomplete", "Please answer all questions before saving.");
      return;
    }

    const iso = nowISO();
    setQuiz1SavedAt(iso);
    refreshQuizSavedBadgeState();
    toast("Saved", "Quiz 1 answers saved.");
    renderHeader(appState);
    renderStepper(appState);
    syncFooterButtons(appState);
    return;
  }

  if (active === 2) {
    clearAllErrors();

    const answers = loadQuiz2Answers();

    // validation: each scenario needs at least 1 selection
    const missing = [];
    QUIZ2.scenarios.forEach((sc) => {
      const arr = answers?.[sc.id];
      if (!Array.isArray(arr) || arr.length === 0) missing.push(sc.id);
    });

    if (missing.length) {
      showMissingErrors(missing);
      toast(
        "Incomplete",
        "Please select at least one option in each scenario before saving.",
      );
      return;
    }

    const iso = nowISO();
    setQuiz2SavedAt(iso);
    refreshQuizSavedBadgeState();
    toast("Saved", "Quiz 2 answers saved.");
    renderHeader(appState);
    renderStepper(appState);
    syncFooterButtons(appState);
    return;
  }

  // active === 3
  const pairs = normalizeQuiz3Pairs(loadQuiz3Matches());
  if (pairs.length < QUIZ3.pairsTotal) {
    toast(
      "Incomplete",
      `Please complete all matches (${pairs.length}/${QUIZ3.pairsTotal}) before saving.`,
    );
    return;
  }

  const iso = nowISO();
  setQuiz3SavedAt(iso);
  refreshQuizSavedBadgeState();
  toast("Saved", "Quiz 3 matches saved.");
  renderHeader(appState);
  renderStepper(appState);
  syncFooterButtons(appState);
}

function handleFinishQuiz() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;
  if (stepId !== "quiz") return;

  const active = getActiveQuizIndex();

  // must be saved first
  const savedAt = getActiveQuizSavedAt();
  if (!savedAt) {
    toast("Save first", "Please save your answers before finishing the quiz.");
    return;
  }

  if (active === 1) {
    setQuiz1Locked(true);
    toast("Quiz finished", "Quiz 1 is now locked. Results revealed.");

    // reveal results in-place
    const answers = loadQuiz1Answers();
    revealMCQResults(QUIZ1, answers);

    // next active quiz badge should reflect Quiz 2 saved state (likely null)
    refreshQuizSavedBadgeState();

    renderHeader(appState);
    renderStepper(appState);
    syncFooterButtons(appState);
    return;
  }

  if (active === 2) {
    setQuiz2Locked(true);

    // reveal analysis for all scenarios
    QUIZ2.scenarios.forEach((sc) => setQuiz2ScenarioAnalysis(sc.id, true));

    toast("Quiz finished", "Quiz 2 is now locked. Analysis revealed.");

    refreshQuizSavedBadgeState();

    renderHeader(appState);
    renderStepper(appState);
    syncFooterButtons(appState);

    // re-render to show green selections + explanations
    renderStep(appState);
    return;
  }

  // active === 3
  setQuiz3Locked(true);
  toast("Quiz finished", "Quiz 3 is now locked. Results revealed.");

  const pairs = normalizeQuiz3Pairs(loadQuiz3Matches());
  revealQuiz3Results(pairs);

  // all quizzes done -> mark quiz step complete
  if (areAllQuizzesLocked()) {
    markStepComplete(appState, "quiz");
    saveState(appState);
  }

  refreshQuizSavedBadgeState();
  renderHeader(appState);
  renderStepper(appState);
  syncFooterButtons(appState);
}

function handleContinueQuizSequence() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;
  if (stepId !== "quiz") return;

  const active = getActiveQuizIndex();
  const locked =
    active === 1
      ? isQuiz1Locked()
      : active === 2
        ? isQuiz2Locked()
        : isQuiz3Locked();
  if (!locked) return;

  // Active quiz changes automatically based on locked states:
  // Quiz1 locked => active becomes 2
  // Quiz2 locked => active becomes 3
  // Quiz3 locked => go to complete
  if (active === 1) {
    refreshQuizSavedBadgeState();
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    return;
  }

  if (active === 2) {
    refreshQuizSavedBadgeState();
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    return;
  }

  // active === 3
  if (areAllQuizzesLocked()) {
    markStepComplete(appState, "quiz");
    saveState(appState);
    appState.currentStepIndex = stepIndexById("complete");
    saveState(appState);
    renderAll();
  }
}

/* =========================
   BUTTON WIRING
========================= */
function wireFooterButtons() {
  const backBtn = $("#backBtn");
  const saveBtn = $("#saveStepBtn"); // ✅ matches course.html
  const nextBtn = $("#nextBtn");

  // Remove previous listeners by cloning (safe + simple)
  if (backBtn) backBtn.replaceWith(backBtn.cloneNode(true));
  if (saveBtn) saveBtn.replaceWith(saveBtn.cloneNode(true));
  if (nextBtn) nextBtn.replaceWith(nextBtn.cloneNode(true));

  const back = $("#backBtn");
  const save = $("#saveStepBtn");
  const next = $("#nextBtn");

  back && back.addEventListener("click", handleFooterBack);
  save && save.addEventListener("click", handleSaveQuiz);
  next && next.addEventListener("click", handleFooterNextPrimary);
}

function handleFooterBack() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;

  if (stepId !== "quiz") {
    goBack();
    return;
  }

  const active = getActiveQuizIndex();
  if (active > 1) {
    setActiveQuizIndex(active - 1);
    renderAll();
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
    return;
  }

  // active === 1 -> back to previous course step
  goBack();
}

function handleFooterNextPrimary() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;

  // Non-quiz: normal next
  if (stepId !== "quiz") {
    goNext();
    return;
  }

  const active = getActiveQuizIndex();
  const locked =
    active === 1
      ? isQuiz1Locked()
      : active === 2
        ? isQuiz2Locked()
        : isQuiz3Locked();

  // In quiz step:
  // - if not locked -> submit/reveal current quiz
  // - if locked -> continue to next quiz (or finish)
  if (!locked) {
    submitActiveQuiz(active);
    return;
  }

  // locked: advance sequence
  if (active < 3) {
    setActiveQuizIndex(active + 1);
    renderAll();
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
    return;
  }

  // active === 3: Finish -> only if all quizzes locked
  if (areAllQuizzesLocked()) {
    markStepComplete(appState, "quiz");
    saveState(appState);

    appState.currentStepIndex = stepIndexById("complete");
    saveState(appState);

    renderAll();
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
  } else {
    toast("Not finished", "Please complete Quiz 1 → Quiz 2 → Quiz 3 first.");
  }
}

function handleQuizAwareBack() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;

  // Non-quiz: normal back
  if (stepId !== "quiz") {
    goBack();
    return;
  }

  // Quiz step: back within quiz sequence when possible
  const active = getActiveQuizIndex();
  if (active > 1) {
    setActiveQuizIndex(active - 1);
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    syncFooterButtons(appState);
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
    return;
  }

  // active === 1 -> back to previous course step
  goBack();
}

function handleQuizAwareSubmit() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;

  // Non-quiz: normal next
  if (stepId !== "quiz") {
    goNext();
    return;
  }

  const active = getActiveQuizIndex();
  const locked =
    active === 1
      ? isQuiz1Locked()
      : active === 2
        ? isQuiz2Locked()
        : isQuiz3Locked();
  if (locked) return;

  submitActiveQuiz(active);
}

function handleQuizAwareNextQuiz() {
  const stepId = courseConfig.steps[appState.currentStepIndex].id;
  if (stepId !== "quiz") return;

  const active = getActiveQuizIndex();
  const locked =
    active === 1
      ? isQuiz1Locked()
      : active === 2
        ? isQuiz2Locked()
        : isQuiz3Locked();
  if (!locked) return;

  if (active < 3) {
    setActiveQuizIndex(active + 1);
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    syncFooterButtons(appState);
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
    return;
  }

  // active === 3: Finish -> only if all quizzes locked
  if (areAllQuizzesLocked()) {
    markStepComplete(appState, "quiz");
    saveState(appState);

    appState.currentStepIndex = stepIndexById("complete");
    saveState(appState);

    renderAll();
    const pane = $("#activeStep") || $("#stepViewport");
    pane && smoothScrollToTop(pane);
  } else {
    toast("Not finished", "Please complete Quiz 1 → Quiz 2 → Quiz 3 first.");
  }
}

function submitActiveQuiz(active) {
  clearAllErrors();

  /* ---------- Quiz 1 (MCQ) ----------
     ✅ Required behavior:
     - validate all answered
     - chosen wrong -> chosen red, correct green
     - chosen correct -> green
     - lock + reveal + scroll top
  */
  if (active === 1) {
    const form = document.querySelector("#quizForm");
    if (!form) {
      toast("Error", "Quiz form not found (#quizForm).");
      return;
    }

    const fd = new FormData(form);
    const answers = {};
    QUIZ1.questions.forEach((qq) => {
      const val = fd.get(qq.id);
      if (typeof val === "string" && val.trim()) answers[qq.id] = val;
    });

    const missing = validateMCQAnswers(QUIZ1, answers);
    if (missing.length) {
      showMissingErrors(missing);
      toast("Incomplete", "Answer all questions before submitting.");
      const first = document.querySelector(`[data-q="${missing[0]}"]`);
      first && first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    saveQuiz1Answers(answers);
    setQuiz1SavedAt(nowISO());
    setQuiz1Locked(true);

    // Re-render once so the DOM reflects "locked" (inputs disabled),
    // then apply the result reveal classes on the *current* DOM.
    refreshQuizSavedBadgeState();
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    syncFooterButtons(appState);

    // ✅ Apply final reveal (green/red) and remove blue selected styling.
    revealMCQResults(QUIZ1, answers);

    const s = scoreMCQ(QUIZ1, answers);
    toast("Results", `${s.correct} / ${s.total} correct`);

    const pane = $("#activeStep");
    pane && smoothScrollToTop(pane);
    return;
  }

  /* ---------- Quiz 2 (scenario multi-select) ---------- */
  if (active === 2) {
    const answers = loadQuiz2Answers();
    const missing = [];

    QUIZ2.scenarios.forEach((sc) => {
      const arr = answers && answers[sc.id];
      if (!Array.isArray(arr) || arr.length === 0) missing.push(sc.id);
    });

    if (missing.length) {
      showMissingErrors(missing);
      toast(
        "Incomplete",
        "Select at least one option in each scenario before submitting.",
      );
      const first = document.querySelector(`[data-scenario="${missing[0]}"]`);
      first && first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setQuiz2SavedAt(nowISO());
    setQuiz2Locked(true);

    QUIZ2.scenarios.forEach((sc) => setQuiz2ScenarioAnalysis(sc.id, true));

    toast("Submitted", "Quiz 2 locked. Answers + analysis revealed.");

    refreshQuizSavedBadgeState();
    renderHeader(appState);
    renderStepper(appState);
    renderStep(appState);
    syncFooterButtons(appState);

    const pane = $("#activeStep");
    pane && smoothScrollToTop(pane);
    return;
  }

  /* ---------- Quiz 3 (matching) ---------- */
  const pairs = normalizeQuiz3Pairs(loadQuiz3Matches());
  if (pairs.length !== QUIZ3.pairsTotal) {
    toast(
      "Incomplete",
      `Complete all matches (${pairs.length}/${QUIZ3.pairsTotal}) before submitting.`,
    );
    return;
  }

  setQuiz3SavedAt(nowISO());
  setQuiz3Locked(true);

  const sc = revealQuiz3Results(pairs);
  toast("Results", `${sc.correct} / ${sc.total} correct`);

  refreshQuizSavedBadgeState();
  renderHeader(appState);
  renderTopStepper(appState);
  renderStepper(appState); // legacy (only if #stepper exists)
  renderStep(appState);
  syncFooterButtons(appState);

  const pane = $("#activeStep");
  pane && smoothScrollToTop(pane);
}

/* =========================
   MODAL (video + confirm)
========================= */
function playIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"></path>`;
  return svg;
}

function openModal({ title, hint, videoId, videoIndex, videoTotal, videoSrc }) {
  const modal = $("#modal");
  if (!modal) return;

  // Update modal text
  $("#modalTitle") && ($("#modalTitle").textContent = title || "Video");
  $("#modalVideoTitle") &&
    ($("#modalVideoTitle").textContent = title || "Video");
  $("#modalVideoHint") && ($("#modalVideoHint").textContent = hint || "");

  // Set the real video source
  const video = $(".videoEl", modal);
  const source = $("source", video);
  if (video && source) {
    // fallback if you didn't pass videoSrc yet
    const src = videoSrc || source.getAttribute("src") || "";
    source.setAttribute("src", src);

    // IMPORTANT: reload the video after changing src
    video.load();
  }

  // Show modal
  modal.removeAttribute("hidden");

  // Mark watched (your existing logic)
  const watched = new Set(loadWatchedVideos());
  if (videoId) watched.add(videoId);
  saveWatchedVideos(Array.from(watched));

  if (loadWatchedVideos().length > 0) {
    markStepComplete(appState, "videos");
    saveState(appState);
    renderHeader(appState);
    renderStepper(appState);
  }
}

function closeModal() {
  const modal = $("#modal");
  if (!modal) return;

  // Pause video when closing (nice UX)
  const video = $(".videoEl", modal);
  if (video) video.pause();

  modal.setAttribute("hidden", "true");
}

function wireModalButtons() {
  const closeBtn = $("#modalCloseBtn");
  const modal = $("#modal");
  const backdrop = modal ? $(".modal__backdrop", modal) : null;

  closeBtn && closeBtn.addEventListener("click", closeModal);
  backdrop && backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openConfirmModal({
  title,
  message,
  primaryLabel,
  secondaryLabel,
  onPrimary,
}) {
  const modal = $("#snConfirm");
  if (!modal) return;

  $("#snConfirmTitle") &&
    ($("#snConfirmTitle").textContent = title || "Confirm");
  $("#snConfirmMsg") && ($("#snConfirmMsg").textContent = message || "");

  const primary = $("#snConfirmPrimary");
  const secondary = $("#snConfirmSecondary");

  if (primary) primary.textContent = primaryLabel || "OK";
  if (secondary) secondary.textContent = secondaryLabel || "Cancel";

  const cleanup = () => {
    primary && primary.replaceWith(primary.cloneNode(true));
    secondary && secondary.replaceWith(secondary.cloneNode(true));
  };

  modal.removeAttribute("hidden");
  modal.setAttribute("aria-hidden", "false");

  const newPrimary = $("#snConfirmPrimary");
  const newSecondary = $("#snConfirmSecondary");

  newSecondary &&
    newSecondary.addEventListener("click", () => {
      modal.setAttribute("hidden", "true");
      modal.setAttribute("aria-hidden", "true");
      cleanup();
    });

  newPrimary &&
    newPrimary.addEventListener("click", () => {
      modal.setAttribute("hidden", "true");
      modal.setAttribute("aria-hidden", "true");
      cleanup();
      onPrimary && onPrimary();
    });
}

/* =========================
   UTIL
========================= */
function capitalize(s) {
  const t = String(s || "");
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}

/* =========================
   RENDER ALL
========================= */
function renderAll() {
  // ensure badge matches active quiz if on quiz step
  if (courseConfig.steps[appState.currentStepIndex]?.id === "quiz") {
    refreshQuizSavedBadgeState();
  }

  renderHeader(appState);
  renderTopStepper(appState);
  renderStepper(appState); // legacy (only if #stepper exists)
  renderStep(appState);
}

/* =========================
   SIDEBAR / STEPPER READINESS
   Fix: On hard refresh, sidebar.js may mount the stepper asynchronously.
   If #stepper doesn't exist at init time, we observe the DOM and render/wire
   as soon as it appears (without changing any existing behaviors).
========================= */
function onStepperReady(cb) {
  const existing = document.getElementById("stepper");
  if (existing) {
    cb(existing);
    return () => {};
  }

  let done = false;
  const obs = new MutationObserver(() => {
    if (done) return;
    const el = document.getElementById("stepper");
    if (el) {
      done = true;
      obs.disconnect();
      cb(el);
    }
  });

  obs.observe(document.body, { childList: true, subtree: true });

  // Safety stop (prevents observer from running forever)
  const t = window.setTimeout(() => {
    if (done) return;
    done = true;
    obs.disconnect();
  }, 6000);

  return () => {
    done = true;
    window.clearTimeout(t);
    obs.disconnect();
  };
}
/* =========================
   APP BOOTSTRAP
========================= */
let appState = loadState();

function init() {
  // course title meta (if present)
  $("#courseTitle") && ($("#courseTitle").textContent = courseConfig.title);

  wireFooterButtons();
  wireModalButtons();

  // Top horizontal stepper (always present in the page header)
  wireTopStepper();
  // Keep quiz badge coherent on load
  if (courseConfig.steps[appState.currentStepIndex]?.id === "quiz") {
    refreshQuizSavedBadgeState();
  } else {
    // if not on quiz step, still keep state.quizSavedAt null (avoid random badge)
    appState.quizSavedAt = null;
    saveState(appState);
  }

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);

