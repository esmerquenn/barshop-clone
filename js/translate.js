// const translations = {
//   az: {},
//   ru: {},
//   en: {}
// };
const translations = {
  az: {
    home: "ANA SƏHİFƏ",
    coffee: "qəhvə",
    "coffee-machines": "qəhvə maşınları",
    accessories: "aksesuarlar",
    addons: "əlavələr",
    about: "haqqımızda",
    contact: "ƏLAQƏ",
    info: "Məlumat",
    language: "az",
  },
  ru: {
    home: "ГЛАВНАЯ",
    coffee: "кофе",
    "coffee-machines": "кофемашины",
    accessories: "аксессуары",
    addons: "добавки",
    about: "о нас",
    contact: "КОНТАКТ",
    info: "Информация",
    language: "ру",
  },
  en: {
    home: "HOME",
    coffee: "coffee",
    "coffee-machines": "coffee machines",
    accessories: "accessories",
    addons: "addons",
    about: "about us",
    contact: "CONTACT",
    info: "Information",
    language: "en",
  },
};
const lang1 = document.querySelector("#lang");
const lang2 = document.querySelector("#lang2");
function changeLanguage(language) {
  const lang = isMobileView() ? lang2 : lang1;

  console.log("beli bu valdi", language);

  lang.innerHTML = language;
  localStorage.setItem("selectedLanguage", language);

  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    element.innerHTML = translations[language][key];
  });
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  updateContent(page, language);
}

document.addEventListener("DOMContentLoaded", function () {
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "AZ"; // Varsayılan dil 'az'

  // Seçilen dili sayfaya uygula
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    element.innerHTML = translations[selectedLanguage][key];
  });

  // Eğer bir dil seçilmişse, dil seçim menüsünü de güncelle
  const selectedElement = document.querySelector("[x-text='selected === '' ? 'AZ' : selected']");
  if (selectedElement) {
    selectedElement.textContent = selectedLanguage.toUpperCase();
  }
});
