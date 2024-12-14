const translations = {
  az: {},
  ru: {},
  en: {}
};

function changeLanguage(language) {
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
