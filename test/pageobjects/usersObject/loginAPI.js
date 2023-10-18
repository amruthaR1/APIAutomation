const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class Login {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.UserEndpoint.LogIn;
    this.successStatus = 200;
    this.failureStatus = 401;
  }

  async makeLoginRequest(credentials) {
    const response = await axios.post(this.url, credentials);
    return response;
  }

  getSuccessStatus() {
    return this.successStatus;
  }

  getFailureStatus(){
    return this.failureStatus;
  }
}

module.exports = new Login();
