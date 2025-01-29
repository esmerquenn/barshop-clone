const menu = document.querySelector(".hidden_dropdown");
function isMobileView() {
  return window.innerWidth < 992;
}
function closeDropdown() {
  if (isMobileView()) {
    menu.classList.toggle("dropdown");
  }
}
const drop_div_lang2 = document.querySelector(".drop_div_lang2");
function openLangMobile() {
  drop_div_lang2.classList.toggle("drop_active2");
}
let lastScrollTop = 0;
// const bottomBar = document.getElementById("bottomBar");
// window.addEventListener("scroll", () => {
//   // if (currentScroll > 90) {
//     bottomBar.classList.remove("bottom-[-100%]");
//     if (bottomBar) return bottomBar.classList.add("bottom-0");
//   // } else {
//   //   bottomBar.classList.remove("bottom-0");
//   //   bottomBar.classList.add("bottom-[-100%]");
//   // }

//   // lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// });
// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//   if (currentScroll > 90) {
//     bottomBar.classList.remove("bottom-[-100%]");
//     bottomBar.classList.add("bottom-0");
//   } else {
//     bottomBar.classList.remove("bottom-0");
//     bottomBar.classList.add("bottom-[-100%]");
//   }

//   lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// });

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

// CATEGORY SUB MENUS

const allcategories = [
  {
    id: 1,
    name: "Qəhvə",
    slug: "qehve",
    subcategories: [
      {
        id: 1,
        name: "Arabic Qəhvə",
        slug: "arabic-qehve",
      },
      {
        id: 2,
        name: "Türk Qəhvəsi",
        slug: "turk-qehvesi",
      },
      {
        id: 3,
        name: "Qəhvə Çayı",
        slug: "qehve-cayi",
      },
    ],
  },
  {
    id: 2,
    name: "Qəhvə maşınları",
    slug: "qehve-masinlari",
    subcategories: [
      {
        id: 1,
        name: "Professional Qəhvə Aparatları",
        slug: "professional-qehve-aparatlari",
      },
      {
        id: 2,
        name: "Avtomatik Qəhvə Aparatları",
        slug: "avtomatik-qehve-aparatlari",
      },
      {
        id: 3,
        name: "Qəhvədəmləyən Aparatlar",
        slug: "qehvedemleyen-aparatlar",
      },
      {
        id: 4,
        name: "Kapsul Aparatları",
        slug: "kapsul-aparatlari",
      },
      {
        id: 5,
        name: "Qəhvə Üyüdənlər",
        slug: "qehve-uyudenler",
      },
      {
        id: 6,
        name: "Süd Köpükləndiricilər",
        slug: "sud-kopuklendiriciler",
      },
    ],
  },
  {
    id: 3,
    name: "Aksesuarlar",
    slug: "aksesuarlar",
    subcategories: [
      {
        id: 1,
        name: "Digər aksessuar və komponentlər",
        slug: "diger-aksessuar-ve-komponentler",
      },
      {
        id: 2,
        name: "Kağız filterlər",
        slug: "kagiz-filterler",
      },
      {
        id: 3,
        name: "Əsas barista aksesuarları",
        slug: "esas-barista-aksessuarlar",
      },
      {
        id: 4,
        name: "Avadanlıqlara qulluq məhsulları",
        slug: "avadanliqlara-qulluq-mehsullari",
      },
    ],
  },
  {
    id: 4,
    name: "Əlavələr",
    slug: "elaveler",
    subcategories: [
      {
        id: 1,
        name: "Qida Əlavələri",
        slug: "qida-elaveleri",
      },
      {
        id: 2,
        name: "Sirop",
        slug: "sirop",
      },
    ],
  },
];

function populateDropdown(categoryId, dropdownSelector) {
  const category = allcategories.find((cat) => cat.id === categoryId);
  if (!category || !category.subcategories) return;

  const dropdown = document.querySelector(dropdownSelector);
  if (!dropdown) return;

  category.subcategories.forEach((subcategory) => {
    const li = document.createElement("li");
    li.className = "pt-1";
    li.innerHTML = `
      <a href="/products.html?category=${category.slug}&subcategory=${subcategory.slug}" class="capitalize inline-block border-b-2 border-transparent font-extrabold text-brown transition-all duration-300">
        ${subcategory.name}
      </a>`;
    dropdown.appendChild(li);
  });
}

// Dropdown menyularını doldurmaq
populateDropdown(1, ".coffee_sub");
populateDropdown(2, ".coffee_machine_sub");
populateDropdown(3, ".accessories_sub");
populateDropdown(4, ".others_sub");

const messageIcon = document.getElementById("message-icon");
const iconContainer = document.getElementById("icon-container");

messageIcon.addEventListener("click", () => {
  iconContainer.classList.toggle("active");
});
