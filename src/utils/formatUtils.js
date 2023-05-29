export const formatDate = dateString =>
  new Date(dateString.split('T')[0].trim()).toLocaleDateString('es-ES').replace(/\//g, '-');

export const formatAmount = ammountString =>
  ammountString.toLocaleString('es-ES', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1
  });
