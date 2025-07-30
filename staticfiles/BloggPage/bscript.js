// Check for saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("switch").checked = true;
  }

  const toggleSwitch = document.getElementById("switch");
  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});