const _ = require("lodash");
const uuidv4 = require("uuid/v4");
const msgraph = require("../msgraph");
const { performQuery } = require("../db");

module.exports = async (req, res) => {
  const accessToken = _.get(req, "cookies.access_token");
  if (!accessToken) {
    res.status(400).send({ message: "Access token niet meegestuurd." });
  }

  let userDetails;
  try {
    userDetails = await msgraph.getUserDetails(accessToken);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Er is iets fout gegaan tijdens het ophalen van het gebruikers profiel, probeer het later opnieuw of neem contact op met support."
    });
    return;
  }

  const { id: creator } = userDetails;
  const id = uuidv4();
  const {
    formal_name,
    informal_name,
    phone_number,
    mobile_number,
    email,
    work_function,
    department,
    establishment,
    extra_text
  } = _.get(req, "body");
  try {
    await performQuery(`INSERT INTO profiles 
      (
        id,
        creator,
        formal_name,
        informal_name,
        phone_number,
        mobile_number,
        email,
        work_function,
        department,
        establishment,
        extra_text
      ) 
        VALUES 
      (
        '${id}',
        '${creator}',
        '${formal_name}',
        '${informal_name}',
        '${phone_number}',
        '${mobile_number}',
        '${email}',
        '${work_function}',
        '${department}',
        '${establishment}',
        '${extra_text}'
      )`);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Er is iets fout gegaan tijdens het opslaan van het profiel, probeer het later opnieuw of neem contact op met support."
    });
    return;
  }

  res.status(200).send({ message: "CREATED" });
};
