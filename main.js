document.addEventListener("DOMContentLoaded", function() {
  // Валидация формы
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function(e) {
      if (!validateForm(form)) {
        e.preventDefault();
      } else if (form.id === "news-form") {
        alert("Ваша новость была отправлена! Мы ее рассмотрим как можно скорее!");
      }
    });
  });

  function validateForm(form) {
    let valid = true;
    const email = form.querySelector("#email");
    const number = form.querySelector("#number");
    const newsTitle = form.querySelector("#news-title");
    const newsContent = form.querySelector("#news-content");
    const newsLink = form.querySelector("#news-link");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberPattern = /^\d+$/;

    if (email && !emailPattern.test(email.value)) {
      alert("Введите правильный email");
      valid = false;
    }

    if (number) {
      if (!numberPattern.test(number.value)) {
        alert("Введите только числовое значение для телефона");
        valid = false;
      } else if (number.value.length !== 11) {
        alert("Введите корректный номер телефона (11 цифр)");
        valid = false;
      }
    }

    if (newsTitle && newsTitle.value.trim() === "") {
      alert("Введите заголовок новости");
      valid = false;
    }

    if (newsContent && newsContent.value.trim() === "") {
      alert("Введите содержание новости");
      valid = false;
    }

    if (newsLink && newsLink.value.trim() === "") {
      alert("Введите ссылку на новость");
      valid = false;
    }

    return valid;
  }

  const numberInput = document.getElementById("number");
  numberInput.addEventListener("input", function() {
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }
  });
});
