import Table from './helpers/table';
import Pagination from './helpers/pagination';
import Sorting from './helpers/sorting';

window.table = document.querySelector('table');
window.tableBody = document.querySelector('tbody');
export let buttonAdd = document.querySelector('.button-add');
let balances = document.querySelectorAll('.balance');
let countID = document.querySelectorAll('input[title="id"]').length;

export const MAX_LENGTH_COMMENT = 512;


export let btnPrev = document.querySelector('#btn-prev');
export let btnNext = document.querySelector('#btn-next');

let tableHeart = new Table(balances);

tableHeart.init();

tableHeart.getBalance();

let pagination = new Pagination();

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
window.tableBody.addEventListener('click', function (evt) {
  if (evt.target.tagName !== 'TH') return;
  Sorting.sortGrid(evt.target.cellIndex, evt.target, evt.target.id);
});

/** `Слушает` клики на кнопку добавления нового поля */
buttonAdd.addEventListener('click', function (evt) {
  evt.preventDefault();
  tableHeart.validationComment();
  if (!document.querySelector('.no-validate')) {
    countID = window.tableBody.querySelectorAll('tr').length;
    countID++;
    let tr = document.createElement('tr');
    tr.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${countID}\" disabled></td>` +
      `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01"\ value=\"\"></td>` +
      `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"\" maxlength=\"512\"></td>`;
    window.tableBody.appendChild(tr);
    tr.querySelector('.balance').focus();
    
    Table.prototype.getBalance();
  }
});
