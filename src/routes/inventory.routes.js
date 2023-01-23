const { Router } = require("express");
const { getAll, getFiltered, nonRoute } = require("../controllers/inventory.controllers");
const { validateQuery } = require("../middlewares/queryValidation.middlewares");

const router = Router();

router.get("/joyas", validateQuery, getAll);

router.get("/joyas/filtros", getFiltered);

router.get("*", nonRoute);

module.exports = { router };
