function addSpace(num) {
  return num.split('').reverse().map((i, idx) => {
    return (idx + 1) % 3 === 0 ? ` ${i}` : i;
  }).reverse().join('').trim();
}

class Calculator {
  state = {
    operand1: '0',
    get op1Num() {
      return parseFloat(this.operand1.replace(/\s/g, ''));
    },
    operator: null,
    operand2: '0',
    get op2Num() {
      return parseFloat(this.operand2.replace(/\s/g, ''));
    },
  };
  field = document.getElementById('field');
  resetBtn = document.getElementById('reset');


  constructor() {
    const change = new Event('change');
    this.reset();
    this.resetBtn.addEventListener('click', () => this.reset());
    document.querySelectorAll('.num').forEach((num) => {
      num.addEventListener('click', () => {
        if (this.field.value.length >= 19) return;
        if (!this.state.operator) {
          if (this.state.operand1.length === 1 && !parseFloat(this.state.operand1)) {
            if (!parseInt(num.innerHTML, 10)) return;
            else this.state.operand1 = num.innerHTML;
          } else {
            this.state.operand1 += num.innerHTML;
            if (this.state.operand1.replace(/\s/g, '').length >= 4) {
              this.state.operand1 = addSpace(this.state.operand1.replace(/\s/g, ''));
            }  
          }
          this.field.value = this.state.operand1;
        } else {
          if (this.state.operand2.length === 1 && !parseFloat(this.state.operand2)) {
            if (!parseInt(num.innerHTML, 10)) return;
            else this.state.operand2 = num.innerHTML;
          } else {
            this.state.operand2 += num.innerHTML;
            if (this.state.operand2.replace(/\s/g, '').length >= 4) {
              this.state.operand2 = addSpace(this.state.operand2.replace(/\s/g, ''));
            } 
          }
          this.field.value = this.state.operand2;
        }
        this.field.dispatchEvent(change);
      });
    });
    document.querySelectorAll('.operator').forEach(op => {
      op.addEventListener('click', () => {
        this.state.operator = op.innerHTML;
      });
    });

    document.getElementById('eql').addEventListener('click', () => {
      this.calculate();
      this.reset(this.state.operand1);
      if (this.state.operand1.toString().replace(/\s/g, '').length >= 4 && !this.state.operand1.toString().match(/\w/g)) {
        this.state.operand1 = addSpace(this.state.operand1.toString().replace(/\s/g, ''));
      } 
      this.field.value = this.state.operand1;
      this.field.dispatchEvent(change);
    });

    document.getElementById('point').addEventListener('click', () => {
      if (this.state.operator && !this.state.operand2.includes('.')) {
        this.state.operand2 += '.';
        this.field.value = this.state.operand2;
        return;
      }
  
      if (!this.state.operand1.includes('.')) {
        this.state.operand1 += '.';
        this.field.value = this.state.operand1;
      }
    });

    document.getElementById('minus').addEventListener('click', () => {
      if (this.state.operator) {
        this.state.operand2 *= -1;
        this.field.value = this.state.operand2;
      }
      else {
        if (!parseFloat(this.state.operand1)) return;
        this.state.operand1 *= -1;
        this.field.value = this.state.operand1;
      }
    });

    document.getElementById('percent').addEventListener('click', () => {
      if (this.state.operator) {
        this.state.operand2 /= 100;
        this.field.value = this.state.operand2;
      }
      else {
        this.state.operand1 /= 100;
        this.field.value = this.state.operand1;
      }
    });

    this.field.addEventListener('change', () => {
      const op = this.state.operator ? this.state.operand2 : this.state.operand1;
      const lengthToSize = {
        10: '4',
        11: '3.6',
        13: '3.1',
        14: '2.8',
        15: '2.6',
        17: '2.4',
        18: '2.2',
        19: '2.1',
        20: '1.9',
        21: '1.7'
      };
      const fontSize = lengthToSize[op.length];
      this.field.style.fontSize = `${fontSize}rem`;
    }, false);
  }

  reset(op1) {
    this.field.style.fontSize = '4.5rem';
    this.state.operator = null;
    this.state.operand1 = op1 ?? '0';
    this.state.operand2 = '0';
    this.field.value = this.state.operand1;
  }

  calculate() {
    switch(this.state.operator) {
      case '+': {
        this.state.operand1 = (this.state.op1Num + this.state.op2Num).toString();
        break;
      }
      case '-': {
        this.state.operand1 = (this.state.op1Num - this.state.op2Num).toString();
        break;
      }
      case 'x': {
        this.state.operand1 = (this.state.op1Num * this.state.op2Num).toString();
        break;
      }
      case '/': {
        if (!this.state.op2Num) return this.state.operand1 = `Can't divide with 0`;
        this.state.operand1 = (this.state.op1Num / this.state.op2Num).toString();
        break;
      }
      default: this.state.operand1 = 0;
    }
  }
}

new Calculator();