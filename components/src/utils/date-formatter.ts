export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateString);

  //console.log(date.toLocaleDateString("pt-PT", options))
  return date.toLocaleDateString("pt-PT", options);
};
