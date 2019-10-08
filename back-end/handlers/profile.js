const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");

const getProfileList = (req, res) => {
  let profiles;
  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
    res.status(200).send(JSON.parse(profiles));
  } catch (error) {
    res.status(400).send([error]);
  }
};

const getProfile = (req, res) => {
  const {
    params: { id }
  } = req;

  let profiles;
  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
    const profileJSON = JSON.parse(profiles);
    const profile = profileJSON.find(profile => profile.uuid === id);
    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send([error]);
  }
};

const createProfile = (req, res) => {
  let profiles;
  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));

    const profileJSON = JSON.parse(profiles);
    const id = uuid();
    profileJSON.push({ uuid: id, ...req.body });

    fs.writeFileSync(
      path.join(__dirname, "../db/profiles.json"),
      JSON.stringify(profileJSON)
    );

    res.location(`/profile/${id}`);
    res.status(201).end();
  } catch (error) {
    res.status(400).send([error]);
  }
};

const adjustProfile = (req, res) => {
  const {
    params: { id },
    body
  } = req;

  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
    const profileJSON = JSON.parse(profiles);
    const profile = profileJSON.find(profile => profile.uuid === id);
    const index = profileJSON.findIndex(profile => profile.uuid === id);
    profileJSON[index] = { ...profile, ...body };

    fs.writeFileSync(
      path.join(__dirname, "../db/profiles.json"),
      JSON.stringify(profileJSON)
    );

    res.status(200).end();
  } catch (error) {
    res.status(400).send([error]);
  }
};

const deleteProfile = (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    profiles = fs.readFileSync(path.join(__dirname, "../db/profiles.json"));
    let profileJSON = JSON.parse(profiles);
    profileJSON = profileJSON.filter(element => element.uuid !== id);

    fs.writeFileSync(
      path.join(__dirname, "../db/profiles.json"),
      JSON.stringify(profileJSON)
    );

    res.status(204).end();
  } catch (error) {
    res.status(400).send([error]);
  }
};

module.exports = {
  getProfileList,
  getProfile,
  createProfile,
  adjustProfile,
  deleteProfile
};
