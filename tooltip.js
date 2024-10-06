document.addEventListener("DOMContentLoaded", function() {
  const tooltipBtn = document.querySelector('.tooltip-btn');
  const tooltipText = tooltipBtn.querySelector('.tooltip-text');

  tooltipBtn.addEventListener('mouseenter', function() {
    tooltipText.style.visibility = 'visible';
    tooltipText.style.opacity = '1';
  });

  tooltipBtn.addEventListener('mouseleave', function() {
    tooltipText.style.visibility = 'hidden';
    tooltipText.style.opacity = '0';
  });
});
