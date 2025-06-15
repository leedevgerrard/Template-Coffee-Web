// 'use strict';

// Add event listener to navbar toggler

const navbar = document.querySelector('.navbar');
const navTogglers = document.querySelectorAll('.nav-toggler');
const overlay = document.querySelector('.overlay');

navTogglers.forEach((navToggler) => {
  navToggler.addEventListener('click', () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
})
})

// Add event listener to header scroll system & back to top button

const header = document.querySelector('.header');
const backToTopBtn = document.querySelector('.back-to-top-btn');

let lastScrollPosition = 0;

const hideHeader = () => {
  const isScrollBottom = lastScrollPosition < window.scrollY;
  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }

  lastScrollPosition = window.scrollY;
}

window.addEventListener('scroll', () => {
  if (window.scrollY >= 50) {
    header.classList.add('active');
    backToTopBtn.classList.add('active');
    hideHeader();
  } else {
    header.classList.remove('active');
    backToTopBtn.classList.remove('active');
  }
})

// Make wide screen navbar system

document.querySelectorAll('.navbar-link').forEach((link) => {
    link.addEventListener('click', e => {
      document.querySelectorAll('.navbar-link').forEach((navlink) => {
        navlink.classList.remove('active');
      })
      e.target.classList.add('active');
      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-active');
    })
  })

// Make carousel slide system

const heroCarousel = document.querySelector('.hero-carousel');
const heroCarouselItems = document.querySelectorAll('.carousel-item');

const prevBtn = document.querySelector('.prev-carousel-btn');
const nextBtn = document.querySelector('.next-carousel-btn');

let currentCarouselPosition = 0;
let lastActiveCarouselItem = heroCarouselItems[0];

const updateCarouselItem = () => {
  lastActiveCarouselItem.classList.remove('active');
  heroCarouselItems[currentCarouselPosition].classList.add('active');
  lastActiveCarouselItem = heroCarouselItems[currentCarouselPosition];
}

const slideNext = () => {
  if (currentCarouselPosition >= heroCarouselItems.length - 1) {
    currentCarouselPosition = 0;
  } else {
    currentCarouselPosition++;
  }

  updateCarouselItem();
}

const slidePrev = () => {
  if (currentCarouselPosition <= 0) {
    currentCarouselPosition = heroCarouselItems.length - 1;
  } else {
    currentCarouselPosition--;
  }

  updateCarouselItem();
}

nextBtn.addEventListener('click', slideNext);
prevBtn.addEventListener('click', slidePrev);

let autoSlideInterval;

const autoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000)
}

window.addEventListener('load', autoSlide);

// Add observer to animate elements while entering the viewport for the first time

const texts = document.querySelectorAll('.containing-text');

const textsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
    if (entry.isIntersecting) {
      textsObserver.unobserve(entry.target);
    }
  })
}, {
  threshold: 0.1,
})

texts.forEach(text => {
  textsObserver.observe(text);
})

const imgs = document.querySelectorAll('.containing-img');

const imgsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
    if (entry.isIntersecting) {
      imgsObserver.unobserve(entry.target);
    }
  })
}, {
  threshold: 0.1,
})

imgs.forEach(img => {
  imgsObserver.observe(img);
})