// const dropdown_li = document.querySelector(".dropdown_li");
// const dropdown_li_lang = document.querySelector(".dropdown_li_lang");
// const dropdown_li_lang2 = document.querySelector(".dropdown_li_lang2");
// const drop_div = document.querySelector(".drop_div");
// const drop_div_lang = document.querySelector(".drop_div_lang");
// const drop_div_lang2 = document.querySelector(".drop_div_lang2");
const menu = document.querySelector(".hidden_dropdown");

// function closeDropdown() {
//   if (window.innerWidth < 992) {
//     menu.classList.toggle("dropdown");
//   }
// }

// if (window.innerWidth > 992) {
//   dropdown_li.addEventListener("mouseenter", () => {
//     drop_div.classList.add("drop_active");
//   });
//   dropdown_li.addEventListener("mouseleave", () => {
//     drop_div.classList.remove("drop_active");
//   });
//   dropdown_li_lang.addEventListener("mouseenter", () => {
//     drop_div_lang.classList.add("drop_active");
//   });
//   dropdown_li_lang.addEventListener("mouseleave", () => {
//     drop_div_lang.classList.remove("drop_active");
//   });
// } else {
//   dropdown_li.addEventListener("click", () => {
//     drop_div.classList.toggle("drop_active");
//   });
//   dropdown_li_lang2.addEventListener("click", () => {
//     drop_div_lang2.classList.toggle("drop_active2");
//   });
// }
function isMobileView() {
  return window.innerWidth < 992;
}
function closeDropdown() {
  isMobileView() && menu.classList.toggle("dropdown");
}

function setupDropdownEvents(dropdown, target, eventType, className) {
  dropdown.addEventListener(eventType, () => target.classList.toggle(className));
}

function setupDesktopDropdowns(elements) {
  setupDropdownEvents(elements.dropdown_li, elements.drop_div, "mouseenter", "drop_active");
  setupDropdownEvents(elements.dropdown_li, elements.drop_div, "mouseleave", "drop_active");

  setupDropdownEvents(elements.dropdown_li_lang, elements.drop_div_lang, "mouseenter", "drop_active");
  setupDropdownEvents(elements.dropdown_li_lang, elements.drop_div_lang, "mouseleave", "drop_active");
}

function setupMobileDropdowns(elements) {
  setupDropdownEvents(elements.dropdown_li, elements.drop_div, "click", "drop_active");
  setupDropdownEvents(elements.dropdown_li_lang2, elements.drop_div_lang2, "click", "drop_active2");
}

function initializeDropdowns(elements) {
  if (isMobileView()) {
    setupMobileDropdowns(elements);
  } else {
    setupDesktopDropdowns(elements);
  }
}

const dropdownElements = {
  dropdown_li: document.querySelector(".dropdown_li"),
  dropdown_li_lang: document.querySelector(".dropdown_li_lang"),
  dropdown_li_lang2: document.querySelector(".dropdown_li_lang2"),
  drop_div: document.querySelector(".drop_div"),
  drop_div_lang: document.querySelector(".drop_div_lang"),
  drop_div_lang2: document.querySelector(".drop_div_lang2"),
};

initializeDropdowns(dropdownElements);

// /////////////////////////////////
const lang1 = document.querySelector("#lang");
const lang2 = document.querySelector("#lang2");
function changeLanguage(val) {
  const lang = isMobileView() ? lang2 : lang1;

  console.log("beli bu valdi", val);

  lang.innerHTML = val;
}
