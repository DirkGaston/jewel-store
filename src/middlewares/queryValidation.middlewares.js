const yup = require("yup");
const {
  getInventorySchema,
  getFilteredInventorySchema,
} = require("../models/querySchemas.models");

const validateInventoryQuery = async (req, res, next) => {
  try {
    await getInventorySchema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateFilteredQuery = async (req, res, next) => {
  try {
    await getFilteredInventorySchema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateInventoryQuery, validateFilteredQuery };
