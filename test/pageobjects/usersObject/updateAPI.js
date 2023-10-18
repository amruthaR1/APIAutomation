const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class UpdateUser {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.UserEndpoint.PatchUser;
    this.successStatus = 200;
    this.failureStatus = 401;
    this.failureMessage = "Please authenticate.";
  }

  async makeUpdaterequest(data, config) {
    const response = await axios.patch(this.url, data, config);
    return response;
  }

  getSuccessStatus() {
    return this.successStatus;
  }

  getFailureMessage() {
    return this.failureMessage;
  }

  getFailureStatus() {
    return this.failureStatus;
  }
}

module.exports = new UpdateUser();
