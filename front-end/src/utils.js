export const convertStringArrayToArray = (str = "[]") => {
  return JSON.parse(String(str).split("'").join('"'));
};
