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
    });
}
fetchData();

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

function write_to_card(product, price, stock) {
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
                      <div onclick="sendBasket('${product.id}')" class="bg-white my_absolute">
                        <i class="fa-solid fa-cart-shopping text-brown"></i>
                      </div>
                      </div>
                      <div class=" p-1 sm:p-4 h-1/3 flex flex-col justify-between">
                        <h5 class="text-base font-montserrat font-semibold text-brown capitalize truncate">
                          ${product.name}
                        </h5>
                        <h6 class="font-montserrat capitalize text-sm text-gray-500 truncate">
                          category
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

function showProduct(id, slideIndex) {
  const slidesPerView = swiper.params.slidesPerView;
  const totalSlides = swiper.slides.length;

  if (slideIndex === 0 || slideIndex === totalSlides - 1) {
    swiper.slideTo(slideIndex);
    return;
  }

  const targetIndex = Math.max(0, Math.min(slideIndex - Math.floor(slidesPerView / 2), totalSlides - slidesPerView));

  swiper.slideTo(targetIndex);
  // //////////////////////////////////
  cards.innerHTML = "";
  currentPage = 1;

  let btn = categories.querySelector(`#a${id}`);
  categories.querySelector(".btn-active")?.classList.remove("btn-active");
  btn.classList.add("btn-active");

  let data = allData.products.filter((item) => {
    return item.category_id == Number(id);
  });

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach((product) => {
    const price = product.discount
      ? ` ${(product.price - (product.price / 100) * product.discount).toFixed(2)}₼ <s class="!text-red-600 ml-2 text-sm">${
          product.price
        }₼</s>`
      : `${product.price}₼`;
    let stock =
      product.stock != 0
        ? `<h6 class="font-montserrat text-green capitalize  text-sm">Stokdadır</h6>`
        : `<h6 class="font-montserrat  text-red-500 capitalize  text-sm">Anbarda tükənmişdir</h6>`;
    write_to_card(product, price, stock);
  });

  renderPagination(totalPages, id);

  animationProduct();
}

function renderPagination(totalPages, categoryId) {
  console.log(totalPages, "totalpages");

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

  showProduct(categoryId);
}

// DOM Elementleri Seçimi
// const categories = document.querySelector(".categories");
// const cards = document.querySelector(".cards");
// const carousel_discount = document.querySelector("#carousel_discount");

// // Tüm Verilerin Tutulacağı Nesne
// let allData = {};

// // Başlangıç Fonksiyonu
// function fetchData() {
//   fetch("./js/data.json")
//     .then((res) => res.json())
//     .then((data) => {
//       allData = data;
//       showCategories(data);
//       showProduct(3); // Varsayılan kategori
//       getDiscountCarousel();
//     });
// }
// fetchData();

// // İndirimli Ürünleri Gösterme
// function getDiscountCarousel() {
//   const discountItems = allData?.products
//     .filter((item) => item.discount > 0)
//     .map((item) => {
//       const shortenedDescription = item.description.split(" ").slice(0, 2).join(" ") + "...";

//       return `
//       <div data-aos="fade-up" class="item grid place-items-center grid1-con">
//         <div style="background: url(../img/${item.img}) center/cover no-repeat;" class="grid1 grid-slide font-montserrat">
//           <span class="bg-green text-white px-4 py-1">${item.discount}%</span>
//           <div class="w-full flex flex-col justify-center items-center">
//             <h4 class="bg-brown text-white text-xl mb-2 py-1 px-3">${item.name}</h4>
//             <p class="text-black font-medium text-lg">${shortenedDescription}</p>
//           </div>
//         </div>
//       </div>`;
//     })
//     .join("");

//   carousel_discount.innerHTML = discountItems;
//   initializeCarousel();
// }

// // Carousel Başlatma
// function initializeCarousel() {
//   $(carousel_discount).owlCarousel({
//     loop: true,
//     margin: 50,
//     dots: false,
//     nav: true,
//     autoplay: true,
//     autoplayTimeout: 4000,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 2,
//       },
//       1000: {
//         items: 3,
//       },
//     },
//   });
// }

// // Kategorileri Gösterme
// function showCategories(data) {
//   const categoryHTML = data.categories
//     ?.map(
//       (element) => `
//     <div class="swiper-slide text-sm md:text-base text-center" id="a${element.id}" onclick="showProduct('${element.id}')">
//       <button>${element.name}</button>
//     </div>`
//     )
//     .join("");

//   categories.innerHTML = categoryHTML;
// }

// // Ürün Kartı Yazdırma
// function writeToCard(product, price, stock) {
//   const productCard = `
//     <div
//       onclick="goToDetailPage('${product.id}')"
//       class="box relative text-center shadow-md overflow-hidden transition-transform transform hover:scale-105"
//       style="max-height: 380px; min-height: 340px;"
//     >
//       <div class="box-div h-2/3 w-full overflow-hidden relative">
//         <img
//           class="box-img w-full h-full object-cover"
//           src="img/${product.img}"
//           alt="product"
//         />
//         ${
//           product.isnew
//             ? `<div class="bg-green text-white text-[10px] lg:text-xs flex items-center justify-center uppercase gap-1 rounded-full w-7 lg:w-10 h-7 lg:h-10 absolute top-10 lg:top-2 left-2">new</div>`
//             : ""
//         }
//         ${
//           product.discount != 0
//             ? `<div class="bg-red-600 text-white text-[10px] lg:text-xs flex items-center justify-center uppercase gap-1 rounded-full w-7 lg:w-10 h-7 lg:h-10 absolute  left-2 ${
//                 product.isnew ? "top-[70px] lg:top-14 " : "top-10 lg:top-2"
//               } ">
//                 ${product.discount}
//                 <i class="fa-solid fa-percent"></i>
//               </div>`
//             : ""
//         }
//         <div onclick="sendBasket('${product.id}')" class="bg-white my_absolute">
//           <i class="fa-solid fa-cart-shopping text-brown"></i>
//         </div>
//       </div>
//       <div class="p-1 sm:p-4 h-1/3 flex flex-col justify-between">
//         <h5 class="text-base font-montserrat font-semibold text-brown capitalize truncate">${product.name}</h5>
//         <h6 class="font-montserrat capitalize text-sm text-gray-500 truncate">category</h6>
//         ${stock}
//         <span class="font-bold font-montserrat text-base text-brown">${price ? price : ""}</span>
//       </div>
//     </div>`;

//   cards.innerHTML += productCard;
// }

// // Ürün Gösterme
// function showProduct(categoryId) {
//   const categoryData = allData.products.filter((item) => item.category_id === Number(categoryId));
//   renderProductsWithPagination(categoryData);
// }
// let currentPage = 1;
// const itemsPerPage = 4;
// // Ürünleri Sayfalama ile Gösterme
// function renderProductsWithPagination(data) {
//   const totalItems = data.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedData = data.slice(startIndex, endIndex);

//   cards.innerHTML = "";

//   paginatedData.forEach((product) => {
//     const price = product.discount
//       ? ` ${(product.price - (product.price / 100) * product.discount).toFixed(2)}₼ <s class="!text-red-600 ml-2 text-sm">${
//           product.price
//         }₼</s>`
//       : `${product.price}₼`;

//     const stock =
//       product.stock !== 0
//         ? `<h6 class="font-montserrat text-green capitalize text-sm">Stokdadır</h6>`
//         : `<h6 class="font-montserrat text-gray-500 capitalize text-sm">Anbarda tükənmişdir</h6>`;

//     writeToCard(product, price, stock);
//   });

//   renderPagination(totalPages, currentPage);
// }

// // Sayfalama Butonlarını Gösterme
// function renderPagination(totalPages, categoryId) {
//   const paginationContainer = document.querySelector("#pagination");
//   paginationContainer.innerHTML = "";

//   if (totalPages <= 1) return;

//   for (let i = 1; i <= totalPages; i++) {
//     paginationContainer.innerHTML += `
//       <button 
//         id="page-${i}" 
//         class="px-4 py-2 mx-1 border rounded ${
//           currentPage === i ? "bg-brown text-white" : "bg-white text-brown"
//         } hover:bg-brown hover:text-white transition"
//         onclick="changePage(${i}, ${categoryId})">
//         ${i}
//       </button>`;
//   }
// }

// // Sayfa Değiştirme
// function changePage(page, categoryId) {
//   currentPage = page;

//   const buttons = document.querySelectorAll("#pagination button");
//   buttons.forEach((button) => {
//     const pageNum = parseInt(button.innerText, 10);
//     if (pageNum === currentPage) {
//       button.classList.add("bg-brown", "text-white");
//       button.classList.remove("bg-white", "text-brown");
//     } else {
//       button.classList.add("bg-white", "text-brown");
//       button.classList.remove("bg-brown", "text-white");
//     }
//   });

//   showProduct(categoryId);
// }
