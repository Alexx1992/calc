function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFontSize(el) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

  return {fontWeight, fontSize, fontFamily};
}

export function addSpace(num) {
  return num.split('').reverse().map((i, idx) => {
    return (idx + 1) % 3 === 0 ? ` ${i}` : i;
  }).reverse().join('').trim();
}

export function getCalculateData(state, input) {
  let operand = state.value;
  let fieldValue = operand;

  if (state.isEmpty) {
    operand = input;
    fieldValue = input;
  } else {
    operand += input;
    fieldValue = operand.includes('.') ? operand : addSpace(operand);
  }
  return [operand, fieldValue];
}