const {
  getInventory,
  getFilteredInventory,
} = require("../models/inventory.models");
const { setHATEOAS } = require("../helpers/setHATEOAS.helpers");
const { query } = require("express");

const getAll = async (req, res) => {
  try {
    const inventory = await getInventory(req.query);
    const HATEOAS = await setHATEOAS(inventory);
    res.json(HATEOAS);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getFiltered = async (req, res) => {
  try {
    const inventory = await getFilteredInventory(req.query);
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const nonRoute = async (req, res) => {
  try {
    res.status(404).send("Esta ruta no existe...");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = { getAll, getFiltered, nonRoute };
