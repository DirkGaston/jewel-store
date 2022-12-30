const express = require("express");
const app = express();

require("dotenv").config({ path: "/.env" });

app.use(express.json());
app.listen(3000, console.log("Server is ON"));

const { getInventory, getFilteredInventory, setHATEOAS } = require("./queries");

const reportMiddleware = (req, res, next) => {
  const data = {
    url: req.url,
    method: req.method,
    statusCode: res.statusCode,
  };

  reportData(data);

  next();
};

app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventory = await getInventory(queryStrings);
    const HATEOAS = await setHATEOAS(inventory);
    res.json(HATEOAS);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/joyas/filtros", async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventory = await getFilteredInventory(queryStrings);
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("*", (req, res) => {
  try {
    res.status(404).send("Esta ruta no existe...");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
