export const formatValue = value => {
  const isDate = Date.parse(value);
  if (isDate) {
    const newDate = new Date(isDate);
    const day = newDate
      .getDate()
      .toString()
      .padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  if (typeof value === 'number') {
    return value.toFixed(1).replace(/\./, ',');
  }
  return value;
};
