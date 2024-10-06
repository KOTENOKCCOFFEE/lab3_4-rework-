// Слайдер
document.addEventListener("DOMContentLoaded", function() {
  let slideIndex = 0;
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    showSlides(slider, slideIndex);

    slider.querySelector('.next').addEventListener('click', () => {
      moveSlide(slider, 1);
    });

    slider.querySelector('.prev').addEventListener('click', () => {
      moveSlide(slider, -1);
    });

    function moveSlide(slider, n) {
      slideIndex += n;
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
      showSlides(slider, slideIndex);
    }

    function showSlides(slider, index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
  });
});
