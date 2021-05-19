const getNewSortOrder = (sortState, sortField) => {
  let newSortOrder;
  if (sortState.field === sortField) {
    sortState?.order === 'asc'
      ? (newSortOrder = 'desc')
      : (newSortOrder = 'asc');
  } else if (sortState.field === null || sortState.field !== sortField) {
    newSortOrder = 'asc';
  }
  return newSortOrder;
};

export default getNewSortOrder;
