export const currencyFormat = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});
