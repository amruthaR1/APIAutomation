const chai = require("chai");
const expect = chai.expect;
const GETSINGLECONTACT = require("../../pageobjects/contactsObject/getContactAPI");
const token = require("../../../data/authorizationToken.json");
const assertionData = require("../../../data/assertData.json");
const createContact = require("../../../utils/contacts/createContacts");

describe("Get contact", () => {
  before(async () => {
    contact = await createContact();
  });
  it("Sholud get a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await GETSINGLECONTACT.makeGetSingleContactRequest(
      contact._id,
      config
    );
    expect(response.status).to.be.equal(GETSINGLECONTACT.getSuccessStatus());
    expect(response.data).to.be.an("object");
    expect(response.data.firstName).to.be.equal(contact.firstName);
  });

  it("should get error message when wrong contact id provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await GETSINGLECONTACT.makeGetSingleContactRequest(
        (contactId = "12345"),
        config
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(
        GETSINGLECONTACT.getFailureStatus()
      );
      expect(error.response.data).to.be.equal(
        GETSINGLECONTACT.getFailureMessage()
      );
    }
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await GETSINGLECONTACT.makeGetSingleContactRequest(
        contact._id,
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
