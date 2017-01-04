var config = require('config').get('app'),
  app = require('./app')(config);

app.listen(config.port, function() {
  console.log("PO.MA.D.A listening on port", config.port, "in", process.env.NODE_ENV, "mode");
});
