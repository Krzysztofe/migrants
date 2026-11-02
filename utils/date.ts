export const formatDateWithDots = (value: string): string => {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day}.${month}.${year}`;
};
