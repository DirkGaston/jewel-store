const yup = require("yup");

const allowedColumns = [
  "id",
  "nombre",
  "categoria",
  "metal",
  "precio",
  "stock",
];
const columnMatches = new RegExp(`^(${allowedColumns.join("|")})_(ASC|DESC)$`);

const querySchema = yup.object().shape({
  limits: yup.number().positive().integer().default(10),
  order_by: yup
    .string()
    .matches(columnMatches, "Invalid order_by format")
    .default("id_ASC"),
  page: yup.number().positive().integer().default(1),
});

const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateQuery };
