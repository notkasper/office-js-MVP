import request from "superagent";

export const testApi = (callback = () => {}) => {
  request.get("/api/test").end((error, response) => callback(error, response));
};

export const oauth = (callback = () => {}) => {
  request.post("/api/oauth").end((error, response) => callback(error, response));
};
