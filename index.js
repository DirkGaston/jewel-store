



const reportMiddleware = (req, res, next) => {
  const data = {
    url: req.url,
    method: req.method,
    statusCode: res.statusCode,
  };

  reportData(data);

  next();
};

