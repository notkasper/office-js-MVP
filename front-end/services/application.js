import request from "superagent";

export const testApi = callback => {
  request.get("/api/test").end((error, response) => callback(error, response));
};

export const oauth = callback => {
  request.get("/api/oauth").end((error, response) => callback(error, response));
};

export const getUserDetails = callback => {
  request.get("/api/getUserDetails").end((error, response) => callback(error, response));
};

