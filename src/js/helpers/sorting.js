import Pagination from "./pagination";

export default class Sorting {
  
  /**
   * При открытие страницы синхронизирует сортировку
   * @param {String} hash - входные данные в URL
   * */
  syncHash(hash) {
    if (hash !== '') {
      let target;
      let arr = hash.split('');
      arr.splice(0, 1);
      hash = arr.join('');
      if (hash === 'id-up' || hash === 'id-down') {
        target = table.querySelector('#id-up');
        target.id = hash;
        this.sortGrid(0, target);
      }
      if (hash === 'amount-up' || hash === 'amount-down') {
        target = table.querySelector('#amount-up');
        target.id = hash;
        this.sortGrid(1, target);
      }
    }
  }
  
  /**
   * Сортирует таблицу
   * @param {Number} colNum - номер столбца
   * @param {Object} type - по какому параметру сортируем
   * */
  sortGrid(colNum, type) {
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
      window.tableBody.appendChild(rowsArray[i]);
    }
    
    Pagination.prototype.changePage(1);
  }
}