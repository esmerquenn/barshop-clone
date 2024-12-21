




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


// dropdown_li_lang2.addEventListener("click", () => {
  
// });

// Sayfa yüklendiğinde dropdown'ları başlat
document.addEventListener("DOMContentLoaded", initializeDropdowns);

// Ekran boyutu değiştiğinde dropdown'ları yeniden başlat
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

// import 'aos/dist/aos.css';

// // AOS JS
// import AOS from 'aos';

// // Başlatma
// AOS.init();

// AOS.init({
//   duration: 1000, // Animasyon süresi (ms cinsinden)
//   once: true, // Animasyon bir kez mi çalışacak?
// });