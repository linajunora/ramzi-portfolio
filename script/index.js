window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  updateCarouselPosition();
});

document.getElementById('viewWorkBtn').addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

//background stuff
const maskLayer = document.querySelector('.intense-mask-layer');
const maskRadius = 430; 

document.addEventListener('mousemove', (e) => {
  const x = e.clientX - maskRadius;
  const y = e.clientY - maskRadius;
  maskLayer.style.maskPosition = `${x}px ${y}px`;
  maskLayer.style.webkitMaskPosition = `${x}px ${y}px`; 
});


//carousel

const track = document.querySelector('.carouselTrack');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.rightBtn');
const prevBtn = document.querySelector('.leftBtn');
let currentSlideIndex = 0;

function updateCarouselPosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const computedStyle = window.getComputedStyle(slides[0]);
  const marginLeft = parseFloat(computedStyle.marginLeft);
  const marginRight = parseFloat(computedStyle.marginRight);
  const totalSlideWidth = slideWidth + marginLeft + marginRight;

  const containerWidth = document.querySelector('.carousel').offsetWidth;
  const offset = (containerWidth - totalSlideWidth) / 2;

  track.style.transform = `translateX(calc(${-totalSlideWidth * currentSlideIndex}px + ${offset}px))`;

  prevBtn.style.display = currentSlideIndex === 0 ? "none" : "block";
  nextBtn.style.display = currentSlideIndex === slides.length - 1 ? "none" : "block";

  prevBtn.style.opacity = currentSlideIndex === 0 ? "0" : "1";
  prevBtn.style.pointerEvents = currentSlideIndex === 0 ? "none" : "auto";

  nextBtn.style.opacity = currentSlideIndex === slides.length - 1 ? "0" : "1";
  nextBtn.style.pointerEvents = currentSlideIndex === slides.length - 1 ? "none" : "auto";
}

nextBtn.addEventListener('click', () => {
  if(currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    updateCarouselPosition();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateCarouselPosition();
  }
})

//swipe carousel

let startX = 0;
let isSwiping = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

});

track.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  if (diffX > 50 && currentSlideIndex > 0) {
    // swipe right
    currentSlideIndex--;
    updateCarouselPosition();
  } else if (diffX < -50 && currentSlideIndex < slides.length - 1) {
    // swipe left
    currentSlideIndex++;
    updateCarouselPosition();
  }

  isSwiping = false;
});

const sections = document.querySelectorAll("article, main");
const navLinks = document.querySelectorAll(".navUl a");

function onScroll() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150; // Adjust for spacing
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll);