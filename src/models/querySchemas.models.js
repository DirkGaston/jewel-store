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

const categoryMatches = ["collar", "aros", "anillo"];
const metalMatches = ["oro", "plata"];

const getInventorySchema = yup.object().shape({
  limits: yup.number().positive().integer().default(10),
  order_by: yup
    .string()
    .matches(columnMatches, "Invalid order_by format")
    .default("id_ASC"),
  page: yup.number().positive().integer().default(1),
});

const getFilteredInventorySchema = yup.object().shape({
  precio_max: yup.number().positive(),
  precio_min: yup.number().positive(),
  categoria: yup
    .string()
    .oneOf(categoryMatches, "No such category in the database"),
  metal: yup.string().oneOf(metalMatches, "No such metal in the database"),
});

module.exports = { getInventorySchema, getFilteredInventorySchema };
