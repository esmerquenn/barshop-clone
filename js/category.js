const categories = document.querySelector(".categories");
const cards = document.querySelector(".cards");
let allData = {};

function fetchData() {
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showCategories(data);
      showProduct(3);
    });
}
fetchData();

// // //////////////////////////////////////////////////////////////
function showCategories(data) {
  let cat = "";
  data.categories?.forEach((element) => {
    cat += `<button id="a${element.id}" onclick="showProduct('${element.id}')">${element.name}</button>`;
  });
  categories.innerHTML += cat;
}


function write_to_card(product, price, stock) {
  cards.innerHTML += `
              <div onclick="goToDetailPage('${product.id}')" class="box  text-center rounded-md overflow-hidden bg-white">
                  <div class="box-div relative">
                    <img class="box-img w-full max-h-72 object-cover" src="img/${product.img}" alt="coffee" />
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
                  <div class="p-4">
                    <h5 class="mt-2 font-montserrat font-semibold capitalize text-brown">${product.name}</h5>
                    <h6 class="font-montserrat capitalize my-2 text-sm text-brown">category</h6>
                    ${stock}
                    <span class="font-bold font-montserrat text-lg text-brown">${price ? price : ""}</span>
                  </div>
              </div>`;
}

function goToDetailPage(id){
  window.location.href = `details.html?id=${id}`;
  
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
function sendBasket(id) {
  event.stopPropagation();
  let newObj = allData.products.find((item) => item.id == id);
  BasketManager.addItem(newObj);
}

let currentPage = 1;
const itemsPerPage = 4;

function showProduct(id) {
  cards.innerHTML = "";
  currentPage = 1

  let btn = categories.querySelector(`#a${id}`);
  categories.querySelector(".btn-active")?.classList.remove("btn-active");
  btn.classList.add("btn-active");

  let data = allData.products.filter((item) => {
    return item.category_id == Number(id);
  });

  console.log(data, "data");

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
        ? `<h6 class="font-montserrat text-green capitalize my-2 text-sm">Stokdadır</h6>`
        : `<h6 class="font-montserrat  text-gray-500 capitalize my-2 text-sm">Anbarda tükənmişdir</h6>`;
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
  showProduct(categoryId);
}
