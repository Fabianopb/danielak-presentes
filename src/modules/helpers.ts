/**
 * Transform currency format
 * @param {number} value value to be converted
 * @returns {string}
 */
export const currencyFormat = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});
