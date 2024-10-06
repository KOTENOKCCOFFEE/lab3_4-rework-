document.addEventListener('copy', function(e) {
  // Показываем элемент с сообщением
  const copyFeedback = document.getElementById('copyFeedback');
  copyFeedback.style.display = 'block';

  // Задержка и скрытие сообщения
  setTimeout(function() {
    copyFeedback.style.display = 'none';
  }, 2000); // Скрываем сообщение через 2 секунды
});
