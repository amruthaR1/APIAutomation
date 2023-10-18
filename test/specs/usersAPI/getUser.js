const chai = require("chai");
const expect = chai.expect;
const GETAPI = require('../../pageobjects/usersObject/getAPI')
const token = require("../../../data/authorizationToken.json");


describe("Get User", () => {
  it("should get an already existing user", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await GETAPI.makeGetRequest(config);
    const existingUserdata = GETAPI.getExistingUserData();
    expect(response.status).to.be.equal(GETAPI.getSuccessStatus());
    expect(response.data).to.be.an("object");
    
    expect(response.data.firstName).to.be.equal(existingUserdata.firstName);
    expect(response.data.lastName).to.be.equal(existingUserdata.lastName);
    expect(response.data.email).to.be.equal(existingUserdata.email);
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await GETAPI.makeGetRequest(config);
    } catch (error) {
        expect(error.response.status).to.be.equal(GETAPI.getFailureStatus());
        expect(error.response.data).to.have.property("error", GETAPI.getFailureMessage());
    }
  });
});
