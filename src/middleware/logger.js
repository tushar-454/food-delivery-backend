const logger = (req, res, next) => {
  const logMessage = { url: req.originalUrl, method: req.method, status: res.statusCode };
  console.log(logMessage);
  next();
};

module.exports = logger;
