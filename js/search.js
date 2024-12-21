 // SEARCHBAR START
 const searchbox = document.querySelector(".searchbox");
 const searchbox2 = document.querySelector(".searchbox2");
 const searchmenu = document.querySelector(".searchmenu");
 const resultList = document.querySelector(".resultList");
 const resultList2 = document.querySelector(".resultList2");

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
   return allData.products.filter((item) => item.name.toLowerCase().includes(query));
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
     ? filteredData.map((item) => `<li class="border-b-2 border-brown py-1"><a class="text-white" href="#">${item.name}</a></li>`).join("")
     : writeUnFound();
 }

 // SEARCHBAR END