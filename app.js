'use strict';

let buttonAdd = document.querySelector('.button-add');
let tableBody = document.querySelector('tbody');
let result = document.querySelector('#result');
let balances = document.querySelectorAll('.balance');

let countID = document.querySelectorAll('input[title="id"]').length;

const MAX_LENGTH_COMMENT = 512;


getBalance();

buttonAdd.addEventListener('click', function () {
  validationComment();
  if (!document.querySelector('.no-validate')) {
      countID++;
      let tr = document.createElement('tr');
      tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
          `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" value=\"\"></td>` +
          `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"\" maxlength=\"512\"></td>`;
      tableBody.appendChild(tr);
      tr.querySelector('.balance').focus();

      getBalance();
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
  let tr = document.querySelectorAll('tr');
  balances = document.querySelectorAll('.balance');
  let comment = document.querySelectorAll('.comment');

  for (let i = 0; i < tr.length - 1; i++) {
    if (balances[i].value === "0" ||
        balances[i].value === "" ||
        isNaN(balances[i].value) ||
        +balances[i].value > 1000 ||
        +balances[i].value < -1000) {
        balances[i].classList.add('no-validate');
    } else  {
        balances[i].classList.remove('no-validate');
    }
    if (comment[i].value === "" ||
        comment[i].value.length > MAX_LENGTH_COMMENT) {
      comment[i].classList.add('no-validate');
    } else {
    comment[i].classList.remove('no-validate');
    }
  }
}

// TODO стоит ли сделать реализацию подсказки валидации
// TODO Реализованная возможность сортировки по полям "Id" и "Количество средств"
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Добавление pagination если количество записей в таблице превышает 10
// TODO Кроссбраузерность и адаптивность
