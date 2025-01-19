const sebetSidebar = document.querySelector(".sebet-sidebar");
const sebetSidebarbg = document.querySelector(".sebet-sidebar-bg");
const allCards = document.querySelector(".all-card-baskets");
const basket_quantity_desktop = document.querySelector("#basket-quantity");
const basket_quantity_mobile = document.querySelector("#basket-quantity-mobile");
const totalPricea = document.querySelector("#total-price");
let basket_quantity = isMobileView() ? basket_quantity_mobile : basket_quantity_desktop;
const sebet = document.querySelector(".sebet-box");
const check_basket = document.querySelector(".check-box");

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

function resetBasket() {
  BasketManager.resetBasket();
}

const BasketUI = {
  update(basket, totalPrice) {
    basket_quantity.style.display = basket.length ? "block" : "none";
    basket_quantity.innerHTML = basket.length;

    const basketHTML =
      basket.length === 0 ? this.createEmptyBasketHTML() : basket.map((item) => createBasketItemHTML(item)).join("");
    const checkHTML =
      basket.length === 0 ? this.createEmptyBasketHTML() : basket.map((item) => createCheckItemHTML(item)).join("");
    allCards.innerHTML = basketHTML;
    totalPricea.innerHTML = `${totalPrice.toFixed(2)}₼`;

    if (window.location.pathname.includes("basket.html")) {
      sebet.innerHTML = basketHTML;
      document.querySelector("#product-count").innerText = basket.length;
      document.querySelector("#total-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
      document.querySelector("#final-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
      document.querySelector(".promo_code_form").addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredCode = voucher.value.trim();
        const totalPrice = BasketManager.getTotalPrice();

        const promo = promoCodes.find((promo) => promo.code === enteredCode);

        if (promo) {
          const discountAmount = (totalPrice * promo.discount) / 100;
          const finalPrice = totalPrice - discountAmount;
          document.querySelector(
            "#final-amount"
          ).innerHTML = ` <span class="flex flex-col gap-1 items-center"><s class=" text-[14px] text-red-600">${totalPrice.toFixed(
            2
          )} ₼</s> <b>${finalPrice.toFixed(2)}₼</b></span>`;
        }
      });
    }
    if (window.location.pathname.includes("check.html")) {
      check_basket.innerHTML = checkHTML;
      document.querySelector("#product-count").innerText = basket.length;
      document.querySelector("#total-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
      document.querySelector("#final-amount").innerText = `${totalPrice.toFixed(2)} ₼`;
      document.querySelector(".promo_code_form").addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredCode = voucher.value.trim();
        const totalPrice = BasketManager.getTotalPrice();

        const promo = promoCodes.find((promo) => promo.code === enteredCode);

        if (promo) {
          const discountAmount = (totalPrice * promo.discount) / 100;
          const finalPrice = totalPrice - discountAmount;
          document.querySelector(
            "#final-amount"
          ).innerHTML = ` <span class="flex flex-col gap-1 items-center"><s class=" text-[14px] text-red-600">${totalPrice.toFixed(
            2
          )} ₼</s> <b>${finalPrice.toFixed(2)}₼</b></span>`;
        }
      });
    }
  },

  createEmptyBasketHTML() {
    return `
      <div class="flex justify-center flex-col items-center mt-10">
        <img class="w-1/3" src="img/empty-cart.png" alt="empty" />
        <a
          class="inline-flex items-center gap-2 text-sm font-medium text-greenDark underline hover:no-underline"
          href="products.html?category=qehve&subcategory=arabic-qehve"
          data-key="empty_basket"
        >
          Səbətiniz boşdur
        </a>
      </div>`;
  },
};

const voucher = document.querySelector("#voucher");
const promoCodes = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE20", discount: 20 },
  { code: "SAVE30", discount: 30 },
];

function createBasketItemHTML(item) {
  return `
      <div class="card-basket relative hover:bg-slate-50 transition duration-500 flex gap-2 p-4">
        <i class="fa-solid fa-x text-sm text-gray-500 !font-medium absolute top-4 right-4" onclick="BasketManager.removeItem(${item.id})"></i>
        <img class="w-1/3 object-cover md:w-1/5 !max-h-28" src="img/${item.img}" alt="${item.name}" />
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
function createCheckItemHTML(item) {
  return `<div class="max-w-[350px] md:max-w-[100%] w-full card-basket relative bg-white border hover:bg-slate-50 transition duration-500 flex flex-col md:flex-row items-center gap-2 p-4">
  <img class="w-1/3 object-cover md:w-1/5 !max-h-28" src="img/${item.img}" alt="${item.name}" />
  <span class="w-full flex flex-col md:flex-row">
    <h5 class="font-medium font-montserrat text-sm pt-2 mb-2 md:mb-0 md:max-w-[120px]">${item.name}</h5>
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2">
        <span class="capitalize text-black font-normal" data-key="price"> Qiymət</span>
        <span class="text-base text-brown border-b-2 border-green text-center">${item.price}₼</span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="capitalize text-black font-normal" data-key="count"> say</span>
        <span class="text-base text-brown border-b-2 border-green text-center">${item.quantity}</span>
      </div>
      <div class="text-gray-500 flex gap-2 flex-col items-center">
        <span class="capitalize text-black font-normal" data-key="total"> məbləğ</span>
        <span class="text-base text-brown border-b-2 border-green">${item.quantity * item.price}₼</span>
      </div>
    </div>
  </span>
</div>`;
}
document.addEventListener("DOMContentLoaded", () => {
  BasketManager.init();
});

function sendBasket(id) {
  event.stopPropagation();
  Swal.fire({
    icon: "success",
    html: '<i class="fa fa-shopping-cart text-green text-4xl"></i>',
    showConfirmButton: false,
    width: "200px",

    timer: 600,
  });
  let newObj = allData.products.find((item) => item.id == id);
  BasketManager.addItem(newObj);
}
