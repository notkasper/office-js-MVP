import request from "superagent";
import handleResponse from "./handleResponse";

export const putProfile = (body, callback) => {
  request
    .put("/api/profile")
    .send(body)
    .end((error, response) => handleResponse(error, response, callback));
};
