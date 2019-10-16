const https = require("https");
const http = require("http");
const db = require("./db");
const app = require("./app");
const { getSslCert, getSslKey, getEnv } = require("../utils");
require("../seed");

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe: ${port}` : `Port: ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = server => {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? `pipe: ${addr}` : `port: ${addr.port}`;
  console.log(`Listening on: ${bind}`);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

let server;
const env = getEnv();
if (env === "development") {
  /* Https on localhost using office-dev-certs */
  server = https.createServer({ key: getSslKey(), cert: getSslCert() }, app);
} else {
  /* Azure takes care of https on production, so this can run on http */
  server = http.createServer(app);
}

// db.connect(true);

server.listen(port);
server.on("error", onError);
server.on("listening", () => onListening(server));
