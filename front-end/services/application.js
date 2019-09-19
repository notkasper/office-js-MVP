import request from "superagent";

export const testApi = callback => {
  request.get("/api/test").end((error, response) => callback(error, response));
};

export const signIn = (username, password, callback) => {
  request
    .post("/api/signin")
    .send({ username, password })
    .end((error, response) => {
      callback(error, response);
    });
};
