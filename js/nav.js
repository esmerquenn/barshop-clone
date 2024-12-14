const dropdown_li = document.querySelector(".dropdown_li");
const dropdown_li_lang = document.querySelector(".dropdown_li_lang");
// const dropdown_li_services = document.querySelector(".dropdown_li_services");
// const dropdown_li_product = document.querySelector(".dropdown_li_product");
const drop_div = document.querySelector(".drop_div");
const drop_div_lang = document.querySelector(".drop_div_lang");
// const drop_div_services = document.querySelector(".drop_div_services");
// const drop_div_product = document.querySelector(".drop_div_product");
const menu = document.querySelector(".hidden_dropdown");
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
};

function closeDropdown() {
  if (window.innerWidth < 992) {
    menu.classList.toggle("dropdown");
  }
}

if (window.innerWidth > 992) {
  dropdown_li.addEventListener("mouseenter", () => {
    drop_div.classList.add("drop_active");
  });
  dropdown_li.addEventListener("mouseleave", () => {
    drop_div.classList.remove("drop_active");
  });
  dropdown_li_lang.addEventListener("mouseenter", () => {
    drop_div_lang.classList.add("drop_active");
  });
  dropdown_li_lang.addEventListener("mouseleave", () => {
    drop_div_lang.classList.remove("drop_active");
  });
  // dropdown_li_product.addEventListener("mouseenter", () => {
  //   drop_div_product.classList.add("drop_active");
  // });
  // dropdown_li_services.addEventListener("mouseenter", () => {
  //   drop_div_services.classList.add("drop_active");
  // });
  // dropdown_li_product.addEventListener("mouseleave", () => {
  //   drop_div_product.classList.remove("drop_active");
  // });
  // dropdown_li_services.addEventListener("mouseleave", () => {
  //   drop_div_services.classList.remove("drop_active");
  // });
} else {
  dropdown_li.addEventListener("click", () => {
    drop_div.classList.toggle("drop_active");
  });
  // dropdown_li_services.addEventListener("click", () => {
  //   drop_div_services.classList.toggle("drop_active");
  // });
  // dropdown_li_product.addEventListener("click", () => {
  //   drop_div_product.classList.toggle("drop_active");
  // });
}
