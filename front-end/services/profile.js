import request from "superagent";

export const createProfile = (body, callback) => {
  request
    .put("/api/profile")
    .send(body)
    .end((error, response) => callback(error, response));
};
