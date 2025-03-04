export const convertSnakeToCamelCase = (string: string) => {
  if (typeof string !== "string") return string;
  const newString = string
    .split("_")
    .map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
  return newString;
};

