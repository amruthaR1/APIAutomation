const chai = require("chai");
const expect = chai.expect;
const GETCONTACTLIST = require("../../pageobjects/contactsObject/getContactListAPI");
const token = require("../../../data/authorizationToken.json");


describe("Get contact List", () => {
  it("Sholud get the list of contacts", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await GETCONTACTLIST.makeGetRequest(config);
    expect(response.status).to.be.equal(GETCONTACTLIST.getSuccessStatus());
    expect(response.data).to.be.an("array");
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await GETCONTACTLIST.makeGetRequest(config);
    } catch (error) {
      expect(error.response.status).to.be.equal(
        GETCONTACTLIST.getFailureStatus()
      );
      expect(error.response.data).to.have.property(
        "error",
        GETCONTACTLIST.getFailureMessage()
      );
    }
  });
});
