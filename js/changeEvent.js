import { field, canvas } from './app.js';
import { getCanvasFontSize } from './helpers.js';

const changeEvent = ({ detail }) => {
  const ctx = canvas.getContext('2d');
  const fieldPadding = 16;
  const fieldWidth = field.offsetWidth - fieldPadding;

  const { fontWeight, fontSize, fontFamily } = getCanvasFontSize(field);
  ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  const { width: textWidth } = ctx.measureText(detail.value);
  
  if (textWidth > fieldWidth) {
    const textFieldRatio = textWidth / fieldWidth;
    const fontSizeToRem = parseFloat(fontSize, 10) / 16; // 16 default user font size
    const newFontSize = fontSizeToRem / textFieldRatio;
    field.style.fontSize = `${newFontSize}rem`;
  }
  field.value = detail.value;
};

export default changeEvent;