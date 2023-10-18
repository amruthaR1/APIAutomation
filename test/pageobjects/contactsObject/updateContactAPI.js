const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class UpdateContact {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.ContactEndPoint.updateContact;
    this.successStatus = 200;
    this.failureStatus = 400;
    this.failureMessage = "Invalid Contact ID";
  }

  async makeUpdaterequest(contactId, data, config) {
    const response = await axios.patch(this.url + contactId, data, config);
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

module.exports = new UpdateContact();
