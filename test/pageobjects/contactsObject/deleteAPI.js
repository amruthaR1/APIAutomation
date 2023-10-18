const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class DeleteContact {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.ContactEndPoint.DeleteContact;
    this.failureStatus = 400;
    this.failureMessage = "Invalid Contact ID";
    this.successStatus = 200;
    this.successMessage = "Contact deleted";
  }

  async makeDeleteRequest(contactId, config) {
    const response = await axios.delete(this.url + contactId, config);
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
  getSuccessMessage() {
    return this.successMessage;
  }
}

module.exports = new DeleteContact();
