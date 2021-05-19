const searchData = (normalizedData, stringSearched, fieldSelected) => {
  let results = [];
  const searchString = stringSearched?.toUpperCase();
  for (let row = 0; row < normalizedData.length; row++) {
    let found = false;
    if (fieldSelected === '') {
      for (let cell in normalizedData[row]) {
        if (
          !found &&
          normalizedData[row][cell]
            .toString()
            .toUpperCase()
            .includes(searchString)
        ) {
          found = true;
          results.push(normalizedData[row]);
        }
      }
    } else {
      if (
        !found &&
        normalizedData[row][fieldSelected]
          .toString()
          .toUpperCase()
          .includes(searchString)
      ) {
        found = true;
        results.push(normalizedData[row]);
      }
    }
  }
  return results;
};

export default searchData;
