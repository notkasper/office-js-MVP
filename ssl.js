const officeDevCerts = require("office-addin-dev-certs");
const fs = require("fs");

(async () => {
  try {
    await officeDevCerts.ensureCertificatesAreInstalled();
    const ssl = await officeDevCerts.getHttpsServerOptions();
    const { key, cert } = ssl;
    fs.writeFileSync("./key.txt", key.toString());
    fs.writeFileSync("./cert.txt", cert.toString());
  } catch (error) {
    throw new Error(
      `Error while generating ssl keys using office dev certs: ${error}`
    );
  }
})();
