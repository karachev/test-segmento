import {MAX_LENGTH_COMMENT} from './../index';

export default class Table {
  constructor(rootNode, balances) {
    this.rootNode = rootNode;
    this.balances = balances;
  }
  
  init() {
    for (let i = 1; i <= 15; i++) { // Начинается с единицы, чтобы id и balance != 0
      let initialData = document.createElement('tr');
      let valueTd = (i % 2) ? i : i * 10;
      initialData.innerHTML = `<td><input title=\"id\" type=\"number\" value=\"${i}\" disabled></td>` +
        `<td><input title=\"Количество средств\" class=\"balance\" type=\"number\" step=\"0.01\" value=\"${valueTd}\"></td>` +
        `<td><input title=\"Комментарий\" class=\"comment\" type=\"text\" value=\"Комментарий\" maxlength=\"512\"></td>`;
      this.rootNode.appendChild(initialData);
    }
  }
  
  /** Выводит итоговый баланс */
  getBalance() {
    let resultValue = 0;
    this.balances = document.querySelectorAll('.balance');
    for (let i = 0; i < this.balances.length; i++) {
      if (this.balances[i].value !== '') {
        resultValue += Math.round(parseFloat(this.balances[i].value) * 100) / 100;
      }
    }
    result.innerHTML = resultValue.toString();
  }
  
  /** Валидирует содержимое ячеек */
  validationComment() {
    let tr = document.querySelectorAll('tr');
    this.balances = document.querySelectorAll('.balance');
    let comment = document.querySelectorAll('.comment');
    for (let i = 0; i < tr.length - 1; i++) {
      this.balances[i].value = Math.round(parseFloat(this.balances[i].value) * 100) / 100;
      if (this.balances[i].value === 0 ||
        this.balances[i].value === '' ||
        isNaN(this.balances[i].value) ||
        this.balances[i].value > 1000 ||
        this.balances[i].value < -1000) {
        this.balances[i].classList.add('no-validate');
      } else {
        this.balances[i].classList.remove('no-validate');
      }
      if (comment[i].value === '' ||
        comment[i].value.length > MAX_LENGTH_COMMENT) {
        comment[i].classList.add('no-validate');
      } else {
        comment[i].classList.remove('no-validate');
      }
    }
  }
};