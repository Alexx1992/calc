const calculate = (op1, op2, operator) => {
  switch(operator) {
    case '+': {
      return (op1 + op2).toString();
    }
    case '-': {
      return (op1 - op2).toString();
    }
    case 'x': {
      return (op1 * op2).toString();
    }
    case '/': {
      if (!op2) return notDivideToNull;
      return (op1 / op2).toString();
    }
  }
  return '0';
};

export default calculate;
