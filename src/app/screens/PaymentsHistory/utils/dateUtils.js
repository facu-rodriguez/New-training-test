export const getDate = (date, type) => {
  const year = date.split('T')[0].split('-')[0];
  const month = date.split('T')[0].split('-')[1];
  const day = date.split('T')[0].split('-')[2];

  if (type === 'sort') {
    return `${day}-${month}-${year}`;
  }

  return `${year}-${month}-${day}`;
};
