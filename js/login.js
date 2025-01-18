function openLogin() {
  document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});


window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

document.querySelector(".form_login").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = event.target.querySelector("input[type='email']").value;
  const password = event.target.querySelector("input[type='password']").value;

  const formData = {
    email: email,
    password: password,
  };

  console.log("Form Data:", formData);
  localStorage.setItem("user", JSON.stringify(formData));
  modal.classList.add("hidden");
});
