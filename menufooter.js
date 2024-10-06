document.addEventListener("DOMContentLoaded", function() {
  const footerMenuBtn = document.getElementById("footer-menu-button");
  const footerMenu = document.getElementById("footerMenu");

  footerMenuBtn.addEventListener("click", function(event) {
    footerMenu.classList.toggle("show");
    event.stopPropagation();
  });

  window.addEventListener("click", function(event) {
    if (!footerMenu.contains(event.target) && event.target !== footerMenuBtn) {
      footerMenu.classList.remove("show");
    }
  });
});
