import eventCreator from './eventCreator.js';
import calculate from './calculate.js';
import changeEvent from './changeEvent.js';
import { addSpace, getCalculateData } from './helpers.js';

const field = document.getElementById('field');
const resetBtn = document.getElementById('reset');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.num');
const equals = document.getElementById('eql');
const dot = document.getElementById('point');
const canvas = document.getElementById('canvas');
const plusMinus = document.getElementById('minus');
const percent = document.getElementById('percent');

const state = {
  operandFirst: {
    value: '0',
    get opNumber() {
      return parseFloat(this.value);
    },
    get isEmpty() {
      const {value, opNumber} = this;
      return !value.includes('.') && !opNumber;
    }
  },
  operandSecond: {
    value: '0',
    get opNumber() {
      return parseFloat(this.value);
    },
    get isEmpty() {
      const {value, opNumber} = this;
      return !value.includes('.') && !opNumber;
    }
  },
  operator: null,
  get operandType() {
    return this.operator ? 'operandSecond' : 'operandFirst'
  },
};

const notDivideToNull = `Can't divide with 0`

function reset(op) {
  field.style.fontSize = '4.5rem';

  state.operator = null;
  state.operandFirst.value = op ?? '0';
  state.operandSecond.value = '0';
  field.value = state.operandFirst.value;
}

(function init() {
  reset();
})();

// C
resetBtn.addEventListener('click', () => reset());

// + - * /
operators.forEach(op => {
  op.addEventListener('click', () => {
    state.operator = op.innerHTML;
  });
});

// =
equals.addEventListener('click', () => {
  if (!state.operator) return;
  const { operandFirst: { opNumber: op1 }, operandSecond: { opNumber: op2 } } = state;
  let result = calculate(op1, op2, state.operator);
  reset(result);
  
  if (result !== notDivideToNull) {
    result = result.includes('.') ? result : addSpace(result);
  }
  
  field.dispatchEvent(eventCreator(result));
});

// .
dot.addEventListener('click', () => {
  const { operandType } = state;
  if (!state[operandType].value.includes('.')) {
    state[operandType].value += '.';
    field.dispatchEvent(eventCreator(state[operandType].value));
  }
});

// 1-9
numbers.forEach((num) => {
  num.addEventListener('click', () => {
    if (field.value.length >= 19) return;

    const { operandType } = state;
    const [opValue, fieldValue] = getCalculateData(state[operandType], num.innerHTML);

    state[operandType].value = opValue;
    field.dispatchEvent(eventCreator(fieldValue));
  });
});

// +-
plusMinus.addEventListener('click', () => {
  const { operandType } = state;

  state[operandType].value = (state[operandType].value * -1).toString();
  field.dispatchEvent(eventCreator(state[operandType].value));
});

// %
percent.addEventListener('click', () => {
  const { operandType } = state;

  state[operandType].value = (state[operandType].value / 100).toString();
  field.dispatchEvent(eventCreator(state[operandType].value));
});

field.addEventListener('change', changeEvent, false);

export {
  field,
  canvas
}
/**
 * TODO
 * 1) Check the font size of the second operand
 */