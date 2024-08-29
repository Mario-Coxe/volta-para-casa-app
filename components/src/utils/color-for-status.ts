export const getStatusColor = (status: string) => {
  switch (status) {
    case "Em busca":
      return "#F39C12";
    case "Encontrada":
      return "#2ECC71";
    case "Não encontrada":
      return "#E74C3C";
    default:
      return "#555";
  }
};
