const { setLocation } = require("../utils");

const handleResponse = (error, response, callback) => {
  if (response.status === 401) {
    setLocation("login");
  }
  callback(error, response);
};

export default handleResponse;
