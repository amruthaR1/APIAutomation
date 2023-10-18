const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class PostMethod {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.UserEndpoint.AddUser;
    this.failureStatus = 400;
    this.failureMessage = "Please authenticate.";
    this.successStatus = 201;
  }

  async makePostRequest(payload) {
    const response = await axios.post(this.url, payload);
    return response;
  }

  getFailureMessage() {
    return this.failureMessage;
  }

  getFailureStatus() {
    return this.failureStatus;
  }

  getSuccessStatus() {
    return this.successStatus;
  }
}

module.exports = new PostMethod();
