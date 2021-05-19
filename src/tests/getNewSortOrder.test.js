import getNewSortOrder from '../component/utils/getNewSortOrder';

test('New Sort Order', () => {
  const sortField = 'col1';
  const sortField2 = 'col2';

  const sortState = {
    field: null,
    order: 'desc',
  };
  const sortState2 = {
    field: 'col1',
    order: 'asc',
  };
  const sortState3 = {
    field: 'col1',
    order: 'desc',
  };
  expect(getNewSortOrder(sortState, sortField)).toBe('asc');
  expect(getNewSortOrder(sortState2, sortField)).toBe('desc');
  expect(getNewSortOrder(sortState3, sortField2)).toBe('asc');
});
