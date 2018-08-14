(function() {
  function Controller() {
    let controller = this;
    let sizeDefaultTable = 15;
    let rootNode = document.querySelector('tbody');
    
    this.initTable(sizeDefaultTable, rootNode);
    this.getBalance();
    this.initButtonChange();
  }
  
  Controller.prototype.initTable = function(size, rootNode) {
    for (let i = 1; i <= size; i++) { // Начинается с единицы, чтобы id и balance != 0
      let initialData = document.createElement('tr');
      let valueTd = (i % 2) ? i : i * 10;
      initialData.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${i}\" disabled></td>` +
        `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01\" value=\"${valueTd}\"></td>` +
        `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"Комментарий\" maxlength=\"512\"></td>`;
      rootNode.appendChild(initialData);
    }
  };
  
  Controller.prototype.getBalance = function() {
    let resultValue = 0;
    let balances = document.querySelectorAll('.balance');
    for (let i = 0; i < balances.length; i++) {
      if (balances[i].value !== '') {
        resultValue += Math.round(parseFloat(balances[i].value) * 100) / 100;
      }
    }
    result.innerHTML = resultValue.toString();
  };
  
  Controller.prototype.initButtonChange = function() {
    let btnPrev = document.querySelector('#btn-prev');
    let btnNext = document.querySelector('#btn-next');
    let currentPage = 1;
    
    /** `Слушает` клики на кнопку с предыдущими страницами */
    btnPrev.addEventListener('click', function (evt) {
      evt.preventDefault();
      // changePrevPage();
      this.changePrevPage();
    });
  
    /** `Слушает` клики на кнопку со следующими страницами */
    btnNext.addEventListener('click', function (evt) {
      evt.preventDefault();
      // changeNextPage();
      this.changeNextPage();
    });
  
    this.changePrevPage = function() {
      if (currentPage > 1) {
        currentPage--;
        this.changePage(currentPage);
      }
    };
  
    /** Переключает на следующую страницу */
    this.changeNextPage = function () {
      if (currentPage < numPages()) {
        currentPage++;
        this.changePage(currentPage);
      }
    };
  
    /** Меняет страницу и отображает контент на ней
     * @param {Number} page - номер страницы
     * */
    this.changePage = function(page) {
      let tr = tableBody.querySelectorAll('tr');
    
      for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = 'none';
      }
    
      for (let i = (page - 1) * trPerPage; i < (page * trPerPage); i++) {
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
    this.numPages = function() {
      let tr = tableBody.querySelectorAll('tr');
      return Math.ceil(tr.length / trPerPage);
    }
  };
  
  window.Controller = Controller;
})();
