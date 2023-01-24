const { Router } = require("express");
const {
  getAll,
  getFiltered,
  nonRoute,
} = require("../controllers/inventory.controllers");
const {
  validateInventoryQuery,
  validateFilteredQuery,
} = require("../middlewares/queryValidation.middlewares");
const { reportQuery } = require("../middlewares/report.middlewares.js");

const router = Router();

router.get("/joyas", validateInventoryQuery, reportQuery, getAll);

router.get("/joyas/filtros", validateFilteredQuery, reportQuery, getFiltered);

router.get("*", nonRoute);

module.exports = { router };
