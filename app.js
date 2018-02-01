'use strict';

let buttonAdd = document.querySelector('.button-add');
let tableBody = document.querySelector('tbody');
let result = document.querySelector('#result');
let balances = document.querySelectorAll('.balance');

let countID = document.querySelectorAll('input[title="id"]').length;

// const MAX_LENGTH_COMMENT = 512;


getBalance();

buttonAdd.addEventListener('click', function () {
  // debugger;
  validationComment();
  if (!document.querySelector('.no-validate')) {
      countID++;
      let tr = document.createElement('tr');
      tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
          `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" value=\"\"></td>` +
          `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"\" maxlength=\"512\"></td>`;
      tableBody.appendChild(tr);
      tr.querySelector('.balance').focus();


      getBalance(); // Нужно убрать будет
  }
});

function getBalance() {
  let resultValue = 0;
  for (let i = 0; i < balances.length; i++) {
    resultValue += +balances[i].value;
  }
  result.innerHTML = resultValue.toString();
}


function validationComment() {
  // debugger;
  let tr = document.querySelectorAll('tr');
  balances = document.querySelectorAll('.balance');
  let comment = document.querySelectorAll('.comment');

  for (let i = 0; i < tr.length - 1; i++) {
    // возможно стоит заменить на обратные
    if (balances[i].value === "0" || balances[i].value === "" || isNaN(balances[i].value)) {
      balances[i].classList.add('no-validate');
    }
    else if (comment[i].value === "" || comment[i].value.length > 512) {
      comment[i].classList.add('no-validate');
    } else {
        balances[i].classList.remove('no-validate');
        comment[i].classList.remove('no-validate');
    }
  }
}

// TODO валидация ячеек
// TODO комментарий ограничен на js 512 символов
// TODO Обновление результата
// TODO Реализованная возможность сортировки по полям "Id" и "Количество средств"
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Добавление pagination если количество записей в таблице превышает 10
// TODO Кроссбраузерность и адаптивность
