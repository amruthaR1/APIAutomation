const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class DeleteUser {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.UserEndpoint.DeleteUser;
    this.successStatus = 200;
    this.failureStatus = 401;
  }

  async makeDeleteRequest(config) {
    const response = await axios.delete(this.url, config);
    return response;
  }
  getSuccessStatus() {
    return this.successStatus;
  }
  getFailureStatus() {
    return this.failureStatus;
  }
}

module.exports = new DeleteUser()
