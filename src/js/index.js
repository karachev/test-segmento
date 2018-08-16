import Table from './helpers/table';

let tableBody = document.querySelector('tbody');

let var1 = new Table(tableBody);

var1.init();

console.log(var1.name);