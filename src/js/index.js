import Table from './helpers/table';
import Pagination from './helpers/pagination';
import Sorting from './helpers/sorting';

export let tableBody = document.querySelector('tbody');
window.tableBody = document.querySelector('tbody');
export let buttonAdd = document.querySelector('.button-add');
let balances = document.querySelectorAll('.balance');
let countID = document.querySelectorAll('input[title="id"]').length;

export const MAX_LENGTH_COMMENT = 512;


export let btnPrev = document.querySelector('#btn-prev');
export let btnNext = document.querySelector('#btn-next');

let table = new Table(tableBody, balances);

table.init();

table.getBalance();

let pagination = new Pagination(tableBody);

let hash = new Sorting(location.hash);

hash.syncHash(location.hash);

/** `Слушает` клики на кнопку с предыдущими страницами */
btnPrev.addEventListener('click', function (evt) {
  evt.preventDefault();
  pagination.changePrevPage();
});

/** `Слушает` клики на кнопку со следующими страницами */
btnNext.addEventListener('click', function (evt) {
  evt.preventDefault();
  pagination.changeNextPage();
});

/** `Слушает` клики на заголовки таблицы */
tableBody.addEventListener('click', function (evt) {
  if (evt.target.tagName !== 'TH') return;
  Sorting.sortGrid(evt.target.cellIndex, evt.target, evt.target.id);
});

/** `Слушает` клики на кнопку добавления нового поля */
buttonAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  table.validationComment();
  if (!document.querySelector('.no-validate')) {
    countID = tableBody.querySelectorAll('tr').length;
    countID++;
    let tr = document.createElement('tr');
    tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
      `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01"\ value=\"\"></td>` +
      `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"\" maxlength=\"512\"></td>`;
    tableBody.appendChild(tr);
    tr.querySelector('.balance').focus();
    
    Table.prototype.getBalance();
  }
});
