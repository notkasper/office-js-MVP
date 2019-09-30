const fs = require("fs");
const path = require("path");

const profile_path = path.join(__dirname, "/back-end/db/profiles.json");

try {
  // Delete possible existing profile database
  if (fs.existsSync(profile_path)) {
    fs.unlinkSync(profile_path);
  }

  // Add new empty profile database
  fs.writeFileSync(profile_path, JSON.stringify([]));
} catch (error) {
  throw new Error(error);
}
