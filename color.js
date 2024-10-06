document.addEventListener("DOMContentLoaded", function() {
  const headers = document.querySelectorAll('.game-item h3, .news-item h3');

  headers.forEach(header => {
    header.addEventListener("mouseenter", function() {
      if (this.closest('.game-item')) {
        this.style.color = "#3fff00";
      } else if (this.closest('.news-item')) {
        this.style.color = "#ff0000";
      } else {
        this.style.color = "#333";
      }
    });

    header.addEventListener("mouseleave", function() {
      this.style.color = "#333";
    });
  });
});
