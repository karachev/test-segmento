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
  // debugger;
  tr.children[0].children[0].focus();
});

function getBalance() {
  for (let i = 0; i < balances.length; i++) {
    resultValue += +balances[i].value;
  }
  result.innerHTML = resultValue.toString();
}

