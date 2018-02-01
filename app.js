'use strict';

let buttonAdd = document.querySelector('.button-add');
let table = document.querySelector('table');
let result = document.querySelector('#result');
let balances = document.querySelectorAll('.balance');
let resultValue = 0;

getBalance();

buttonAdd.addEventListener('click', function () {
  let tr = document.createElement('tr');
  tr.innerHTML = "<td><input title=\"id\" type=\"number\" value=\"\"></td>" + "<td><input title=\"Количество средств\" type=\"number\" value=\"\"></td>" + "<td><input title=\"Комментарий\" type=\"text\" value=\"\" maxlength=\"512\"></td>";
  table.appendChild(tr);
  tr.querySelector('input[title="id"]').focus();
});

function getBalance() {
  for (let i = 0; i < balances.length; i++) {
    resultValue += +balances[i].value;
  }
  result.innerHTML = resultValue.toString();
}

// TODO Реализованная возможность сортировки по полям "Id" и "Количество средств"
// TODO Обновление результата
// TODO валидация ячеек
// TODO id уникальное
// TODO id не редактируется
// TODO комментарий ограничен на js 512 символов
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Добавление pagination если количество записей в таблице превышает 10
// TODO Кроссбраузерность и адаптивность
