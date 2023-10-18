const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");
const testData = require("../../../data/testData.json")

class GetMethod {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.UserEndpoint.GetUser;
    this.failureStatus = 401;
    this.failureMessage = "Please authenticate.";
    this.successStatus = 200;
    this.userData = testData.AlreadyExistingUser;
  }

  async makeGetRequest(config) {
    const response = await axios.get(this.url, config);
    return response;
  }

  getFailureStatus(){
    return this.failureStatus;
  }

  getFailureMessage(){
    return this.failureMessage;
  }

  getSuccessStatus(){
    return this.successStatus;
  }

  getExistingUserData(){
    return this.userData;
  }
}

module.exports = new GetMethod();
