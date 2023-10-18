const chai = require("chai");
const expect = chai.expect;
const POSTAPI = require("../../pageobjects/contactsObject/postAPI");
const testData = require("../../../data/testData.json");
const token = require("../../../data/authorizationToken.json");

describe("Add Contact", () => {
  it("Should add a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await POSTAPI.makePostRequest(testData.contact, config);
    expect(response.status).to.be.equal(POSTAPI.getSuccessStatus());
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
      const response = await POSTAPI.makePostRequest(contactDetails, config);
    } catch (error) {
      expect(error.response.status).to.be.equal(POSTAPI.getFailureStatus());
      expect(error.response.data).to.have.property(
        "message",
        POSTAPI.getFailureMessageForPhone()
      );
      contactDetails.phone = "123456789";
    }
  });

  it("Should give error message when invalid birthday is provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const contactDetails = testData.contact;
    contactDetails.birthdate = "abcdef";
    try {
      const response = await POSTAPI.makePostRequest(contactDetails, config);
    } catch (error) {
      expect(error.response.status).to.be.equal(POSTAPI.getFailureStatus());
      expect(error.response.data).to.have.property(
        "message",
        POSTAPI.getFailureMessageForBirthDate()
      );
    }
  });
});
