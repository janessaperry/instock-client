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

export const formatPhoneNumber = (value: string) => {
  let trimmedValue = value.replace(/\D/g, "");

  if (trimmedValue.length <= 1) return "+1 ";

  if (trimmedValue.length <= 4) return `+1 (${trimmedValue.slice(1)}`;

  if (trimmedValue.length <= 7)
    return `+1 (${trimmedValue.slice(1, 4)}) ${trimmedValue.slice(4)}`;

  if (trimmedValue.length > 7)
    return `+1 (${trimmedValue.slice(1, 4)}) ${trimmedValue.slice(
      4,
      7
    )}-${trimmedValue.slice(7)}`;

  return trimmedValue;
};

export const setCursorPosition = (
  cursorPosition: any | null,
  start: number,
  end: number
) => {
  cursorPosition.current = {
    selectionStart: start,
    selectionEnd: end,
  };
};
