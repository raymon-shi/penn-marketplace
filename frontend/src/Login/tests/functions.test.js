const functions = require('./functions');

test('check valid username', () => {
  expect(functions.checkValidNameHandler('Raymon', 'Shi')).toBe(false);
});

test('check invalid username', () => {
  expect(functions.checkValidNameHandler('Raymon', 'Shi22')).toBe(true);
});

test('strong password true', () => {
  expect(functions.checkStrongPassword('password123')).toBe(true);
});

test('strong password false', () => {
  expect(functions.checkStrongPassword('123')).toBe(false);
});
