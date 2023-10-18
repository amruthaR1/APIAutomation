const chai = require("chai");
const expect = chai.expect;
const DELETEAPI = require("../../pageobjects/contactsObject/deleteAPI");
const token = require("../../../data/authorizationToken.json");
const assertionData = require("../../../data/assertData.json");
const createContact = require("../../../utils/contacts/createContacts");

describe("Delete contact", () => {
  before(async () => {
    contact = await createContact();
  });
  it("Sholud delete a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await DELETEAPI.makeDeleteRequest(contact._id, config);
    expect(response.status).to.be.equal(DELETEAPI.getSuccessStatus());
    expect(response.data).to.be.equal(DELETEAPI.getSuccessMessage());
  });

  it("should get error message when wrong contact id provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await DELETEAPI.makeDeleteRequest(contactId="123456", config);
    } catch (error) {
      expect(error.response.status).to.be.equal(DELETEAPI.getFailureStatus());
      expect(error.response.data).to.be.equal(DELETEAPI.getFailureMessage());
    }
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await DELETEAPI.makeDeleteRequest(contact._id, config);
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
