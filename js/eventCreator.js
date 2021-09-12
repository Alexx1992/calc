const eventCreator = (value) => {
  return new CustomEvent('change', { detail: { value } });
};

export default eventCreator;