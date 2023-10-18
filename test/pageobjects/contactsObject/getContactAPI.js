const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class GetContact {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.ContactEndPoint.GetContact;
    this.successStatus = 200;
    this.failureStatus = 400;
    this.failureMessage = "Invalid Contact ID";
  }

  async makeGetSingleContactRequest(contactId, config) {
    const response = await axios.get(this.url + contactId, config);
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

module.exports = new GetContact();
