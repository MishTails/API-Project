const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const groupValidation = (group) => {
  let errors = {}
  if (group.name.length >= 60) {
    errors.name = "Name must be 60 characters or less"
  }
  if (group.about.length < 50) {
    errors.about = "About must be 50 characters or more"
  }
  if (group.type !== "Online" && group.type !== "In person") {
    errors.type = "Type must be 'Online' or 'In person'"
  }
  if (typeof group.private !== Boolean) {
    errors.private = "Private must be a boolean"
  }
  if (!city) {
    errors.city = "City is required"
  }
  if (!state) {
    errors.state = "State is required"
  }
  return errors
}

module.exports = {
  handleValidationErrors,
  groupValidation
};
