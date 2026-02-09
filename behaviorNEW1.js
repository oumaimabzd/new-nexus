// ==================== DATA ====================
const categories = [
  {
    id: "violence",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    name: "Violence & Threats",
    subcats: [
      "Physical violence against student",
      "Physical violence against staff",
      "Verbal threats",
      "Fighting",
      "With weapon",
      "Other",
    ],
    guidance: {
      type: "alert",
      title: "Important information",
      text: "For violence or serious threats, police report should be considered. Always inform principal for serious incidents. When crime is suspected, police report should be made.",
      links: [
        {
          text: "Police Report",
          url: "https://polisen.se/utsatt-for-brott/polisanmalan/",
        },
      ],
    },
  },
  {
    id: "bullying",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="23" y2="14"/><line x1="23" y1="8" x2="17" y2="14"/></svg>',
    name: "Bullying & Harassment",
    subcats: [
      "Verbal bullying",
      "Social exclusion",
      "Psychological bullying",
      "Discrimination",
      "Racism",
      "Sexual harassment",
      "Other",
    ],
    guidance: {
      type: "warning",
      title: "ℹ Legal requirement",
      text: "Harassment must always be reported to the principal who is responsible for prompt investigation under Chapter 6 Section 10 Education Act.",
      links: [
        {
          text: "Children and Student Ombudsman",
          url: "https://beo.skolinspektionen.se/",
        },
      ],
    },
  },
  {
    id: "disruption",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    name: "Disruption",
    subcats: [
      "Classroom disruption",
      "Refuses to follow instructions",
      "Inappropriate language",
      "Disrespect",
      "Repeated acting out",
      "Other",
    ],
    guidance: {
      type: "info",
      title: "Tip",
      text: "For repeated disruptions, disciplinary measures under Chapter 5 Education Act may apply. Document incidents and actions taken.",
    },
  },
  {
    id: "absence",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    name: "Absence",
    subcats: [
      "Unauthorized absence",
      "Repeated tardiness",
      "Leaves class",
      "Truancy",
      "Home-bound student",
      "Other",
    ],
    guidance: {
      type: "info",
      title: "Remember",
      text: "For repeated or prolonged absence, investigation should be conducted. Contact guardians and consider collaboration with student health team.",
    },
  },
  {
    id: "substance",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/></svg>',
    name: "Drugs & Tobacco",
    subcats: [
      "Suspected influence",
      "Drug possession",
      "Selling/dealing",
      "Alcohol",
      "Tobacco/snus/vape",
      "Other",
    ],
    guidance: {
      type: "alert",
      title: "Important information",
      text: "Drug possession or sale is a crime. Contact principal who assesses if police report should be made. Also consider welfare report.",
      links: [
        {
          text: "Police Report",
          url: "https://polisen.se/utsatt-for-brott/polisanmalan/",
        },
        {
          text: "Social Services",
          url: "https://www.socialstyrelsen.se/",
        },
      ],
    },
  },
  {
    id: "welfare",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>',
    name: "Welfare Concern",
    subcats: [
      "Sadness/depression",
      "Anxiety",
      "Self-harm behavior",
      "Suicidal thoughts",
      "Eating disorder",
      "Social isolation",
      "Suspected violence/abuse at home",
      "Other",
    ],
    guidance: {
      type: "alert",
      title: "Reporting obligation",
      text: "If you suspect a child is being harmed, you are obligated to make a welfare report to social services under Chapter 14 Section 1 of the Social Services Act. This applies immediately.",
      links: [
        {
          text: "Welfare Report",
          url: "https://www.socialstyrelsen.se/",
        },
        { text: " 1177", url: "https://www.1177.se/" },
      ],
    },
  },
  {
    id: "theft",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
    name: "Theft & Vandalism",
    subcats: ["Theft", "Vandalism", "Graffiti", "Other"],
    guidance: {
      type: "warning",
      title: "ℹ Remember",
      text: "Theft and vandalism may be criminal acts. Consider police report and document the damage.",
    },
  },
  {
    id: "digital",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="10" x="5" y="2" rx="2"/><path d="M12 12v6"/><path d="M2 12h20"/><path d="M7 22h10"/><line x1="15" y1="6" x2="15.01" y2="6"/></svg>',
    name: "Digital Incident",
    subcats: [
      "Cyberbullying",
      "Online threats",
      "Sharing images",
      "Inappropriate content",
      "Intrusion/hacking",
      "Other",
    ],
    guidance: {
      type: "warning",
      title: "ℹ Important information",
      text: "Digital harassment is covered by the same rules as physical. Sharing privacy-violating images may be a crime. Save evidence (screenshots).",
    },
  },
  {
    id: "extremism",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    name: "Extremism",
    subcats: [
      "Radicalization",
      "Hate speech",
      "Extremist symbols/material",
      "Recruitment",
      "Violence-promoting expressions",
      "Online radicalization",
      "Other",
    ],
    guidance: {
      type: "alert",
      title: "Important information",
      text: "For signs of radicalization or extremism, always inform principal and counselor. Consider contact with social services and police. Document carefully.",
      links: [
        {
          text: "CVE (Center against violent extremism)",
          url: "https://www.cve.se/",
        },
        {
          text: "Social Services",
          url: "https://www.socialstyrelsen.se/",
        },
      ],
    },
  },
  {
    id: "gang",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    name: "Gang Activity",
    subcats: [
      "Suspected gang affiliation",
      "Recruitment attempts",
      "Gang symbols/clothing",
      "Threats from criminals",
      "Extortion",
      "Criminal activity at school",
      "Other",
    ],
    guidance: {
      type: "alert",
      title: "Important information",
      text: "If gang activity is suspected, principal must always be informed. Collaborate with police, social services and SSP. Consider welfare report.",
      links: [
        { text: "Police", url: "https://polisen.se/" },
        {
          text: "Social Services",
          url: "https://www.socialstyrelsen.se/",
        },
      ],
    },
  },
  {
    id: "other",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    name: "Other",
    subcats: ["Accident/injury", "Property issues", "Parent-related", "Other"],
    guidance: {
      type: "info",
      title: "Tip",
      text: "Describe the incident as detailed as possible so appropriate actions can be taken.",
    },
  },
];

const incidents = [
  {
    id: 1,
    student: "Oscar Nilsson",
    class: "9A",
    category: "welfare",
    subcat: "Self-harm behavior",
    severity: "critical",
    status: "open",
    date: "2025-01-25",
    purpose: "welfare",
    flags: ["legal"],
    description:
      "Counselor discovered wounds on the student's arms. The student admitted to self-harm over the past few weeks.",
    actions:
      "Critical session with counselor completed. Contact with guardians.",
    reporter: "Lisa Bergström",
  },
  {
    id: 2,
    student: "Erik Johansson",
    class: "8B",
    category: "bullying",
    subcat: "Verbal mobbning",
    severity: "serious",
    status: "progress",
    date: "2025-01-24",
    purpose: "harassment",
    flags: ["threshold"],
    description:
      "Erik has repeatedly directed offensive comments at Maja. The situation escalated today after lunch.",
    actions:
      "Conversations with Erik completed. Mentor and guardians notified.",
    reporter: "Maria Andersson",
    victim: "Maja Svensson",
  },
  {
    id: 3,
    student: "Kevin Lindqvist",
    class: "9B",
    category: "gang",
    subcat: "Suspected gang affiliation",
    severity: "serious",
    status: "progress",
    date: "2025-01-24",
    purpose: "safety",
    flags: [],
    description:
      "The student has begun wearing clothing and symbols associated with a known criminal network. Changed behavior over the past month.",
    actions: "Conversations with counselor booked. Principal notified.",
    reporter: "Johan Eriksson",
  },
  {
    id: 4,
    student: "Emma Lindberg",
    class: "7A",
    category: "disruption",
    subcat: "Classroom disruption",
    severity: "moderate",
    status: "action",
    date: "2025-01-23",
    purpose: "disciplinary",
    flags: [],
    description:
      "Repeated disruptions during the math lesson. Refuses to follow instructions.",
    actions: "Conversations with student. Mentor notified.",
    reporter: "Maria Andersson",
  },
  {
    id: 5,
    student: "Adam Svensson",
    class: "8A",
    category: "extremism",
    subcat: "Hate speech",
    severity: "serious",
    status: "progress",
    date: "2025-01-23",
    purpose: "safety",
    flags: [],
    description:
      "The student has on multiple occasions expressed racist views and shared extremist material in the class group on social media.",
    actions:
      "Principal and counselor notified. Conversations with student planned.",
    reporter: "Anna Lindström",
  },
  {
    id: 6,
    student: "Liam Karlsson",
    class: "9C",
    category: "absence",
    subcat: "Unauthorized absence",
    severity: "minor",
    status: "closed",
    date: "2025-01-22",
    purpose: "quality",
    flags: [],
    description: "Unauthorized absence tre days i rad.",
    actions: "Contact with guardians. The student is back in school.",
    reporter: "Peter Svensson",
  },
  {
    id: 7,
    student: "Wilma Andersson",
    class: "7B",
    category: "digital",
    subcat: "Cyberbullying",
    severity: "serious",
    status: "progress",
    date: "2025-01-22",
    purpose: "harassment",
    flags: [],
    description:
      "Offensive images and comments have been shared about the student in a Snapchat group.",
    actions: "Counselor kontaktad. Investigation started.",
    reporter: "Maria Andersson",
    victim: "Wilma Andersson",
  },
  {
    id: 8,
    student: "Lucas Berg",
    class: "8B",
    category: "substance",
    subcat: "Tobacco/snus/vape",
    severity: "moderate",
    status: "followup",
    date: "2025-01-21",
    purpose: "disciplinary",
    flags: [],
    description: "Caught with an e-cigarette in the schoolyard.",
    actions:
      "E-cigarette confiscated. Conversations with student. Guardians notified.",
    reporter: "Johan Eriksson",
  },
];

const users = [
  {
    name: "Maria Andersson",
    role: "principal",
    access: ["All"],
    email: "maria.andersson@skola.se",
  },
  {
    name: "Anna Lindström",
    role: "mentor",
    access: ["8B"],
    email: "anna.lindstrom@skola.se",
  },
  {
    name: "Johan Eriksson",
    role: "headofyear",
    access: ["Grade 7"],
    email: "johan.eriksson@skola.se",
  },
  {
    name: "Lisa Bergström",
    role: "counselor",
    access: ["All"],
    email: "lisa.bergstrom@skola.se",
  },
  {
    name: "Peter Svensson",
    role: "teacher",
    access: [],
    email: "peter.svensson@skola.se",
  },
];

const roleNames = {
  teacher: "Teacher",
  mentor: "Mentor",
  headofyear: "Head of Year",
  counselor: "Counselor",
  principal: "Principal",
  admin: "Administrator",
};

const statusNames = {
  open: "Ny",
  progress: "Under investigation",
  action: "Action in progress",
  followup: "Follow-up",
  closed: "Closed",
};

const severityNames = {
  critical: "Critical",
  serious: "Serious",
  moderate: "Moderate",
  minor: "Mindre",
};

const purposeNames = {
  disciplinary: "Disciplinary Action",
  harassment: "Harassment / Investigation",
  safety: "Safety Incident",
  welfare: "Welfare Concern",
  quality: "Systematic Quality Work",
};

const legalBasis = {
  disciplinary: "5 kap. Education Act",
  harassment: "6 kap. 10 § Education Act",
  safety: "Work Environment Act",
  welfare: "14 kap. 1 § SoL",
  quality: "4 kap. Education Act",
};

const retentionMonths = {
  disciplinary: 12,
  harassment: 36,
  safety: 24,
  welfare: 36,
  quality: 12,
};

// ==================== STATE ====================
let currentRole = "principal";
let currentStep = 1;
let selectedCategory = null;
let selectedSubcats = [];
let selectedSeverity = null;
let currentIncident = null;

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", function () {
  renderCategoryGrid();
  document.getElementById("roleSelect").value = "principal";
  changeRole("principal");
  document.getElementById("inputDate").value = new Date()
    .toISOString()
    .split("T")[0];

  updatePageIntro("dashboard");
  // Action select change handler
  document
    .getElementById("actionSelect")
    .addEventListener("change", function () {
      document.getElementById("customActionGroup").style.display =
        this.value === "other" ? "block" : "none";
    });
});

// ==================== NAVIGATION ====================
function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + pageId).classList.add("active");
  updatePageIntro(pageId);
  window.scrollTo(0, 0);

  if (pageId === "list") renderFullList();
  if (pageId === "dashboard") renderDashboard();
  if (pageId === "admin") renderAdminUsers();
}
function updatePageIntro(pageId) {
  const el = document.getElementById("snPageIntro");
  if (!el) return;

  const copy = {
    dashboard: {
      title: "Reporting overview",
      text: "Use this dashboard to monitor your assigned behavior cases, review key details, and plan follow-ups. Open a case to see actions, tasks, and next steps.",
    },
    list: {
      title: "Case list",
      text: "Browse all cases available to your role. Use filters to focus on what needs attention and open a case to view details.",
    },
    report: {
      title: "Write a report",
      text: "Document what happened clearly and objectively. Include time, location, people involved, and any immediate actions taken.",
    },
    success: {
      title: "Incident submitted",
      text: "Your report has been saved. You can review it from the case list or return to the dashboard.",
    },
    detail: {
      title: "Case details",
      text: "Review the full timeline, actions taken, and any follow-ups. Add notes or escalate if needed.",
    },
    tasks: {
      title: "My tasks",
      text: "Track your pending follow-ups and assigned actions. Complete or update tasks to keep cases moving.",
    },
    eht: {
      title: "EHT meetings",
      text: "View and manage student health team meetings, referrals, and decisions.",
    },
    admin: {
      title: "Administration",
      text: "Manage access and roles. Only update user permissions when you are confident about responsibility and scope.",
    },
  };

  const c = copy[pageId] || copy.dashboard;

  el.innerHTML = `
    <div class="snPageIntro__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    </div>
    <div>
      <p class="snPageIntro__title">${c.title}</p>
      <p class="snPageIntro__text">${c.text}</p>
    </div>
  `;

  // Move the intro element inside the active page so it's visible with that page
  const activePage = document.getElementById("page-" + pageId);
  if (activePage) {
    activePage.insertBefore(el, activePage.firstChild);
  }
}
// ==================== ROLE MANAGEMENT ====================
function changeRole(role) {
  currentRole = role;

  const showAlerts = ["counselor", "principal", "admin"].includes(role);
  const showWarning = ["mentor", "headofyear"].includes(role);
  const showStats = ["principal", "admin"].includes(role);
  const showAdmin = ["principal", "admin"].includes(role);
  const showRetention = ["principal", "admin"].includes(role);
  const showEht = ["counselor", "principal", "admin"].includes(role);

  document
    .getElementById("alertBanner")
    .classList.toggle("hidden", !showAlerts);
  document
    .getElementById("warningBanner")
    .classList.toggle("hidden", !showWarning);
  document.getElementById("statsRow").classList.toggle("hidden", !showStats);
  document.getElementById("adminLink").classList.toggle("hidden", !showAdmin);
  document
    .getElementById("retentionBanner")
    .classList.toggle("hidden", !showRetention);
  document.getElementById("ehtLink").classList.toggle("hidden", !showEht);

  // Show/hide the attention zone wrapper based on whether any child alerts are visible
  const anyAttentionVisible = showAlerts || showWarning || showRetention;
  const attentionZone = document.getElementById("attentionZone");
  if (attentionZone) {
    attentionZone.classList.toggle("hidden", !anyAttentionVisible);
  }

  // Update titles
  const titles = {
    teacher: { title: "My Cases", sub: "You have 2 open cases" },
    mentor: { title: "Cases in 8B", sub: "Your class has 3 open cases" },
    headofyear: {
      title: "Cases in Grade 7",
      sub: "The grade has 5 open cases",
    },
    counselor: {
      title: "My Cases",
      sub: "You have 4 cases requiring follow-up",
    },
    principal: { title: "All Cases", sub: "8 open cases at the school" },
    admin: { title: "All Cases", sub: "8 open cases at the school" },
  };

  document.getElementById("incidentListTitle").textContent = titles[role].title;
  document.getElementById("listPageTitle").textContent = titles[role].title;
  const subtitleEl = document.getElementById("dashboardSubtitle");
  if (subtitleEl) subtitleEl.textContent = titles[role].sub;

  renderDashboard();
  showToast("Viewing as " + roleNames[role]);
}

// ==================== RENDER FUNCTIONS ====================
function renderDashboard() {
  const filtered = filterIncidentsByRole(incidents);
  const recent = filtered.slice(0, 5);
  renderIncidentList(recent, "dashboardIncidents");
}

function renderFullList() {
  filterIncidents();
}

function filterIncidentsByRole(list) {
  if (["principal", "admin"].includes(currentRole)) return list;
  if (currentRole === "teacher")
    return list.filter((i) => i.reporter === "Maria Andersson");
  if (currentRole === "mentor") return list.filter((i) => i.class === "8B");
  if (currentRole === "headofyear")
    return list.filter((i) => i.class.includes("7"));
  if (currentRole === "counselor")
    return list.filter((i) =>
      ["bullying", "welfare", "extremism", "gang"].includes(i.category),
    );
  return list;
}

function filterIncidents() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const status = document.getElementById("statusFilter").value;
  const severity = document.getElementById("severityFilter").value;

  let filtered = filterIncidentsByRole(incidents);

  if (search) {
    filtered = filtered.filter(
      (i) =>
        i.student.toLowerCase().includes(search) ||
        i.class.toLowerCase().includes(search),
    );
  }
  if (cat) filtered = filtered.filter((i) => i.category === cat);
  if (status) filtered = filtered.filter((i) => i.status === status);
  if (severity) filtered = filtered.filter((i) => i.severity === severity);

  renderIncidentList(filtered, "fullIncidentList");
}

function renderIncidentList(list, containerId) {
  const container = document.getElementById(containerId);
  if (list.length === 0) {
    container.innerHTML =
      '<div style="padding:2rem;text-align:center;color:var(--text-light);">No cases to show</div>';
    return;
  }

  container.innerHTML = list
    .map((inc) => {
      const cat = categories.find((c) => c.id === inc.category);
      const urgentClass = inc.flags.includes("legal")
        ? "urgent"
        : inc.flags.includes("threshold")
          ? "flagged"
          : "";
      const flagsHtml = inc.flags
        .map((f) => {
          if (f === "legal")
            return '<span class="badge badge-legal">Welfare Report</span>';
          if (f === "threshold")
            return '<span class="badge badge-threshold">Repeated</span>';
          return "";
        })
        .join("");

      return `
 <div class="incident-item ${urgentClass}" onclick="showIncident(${inc.id})">
 <span class="severity-dot ${inc.severity}"></span>
 <div class="incident-info">
 <div class="incident-title">
 ${inc.student} ${flagsHtml}
 </div>
 <div class="incident-meta"><span class="cat-icon-inline">${cat.icon}</span>${cat.name} • ${inc.class} • ${inc.date}</div>
 </div>
 <span class="status-badge status-${inc.status}">${statusNames[inc.status]}</span>
 </div>
 `;
    })
    .join("");
}

function showIncident(id) {
  currentIncident = incidents.find((i) => i.id === id);
  const cat = categories.find((c) => c.id === currentIncident.category);

  // Scroll to top
  window.scrollTo(0, 0);

  document.getElementById("detailTitle").textContent =
    currentIncident.subcat || cat.name;
  document.getElementById("detailSubtitle").textContent =
    `${currentIncident.student} • ${currentIncident.class} • Documented ${currentIncident.date}`;
  document.getElementById("detailStatus").textContent =
    statusNames[currentIncident.status];
  document.getElementById("detailStatus").className =
    "status-badge status-" + currentIncident.status;
  document.getElementById("detailDescription").textContent =
    currentIncident.description;
  document.getElementById("detailActions").textContent =
    currentIncident.actions;

  document.getElementById("detailInfo").innerHTML = `
 <span class="info-label">Student</span><span class="info-value">${currentIncident.student}</span>
 <span class="info-label">Class</span><span class="info-value">${currentIncident.class}</span>
 <span class="info-label">Category</span><span class="info-value"><span class="cat-icon-inline">${cat.icon}</span>${cat.name}</span>
 <span class="info-label">Underkategori</span><span class="info-value">${currentIncident.subcat || "-"}</span>
 <span class="info-label">Severity</span><span class="info-value"><span class="status-badge" style="background:${getSeverityColor(currentIncident.severity)}">${severityNames[currentIncident.severity]}</span></span>
 <span class="info-label">Documented av</span><span class="info-value">${currentIncident.reporter}</span>
 ${currentIncident.victim ? `<span class="info-label">Affected student</span><span class="info-value">${currentIncident.victim}</span>` : ""}
 `;

  // Action toolbox
  renderActionToolbox();

  // Timeline
  document.getElementById("timeline").innerHTML = `
 <li class="timeline-item">
 <div class="timeline-date">${currentIncident.date} 10:30</div>
 <div class="timeline-text">Incident documented</div>
 <div class="timeline-user">${currentIncident.reporter}</div>
 </li>
 ${
   currentIncident.status !== "open"
     ? `
 <li class="timeline-item">
 <div class="timeline-date">${currentIncident.date} 11:00</div>
 <div class="timeline-text">Principal notified</div>
 <div class="timeline-user">System</div>
 </li>
 `
     : ""
 }
 `;

  // Legal card
  const showLegal =
    ["bullying", "welfare", "violence", "extremism", "gang"].includes(
      currentIncident.category,
    ) && ["serious", "critical"].includes(currentIncident.severity);
  document.getElementById("legalCard").classList.toggle("hidden", !showLegal);

  if (showLegal) {
    let legalItems = "";
    if (["bullying"].includes(currentIncident.category)) {
      legalItems = `
 <div class="legal-item"><div class="action-checkbox checked" onclick="this.classList.toggle('checked')">✓</div><div><strong>Report to principal</strong><br><span style="font-size:0.75rem;color:var(--text-light);">6 kap. 10 § Education Act</span></div></div>
 <div class="legal-item"><div class="action-checkbox" onclick="this.classList.toggle('checked')">✓</div><div><strong>Report to school authority</strong><br><span style="font-size:0.75rem;color:var(--text-light);">6 kap. 10 § Education Act</span></div></div>
 <div class="legal-item"><div class="action-checkbox" onclick="this.classList.toggle('checked')">✓</div><div><strong>Investigation started</strong><br><span style="font-size:0.75rem;color:var(--text-light);">Must be done promptly</span></div></div>
 `;
    } else if (["welfare"].includes(currentIncident.category)) {
      legalItems = `
 <div class="legal-item"><div class="action-checkbox" onclick="this.classList.toggle('checked')">✓</div><div><strong>Welfare Report to social servicesen</strong><br><span style="font-size:0.75rem;color:var(--text-light);">14 kap. 1 § SoL - Immediate</span></div></div>
 `;
    } else if (["extremism", "gang"].includes(currentIncident.category)) {
      legalItems = `
 <div class="legal-item"><div class="action-checkbox checked" onclick="this.classList.toggle('checked')">✓</div><div><strong>Principal notified</strong></div></div>
 <div class="legal-item"><div class="action-checkbox" onclick="this.classList.toggle('checked')">✓</div><div><strong>Welfare report considered</strong><br><span style="font-size:0.75rem;color:var(--text-light);">14 kap. 1 § SoL</span></div></div>
 <div class="legal-item"><div class="action-checkbox" onclick="this.classList.toggle('checked')">✓</div><div><strong>Police contact considered</strong></div></div>
 `;
    }
    document.getElementById("legalItems").innerHTML = legalItems;
  }

  // GDPR info
  const purpose = currentIncident.purpose || "quality";
  document.getElementById("detailPurpose").textContent = purposeNames[purpose];
  document.getElementById("detailLegalBasis").textContent = legalBasis[purpose];
  document.getElementById("detailCreated").textContent = currentIncident.date;

  // Calculate deletion date based on purpose
  const months = retentionMonths[purpose] || 12;
  const deletionDate = new Date(currentIncident.date);
  deletionDate.setMonth(deletionDate.getMonth() + months);
  document.getElementById("detailDeletion").textContent = deletionDate
    .toISOString()
    .split("T")[0];

  showPage("detail");
}

function renderActionToolbox() {
  const defaultActions = [
    {
      id: "verbal",
      name: "Verbal warning",
      checked: true,
      date: currentIncident.date + " 10:35",
    },
    {
      id: "talk",
      name: "Conversations with student",
      checked: true,
      date: currentIncident.date + " 10:45",
    },
    {
      id: "parentcall",
      name: "Phone call with guardians",
      checked: false,
    },
    {
      id: "parentmeeting",
      name: "Meeting with guardians",
      checked: false,
    },
    { id: "counselor", name: "Referral to counselor", checked: false },
    { id: "warning", name: "Written warning", checked: false },
  ];

  document.getElementById("actionToolbox").innerHTML = defaultActions
    .map(
      (a) => `
 <li class="action-item">
 <div class="action-checkbox ${a.checked ? "checked" : ""}" onclick="this.classList.toggle('checked')">✓</div>
 <div class="action-content">
 <div class="action-name">${a.name}</div>
 ${a.date ? `<div class="action-date">${a.date}</div>` : ""}
 </div>
 </li>
 `,
    )
    .join("");
}

function getSeverityColor(sev) {
  const colors = {
    critical: "#fed7d7",
    serious: "#feebc8",
    moderate: "#fefcbf",
    minor: "#c6f6d5",
  };
  return colors[sev] || "#e2e8f0";
}

// ==================== CATEGORY GRID ====================
function renderCategoryGrid() {
  document.getElementById("categoryGrid").innerHTML = categories
    .map(
      (cat) => `
 <div class="category-card" onclick="selectCategory('${cat.id}')" id="cat-${cat.id}">
 <div class="category-card-icon">${cat.icon}</div>
 <div class="category-card-name">${cat.name}</div>
 </div>
 `,
    )
    .join("");
}

function selectCategory(catId) {
  selectedCategory = categories.find((c) => c.id === catId);
  selectedSubcats = [];

  document
    .querySelectorAll(".category-card")
    .forEach((c) => c.classList.remove("selected"));
  document.getElementById("cat-" + catId).classList.add("selected");

  // Show subcategories
  const section = document.getElementById("subcatSection");
  section.classList.add("active");
  document.getElementById("subcatTags").innerHTML = selectedCategory.subcats
    .map(
      (s) =>
        `<span class="subcat-tag" onclick="toggleSubcat(this, '${s}')">${s}</span>`,
    )
    .join("");

  // Show guidance
  const g = selectedCategory.guidance;
  document.getElementById("guidanceBox").innerHTML = `
 <div class="guidance-box ${g.type}">
 <div class="guidance-title">${g.title}</div>
 <div class="guidance-text">${g.text}</div>
 ${g.links ? `<div class="guidance-links">${g.links.map((l) => `<a href="${l.url}" target="_blank" class="guidance-link">${l.text}</a>`).join("")}</div>` : ""}
 </div>
 `;
}

function toggleSubcat(el, subcat) {
  el.classList.toggle("selected");
  if (el.classList.contains("selected")) {
    selectedSubcats.push(subcat);
  } else {
    selectedSubcats = selectedSubcats.filter((s) => s !== subcat);
  }

  // Show/hide "Other" text field
  const otherField = document.getElementById("otherSubcatField");
  if (selectedSubcats.includes("Other")) {
    otherField.style.display = "block";
  } else {
    otherField.style.display = "none";
    document.getElementById("otherSubcatText").value = "";
  }
}

// ==================== PERSON SECTIONS ====================
function addPerson(listId, role) {
  const list = document.getElementById(listId);
  const newEntry = document.createElement("div");
  newEntry.className = "person-entry";
  newEntry.setAttribute("data-role", role);
  newEntry.style.cssText =
    "display:grid;grid-template-columns:1fr 120px 40px;gap:0.5rem;align-items:end;margin-bottom:0.5rem;";
  newEntry.innerHTML = `
 <div class="form-group" style="margin:0;">
 <input type="text" class="form-input person-name" placeholder="First and last name">
 </div>
 <div class="form-group" style="margin:0;">
 <input type="text" class="form-input person-class" placeholder="${role === "reported" ? "E.g. 8B" : "Class el. Personal"}">
 </div>
 <button type="button" onclick="removePerson(this)" style="background:var(--error);color:white;border:none;border-radius:4px;padding:0.4rem 0.6rem;cursor:pointer;font-size:0.8rem;">×</button>
 `;
  list.appendChild(newEntry);
}

function removePerson(btn) {
  btn.closest(".person-entry").remove();
}

function collectPersons(listId) {
  const persons = [];
  document.querySelectorAll(`#${listId} .person-entry`).forEach((entry) => {
    const name = entry.querySelector(".person-name").value.trim();
    const classVal = entry.querySelector(".person-class").value.trim();
    if (name) {
      persons.push({
        name,
        class: classVal,
        role: entry.getAttribute("data-role"),
      });
    }
  });
  return persons;
}

// ==================== WIZARD ====================
function nextStep() {
  if (currentStep === 1) {
    if (
      !document.getElementById("inputStudentName").value ||
      !document.getElementById("inputClass").value
    ) {
      showToast("Fill in the student name and class", "error");
      return;
    }
  }
  if (currentStep === 2) {
    if (!selectedCategory) {
      showToast("Select a category", "error");
      return;
    }
  }
  if (currentStep === 3) {
    if (
      !selectedSeverity ||
      !document.getElementById("inputLocation").value ||
      !document.getElementById("inputDescription").value
    ) {
      showToast("Fill in all required fields", "error");
      return;
    }
    // Prepare action checklist for step 4
    renderWizardActionChecklist();
  }
  if (currentStep === 4) {
    // Validate at least one escalation for serious cases
    if (
      (selectedSeverity === "serious" || selectedSeverity === "critical") &&
      !wizardEscalations.principal
    ) {
      showToast("Principal must be notified for serious incidents", "error");
      return;
    }
  }
  if (currentStep === 5) {
    if (!selectedPurpose) {
      showToast("Select documentation purpose", "error");
      return;
    }
    submitReport();
    return;
  }

  currentStep++;
  updateWizard();
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateWizard();
  }
}

function updateWizard() {
  // Scroll to top of page
  window.scrollTo(0, 0);

  // Hide all steps
  for (let i = 1; i <= 5; i++) {
    document.getElementById("step" + i).style.display = "none";
    document
      .getElementById("step" + i + "-tab")
      .classList.remove("active", "completed");
  }

  // Show current step
  document.getElementById("step" + currentStep).style.display = "block";
  document
    .getElementById("step" + currentStep + "-tab")
    .classList.add("active");

  // Mark completed steps
  for (let i = 1; i < currentStep; i++) {
    document.getElementById("step" + i + "-tab").classList.add("completed");
  }

  // Update buttons
  document.getElementById("prevBtn").style.visibility =
    currentStep > 1 ? "visible" : "hidden";
  document.getElementById("nextBtn").textContent =
    currentStep === 5 ? "Submit ✓" : "Next →";

  // If step 5, render review
  if (currentStep === 5) {
    renderReview();
  }
}

// Category-specific action lists
const categoryActions = {
  bullying: [
    {
      group: "Conversations",
      items: [
        "Talk with involved student",
        "Talk with affected student",
        "Talk with witnesses",
        "Class council/group discussion",
      ],
    },
    {
      group: "Guardians",
      items: [
        "Contact guardians (involved student)",
        "Contact guardians (affected student)",
        "Meeting with all guardians",
      ],
    },
    {
      group: "Documentation",
      items: [
        "Documented in student file",
        "Action plan established",
        "Follow-up date set",
      ],
    },
  ],
  violence: [
    {
      group: "Immediate",
      items: ["First aid given", "Students separated", "Location secured"],
    },
    {
      group: "Conversations",
      items: ["Conversations with involved students", "Talk with witnesses"],
    },
    { group: "Guardians", items: ["Contact with all guardians"] },
    {
      group: "Documentation",
      items: [
        "Documented in student file",
        "Work environment report",
        "Injury report",
      ],
    },
  ],
  welfare: [
    {
      group: "Conversations",
      items: [
        "Talk with the student",
        "Talk with classmates",
        "Talk with teachers who know the student",
      ],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "Student Health",
      items: [
        "Counselor notified",
        "School Nurse notified",
        "Psychologist notified",
      ],
    },
    {
      group: "Documentation",
      items: ["Documented in student file", "Action plan established"],
    },
  ],
  disruption: [
    {
      group: "Conversations",
      items: ["Talk with the student", "Conversations with class/group"],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "Actions",
      items: ["Adaptations agreed", "Follow-up date set"],
    },
  ],
  absence: [
    {
      group: "Contact",
      items: ["Phone call with guardians", "Home visit completed"],
    },
    {
      group: "Conversations",
      items: ["Talk with the student", "Meeting with guardians"],
    },
    {
      group: "Documentation",
      items: [
        "Absence registered",
        "Attendance team notified",
        "Action plan established",
      ],
    },
  ],
  substance: [
    {
      group: "Immediate",
      items: ["Student taken care of", "Items confiscated"],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "Documentation",
      items: ["Documented in student file", "Action plan established"],
    },
  ],
  theft: [
    {
      group: "Investigation",
      items: [
        "Talk with suspected student",
        "Talk with witnesses",
        "Inventory completed",
      ],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "Documentation",
      items: ["Documented in student file", "Injury report"],
    },
  ],
  digital: [
    {
      group: "Investigation",
      items: [
        "Screenshots secured",
        "Platform identified",
        "Spread investigated",
      ],
    },
    {
      group: "Conversations",
      items: ["Talk with involved student", "Talk with affected student"],
    },
    { group: "Guardians", items: ["Contact with all guardians"] },
    {
      group: "Documentation",
      items: ["Documented in student file", "Report to platform"],
    },
  ],
  extremism: [
    {
      group: "Investigation",
      items: ["Material secured", "Extent investigated"],
    },
    {
      group: "Conversations",
      items: ["Talk with the student", "Counselor notified"],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "Documentation",
      items: ["Documented in student file", "Action plan established"],
    },
  ],
  gang: [
    {
      group: "Investigation",
      items: ["Situation mapped out", "Connections investigated"],
    },
    {
      group: "Conversations",
      items: ["Talk with the student", "Counselor notified"],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    {
      group: "External",
      items: ["Social services contacted", "Police contacted"],
    },
  ],
  other: [
    {
      group: "Conversations",
      items: ["Conversations with those involved"],
    },
    { group: "Guardians", items: ["Contact with Guardians"] },
    { group: "Documentation", items: ["Documented in student file"] },
  ],
};

// Track wizard action states
let wizardActionStates = {};
let wizardEscalations = {};

function renderWizardActionChecklist() {
  const category = selectedCategory?.id || "other";
  const actions = categoryActions[category] || categoryActions.other;

  wizardActionStates = {};
  let html = "";
  let totalItems = 0;

  actions.forEach((group) => {
    html += `<div class="action-group">
 <div class="action-group-title">${group.group}</div>`;
    group.items.forEach((item, idx) => {
      const key = category + "_" + idx + "_" + item.replace(/\s/g, "_");
      wizardActionStates[key] = "none";
      totalItems++;
      html += `<div class="action-item" onclick="cycleWizardAction(this, '${key}')" data-key="${key}">
 <div class="action-toggle"></div>
 <span class="action-label">${item}</span>
 <span class="action-date"></span>
 </div>`;
    });
    html += "</div>";
  });

  document.getElementById("wizardActionChecklist").innerHTML = html;
  document.getElementById("wizardActionProgress").textContent =
    "0 of " + totalItems + " marked";

  // Auto-check principal escalation for serious/critical
  if (selectedSeverity === "serious" || selectedSeverity === "critical") {
    const principalStep = document.querySelector("#principalEscalation");
    if (principalStep && !principalStep.classList.contains("completed")) {
      principalStep.classList.add("planned");
      principalStep.querySelector(".step-checkbox").textContent = "◐";
      principalStep.querySelector(".step-status").className =
        "step-status pending";
      principalStep.querySelector(".step-status").textContent =
        "Must be notified";
      wizardEscalations.principal = "planned";
    }
  }
}

function cycleWizardAction(element, key) {
  const states = ["none", "planned", "done", "na"];
  const icons = ["", "◐", "✓", "–"];
  const dates = [
    "",
    "Planned",
    new Date().toISOString().split("T")[0],
    "Not applicable",
  ];

  let currentIndex = states.indexOf(wizardActionStates[key] || "none");
  let nextIndex = (currentIndex + 1) % states.length;

  wizardActionStates[key] = states[nextIndex];

  // Update UI
  element.className =
    "action-item" +
    (states[nextIndex] !== "none" ? " state-" + states[nextIndex] : "");
  element.querySelector(".action-toggle").textContent = icons[nextIndex];
  element.querySelector(".action-date").textContent = dates[nextIndex];

  // Update progress
  const done = Object.values(wizardActionStates).filter(
    (s) => s === "done" || s === "planned",
  ).length;
  const total = Object.keys(wizardActionStates).length;
  document.getElementById("wizardActionProgress").textContent =
    done + " of " + total + " marked";
}

function toggleWizardEscalation(element, role) {
  const states = ["none", "planned", "done"];
  const icons = ["", "◐", "✓"];
  const statusClasses = ["waiting", "pending", "done"];
  const statusTexts = [
    "Not notified",
    "To be informed",
    "Informerad " +
      new Date().toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  ];

  let currentState = wizardEscalations[role] || "none";
  let currentIndex = states.indexOf(currentState);
  let nextIndex = (currentIndex + 1) % states.length;

  // Don't allow unchecking principal for serious cases
  if (
    role === "principal" &&
    (selectedSeverity === "serious" || selectedSeverity === "critical") &&
    nextIndex === 0
  ) {
    nextIndex = 1; // Keep at least as planned
    showToast("Principal must be notified for serious incidents", "warning");
  }

  wizardEscalations[role] = states[nextIndex];

  // Update UI
  element.classList.remove("planned", "completed");
  if (states[nextIndex] === "planned") element.classList.add("planned");
  if (states[nextIndex] === "done") element.classList.add("completed");

  element.querySelector(".step-checkbox").textContent = icons[nextIndex];
  element.querySelector(".step-status").className =
    "step-status " + statusClasses[nextIndex];
  element.querySelector(".step-status").textContent = statusTexts[nextIndex];

  // Update progress
  const done = Object.values(wizardEscalations).filter(
    (s) => s === "done" || s === "planned",
  ).length;
  document.getElementById("wizardEscalationProgress").textContent =
    done + " of " + Object.keys(wizardEscalations).length + " notified";
}

function renderReview() {
  const cat = selectedCategory;

  // Count actions taken
  const actionsDone = Object.values(wizardActionStates).filter(
    (s) => s === "done",
  ).length;
  const actionsPlanned = Object.values(wizardActionStates).filter(
    (s) => s === "planned",
  ).length;

  // Get escalations
  const escalationsDone = Object.entries(wizardEscalations)
    .filter(([k, v]) => v === "done")
    .map(([k]) => getEscalationName(k));
  const escalationsPlanned = Object.entries(wizardEscalations)
    .filter(([k, v]) => v === "planned")
    .map(([k]) => getEscalationName(k));

  // Collect persons from each section
  const reportedStudents = collectPersons("reportedStudentsList");
  const affectedPersons = collectPersons("affectedPersonsList");
  const witnesses = collectPersons("witnessesList");

  // Format person lists
  const formatPersonList = (persons) =>
    persons.length > 0
      ? persons
          .map((p) => `${p.name}${p.class ? " (" + p.class + ")" : ""}`)
          .join(", ")
      : "-";

  document.getElementById("reviewContent").innerHTML = `
 <span class="info-label">Reported Student</span><span class="info-value">${formatPersonList(reportedStudents)}</span>
 <span class="info-label">Affected</span><span class="info-value">${formatPersonList(affectedPersons)}</span>
 <span class="info-label">Witnesses</span><span class="info-value">${formatPersonList(witnesses)}</span>
 <span class="info-label">Category</span><span class="info-value"><span class="cat-icon-inline">${cat.icon}</span>${cat.name}</span>
 <span class="info-label">Specificering</span><span class="info-value">${selectedSubcats.join(", ") || "-"}</span>
 <span class="info-label">Severity</span><span class="info-value">${severityNames[selectedSeverity]}</span>
 <span class="info-label">Date</span><span class="info-value">${document.getElementById("inputDate").value}</span>
 <span class="info-label">Location</span><span class="info-value">${document.getElementById("inputLocation").value}</span>
 <span class="info-label">Actions completed</span><span class="info-value">${actionsDone} pcs</span>
 <span class="info-label">Actions planerade</span><span class="info-value">${actionsPlanned} pcs</span>
 <span class="info-label">Notified</span><span class="info-value">${escalationsDone.length > 0 ? escalationsDone.join(", ") : "None yet"}</span>
 <span class="info-label">To be notified</span><span class="info-value">${escalationsPlanned.length > 0 ? escalationsPlanned.join(", ") : "-"}</span>
 `;

  // Show warning for serious categories
  const showWarning =
    ["violence", "welfare", "extremism", "gang"].includes(cat.id) ||
    selectedSeverity === "critical";
  document.getElementById("reviewWarning").style.display = showWarning
    ? "block"
    : "none";
  if (showWarning) {
    let warningText = "Principal will be notified automatically. ";
    if (cat.id === "welfare")
      warningText +=
        "Consider if welfare report to social services needs to be made.";
    if (cat.id === "extremism" || cat.id === "gang")
      warningText +=
        "Counselor and possibly police/social services should be contacted.";
    document.getElementById("reviewWarningText").textContent = warningText;
  }
}

function getEscalationName(key) {
  const names = {
    mentor: "Mentor",
    headofyear: "Head of Year",
    counselor: "Counselor",
    principal: "Principal",
    guardian: "Guardians",
    socialservices: "Social services",
    police: "Polis",
  };
  return names[key] || key;
}

function resetWizard() {
  currentStep = 1;
  selectedCategory = null;
  selectedSubcats = [];
  selectedSeverity = null;
  wizardActionStates = {};
  wizardEscalations = {};

  // Reset reported students section - keep only first entry
  const reportedList = document.getElementById("reportedStudentsList");
  const reportedEntries = reportedList.querySelectorAll(".person-entry");
  reportedEntries.forEach((entry, idx) => {
    if (idx === 0) {
      entry.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    } else {
      entry.remove();
    }
  });

  // Reset affected persons section - keep only first entry
  const affectedList = document.getElementById("affectedPersonsList");
  const affectedEntries = affectedList.querySelectorAll(".person-entry");
  affectedEntries.forEach((entry, idx) => {
    if (idx === 0) {
      entry.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    } else {
      entry.remove();
    }
  });

  // Reset witnesses section - keep only first entry
  const witnessList = document.getElementById("witnessesList");
  const witnessEntries = witnessList.querySelectorAll(".person-entry");
  witnessEntries.forEach((entry, idx) => {
    if (idx === 0) {
      entry.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    } else {
      entry.remove();
    }
  });

  document.getElementById("inputLocation").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputActions").value = "";
  document.getElementById("inputDate").value = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("inputTime").value = "";

  document
    .querySelectorAll(".category-card")
    .forEach((c) => c.classList.remove("selected"));
  document
    .querySelectorAll(".severity-card")
    .forEach((c) => c.classList.remove("selected"));
  document.getElementById("subcatSection").classList.remove("active");
  document.getElementById("guidanceBox").innerHTML = "";

  // Reset wizard escalation steps
  document
    .querySelectorAll(
      "#wizardEscalationSteps .workflow-step, #externalEscalation .workflow-step",
    )
    .forEach((step) => {
      step.classList.remove("planned", "completed");
      step.querySelector(".step-checkbox").textContent = "";
      step.querySelector(".step-status").className = "step-status waiting";
      step.querySelector(".step-status").textContent = "Not notified";
    });

  updateWizard();
}

function confirmExit() {
  showModal("confirmExitModal");
}

function submitReport() {
  document.getElementById("caseNumber").textContent =
    "INC-2025-00" + (42 + Math.floor(Math.random() * 10));
  showPage("success");
  showToast("Incident documented", "success");
}

function selectSeverity(el, sev) {
  document
    .querySelectorAll(".severity-card")
    .forEach((c) => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedSeverity = sev;
  // Check auto-share requirements
  checkAutoShare();
}

// ==================== AUTO-SHARE LOGIC ====================
// Categories that ALWAYS require auto-share to rektor + mentor
const autoShareCategories = [
  "bullying",
  "violence",
  "welfare",
  "substance",
  "extremism",
  "gang",
  "digital",
];

function shouldAutoShare() {
  // Always auto-share for serious/critical severity
  if (selectedSeverity === "serious" || selectedSeverity === "critical") {
    return true;
  }
  // Always auto-share for certain categories
  if (selectedCategory && autoShareCategories.includes(selectedCategory.id)) {
    return true;
  }
  return false;
}

function getAutoShareReason() {
  const reasons = [];
  if (selectedSeverity === "serious") {
    reasons.push("Severity: Serious");
  }
  if (selectedSeverity === "critical") {
    reasons.push("Severity: Kritisk");
  }
  if (selectedCategory) {
    if (selectedCategory.id === "bullying") {
      reasons.push(
        "Harassment requires principal action (6 kap. 10 § Education Act)",
      );
    }
    if (selectedCategory.id === "violence") {
      reasons.push(
        "Violence/threats require safety measures (Work Environment Act)",
      );
    }
    if (selectedCategory.id === "welfare") {
      reasons.push(
        "Welfare concern may require welfare report (14 kap. 1 § SoL)",
      );
    }
    if (selectedCategory.id === "substance") {
      reasons.push("Drug-related incidents require principal assessment");
    }
    if (selectedCategory.id === "extremism" || selectedCategory.id === "gang") {
      reasons.push("Safety case requires immediate escalation");
    }
  }
  return reasons.join(". ");
}

function checkAutoShare() {
  const warning = document.getElementById("autoShareWarning");
  if (!warning) return;

  if (shouldAutoShare()) {
    const recipients = document.getElementById("autoShareRecipients");
    const reason = document.getElementById("autoShareReason");

    recipients.innerHTML = `
 <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
 <span>✓</span> <strong>Principal</strong> (school management)
 </div>
 <div style="display:flex;align-items:center;gap:0.5rem;">
 <span>✓</span> <strong>Mentor</strong> (student's responsible teacher)
 </div>
 `;
    reason.textContent = getAutoShareReason();
    warning.style.display = "block";

    // Auto-check mentor and principal in escalation
    wizardEscalations.mentor = true;
    wizardEscalations.principal = true;
    updateWizardEscalationDisplay();
  } else {
    warning.style.display = "none";
  }
}

function updateWizardEscalationDisplay() {
  const steps = document.querySelectorAll(
    "#wizardEscalationSteps .workflow-step",
  );
  steps.forEach((step) => {
    const role = step.getAttribute("onclick")?.match(/'(\w+)'/)?.[1];
    if (role && wizardEscalations[role]) {
      step.classList.add("completed");
      step.querySelector(".step-checkbox").textContent = "✓";
      step.querySelector(".step-status").textContent = "Auto-delad";
      step.querySelector(".step-status").className = "step-status done";
    }
  });
  updateWizardEscalationProgress();
}

// ==================== FILE UPLOAD ====================
let uploadedFiles = [];

function handleFileUpload(files) {
  for (let file of files) {
    if (file.size > 10 * 1024 * 1024) {
      showToast("File is too large (max 10 MB)", "error");
      continue;
    }
    uploadedFiles.push(file);
  }
  renderAttachments();
}

function renderAttachments() {
  const list = document.getElementById("attachmentsList");
  const count = document.getElementById("attachmentCount");

  if (uploadedFiles.length === 0) {
    list.innerHTML = "";
    count.textContent = "0 files";
    return;
  }

  count.textContent =
    uploadedFiles.length + " fil" + (uploadedFiles.length > 1 ? "er" : "");
  list.innerHTML = uploadedFiles
    .map(
      (f, i) => `
 <div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;background:#f7fafc;border-radius:6px;margin-bottom:0.5rem;">
 <span>${f.type.includes("image") ? "" : f.type.includes("pdf") ? "" : ""}</span>
 <span style="flex:1;font-size:0.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f.name}</span>
 <span style="font-size:0.75rem;color:var(--text-light);">${(f.size / 1024).toFixed(0)} KB</span>
 <button onclick="removeFile(${i})" style="background:none;border:none;color:var(--error);cursor:pointer;padding:0.25rem;">×</button>
 </div>
 `,
    )
    .join("");
}

function removeFile(index) {
  uploadedFiles.splice(index, 1);
  renderAttachments();
}

// ==================== EHT INTEGRATION ====================
document.addEventListener("DOMContentLoaded", function () {
  const ehtCheckbox = document.getElementById("ehtCheckbox");
  if (ehtCheckbox) {
    ehtCheckbox.addEventListener("change", function () {
      const info = document.getElementById("ehtMeetingInfo");
      if (this.checked) {
        // Calculate next Thursday
        const today = new Date();
        const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
        const nextThursday = new Date(today);
        nextThursday.setDate(today.getDate() + daysUntilThursday);
        const dateStr = nextThursday.toLocaleDateString("sv-SE", {
          weekday: "long",
          day: "numeric",
          month: "numeric",
        });
        document.getElementById("ehtMeetingDate").textContent = dateStr;
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    });
  }
});

// ==================== PURPOSE DROPDOWN ====================
function updatePurposeSelection(value) {
  selectedPurpose = value;
  const desc = document.getElementById("purposeDescription");
  const descriptions = {
    disciplinary:
      "Documentation of disciplinary actions under Chapter 5 Education Act. Retention period: 12 months.",
    harassment:
      "Investigation of harassment under Chapter 6 Section 10. Legal obligation. Retention period: 24 months.",
    safety:
      "Documentation of safety incidents under Work Environment Act. Retention period: 24 months.",
    welfare:
      "Documentation of student welfare concerns. May form basis for welfare report. Retention period: 36 months.",
    quality:
      "Basis for systematic quality work. Anonymized after closure. Retention period: 12 months.",
  };
  if (value && descriptions[value]) {
    desc.textContent = descriptions[value];
    desc.style.display = "block";
  } else {
    desc.style.display = "none";
  }
  // Update retention display
  updateRetentionDisplay();
}

function updateRetentionDisplay() {
  const retention = document.getElementById("retentionPeriod");
  const deletion = document.getElementById("deletionDate");
  const months = retentionMonths[selectedPurpose] || 12;
  const deletionDate = new Date();
  deletionDate.setMonth(deletionDate.getMonth() + months);
  if (retention) retention.textContent = months + " months";
  if (deletion) deletion.textContent = deletionDate.toISOString().split("T")[0];
}

// ==================== TASK FILTERING ====================
function filterTasks(filter, btn) {
  // Update button states
  document.querySelectorAll(".task-filter-btn").forEach((b) => {
    b.classList.remove("active");
    b.classList.add("btn-ghost");
  });
  btn.classList.add("active");
  btn.classList.remove("btn-ghost");

  // Show/hide sections
  document.querySelectorAll(".task-section").forEach((section) => {
    const filters = section.getAttribute("data-filter")?.split(" ") || [];
    if (filter === "all" || filters.includes(filter)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

function updateTaskStatus(select, taskId) {
  const value = select.value;
  showToast(
    "Task status updated to: " + select.options[select.selectedIndex].text,
    "success",
  );
}

// ==================== PARENT CONTACT LOG ====================
function addParentContact() {
  const types = ["Phone call", "Email", "Meeting", "SMS"];
  const type = prompt(
    "Select contact type:\n1. Phone call\n2. Email\n3. Meeting\n4. SMS",
  );
  const notes = prompt("Notes from the contact:");

  if (type && notes) {
    const typeIndex = parseInt(type) - 1;
    const typeLabel = types[typeIndex] || types[0];
    const now = new Date().toLocaleString("sv-SE");

    const log = document.getElementById("parentContactLog");
    const entry = document.createElement("div");
    entry.className = "contact-entry";
    entry.style.cssText =
      "border-left:3px solid var(--primary);padding-left:1rem;margin-bottom:1rem;";
    entry.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:flex-start;">
 <div>
 <strong style="font-size:0.85rem;">${typeLabel}</strong>
 <span style="font-size:0.75rem;color:var(--text-light);margin-left:0.5rem;">${users.find((u) => u.role === currentRole)?.name || "Du"}</span>
 </div>
 <span style="font-size:0.75rem;color:var(--text-light);">${now}</span>
 </div>
 <p style="font-size:0.8rem;color:var(--text);margin-top:0.25rem;">${notes}</p>
 `;
    log.insertBefore(entry, log.firstChild);
    showToast("Contact loggad", "success");
  }
}

// ==================== ADMIN ====================
function renderAdminUsers() {
  document.getElementById("adminUserList").innerHTML = users
    .map(
      (u) => `
 <tr>
 <td>${u.name}</td>
 <td><span class="role-tag ${u.role}">${roleNames[u.role]}</span></td>
 <td>
 <div class="access-tags">
 ${u.access.length ? u.access.map((a) => `<span class="access-tag">${a}</span>`).join("") : '<span class="access-tag">Egna dokumentationer</span>'}
 </div>
 </td>
 <td style="font-size:0.8rem;">${u.email}</td>
 <td><button class="btn btn-sm btn-ghost" onclick="showModal('editUserModal')">Redigera</button></td>
 </tr>
 `,
    )
    .join("");
}

function showAdminTab(elOrTab, tab) {
  // Handle both old and new calling conventions
  let actualTab = tab;
  let el = elOrTab;
  if (typeof elOrTab === "string") {
    actualTab = elOrTab;
    el = null;
  }

  document.querySelectorAll(".admin-tab").forEach((t) => {
    t.style.color = "var(--text-light)";
    t.style.borderBottomColor = "transparent";
  });
  document
    .querySelectorAll(".admin-panel")
    .forEach((p) => (p.style.display = "none"));

  // Find and highlight the correct tab
  const tabs = document.querySelectorAll(".admin-tab");
  const tabIndex = { users: 0, gdpr: 1, statistics: 2, settings: 3 };
  const targetTab = tabs[tabIndex[actualTab]];
  if (targetTab) {
    targetTab.style.color = "var(--primary)";
    targetTab.style.borderBottomColor = "var(--primary)";
  }

  document.getElementById("panel-" + actualTab).style.display = "block";
}

// ==================== GDPR FUNCTIONS ====================
let selectedPurpose = null;

function selectPurpose(el, purpose) {
  selectedPurpose = purpose;
  document.querySelectorAll(".purpose-option").forEach((o) => {
    o.style.borderColor = "#9ae6b4";
    o.style.background = "white";
  });
  el.style.borderColor = "var(--primary)";
  el.style.background = "rgba(56, 108, 112, 0.05)";

  // Update retention period based on purpose
  const retentionMonths = {
    disciplinary: 12,
    harassment: 36,
    safety: 24,
    welfare: 36,
    quality: 12,
  };

  const months = retentionMonths[purpose] || 12;
  document.getElementById("retentionPeriod").textContent = months + " months";

  const deletionDate = new Date();
  deletionDate.setMonth(deletionDate.getMonth() + months);
  document.getElementById("deletionDate").textContent = deletionDate
    .toISOString()
    .split("T")[0];
}

function exportStudentData() {
  showToast("Preparing data export...", "success");
}

// ==================== MODALS ====================
function showModal(id) {
  document.getElementById(id).classList.add("active");
  if (id === "editUserModal" || id === "addUserModal") renderAdminUsers();
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

document.querySelectorAll(".modal-overlay").forEach((m) => {
  m.addEventListener("click", function (e) {
    if (e.target === this) this.classList.remove("active");
  });
});

// ==================== ACTIONS ====================
function addAction() {
  const select = document.getElementById("actionSelect");
  if (!select.value) {
    showToast("Select an action", "error");
    return;
  }
  showToast("Action added", "success");
  closeModal("addActionModal");
  select.value = "";
  document.getElementById("actionNote").value = "";
}

function closeCase() {
  showToast("Case marked as closed", "success");
}

function generateDoc(type) {
  const names = {
    welfare: "Welfare Report",
    police: "Police Report",
    investigation: "Investigation",
    warning: "Written warning",
    parent: "Brev",
    plan: "Action program",
  };
  showToast("Creating " + names[type] + "...", "success");
  closeModal("documentModal");
}

function filterByUrgent() {
  document.getElementById("statusFilter").value = "open";
  document.getElementById("severityFilter").value = "critical";
  showPage("list");
}

function filterByFollowup() {
  document.getElementById("statusFilter").value = "followup";
  showPage("list");
}

function filterByMonth() {
  // Reset all filters and show all incidents from this month
  document.getElementById("statusFilter").value = "";
  document.getElementById("severityFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  showPage("list");
  showToast("Showing all cases this month", "info");
}

function filterByOpen() {
  document.getElementById("statusFilter").value = "open";
  document.getElementById("severityFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  showPage("list");
}

function filterByCritical() {
  document.getElementById("severityFilter").value = "critical";
  document.getElementById("statusFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  showPage("list");
}

function filterByClosed() {
  document.getElementById("statusFilter").value = "closed";
  document.getElementById("severityFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  showPage("list");
}

// ==================== WORKFLOW MANAGEMENT ====================

// Cycle through action states: none -> planned -> done -> na -> none
function cycleActionState(element) {
  const states = ["", "state-planned", "state-done", "state-na"];
  const icons = ["", "◐", "✓", "–"];
  const dateTexts = [
    "",
    "Planned",
    new Date().toISOString().split("T")[0],
    "Not applicable",
  ];

  let currentIndex = 0;
  for (let i = 0; i < states.length; i++) {
    if (states[i] && element.classList.contains(states[i])) {
      currentIndex = i;
      break;
    }
  }

  // Remove current state
  states.forEach((s) => {
    if (s) element.classList.remove(s);
  });

  // Move to next state
  const nextIndex = (currentIndex + 1) % states.length;
  if (states[nextIndex]) {
    element.classList.add(states[nextIndex]);
  }

  // Update icon
  element.querySelector(".action-toggle").textContent = icons[nextIndex];

  // Update date
  const dateEl = element.querySelector(".action-date");
  if (nextIndex === 2) {
    // done
    dateEl.textContent = new Date().toISOString().split("T")[0];
  } else if (nextIndex === 1) {
    // planned
    dateEl.textContent = "Planned";
  } else if (nextIndex === 3) {
    // na
    dateEl.textContent = "Not applicable";
  } else {
    dateEl.textContent = "";
  }

  // Update progress counter
  updateActionProgress();

  showToast("Action updated", "success");
}

// Toggle escalation step
function toggleEscalationStep(element, index) {
  const states = ["", "planned", "completed"];
  const icons = ["", "◐", "✓"];
  const statusClasses = ["waiting", "pending", "done"];
  const statusTexts = [
    "Waiting",
    "In progress",
    "Completed " +
      new Date().toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  ];

  let currentIndex = 0;
  if (element.classList.contains("planned")) currentIndex = 1;
  if (element.classList.contains("completed")) currentIndex = 2;

  // Remove current state
  element.classList.remove("planned", "completed");

  // Move to next state
  const nextIndex = (currentIndex + 1) % states.length;
  if (states[nextIndex]) {
    element.classList.add(states[nextIndex]);
  }

  // Update icon
  element.querySelector(".step-checkbox").textContent = icons[nextIndex];

  // Update status
  const statusEl = element.querySelector(".step-status");
  statusEl.className = "step-status " + statusClasses[nextIndex];
  statusEl.textContent = statusTexts[nextIndex];

  // Update progress and chain
  updateEscalationProgress();

  showToast("Escalation step updated", "success");
}

function updateActionProgress() {
  const items = document.querySelectorAll("#actionChecklistItems .action-item");
  const done = document.querySelectorAll(
    "#actionChecklistItems .action-item.state-done",
  ).length;
  const total = items.length;
  document.getElementById("actionProgress").textContent =
    done + " of " + total + " completed";
}

function updateEscalationProgress() {
  const steps = document.querySelectorAll("#escalationSteps .workflow-step");
  const done = document.querySelectorAll(
    "#escalationSteps .workflow-step.completed",
  ).length;
  const total = steps.length;
  document.getElementById("escalationProgress").textContent =
    done + " of " + total + " completed";

  // Update chain badges
  const badges = document.querySelectorAll(
    "#escalationChain .escalation-badge",
  );
  steps.forEach((step, i) => {
    if (i + 1 < badges.length) {
      // Skip "Reporter" badge
      const badge = badges[i + 1];
      badge.classList.remove("done", "active");
      if (step.classList.contains("completed")) {
        badge.classList.add("done");
      } else if (step.classList.contains("planned")) {
        badge.classList.add("active");
      }
    }
  });
}

// ==================== EHT PAGE ====================
function showEhtTab(tab) {
  // Update tab buttons
  document.querySelectorAll(".eht-tab").forEach((t) => {
    t.classList.remove("active");
  });
  document
    .getElementById("ehtTab" + tab.charAt(0).toUpperCase() + tab.slice(1))
    .classList.add("active");

  // Show correct panel
  document
    .querySelectorAll(".eht-panel")
    .forEach((p) => (p.style.display = "none"));
  document.getElementById(
    "ehtPanel" + tab.charAt(0).toUpperCase() + tab.slice(1),
  ).style.display = "block";
}

let currentEhtCaseId = null;
let currentEhtStudent = "";

function showEhtDecisionModal(caseId, studentName) {
  currentEhtCaseId = caseId;
  currentEhtStudent = studentName;
  document.getElementById("ehtDecisionStudent").textContent = studentName;
  document.getElementById("ehtDecisionCase").textContent =
    "INC-2025-00" + (40 + caseId);
  document.getElementById("ehtDecisionText").value = "";
  showModal("ehtDecisionModal");
}

function saveEhtDecision() {
  const decision = document.getElementById("ehtDecisionText").value;
  const responsible = document.getElementById("ehtDecisionResponsible").value;
  const followup = document.getElementById("ehtDecisionFollowup").value;
  const addToTimeline = document.getElementById(
    "ehtDecisionAddToTimeline",
  ).checked;

  if (!decision) {
    showToast("Enter a decision", "error");
    return;
  }

  closeModal("ehtDecisionModal");
  showToast("EHT Decision saved for " + currentEhtStudent, "success");

  // In a real system, this would save to database and optionally add to timeline
}

function completeEhtMeeting() {
  if (
    confirm("Do you want to complete the EHT meeting and save all decisions?")
  ) {
    showToast("EHT meeting completed. Decisions saved.", "success");
  }
}

function printEhtAgenda() {
  window.print();
}

function saveEhtSettings() {
  showToast("EHT settings saved", "success");
}

function showEhtMeetingDetails(date) {
  showToast("Showing meeting from " + date, "info");
  // In a real system, this would show meeting details
}

// ==================== CASE NOTES ====================
function addCaseNote() {
  document.getElementById("caseNoteText").value = "";
  showModal("addNoteModal");
}

function saveCaseNote() {
  const noteText = document.getElementById("caseNoteText").value;

  if (!noteText.trim()) {
    showToast("Enter a note", "error");
    return;
  }

  const now = new Date();
  const dateStr =
    now.toLocaleDateString("sv-SE") +
    " " +
    now.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const userName = users.find((u) => u.role === currentRole)?.name || "Du";

  const log = document.getElementById("caseNotesLog");
  const entry = document.createElement("div");
  entry.className = "note-entry";
  entry.style.cssText =
    "border-left:3px solid var(--primary);padding-left:1rem;margin-bottom:1rem;";
  entry.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:flex-start;">
 <strong style="font-size:0.85rem;">${userName}</strong>
 <span style="font-size:0.75rem;color:var(--text-light);">${dateStr}</span>
 </div>
 <p style="font-size:0.8rem;color:var(--text);margin-top:0.25rem;">${noteText}</p>
 `;
  log.insertBefore(entry, log.firstChild);

  closeModal("addNoteModal");
  showToast("Note added", "success");
}

// ==================== TOAST ====================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
