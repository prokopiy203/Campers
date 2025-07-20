export const formatLabel = (str) => {
  if (!str) return "";
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/(\d+)(?=\D)/g, "$1 ")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

export const formatValueWithUnit = (value) => {
  if (!value) return "";

  const match = value.match(/^([\d.]+)\s*([a-zA-Z]+)$/);

  if (match) {
    const [, number, unit] = match;
    return `${number} ${unit}`;
  }

  return value;
};
