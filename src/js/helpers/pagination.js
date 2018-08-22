import {btnPrev, btnNext, buttonAdd} from './../index';

export default class Pagination {
  constructor(rootNode) {
    this.currentPage = 1;
    this.trPerPage = 10;
    this.rootNode = rootNode;
  }
  
  /** Переключает на предыдущую страницу */
  changePrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }
  
  /** Переключает на следующую страницу */
  changeNextPage() {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }
  
  /** Меняет страницу и отображает контент на ней
   * @param {Number} page - номер страницы
   * */
  changePage(page) {
    let tr = window.tableBody.querySelectorAll('tr');
    
    for (let i = 0; i < tr.length; i++) {
      tr[i].style.display = 'none';
    }
    
    for (let i = (page - 1) * this.trPerPage; i < (page * this.trPerPage); i++) {
      if (tr[i] !== undefined) {
        tr[i].style.display = 'table-row';
      }
    }
    
    if (page === 1) {
      btnPrev.style.visibility = 'hidden';
    } else {
      btnPrev.style.visibility = 'visible';
    }
    
    if (page === this.numPages()) {
      btnNext.style.visibility = 'hidden';
      buttonAdd.removeAttribute('disabled');
    } else {
      btnNext.style.visibility = 'visible';
      buttonAdd.setAttribute('disabled', 'true');
    }
  }
  
  /** Вычисляет количество всех страниц */
  numPages() {
    let tr = window.tableBody.querySelectorAll('tr');
    return Math.ceil(tr.length / this.trPerPage);
  }
};