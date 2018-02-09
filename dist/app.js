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

changeHash(location.hash);

table.addEventListener('click', function (evt) {
  if (evt.target.tagName !== 'TH') return;
  sortGrid(evt.target.cellIndex, evt.target, evt.target.id);
});

buttonAdd.addEventListener('click', function () {
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

btnPrev.addEventListener('click', function (evt) {
  evt.preventDefault();
  changePrevPage();
});

btnNext.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeNextPage();
});

function changeHash(hash) {
  if (hash !== '') {
    var arr = hash.split('');
    arr.splice(0, 1);
    hash = arr.join('');
    if (hash === 'id-up' || hash === 'id-down') {
      var target = table.querySelector('#id-up');
      sortGrid(0, target, hash);
    }
    if (hash === 'amount-up' || hash === 'amount-down') {
      var _target = table.querySelector('#amount-up');
      sortGrid(1, _target);
    }
  }
}

function sortGrid(colNum, type) {
  var rowsArray = [].slice.call(tableBody.rows);
  var compare = void 0;

  switch (type.id) {
    case 'id-up':
      compare = function compare(rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      type.id = 'id-down';
      location.hash = 'id-up';
      break;
    case 'id-down':
      compare = function compare(rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      type.id = 'id-up';
      location.hash = 'id-down';
      break;
    case 'amount-up':
      compare = function compare(rowA, rowB) {
        return rowA.cells[colNum].children[0].value - rowB.cells[colNum].children[0].value;
      };
      type.id = 'amount-down';
      location.hash = 'amount-up';
      break;
    case 'amount-down':
      compare = function compare(rowA, rowB) {
        return rowB.cells[colNum].children[0].value - rowA.cells[colNum].children[0].value;
      };
      type.id = 'amount-up';
      location.hash = 'amount-down';
      break;
  }

  rowsArray.sort(compare);
  for (var i = 0; i < rowsArray.length; i++) {
    tableBody.appendChild(rowsArray[i]);
  }
  changePage(1);
}

function getBalance() {
  var resultValue = 0;
  balances = document.querySelectorAll('.balance');
  for (var i = 0; i < balances.length; i++) {
    resultValue += +balances[i].value;
  }
  result.innerHTML = resultValue.toString();
}

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

function createTable() {
  for (var i = 1; i <= 15; i++) {
    // Наичнается с единицы, чтобы id и balance != 0
    var initialData = document.createElement('tr');
    var valueTd = i % 2 ? i : i * 100;
    initialData.innerHTML = '<td><input title="id" type="number" value="' + i + '" disabled></td>' + ('<td><input title="\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432" class="balance" type="number" value="' + valueTd + '"></td>') + '<td><input title="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" class="comment" type="text" value="\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" maxlength="512"></td>';
    tableBody.appendChild(initialData);
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

function numPages() {
  var tr = tableBody.querySelectorAll('tr');
  return Math.ceil(tr.length / trPerPage);
}

// TODO стоит ли сделать реализацию подсказки валидации
// TODO Сохранение состояния сортировки в url. Для возможности обмена ссылкой с заданной сортировкой
// TODO Кроссбраузерность и адаптивность
// TODO подумать на счёт кнопки валидации
// TODO добавить комментарии с помощью JSDoc
// TODO полифил фойл
// TODO как структуру документов сделать