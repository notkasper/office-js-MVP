import request from "superagent";

export const sendDialogForm = (body, callback) => {
  request
    .put("/api/dialog")
    .send(body)
    .end((error, response) => callback(error, response));
};
