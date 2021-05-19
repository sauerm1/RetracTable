import capitalizeString from '../component/utils/capitalizeString';

test('Capitalize First Letter', () => {
  const word = 'hello world';
  expect(capitalizeString(word)).toBe('Hello World');
});
