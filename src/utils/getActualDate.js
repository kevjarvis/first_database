export const getDate = () => {
  // Obtiene la fecha actual
  let date = new Date();
  return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
};
