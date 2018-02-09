'use strict';

var buttonAdd = document.querySelector('.button-add');
buttonAdd.setAttribute('disabled', 'true');
var tableBody = document.querySelector('tbody');
var result = document.querySelector('#result');
var balances = document.querySelectorAll('.balance');
var countID = document.querySelectorAll('input[title="id"]').length;
var table = document.querySelector('table');
var btnNext = document.querySelector('#btn-next');
var btnPrev = document.querySelector('#btn-prev');
var currentPage = 1;
var trPerPage = 10;

var MAX_LENGTH_COMMENT = 512;

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
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input title="id" type="number" value="' + countID + '" disabled></td>' + '<td><input title="\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432" class="balance" type="number" value=""></td>' + '<td><input title="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" class="comment" type="text" value="" maxlength="512"></td>';
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
  for (var i = 1; i <= 15; i++) {
    // Начинается с единицы, чтобы id и balance != 0
    var initialData = document.createElement('tr');
    var valueTd = i % 2 ? i : i * 10;
    initialData.innerHTML = '<td><input title="id" type="number" value="' + i + '" disabled></td>' + ('<td><input title="\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432" class="balance" type="number" value="' + valueTd + '"></td>') + '<td><input title="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" class="comment" type="text" value="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" maxlength="512"></td>';
    tableBody.appendChild(initialData);
  }
}

/**
 * При открытие страницы синхронизирует сортировку
 * @param {String} hash - входные данные в URL
 * */
function syncHash(hash) {
  if (hash !== '') {
    var target = void 0;
    var arr = hash.split('');
    arr.splice(0, 1);
    hash = arr.join('');
    if (hash === 'id-up' || hash === 'id-down') {
      target = table.querySelector('#id-up');
      target.id = hash;
      sortGrid(0, target);
    }
    if (hash === 'amount-up' || hash === 'amount-down') {
      target = table.querySelector('#amount-up');
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
  var rowsArray = [].slice.call(tableBody.rows);
  var compare = void 0;

  switch (type.id) {
    case 'id-up':
      compare = function compare(rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'id-down';
      break;
    case 'id-down':
      compare = function compare(rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'id-up';
      break;
    case 'amount-up':
      compare = function compare(rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'amount-down';
      break;
    case 'amount-down':
      compare = function compare(rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      location.hash = type.id;
      type.id = 'amount-up';
      break;
  }

  rowsArray.sort(compare);
  for (var i = 0; i < rowsArray.length; i++) {
    tableBody.appendChild(rowsArray[i]);
  }
  changePage(1);
}

/** Выводит итоговый баланс */
function getBalance() {
  var resultValue = 0;
  balances = document.querySelectorAll('.balance');
  for (var i = 0; i < balances.length; i++) {
    balances[i].value = parseFloat(balances[i].value).toFixed(2);
    resultValue += +balances[i].value;
  }
  result.innerHTML = resultValue.toFixed(2);
}

/** Валидирует содержимое ячеек */
function validationComment() {
  var tr = document.querySelectorAll('tr');
  balances = document.querySelectorAll('.balance');
  var comment = document.querySelectorAll('.comment');
  for (var i = 0; i < tr.length - 1; i++) {
    if (balances[i].value === "0" || balances[i].value === "" || isNaN(balances[i].value) || +balances[i].value > 1000 || +balances[i].value < -1000) {
      balances[i].classList.add('no-validate');
    } else {
      balances[i].classList.remove('no-validate');
    }
    if (comment[i].value === "" || comment[i].value.length > MAX_LENGTH_COMMENT) {
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
  var tr = tableBody.querySelectorAll('tr');

  for (var i = 0; i < tr.length; i++) {
    tr[i].style.display = "none";
  }

  for (var _i = (page - 1) * trPerPage; _i < page * trPerPage; _i++) {
    if (tr[_i] !== undefined) {
      tr[_i].style.display = 'table-row';
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
  var tr = tableBody.querySelectorAll('tr');
  return Math.ceil(tr.length / trPerPage);
}