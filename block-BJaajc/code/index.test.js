const index = require('./index');

// For full Name check
test('if full Name is correct', () => {
  expect(index.fullName('Anand', 'Seshadri')).toBe('Anand Seshadri');
});

test('if full Name is correct', () => {
  expect(index.fullName('Anand', '')).toBe('Anand ');
});
test('if full Name is correct', () => {
  expect(index.fullName('', '')).toBe(' ');
});
test('if full Name is correct', () => {
  expect(index.fullName('Anand', 'Seshadri')).toBe('Anand');
});

// Circumference
test('to test if circumference is correct', () => {
  expect(index.getCircumfrence(2)).toBe(
    'The circumference of the cirle is 12.566370614359172'
  );
});
test('to test if circumference is correct', () => {
  expect(index.getCircumfrence(2)).toBe('The circumference of the cirle is 12');
});
test('to test if circumference is correct', () => {
  expect(index.getCircumfrence(2)).toBe(12.566370614359172);
});

// Area
test('to test if Area is correct', () => {
  expect(index.getArea(2)).toBe('The area of the cirle is 12.566370614359172');
});
test('to test if Area is correct', () => {
  expect(index.getArea(2)).toBe('The area of the cirle is 12.56');
});
test('to test if Area is correct', () => {
  expect(index.getArea(2)).toBe(12.566370614359172);
});
