const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

toggleSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

const myDate = document.querySelector("#datee");
if (myDate) {
  myDate.textContent = new Date().getFullYear();
}


// ✅ Handle form with AJAX + SweetAlert
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: {
        "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
        "X-Requested-With": "XMLHttpRequest", // important to identify AJAX in views.py
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log("🔄 Response data:", data);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent successfully!",
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong.",
          showConfirmButton: true
        });
      }
    })
    .catch(error => {
      console.error("❌ Fetch Error:", error);
      Swal.fire({
        icon: "error",
        title: "Request failed.",
        text: error.toString(),
        confirmButtonText: "OK"
      });
    });
  });
});
