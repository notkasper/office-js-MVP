import request from "superagent";
import handleResponse from "./handleResponse";

export const testApi = callback => {
  request
    .get("/api/test")
    .end((error, response) => handleResponse(error, response, callback));
};

export const oauth = callback => {
  request
    .get("/api/oauth")
    .end((error, response) => handleResponse(error, response, callback));
};

export const getUserDetails = callback => {
  request
    .get("/api/getUserDetails")
    .end((error, response) => handleResponse(error, response, callback));
};

export const getProfiles = callback => {
  request
    .get("/api/profiles")
    .end((error, response) => handleResponse(error, response, callback));
};
