var swiper = new Swiper(".mySwiper", {
  speed: 500,
  effect: "fade",
  parallax: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChangeTransitionStart: function () {
      let slides = document.querySelectorAll(".swiper-slide-active .title");
      slides.forEach((slide) => {
        slide.style.animation = "none";
        slide.offsetHeight;
        setTimeout(function () {
          slide.style.animation = "slideIn 1s ease-out forwards";
        }, 100);
      });
    },
  },
});
