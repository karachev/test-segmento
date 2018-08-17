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
};