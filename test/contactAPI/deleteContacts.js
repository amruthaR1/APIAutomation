const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const assertionData = require("../../data/assertData.json");
const createContact = require("../../utils/contacts/createContacts");

describe("Delete contact", () => {
  before(async () => {
    contact = await createContact();
  });
  it("Sholud delete a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.delete(
      baseURL.BaseURL + EndPoint.ContactEndPoint.DeleteContact + contact._id,
      config
    );
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.equal("Contact deleted");
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.delete(
        baseURL.BaseURL + EndPoint.ContactEndPoint.DeleteContact + contact._id,
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
