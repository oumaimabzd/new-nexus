/* =========================================================
   login.js — Simple auth (Admin/Mentor) + redirect
========================================================= */

const USERS = [
  { role: "admin", username: "admin", password: "admin" },
  { role: "mentor", username: "mentor", password: "mentor" },
];

const form = document.getElementById("loginForm");
const userEl = document.getElementById("email"); // keeping same id from HTML
const passEl = document.getElementById("password");

const rememberBtn = document.getElementById("rememberBtn");
const errorBox = document.getElementById("errorBox");
const errorMsg = document.getElementById("errorMsg");

const LS_KEY = "sn_login_remember";

/* Restore remembered */
(function restoreRemembered() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved?.username) userEl.value = saved.username;
    if (saved?.remember === true)
      rememberBtn.setAttribute("aria-pressed", "true");
  } catch (_) {}
})();

/* Toggle remember */
rememberBtn.addEventListener("click", () => {
  const isOn = rememberBtn.getAttribute("aria-pressed") === "true";
  rememberBtn.setAttribute("aria-pressed", String(!isOn));
});

/* Fake forgot + signup */
document.getElementById("forgotLink").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Password reset flow would start here.");
});

document.getElementById("signupLink").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Accounts are created by your school admin.");
});

/* Optional secondary login */
document.getElementById("secondaryLogin").addEventListener("click", () => {
  alert("Secondary login method (SSO / municipality ID / etc.).");
});

function showError(message) {
  errorMsg.textContent = message;
  errorBox.hidden = false;
}

function clearError() {
  errorBox.hidden = true;
  errorMsg.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const username = (userEl.value || "").trim().toLowerCase();
  const password = passEl.value || "";

  if (!username || !password) {
    showError("Please enter your username and password.");
    return;
  }

  const match = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!match) {
    showError("Incorrect username or password.");
    return;
  }

  // Save session info
  localStorage.setItem("sn_user_role", match.role);
  localStorage.setItem("sn_user_username", match.username);

  // Remember me
  const remember = rememberBtn.getAttribute("aria-pressed") === "true";
  if (remember) {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ remember: true, username: match.username })
    );
  } else {
    localStorage.removeItem(LS_KEY);
  }

  // Redirect to dashboard
  window.location.href = "index.html";
});
