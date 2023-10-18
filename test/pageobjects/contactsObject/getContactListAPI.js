const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class ContactList {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.ContactEndPoint.GetContactList;
    this.successStatus = 200;
    this.failureStatus = 401;
    this.failureMessage = "Please authenticate.";
  }

  async makeGetRequest(config) {
    const response = await axios.get(this.url, config);
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

module.exports = new ContactList();
