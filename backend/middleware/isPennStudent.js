const isPennStudent = (req, res, next) => {
  const pennStudent = 'PennStudent';
  if (pennStudent) {
    next();
  } else {
    next(new Error('This is not a valid Penn Student!'));
  }
};

module.exports = isPennStudent;
