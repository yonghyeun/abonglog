export const summarizeTextCode = (text: string) => {
  return text.split("").reduce((prev, cur) => prev + cur.charCodeAt(0), 0);
};
