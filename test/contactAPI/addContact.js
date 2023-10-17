const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const testData = require("../../data/testData.json");
const token = require("../../data/authorizationToken.json");

describe("Add Contact", () => {
  it("Should add a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.post(
      baseURL.BaseURL + EndPoint.ContactEndPoint.AddContact,
      testData.contact,
      config
    );
    expect(response.status).to.be.equal(201);
    expect(response.data).to.be.an("object");
    expect(response.data.firstName).to.be.equal(testData.contact.firstName);
  });

  it("Should give error message when invalid phone number is provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const contactDetails = testData.contact;
    contactDetails.phone = "abcdef";
    try {
      const response = await axios.post(
        baseURL.BaseURL + EndPoint.ContactEndPoint.AddContact,
        contactDetails,
        config
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.have.property(
        "message",
        "Contact validation failed: phone: Phone number is invalid"
      );
      contactDetails.phone = "123456789"
    }
  });

  it("Should give error message when invalid birthday is provided", async()=>{
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const contactDetails = testData.contact;
    contactDetails.birthdate = "abcdef";
    try {
      const response = await axios.post(
        baseURL.BaseURL + EndPoint.ContactEndPoint.AddContact,
        testData.contact,
        config
      );
    } catch (error) {
        console.log('in catch');
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.have.property(
        "message",
        "Contact validation failed: birthdate: Birthdate is invalid"
      );
    }
  });
});
