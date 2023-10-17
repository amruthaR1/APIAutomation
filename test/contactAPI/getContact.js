const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const assertionData = require("../../data/assertData.json");
const createContact = require("../../utils/contacts/createContacts");

describe("Get contact", () => {
  before(async () => {
    contact = await createContact();
  });
  it("Sholud get a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(
      baseURL.BaseURL + EndPoint.ContactEndPoint.GetContact + contact._id,
      config
    );
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data.firstName).to.be.equal(contact.firstName);
  });

  it("should get error message when wrong contact id provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL + EndPoint.ContactEndPoint.GetContact + "123456",
        config
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(400);
      expect(error.response.data).to.be.equal("Invalid Contact ID");
    }
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL + EndPoint.ContactEndPoint.GetContact + contact._id,
        config
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(
        assertionData.GetUser.Fail.ErrorStatus
      );
      expect(error.response.data).to.have.property(
        "error",
        assertionData.GetUser.Fail.ErrorMessage
      );
    }
  });
});
