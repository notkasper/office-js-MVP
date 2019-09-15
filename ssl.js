const officeDevCerts = require("office-addin-dev-certs");
const fs = require("fs");

(async () => {
  await officeDevCerts.ensureCertificatesAreInstalled();
  const ssl = await officeDevCerts.getHttpsServerOptions();
  const { key, cert } = ssl;
  fs.writeFileSync("./key.txt", key.toString());
  fs.writeFileSync("./cert.txt", cert.toString());
})();
