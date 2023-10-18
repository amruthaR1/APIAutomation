const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");

class PostMethod {
  constructor() {
    this.url = baseURL.BaseURL + EndPoint.ContactEndPoint.AddContact;
    this.successStatus = 201;
    this.failureStatus = 400;
    this.failureMessageForPhone =
      "Contact validation failed: phone: Phone number is invalid";
    this.failureMessageForBirthDate =
      "Contact validation failed: birthdate: Birthdate is invalid";
  }

  async makePostRequest(contactData, config) {
    const response = await axios.post(this.url, contactData, config);
    return response;
  }

  getSuccessStatus() {
    return this.successStatus;
  }

  getFailureStatus() {
    return this.failureStatus;
  }

  getFailureMessageForPhone() {
    return this.failureMessageForPhone;
  }

  getFailureMessageForBirthDate(){
    return this.failureMessageForBirthDate;
  }
}

module.exports = new PostMethod();
