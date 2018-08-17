import Table from './helpers/table';
import Pagination from './helpers/pagination';
// import Sorting from './helpers/sorting';

export let tableBody = document.querySelector('tbody');
let balances = document.querySelectorAll('.balance');

export let btnNext = document.querySelector('#btn-next');
export let btnPrev = document.querySelector('#btn-prev');



let table = new Table(tableBody, balances);

table.init();

table.getBalance();

let pagination = new Pagination(tableBody);

// let hash = new Sorting(location.hash);
//
// hash.syncHash(location.hash);

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
