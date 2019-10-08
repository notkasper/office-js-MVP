import request from "superagent";

export const retrieveProfiles = callback => {
  request
    .get("/api/profile")
    .end((error, response) => callback(error, response));
};

export const retrieveProfile = (id, callback) => {
  request
    .get(`/api/profile/${id}`)
    .end((error, response) => callback(error, response));
};

export const createProfile = (body, callback) => {
  request
    .post("/api/profile")
    .send(body)
    .end((error, response) => callback(error, response));
};

export const adjustProfile = (id, callback) => {
  request
    .put(`/api/profile/${id}`)
    .end((error, response) => callback(error, response));
};

export const deleteProfile = (id, callback) => {
  request
    .delete(`/api/profile/${id}`)
    .end((error, response) => callback(error, response));
};
