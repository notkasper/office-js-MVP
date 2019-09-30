const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");

const getProfileList = (req, res) => {
  let profiles;
  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
  } catch (error) {
    throw new Error(error);
  }

  res.status(200).send(JSON.parse(profiles));
};

const createProfile = (req, res) => {
  let profiles;
  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
  } catch (error) {
    throw new Error(error);
  }

  const manipulative = JSON.parse(profiles);
  const id = uuid();
  manipulative.push({ uuid: id, ...req.body });

  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/profiles.json"),
      JSON.stringify(manipulative)
    );
  } catch (error) {
    throw new Error(error);
  }

  res.location(`/profile/${id}`);
  res.status(201).end();
};

module.exports = {
  getProfileList,
  createProfile
};
