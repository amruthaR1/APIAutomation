const chai = require("chai");
const expect = chai.expect;
const UPDATEAPI = require("../../pageobjects/contactsObject/updateContactAPI");
const token = require("../../../data/authorizationToken.json");
const assertionData = require("../../../data/assertData.json");
const createContact = require("../../../utils/contacts/createContacts");

describe("Update contact", () => {
  const data = { firstName: "amr" };
  before(async () => {
    contact = await createContact();
  });
  it("Sholud update a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await UPDATEAPI.makeUpdaterequest(
      contact._id,
      data,
      config
    );
    expect(response.status).to.be.equal(UPDATEAPI.getSuccessStatus());
    expect(response.data).to.be.an("object");
    expect(response.data.firstName).to.be.equal(data.firstName);
  });

  it("should get error message when wrong contact id provided", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await UPDATEAPI.makeUpdaterequest(
        (contactId = "123456"),
        data,
        config
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(UPDATEAPI.getFailureStatus());
      expect(error.response.data).to.be.equal(UPDATEAPI.getFailureMessage());
    }
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await UPDATEAPI.makeUpdaterequest(
        contact._id,
        data,
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
