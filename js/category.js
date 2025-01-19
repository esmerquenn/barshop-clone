const categories = document.querySelector(".categories");
const cards = document.querySelector(".cards");
const carousel_discount = document.querySelector("#carousel_discount");

let allData = {};

function fetchData() {
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showCategories(data);
      showProduct(3);
      getDiscountCarousel();
      bestseller();
    });
}
fetchData();
function bestseller() {
  const randomProducts = allData.products.sort(() => 0.5 - Math.random()).slice(0, 4);
  randomProducts.forEach((product, index) => {
    // ID-ləri dinamik seçirik
    const imgElement = document.getElementById(`best_seller_img_${index + 1}`);
    const titleElement = document.getElementById(`best_seller_title_${index + 1}`);
    const priceElement = document.getElementById(`best_seller_price_${index + 1}`);

    // HTML elementlərini doldururuq
    if (imgElement) imgElement.src = `img/${product.img}`;
    if (titleElement) titleElement.textContent = product.name;
    if (priceElement) priceElement.textContent = `${product.price} ₼`;
  });
}
// ////////////////////////////////
function getDiscountCarousel() {
  const discountItems = allData?.products
    .filter((item) => item.discount > 0)
    .map((item) => {
      const shortenedDescription = item.description.split(" ").slice(0, 2).join(" ") + "...";

      return ` <div  onclick="goToDetailPage('${item.id}')" data-aos="fade-up" class="item grid place-items-center grid1-con">
        <div style="background: url(../img/${item.img}) center/cover no-repeat;" class="grid1 grid-slide font-montserrat">
          <span class="bg-green text-white px-4 py-1">${item.discount}%</span>
          <div class="w-full flex flex-col justify-center items-center">
            <h4 class="bg-brown text-white text-xl mb-2 py-1 px-3">${item.name}</h4>
            <p class="text-black font-medium text-lg">${shortenedDescription}</p>
          </div>
        </div>
      </div>`;
    })
    .join("");

  carousel_discount.innerHTML += discountItems;
  initializeCarousel();
}

function initializeCarousel() {
  $(carousel_discount).owlCarousel({
    loop: true,
    margin: 50,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
}
// // //////////////////////////////////////////////////////////////
function showCategories(data) {
  let cat = "";
  data.categories?.forEach((element, i) => {
    cat += `<div class="swiper-slide text-sm md:text-base text-center" id="a${element.id}" onclick="showProduct('${element.id}', '${i}')">
    <button>${element.name}</button>
    </div>`;
  });
  categories.innerHTML += cat;
}

function write_to_card(product, price, stock, category) {
  
  cards.innerHTML += `<div
                      onclick="goToDetailPage('${product.id}')"
                      class="box relative text-center   shadow-md overflow-hidden transition-transform transform hover:scale-105"
                      style="max-height: 380px; min-height: 340px;"
                    >
                      <div class="box-div h-2/3 w-full overflow-hidden relative">
                        <img
                          class="box-img w-full h-full object-cover"
                          src="img/${product.img}"
                          alt="product"
                        />
                        ${
                          product.isnew
                            ? ` <div
                                class="bg-green text-white text-[10px] lg:text-xs flex items-center justify-center uppercase gap-1 rounded-full w-7 lg:w-10 h-7 lg:h-10 absolute top-10 lg:top-2 left-2">
                                  new
                                </div> `
                            : ""
                        }
                      ${
                        product.discount != 0
                          ? ` <div class="bg-red-600 text-white text-[10px] lg:text-xs flex items-center justify-center uppercase gap-1 rounded-full w-7 lg:w-10 h-7 lg:h-10 absolute  left-2 ${
                              product.isnew ? "top-[70px] lg:top-14 " : "top-10 lg:top-2"
                            } ">
                      ${product.discount}
                      <i class="fa-solid fa-percent"></i>
                    </div> `
                          : ""
                      }
                      ${
                        product.stock
                          ? ` <div onclick="sendBasket('${product.id}')" class="bg-white my_absolute">
                        <i class="fa-solid fa-cart-shopping text-brown"></i>
                      </div>`
                          : ""
                      }
                     
                      </div>
                      <div class=" p-1 sm:p-4 h-1/3 flex flex-col justify-between">
                        <h5 class="text-base font-montserrat font-semibold text-brown capitalize truncate">
                          ${product.name}
                        </h5>
                        <h6 class="font-montserrat capitalize text-sm text-gray-500 truncate">
                          ${category.name}
                        </h6>
                        ${stock}
                        <span class="font-bold font-montserrat text-base text-brown">
                          ${price ? price : ""}
                        </span>
                      </div>
                    </div>`;
}

// // ///////////////////////////////////////////////////////////

function animationProduct() {
  const boxes = cards.querySelectorAll(".box");

  boxes.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 100);
  });
}

// // /////////////////////////////////////////////////////////

let currentPage = 1;
const itemsPerPage = 4;

let currentCategoryId = null; // Mevcut kategori ID'sini takip eden global değişken
function showProduct(id, slideIndex) {
  const slidesPerView = swiper.params.slidesPerView;
  const totalSlides = swiper.slides.length;

  // Slide pozisyonunu ayarla
  if (slideIndex === 0 || slideIndex === totalSlides - 1) {
    swiper.slideTo(slideIndex);
    return;
  }

  const targetIndex = Math.max(
    0,
    Math.min(slideIndex - Math.floor(slidesPerView / 2), totalSlides - slidesPerView)
  );
  swiper.slideTo(targetIndex);
  if (id !== currentCategoryId) {
    currentPage = 1; 
    currentCategoryId = id; 
  }
  cards.innerHTML = ""; 

  let btn = categories.querySelector(`#a${id}`);
  categories.querySelector(".btn-active")?.classList.remove("btn-active");
  btn.classList.add("btn-active");

  let data = allData.products.filter((item) => item.category_id == Number(id));

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Ürün kartlarını oluştur
  paginatedData.forEach((product) => {
    let category = allData.categories.find((item) => item.id == product.category_id);
    const price = product.discount
      ? ` ${(product.price - (product.price / 100) * product.discount).toFixed(2)}₼ <s class="!text-red-600 ml-2 text-sm">${
          product.price
        }₼</s>`
      : `${product.price}₼`;
    let stock =
      product.stock != 0
        ? `<h6 data-key="inStock" class="font-montserrat text-green capitalize  text-sm">Stokdadır</h6>`
        : `<h6 data-key="outOfStock" class="font-montserrat  text-red-500 capitalize  text-sm">Anbarda tükənmişdir</h6>`;
    write_to_card(product, price, stock, category);
  });

  // Pagination'ı oluştur
  renderPagination(totalPages, id);

  animationProduct();
}


function renderPagination(totalPages, categoryId) {

  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button
      id="page-${i}"
      class="px-4 py-2 mx-1 border rounded ${
        currentPage === i ? "bg-brown text-white" : "bg-white text-brown"
      } hover:bg-brown hover:text-white transition"
      onclick="changePage(${i}, ${categoryId})">
      ${i}
    </button>`;
  }

  paginationContainer.innerHTML = paginationHTML;
}

function changePage(page, categoryId) {
  currentPage = page; 

  const buttons = document.querySelectorAll("#pagination button");
  buttons.forEach((button) => {
    const pageNum = parseInt(button.innerText, 10);
    if (pageNum === currentPage) {
      button.classList.add("bg-brown", "text-white");
      button.classList.remove("bg-white", "text-brown");
    } else {
      button.classList.add("bg-white", "text-brown");
      button.classList.remove("bg-brown", "text-white");
    }
  });

  const categoryButton = document.querySelector(`#a${categoryId}`);
  categoryButton?.classList.add("btn-active");
  showProduct(categoryId);
}

