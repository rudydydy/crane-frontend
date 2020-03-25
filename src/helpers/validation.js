export const isBlank = (value) => !(value || typeof value === 'number');

export const isEmailFormat = (value) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return !(value && !emailRegex.test(value));
};
