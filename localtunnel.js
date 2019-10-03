const localtunnel = require("localtunnel");

const start = async () => {
  const tunnel = await localtunnel({
    port: 3000,
    subdomain: "breezy-grasshopper-55"
  });

  console.log(`Localtunnel running on: ${tunnel.url}`);

  tunnel.on("close", () => {
    console.log("Localtunnel has closed!");
  });
};

start();
