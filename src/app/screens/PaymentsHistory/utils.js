export const formatDatetime = str => {
  const dateArray = str.split('-');
  return `${dateArray[2].slice(0, dateArray[2].indexOf('T'))}/${dateArray[1].padStart(2, '0')}/${
    dateArray[0]
  }`;
};
