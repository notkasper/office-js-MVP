const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");
const app = require("./app");
// const { getSslCert, getSslKey, getEnv, getPort } = require("../utils");

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

  // handle specific listen errors with friendly messages
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

// const start = async () => {
// let server;
// if (!["production"].includes(env)) {
//   /* For testing locally, use key and cert to achieve https */
//   server = await https.createServer(
//     { key: getSslKey(), cert: getSslCert() },
//     app
//   );
// }

// if (["production", "staging"].includes(env)) {
//   console.log("Mounting * path as catch-all");
//   app.use("/", express.static(path.join(__dirname, "dist")));
//   app.get("*", (req, res) => {
//     console.log("Catch-all");
//     res.sendFile(path.join(__dirname, "./dist/index.html"));
//   });
// }

// if (server) {
//   server.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!!`);
//   });
// }
// };

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", () => onListening(server));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
