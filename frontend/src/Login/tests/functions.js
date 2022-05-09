const checkValidNameHandler = (firstName, lastName) => (firstName && !firstName.match(/^[a-zA-Z]+$/)) || (lastName && !lastName.match(/^[a-zA-Z]+$/));

const checkStrongPassword = (password) => password && password.length > 8;

module.exports = {
  checkValidNameHandler,
  checkStrongPassword,
};
