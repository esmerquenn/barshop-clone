const menu = document.querySelector(".hidden_dropdown");

function closeDropdown() {
  if (window.innerWidth < 992) {
    menu.classList.toggle("dropdown");
  }
}
const drop_div_lang2 = document.querySelector(".drop_div_lang2");
function openLangMobile() {
  console.log("salam");
  drop_div_lang2.classList.toggle("drop_active2");
}
let lastScrollTop = 0;
const bottomBar = document.getElementById("bottomBar");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > window.innerHeight/2) {
    bottomBar.classList.remove("bottom-[-100%]");
    bottomBar.classList.add("bottom-0");
  } else {
    bottomBar.classList.remove("bottom-0");
    bottomBar.classList.add("bottom-[-100%]");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

function isMobileView() {
  return window.innerWidth < 992;
}

function toggleDropdown(event, dropdownClass) {
  const dropdown = event.currentTarget.querySelector(dropdownClass);
  if (dropdown) {
    dropdown.classList.toggle("drop_active");
  }
}

function initializeDropdowns() {
  const dropdownItems = document.querySelectorAll(".dropdown_li, .dropdown_li_elaveler, .dropdown_li_lang");

  dropdownItems.forEach((item) => {
    if (isMobileView()) {
      item.addEventListener("click", (event) => {
        toggleDropdown(event, ".drop_div, .drop_div_elaveler, .drop_div_lang");
      });
    } else {
      item.addEventListener("mouseenter", (event) => {
        const dropdown = event.currentTarget.querySelector(".drop_div, .drop_div_elaveler, .drop_div_lang");
        if (dropdown) dropdown.classList.add("drop_active");
      });

      item.addEventListener("mouseleave", (event) => {
        const dropdown = event.currentTarget.querySelector(".drop_div, .drop_div_elaveler, .drop_div_lang");
        if (dropdown) dropdown.classList.remove("drop_active");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeDropdowns);

window.addEventListener("resize", () => {
  initializeDropdowns();
});

const lang1 = document.querySelector("#lang");
const lang2 = document.querySelector("#lang2");
function changeLanguage(val) {
  const lang = isMobileView() ? lang2 : lang1;

  console.log("beli bu valdi", val);

  lang.innerHTML = val;
}


