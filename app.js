const { app } = require("./server");

app.use("/", require("./src/routes/inventory.routes").router);

module.exports = { app };
