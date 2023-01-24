const { query } = require("../services/db.services");
const format = require("pg-format");

const getInventory = async ({ limits = 10, order_by = "id_ASC", page = 1 }) => {
  const [field, direction] = order_by.split("_");
  const offset = (page - 1) * limits;
  const formattedQuery = format(
    "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
    field,
    direction,
    limits,
    offset
  );
  const { rows: inventario } = await query(formattedQuery);
  return inventario;
};

const getFilteredInventory = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  const { query } = require("../services/db.services");
  let filters = [];
  let values = [];
  if (precio_max) {
    filters.push("precio <= $1");
    values.push(precio_max);
  }
  if (precio_min) {
    filters.push("precio >= $2");
    values.push(precio_min);
  }
  if (categoria) {
    filters.push("categoria = $3");
    values.push(categoria);
  }
  if (metal) {
    filters.push("metal = $4");
    values.push(metal);
  }
  let formattedQuery = "SELECT * FROM inventario";
  if (filters.length > 0) {
    filters = filters.join(" AND ");
    formattedQuery += ` WHERE ${filters}`;
  }
  const { rows: inventario } = await query(formattedQuery, values);
  return inventario;
};

module.exports = { getInventory, getFilteredInventory };
