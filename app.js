'use strict';

let buttonAdd = document.querySelector('.button-add');
let tableBody = document.querySelector('tbody');
let result = document.querySelector('#result');
let balances = document.querySelectorAll('.balance');

let countID = document.querySelectorAll('input[title="id"]').length;

const MAX_LENGTH_COMMENT = 512;

showLocalStorage();
getBalance();

let table = document.querySelector('table');

table.addEventListener('click', function (evt) {
    if (evt.target.tagName !== 'TH') return;
    sortGrid(evt.target.cellIndex, evt.target.getAttribute('data-type'));
});

function sortGrid(colNum, type) {
    // Составить массив из TR
    let rowsArray = [].slice.call(tableBody.rows);
    // определить функцию сравнения, в зависимости от типа
    let compare;

    switch (type) {
        case 'id':
            compare = function(rowA, rowB) {
                return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
            };
            break;
        case 'amount':
            compare = function(rowA, rowB) {
                return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
            };
            break;
    }

    // сортировать
    rowsArray.sort(compare);
    // они автоматически будут убраны со старых мест и вставлены в правильном порядке
    for (let i = 0; i < rowsArray.length; i++) {
        tableBody.appendChild(rowsArray[i]);
    }
}

buttonAdd.addEventListener('click', function () {
  validationComment();
  if (!document.querySelector('.no-validate')) {
      countID = document.querySelectorAll('input[title="id"]').length;
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
  balances = document.querySelectorAll('.balance');
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
        localStorage.setItem('balance' + `${i}`, balances[i].value);
    }
    if (comment[i].value === "" ||
        comment[i].value.length > MAX_LENGTH_COMMENT) {
      comment[i].classList.add('no-validate');
    } else {
      comment[i].classList.remove('no-validate');
      localStorage.setItem('comment'  + `${i}`, comment[i].value);
    }
  }
}

function showLocalStorage() {
  if (localStorage.length > 0) {
    let countID = 0;
    for (let i = 0; i < localStorage.length / 2; i++) {
      let balance = localStorage.key(i);
      let comment = localStorage.key(localStorage.length / 2 + i);
      countID++;
      let tr = document.createElement('tr');
      tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
        `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" value=\"${localStorage.getItem(balance)}\"></td>` +
        `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"${localStorage.getItem(comment)}\" maxlength=\"512\"></td>`;
      tableBody.appendChild(tr);
    }
  } else {
    for (let i = 1; i <= 3; i++) { // Наичнается с единицы, чтобы id и balance != 0
      let initialData = document.createElement('tr');
      initialData.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${i}\" disabled></td>` +
        `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" value=\"${10 * i}\"></td>` +
        `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"Комментарий\" maxlength=\"512\"></td>`;
      tableBody.appendChild(initialData);
    }
  }
}

// TODO стоит ли сделать реализацию подсказки валидации
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Добавление pagination если количество записей в таблице превышает 10
// TODO Кроссбраузерность и адаптивность
// TODO Адптивность - Babel и полифилл
// TODO подумать на счёт кнопки валидации
