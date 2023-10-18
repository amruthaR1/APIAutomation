const chai = require("chai");
const expect = chai.expect;
const LOGINAPI = require('../../pageobjects/usersObject/loginAPI')
const token = require("../../../data/authorizationToken.json");

describe("Login User", () => {
  it("Should Login the user when correct email and password is provided", async () => {
    const credentials = token.Credentials.ValidCredentials;
    const response = await LOGINAPI.makeLoginRequest(credentials);
    expect(response.status).to.be.equal(LOGINAPI.getSuccessStatus());
  });

  it("Should give 401 status when provided with incorrect credentials", async () => {
    const wrongCredentials = token.Credentials.InvalidCredentials;
    try {
      const response = await LOGINAPI.makeLoginRequest(wrongCredentials);
    } catch (error) {
      expect(error.response.status).to.be.equal(LOGINAPI.getFailureStatus());
    }
  });
});
