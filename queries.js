const { Pool } = require("pg");
const format = require("pg-format");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: "joyas",
  port: 5432,
  allowExitOnIdle: true,
});

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
  const { rows: inventario } = await pool.query(formattedQuery);
  return inventario;
};

const getFilteredInventory = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
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
  let query = "SELECT * FROM inventario";
  if (filters.length > 0) {
    filters = filters.join(" AND ");
    query += ` WHERE ${filters}`;
  }
  const { rows: inventario } = await pool.query(query, values);
  return inventario;
};

const setHATEOAS = (inventario) => {
  const results = inventario
    .map((j) => {
      return {
        name: j.nombre,
        href: `/joyas/joyas/${j.id}`,
      };
    })
    .slice(0, 4);
  const totalJoyas = inventario.length;
  const totalStock = inventario.reduce((total, j) => total + j.stock, 0);
  const HATEOAS = {
    totalJoyas,
    totalStock,
    results,
  };
  return HATEOAS;
};

module.exports = {
  getInventory,
  getFilteredInventory,
  setHATEOAS,
};
