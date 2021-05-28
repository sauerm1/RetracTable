const capitalizeString = (string) => {
  const capitalizedArray = string.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedArray.join(" ");
};

export default capitalizeString;
