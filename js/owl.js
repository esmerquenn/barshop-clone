$(".carousel-1").owlCarousel({
  loop: true,
  margin: 50,
  dots:false,
  nav: true,
  autoplay: false, // Enable autoplay
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
  margin: 50,
  dots:false,
  nav: true,
  autoplay: true, // Enable autoplay
  autoplayTimeout: 2000, // Time in milliseconds (2000ms = 2 seconds)
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});


