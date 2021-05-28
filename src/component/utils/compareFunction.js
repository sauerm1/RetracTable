const compareFunction = (column, order) => {
  return (a, b) => {
    if (!a.hasOwnProperty(column) || !b.hasOwnProperty(column)) {
      return 0;
    }
    const varA =
      typeof a[column] === "string" ? a[column].toUpperCase() : a[column];
    const varB =
      typeof b[column] === "string" ? b[column].toUpperCase() : b[column];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export default compareFunction;
