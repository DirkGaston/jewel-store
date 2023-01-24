const reportQuery = (req, res, next) => {
  const params = req.query;
  const url = req.url;
  const method = req.method;
  const statusCode = res.statusCode;

  console.log(req.params);

  console.log(
    `
  Hoy ${new Date()}
  Se ha recibido una consulta ${method} en la ruta ${url}
  con los parámetros:
  `,
    params
  );

  console.log(statusCode);

  next();
};

module.exports = { reportQuery };
