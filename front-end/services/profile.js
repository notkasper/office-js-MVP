import request from "superagent";

export const createProfile = (body, callback) => {
  request
    .post("/api/profile")
    .send(body)
    .end((error, response) => callback(error, response));
};

export const retrieveProfiles = callback => {
  request
    .get("/api/profile")
    .end((error, response) => callback(error, response));
};
