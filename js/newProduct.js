const newProduct = {
  title: "Kofe Həzzini Kəşf Edin",
  description: "Yeni kofe məhsulumuz sizin günə enerji ilə başlamanızı təmin edir.",
  image: "./img/7.jpg",
  link: "details.html?id=4",
};

// Yeni məhsul məlumatını göstərmək funksiyası
function renderNewProduct(product) {
  // Başlıq
  const titleElement = document.querySelector(".titleElement");
  titleElement.textContent = product.title;

  // Təsvir
  const descriptionElement = document.querySelector(".descriptionElement");
  descriptionElement.textContent = product.description;

  // Ətraflı bax düyməsi
  const buttonElement = document.querySelector(".buttonElement");
  buttonElement.href = product.link;

  // Şəkil
  const imageElement = document.querySelector(".imageElement");
  imageElement.src = product.image;
  imageElement.alt = product.title;
}

renderNewProduct(newProduct);
