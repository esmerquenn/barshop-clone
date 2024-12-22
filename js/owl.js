$(".carousel-1").owlCarousel({
  loop: true,
  margin: 50,
  dots:false,
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
$(".image-slider").owlCarousel({
  loop: true,
  margin: 10,
  dots:false,
  nav: true,
  autoplay: true,
  autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    900: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});


