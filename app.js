'use strict';

let buttonAdd = document.querySelector('.button-add');
buttonAdd.setAttribute('disabled', 'true');
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

createTable();
getBalance();
changePage(currentPage);
syncHash(location.hash);

/** `Слушает` клики на заголовки таблицы */
table.addEventListener('click', function (evt) {
  if (evt.target.tagName !== 'TH') return;
  sortGrid(evt.target.cellIndex, evt.target, evt.target.id);
});

/** `Слушает` клики на кнопку добавления нового поля */
buttonAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  validationComment();
  if (!document.querySelector('.no-validate')) {
    countID = tableBody.querySelectorAll('tr').length;
    countID++;
    let tr = document.createElement('tr');
    tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
      `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01"\ value=\"\"></td>` +
      `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"\" maxlength=\"512\"></td>`;
    tableBody.appendChild(tr);
    tr.querySelector('.balance').focus();

    getBalance();
  }
});

/** `Слушает` клики на кнопку с предыдущими страницами */
btnPrev.addEventListener('click', function (evt) {
  evt.preventDefault();
  changePrevPage();
});

/** `Слушает` клики на кнопку со следующими страницами */
btnNext.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeNextPage();
});

/** Создает данные в таблице */
function createTable() {
  for (let i = 1; i <= 15; i++) { // Начинается с единицы, чтобы id и balance != 0
    let initialData = document.createElement('tr');
    let valueTd = (i % 2) ? i : i * 10;
    initialData.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${i}\" disabled></td>` +
      `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01\" value=\"${valueTd}\"></td>` +
      `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"Комментарий\" maxlength=\"512\"></td>`;
    tableBody.appendChild(initialData);
  }
}

/**
 * При открытие страницы синхронизирует сортировку
 * @param {String} hash - входные данные в URL
 * */
function syncHash(hash) {
  if (hash !== '') {
    let target;
    let arr = hash.split('');
    arr.splice(0, 1);
    hash = arr.join('');
    if (hash === 'id-up' || hash === 'id-down') {
      target = table.querySelector(`#id-up`);
      target.id = hash;
      sortGrid(0, target);
    }
    if (hash === 'amount-up' || hash === 'amount-down') {
      target = table.querySelector(`#amount-up`);
      target.id = hash;
      sortGrid(1, target);
    }
  }
}

/**
 * Сортирует таблицу
 * @param {Number} colNum - номер столбца
 * @param {Object} type - по какому параметру сортируем
 * */
function sortGrid(colNum, type) {
  let rowsArray = [].slice.call(tableBody.rows);
  let compare;

  switch (type.id) {
    case 'id-up':
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'id-down';
      break;
    case 'id-down':
      compare = function (rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'id-up';
      break;
    case 'amount-up':
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'amount-down';
      break;
    case 'amount-down':
      compare = function (rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'amount-up';
      break;
  }

  rowsArray.sort(compare);
  for (let i = 0; i < rowsArray.length; i++) {
    tableBody.appendChild(rowsArray[i]);
  }
  changePage(1);
}

/** Выводит итоговый баланс */
function getBalance() {
  let resultValue = 0;
  balances = document.querySelectorAll('.balance');
  for (let i = 0; i < balances.length; i++) {
    if (balances[i].value !== "") {
      resultValue += Math.round(parseFloat(balances[i].value) * 100) / 100;
    }
  }
  result.innerHTML = resultValue.toString();
}

/** Валидирует содержимое ячеек */
function validationComment() {
  let tr = document.querySelectorAll('tr');
  balances = document.querySelectorAll('.balance');
  let comment = document.querySelectorAll('.comment');
  for (let i = 0; i < tr.length - 1; i++) {
    balances[i].value = Math.round(parseFloat(balances[i].value) * 100) / 100;
    if (balances[i].value === 0 ||
      balances[i].value === "" ||
      isNaN(balances[i].value) ||
      balances[i].value > 1000 ||
      balances[i].value < -1000) {
      balances[i].classList.add('no-validate');
    } else {
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

/** Переключает на предыдущую страницу */
function changePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
}

/** Переключает на следующую страницу */
function changeNextPage() {
  if (currentPage < numPages()) {
    currentPage++;
    changePage(currentPage);
  }
}

/** Меняет страницу и отображает контент на ней
 * @param {Number} page - номер страницы
 * */
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
    buttonAdd.removeAttribute('disabled');
  } else {
    btnNext.style.visibility = "visible";
    buttonAdd.setAttribute('disabled', 'true');
  }
}

/** Вычисляет количество всех страниц */
function numPages() {
  let tr = tableBody.querySelectorAll('tr');
  return Math.ceil(tr.length / trPerPage);
}