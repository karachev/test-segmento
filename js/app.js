'use strict';

let buttonAdd = document.querySelector('.button-add');
let tableBody = document.querySelector('tbody');
let result = document.querySelector('#result');
let balances = document.querySelectorAll('.balance');
let countID = document.querySelectorAll('input[title="id"]').length;
let table = document.querySelector('table');
let btnNext = document.querySelector('#btn-next');
let btnPrev = document.querySelector('#btn-prev');
let currentPage = 1;
let trPerPage = 10;


const MAX_LENGTH_COMMENT = 512;

showLocalStorage();
getBalance();
changePage(currentPage);


table.addEventListener('click', function (evt) {
  if (evt.target.tagName !== 'TH') return;
  sortGrid(evt.target.cellIndex, evt.target.getAttribute('data-type'));
});

buttonAdd.addEventListener('click', function () {
  validationComment();
  if (!document.querySelector('.no-validate')) {
    countID = localStorage.length / 2;
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

btnPrev.addEventListener('click', function (evt) {
  evt.preventDefault();
  changePrevPage();
});

btnNext.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeNextPage();
});

function sortGrid(colNum, type) {
  let rowsArray = [].slice.call(tableBody.rows);
  let compare;

  switch (type) {
    case 'id':
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      break;
    case 'amount':
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      break;
  }

  rowsArray.sort(compare);

  for (let i = 0; i < rowsArray.length; i++) {
    tableBody.appendChild(rowsArray[i]);
  }
}

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
    } else {
      balances[i].classList.remove('no-validate');
      if (i < 10) {
        localStorage.setItem('balance0' + `${i}`, balances[i].value);
      } else {
        localStorage.setItem('balance' + `${i}`, balances[i].value);
      }
    }
    if (comment[i].value === "" ||
      comment[i].value.length > MAX_LENGTH_COMMENT) {
      comment[i].classList.add('no-validate');
    } else {
      comment[i].classList.remove('no-validate');
      if (i < 10) {
        localStorage.setItem('comment0' + `${i}`, comment[i].value);
      } else {
        localStorage.setItem('comment' + `${i}`, comment[i].value);
      }
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

function changePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
}

function changeNextPage() {
  if (currentPage < numPages()) {
    currentPage++;
    changePage(currentPage);
  }
}

function changePage(page) {
  let tr = tableBody.querySelectorAll('tr');

  for (let i = 0; i < tr.length; i++) {
    tr[i].style.display = "none";
  }

  for (let i = (page - 1) * trPerPage; i < (page * trPerPage); i++) {
    if (tr[i] !== undefined) {
      tr[i].style.display = 'table-row';
    }
  }

  if (page === 1) {
    btnPrev.style.visibility = "hidden";
  } else {
    btnPrev.style.visibility = "visible";
  }

  if (page === numPages()) {
    btnNext.style.visibility = "hidden";
  } else {
    btnNext.style.visibility = "visible";
  }
}

function numPages() {
  let tr = tableBody.querySelectorAll('tr');
  return Math.ceil(tr.length / trPerPage);
}

// TODO Записей больше 10, нужно придумать как перезагрузить
// TODO стоит ли сделать реализацию подсказки валидации
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Кроссбраузерность и адаптивность
// TODO Адптивность - Babel и полифилл
// TODO подумать на счёт кнопки валидации
// TODO добавить комментарии с помощью JSDoc
// TODO возможно стоит разбить по файлам
