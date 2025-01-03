const sebetSidebar = document.querySelector(".sebet-sidebar");
const sebetSidebarbg = document.querySelector(".sebet-sidebar-bg");
const allCards = document.querySelector(".all-card-baskets");
const basket_quantity_desktop = document.querySelector("#basket-quantity");
const basket_quantity_mobile = document.querySelector("#basket-quantity-mobile");
const totalPricea = document.querySelector("#total-price");
let basket_quantity = isMobileView() ? basket_quantity_mobile : basket_quantity_desktop;
const sebet = document.querySelector(".sebet-box");

// const SidebarManager = {
//   open() {
//     sebetSidebar.classList.add("active");
//     sebetSidebarbg.classList.add("active");
//   },
//   close() {
//     sebetSidebar.classList.remove("active");
//     sebetSidebarbg.classList.remove("active");
//   },
//   toggle() {
//     sebetSidebar.classList.toggle("active");
//     sebetSidebarbg.classList.toggle("active");
//   },
// };
// sebetSidebarbg.onclick = () => {
//   SidebarManager.close();
// };
// function openBasketSidebar() {
//   SidebarManager.toggle();
// }

// function createBasketItemHTML(item) {
//   return `
//       <div class="card-basket relative hover:bg-slate-50 transition duration-500 flex gap-2 p-4">
//         <i class="fa-solid fa-x text-sm text-gray-500 !font-medium absolute top-4 right-4" onclick="BasketManager.removeItem(${item.id})"></i>
//         <img class="w-1/3 object-cover md:w-1/5" src="img/${item.img}" alt="coffee" />
//         <span class="flex flex-col justify-between items-start">
//           <h5 class="font-semibold font-montserrat text-sm">${item.name}</h5>
//           <div class="flex my-1 bg-white">
//             <button class="border w-6" onclick="BasketManager.decreaseQuantity(${item.id})">-</button>
//             <span class="border-y min-w-6 flex justify-center items-center px-1">${item.quantity}</span>
//             <button class="border w-6" onclick="BasketManager.increaseQuantity(${item.id})">+</button>
//           </div>
//           <div class="text-gray-500 text-[12px]">
//             <span>${item.quantity}</span> x <span class="text-base text-brown border-b-2 border-green ml-2">${item.price}₼</span>
//           </div>
//         </span>
//       </div>`;
// }

// // // ////////////////////////////////

// const BasketManager = {
//   basket: [],

//   init() {
//     const storedBasket = localStorage.getItem("basket");
//     if (storedBasket) {
//       this.basket = JSON.parse(storedBasket);
//       this.updateBasket();
//     }
//   },

//   saveToLocalStorage() {
//     console.log("basket", this.basket);

//     localStorage.setItem("basket", JSON.stringify(this.basket));
//   },

//   addItem(product) {
//     let item = this.basket.find((item) => item.id === product.id);
//     if (item) {
//       item.quantity++;
//     } else {
//       this.basket.push({ ...product, quantity: 1 });
//     }
//     this.updateBasket();
//   },

//   removeItem(id) {
//     this.basket = this.basket.filter((item) => item.id !== id);
//     this.updateBasket();
//   },

//   decreaseQuantity(id) {
//     let item = this.basket.find((item) => item.id === id);
//     if (item) {
//       item.quantity--;
//       if (item.quantity <= 0) {
//         this.removeItem(id);
//       } else {
//         this.updateBasket();
//       }
//     }
//   },

//   increaseQuantity(id) {
//     let item = this.basket.find((item) => item.id === id);
//     if (item) {
//       item.quantity++;
//       this.updateBasket();
//     }
//   },

//   getTotalPrice() {
//     return this.basket.reduce((acc, item) => acc + item.quantity * item.price, 0);
//   },

//   updateBasket() {
//     BasketUI.update(this.basket, this.getTotalPrice());
//     this.saveToLocalStorage();

//     if (this.basket.length === 0) {
//       SidebarManager.close();
//     }
//   },
// };

// const BasketUI = {
//   update(basket, totalPrice) {
//     basket_quantity.style.display = basket.length ? "block" : "none";
//     basket_quantity.innerHTML = basket.length;
//     let sebet_side = ""
//     if (basket.length == 0) {
//       sebet_side = `<div class="flex justify-center flex-col mt-10 items-center">
//       <img class="w-1/3" src="img/empty-cart.png" alt="empty" />
//       <a                     
//       class="inline-flex items-center gap-2 text-sm font-medium text-greenDark underline hover:no-underline"
//       href="mehsullar.html">
//       Səbətiniz boşdur
//       </a>
//       </div>`;
//     } else {
//        sebet_side = basket.map((item) => createBasketItemHTML(item)).join("");
//     }
//     allCards.innerHTML = sebet_side

//     totalPricea.innerHTML = `${totalPrice.toFixed(2)}₼`;
//     if (window.location.pathname.includes("basket.html")) {
//       sebet.innerHTML = "";
//       let sebetbox = "";
//       if (BasketManager.basket.length == 0) {
//         sebetbox = `<div class="flex justify-center flex-col items-center">
//         <img class="w-1/2" src="img/empty-cart.png" alt="empty" />
//         <a                     
//         class="inline-flex items-center gap-2 text-sm font-medium text-greenDark underline hover:no-underline"
//         href="mehsullar.html">
//         Səbətiniz boşdur
//         </a>
//         </div>`;
//       } else {
//         sebetbox = BasketManager.basket.map((item) => createBasketBox(item)).join("");
//       }

//       sebet.innerHTML = sebetbox;
//       document.querySelector("#product-count").innerText = BasketManager.basket.length;
//       document.querySelector("#total-amount").innerText = `${BasketManager.getTotalPrice().toFixed(2)} ₼`;
//       document.querySelector("#final-amount").innerText = `${BasketManager.getTotalPrice().toFixed(2)} ₼`;
//     }
//   },
// };

// document.addEventListener("DOMContentLoaded", () => {
//   BasketManager.init();
// });

// // /////////////////////////////////////////////////////////////////////////////////

// function createBasketBox(item) {
//   return ` <div class="border border-gray-200 bg-white p-4 shadow-sm md:p-6">
//   <div class="relative space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//     <a href="#" class="shrink-0 md:order-1">
//       <img class="h-20 w-20" src="img/${item.img}" alt="imac image" />
//     </a>

//     <div class="flex items-center justify-between md:order-3 md:justify-end">
//       <div class="flex my-1 bg-white">
//           <button class="border w-6" onclick="BasketManager.decreaseQuantity(${item.id})">-</button>
//             <span class="border-y min-w-6 flex justify-center items-center px-1">${item.quantity}</span>
//             <button class="border w-6" onclick="BasketManager.increaseQuantity(${item.id})">+</button>
//       </div>
//       <div class="text-end md:order-4 md:w-32">
//         <p class="text-xl font-bold text-brown">${item.price * item.quantity}₼</p>
//       </div>
//     </div>

//     <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
//       <a href="#" class="text-lg font-semibold text-brown hover:underline">${item.name}</a>
//     </div>
//     <button
//     onclick="BasketManager.removeItem(${item.id})"
//       type="button"
//       class="absolute -right-0 -top-4 inline-flex items-center text-sm !font-medium text-red-600"
//     >
//       <i class="fa-solid fa-x"></i>
//     </button>
//   </div>
// </div>`;
// }

//  function resetBasket(){
//   localStorage.removeItem("basket")
//  }


const SidebarManager = {
  open() {
    sebetSidebar.classList.add("active");
    sebetSidebarbg.classList.add("active");
  },
  close() {
    sebetSidebar.classList.remove("active");
    sebetSidebarbg.classList.remove("active");
  },
  toggle() {
    sebetSidebar.classList.toggle("active");
    sebetSidebarbg.classList.toggle("active");
  },
};

sebetSidebarbg.onclick = () => {
  SidebarManager.close();
};
function openBasketSidebar() {
  SidebarManager.toggle();
}

const BasketManager = {
  basket: [],
  storageKey: "basket",

  init() {
    const storedBasket = this.getFromStorage();
    if (storedBasket) {
      this.basket = storedBasket;
      this.updateBasket();
    }
  },

  getFromStorage() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  },

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.basket));
  },

  addItem(product) {
    let item = this.basket.find((item) => item.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.basket.push({ ...product, quantity: 1 });
    }
    this.updateBasket();
  },

  removeItem(id) {
    this.basket = this.basket.filter((item) => item.id !== id);
    this.updateBasket();
  },

  updateQuantity(id, delta) {
    const item = this.basket.find((item) => item.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.updateBasket();
      }
    }
  },

  getTotalPrice() {
    return this.basket.reduce((acc, item) => acc + item.quantity * item.price, 0);
  },

  updateBasket() {
    BasketUI.update(this.basket, this.getTotalPrice());
    this.saveToStorage();

    if (this.basket.length === 0) {
      SidebarManager.close();
    }
  },

  resetBasket() {
    this.basket = [];
    this.updateBasket();
  },
};

function resetBasket(){
  BasketManager.resetBasket()
}

const BasketUI = {
  update(basket, totalPrice) {
    basket_quantity.style.display = basket.length ? "block" : "none";
    basket_quantity.innerHTML = basket.length;

    const basketHTML =
      basket.length === 0
        ? this.createEmptyBasketHTML()
        : basket.map((item) => createBasketItemHTML(item)).join("");

    allCards.innerHTML = basketHTML;
    totalPricea.innerHTML = `${totalPrice.toFixed(2)}₼`;

    if (window.location.pathname.includes("basket.html")) {
      sebet.innerHTML = basketHTML;
      document.querySelector("#product-count").innerText = basket.length;
      document.querySelector("#total-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
      document.querySelector("#final-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
    }
  },

  createEmptyBasketHTML() {
    return `
      <div class="flex justify-center flex-col items-center mt-10">
        <img class="w-1/3" src="img/empty-cart.png" alt="empty" />
        <a                     
          class="inline-flex items-center gap-2 text-sm font-medium text-greenDark underline hover:no-underline"
          href="mehsullar.html"
        >
          Səbətiniz boşdur
        </a>
      </div>`;
  },
};
function createBasketItemHTML(item) {
  return `
      <div class="card-basket relative hover:bg-slate-50 transition duration-500 flex gap-2 p-4">
        <i class="fa-solid fa-x text-sm text-gray-500 !font-medium absolute top-4 right-4" onclick="BasketManager.removeItem(${item.id})"></i>
        <img class="w-1/3 object-cover md:w-1/5" src="img/${item.img}" alt="${item.name}" />
        <span class="flex flex-col justify-between items-start">
          <h5 class="font-semibold font-montserrat text-sm">${item.name}</h5>
          <div class="flex my-1 bg-white">
            <button class="border w-6" onclick="BasketManager.updateQuantity(${item.id}, -1)">-</button>
            <span class="border-y min-w-6 flex justify-center items-center px-1">${item.quantity}</span>
            <button class="border w-6" onclick="BasketManager.updateQuantity(${item.id}, 1)">+</button>
          </div>
          <div class="text-gray-500 text-[12px]">
            <span>${item.quantity}</span> x <span class="text-base text-brown border-b-2 border-green ml-2">${item.price}₼</span>
          </div>
        </span>
      </div>`;
}
document.addEventListener("DOMContentLoaded", () => {
  BasketManager.init();
});


function sendBasket(id) {
  event.stopPropagation();
  // Swal.fire({
  //   icon: "success",
  // });
  console.log("basket", id);
  
  Swal.fire({
    icon: "success",
    // title: "aaa",
    html: '<i class="fa fa-shopping-cart text-green text-4xl"></i>',
    showConfirmButton: false,
    width: "200px", 
  
    timer: 600, // 3 saniye sonra otomatik kapan
  });
  let newObj = allData.products.find((item) => item.id == id);
  BasketManager.addItem(newObj);
}
