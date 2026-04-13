// src/middlewares/validate.js
const { sendError } = require('../utils/response.util');

/**
 * Middleware factory to validate request data against a Joi schema.
 * @param {Joi.Schema} schema - Joi validation schema
 * @param {string} property - Which part of the request to validate: 'body', 'query', 'params'. Default 'body'
 * @returns {Function} Express middleware
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[property];
    const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return sendError(res, 'Validation error', 400, errors);
    }
    // Replace the original request data with validated (and possibly transformed) value
    req[property] = value;
    next();
  };
};

module.exports = { validate };