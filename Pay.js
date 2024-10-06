$(document).ready(function() {
  // Показываем соответствующие поля в зависимости от выбранного метода оплаты
  $('#paymentMethod').change(function() {
    var selectedMethod = $(this).val();

    // Скрываем все блоки с деталями оплаты
    $('.payment-details').hide();

    // Показываем только выбранный метод оплаты
    $('#' + selectedMethod + 'PaymentDetails').show();

    // Снимаем атрибут required с полей, которые не относятся к выбранному методу оплаты
    if (selectedMethod === 'card') {
      $('#phoneNumber').removeAttr('required');
      $('#emailAddressPhone').removeAttr('required');
      $('#cardNumber').attr('required', 'required');
      $('#pinCode').attr('required', 'required');
      $('#expiryDate').attr('required', 'required');
      $('#emailAddressCard').attr('required', 'required');
    } else if (selectedMethod === 'phone') {
      $('#cardNumber').removeAttr('required');
      $('#pinCode').removeAttr('required');
      $('#expiryDate').removeAttr('required');
      $('#emailAddressCard').removeAttr('required');
      $('#phoneNumber').attr('required', 'required');
      $('#emailAddressPhone').attr('required', 'required');
    }
  });

  // Обработка отправки формы оплаты
  $('#paymentForm').submit(function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем выбранный метод оплаты
    var selectedMethod = $('#paymentMethod').val();

    // В зависимости от метода оплаты выполняем соответствующие действия
    if (selectedMethod === 'card') {
      // Получаем значения полей для оплаты по карте
      var cardNumber = $('#cardNumber').val().trim();
      var pinCode = $('#pinCode').val().trim();
      var expiryDate = $('#expiryDate').val().trim();
      var emailAddressCard = $('#emailAddressCard').val().trim();

      // Проверка длины номера карты (должно быть ровно 16 символов)
      if (cardNumber.length !== 16) {
        alert('Введите корректный номер карты (16 цифр)!');
        return;
      }

      // Проверка длины пин-кода (должно быть ровно 4 символа)
      if (pinCode.length !== 4) {
        alert('Введите корректный пин-код (4 цифры)!');
        return;
      }

      // Проверка формата даты (должна быть в формате ММ/ГГ)
      if (!isValidExpiryDate(expiryDate)) {
        alert('Введите корректную дату в формате ММ/ГГ (например, 12/24)!');
        return;
      }

      // Проверка корректности email
      if (!isValidEmail(emailAddressCard)) {
        alert('Введите корректный email для получения данных!');
        return;
      }

      handleSuccess('Оплата по карте успешно выполнена! Проверьте почту!');
    } else if (selectedMethod === 'phone') {
      // Получаем значения полей для оплаты по телефону
      var phoneNumber = $('#phoneNumber').val().trim();
      var emailAddressPhone = $('#emailAddressPhone').val().trim();

      // Проверка номера телефона
      var phoneRegex = /^\+\d{11}$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert('Введите корректный номер телефона (в формате +12345678910)!');
        return;
      }

      // Проверка корректности email
      if (!isValidEmail(emailAddressPhone)) {
        alert('Введите корректный email для получения данных!');
        return;
      }

      handleSuccess('Оплата по телефону успешно выполнена! Проверьте почту!');
    }
  });

  // Валидация поля номера карты (максимум 16 символов)
  $('#cardNumber').on('input', function() {
    if ($(this).val().length > 16) {
      $(this).val($(this).val().slice(0, 16));
    }
  });

  // Валидация поля пин-кода (ровно 4 символа)
  $('#pinCode').on('input', function() {
    if ($(this).val().length > 4) {
      $(this).val($(this).val().slice(0, 4));
    }
  });

  // Валидация поля срока действия карты (формат ММ/ГГ)
  $('#expiryDate').on('input', function() {
    var value = $(this).val().trim().replace(/[^\d]/g, ''); // Убираем все, кроме цифр
    var newValue = '';

    if (value.length > 0) {
      if (value.length <= 2) {
        newValue = value;
      } else {
        newValue = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    }

    $(this).val(newValue);
  });

  // Валидация поля номера телефона
  $('#phoneNumber').on('input', function() {
    var value = $(this).val().trim();

    // Удаляем все, кроме цифр
    value = value.replace(/\D/g, '');

    // Добавляем + и ограничиваем до 11 цифр
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    $(this).val('+' + value);
  });

  // Функция для проверки формата срока действия карты
  function isValidExpiryDate(date) {
    var regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(date);
  }

  // Функция для проверки корректности email
  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleSuccess(message) {
    alert(message);
    $('#paymentModal').modal('hide');
    $('#paymentForm')[0].reset(); // Очищаем форму
  }
});
