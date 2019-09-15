const officeDevCerts = require("office-addin-dev-certs");
const fs = require("fs");

(async () => {
  await officeDevCerts.ensureCertificatesAreInstalled();
  const ssl = await officeDevCerts.getHttpsServerOptions();
  key = ssl.key.toString();
  cert = ssl.cert.toString();
  fs.writeFileSync("./key.txt", key);
  fs.writeFileSync("./cert.txt", cert);
})();
