const searchbox = document.querySelector(".searchbox");
const searchbox2 = document.querySelector(".searchbox2");
const searchmenu = document.querySelector(".searchmenu");
const resultList = document.querySelector(".resultList");
const resultList2 = document.querySelector(".resultList2");
let dataForSearch = {};
function fetchData() {
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      dataForSearch = data;
    });
}
fetchData();
function isMobileView() {
  return window.innerWidth < 992;
}
function searchBar() {
  const activeSearchbox = isMobileView() ? searchbox2 : searchbox;
  activeSearchbox.classList.toggle("active");
}

function writeUnFound() {
  return `<li class="border-b-2 border-brown py-1 text-center">
             <i class="fa-regular fa-folder-open text-2xl text-white"></i>
           </li>`;
}
function filterData(query) {
  return dataForSearch.products.filter((item) => item.name.toLowerCase().includes(query));
}

function searchData() {
  const query = event.target.value.toLowerCase();
  const filteredData = query.length >= 1 ? filterData(query) : [];
  const isMobile = isMobileView();
  const resultElement = isMobile ? resultList2 : resultList;
  updateResults(filteredData, resultElement);
}

function updateResults(filteredData, resultElement) {
  resultElement.innerHTML = "";
  resultElement.innerHTML = filteredData.length
    ? filteredData
        .map((item) => `<li onclick="goToDetailPage('${item.id}')" class="border-b-2 border-brown py-1 cursor-pointer text-white">${item.name}</li>`)
        .join("")
    : writeUnFound();
}

