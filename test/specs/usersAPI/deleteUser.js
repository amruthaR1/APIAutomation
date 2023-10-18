const chai = require("chai");
const expect = chai.expect;
const DELETEAPI = require('../../pageobjects/usersObject/deleteAPI')
const createUser = require("../../../utils/users/createUser");
const token = require("../../../data/authorizationToken.json");

describe("Delete User", () => {
  before(async () => {
    user = await createUser();
  });
  it("Should delete the existing user", async () => {
    const authToken = user.token;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await DELETEAPI.makeDeleteRequest(config);
    expect(response.status).to.be.equal(DELETEAPI.getSuccessStatus());
  });
  it("Should give 401 status if provided wrong token", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await DELETEAPI.makeDeleteRequest(config);
    } catch (error) {
      expect(error.response.status).to.be.equal(DELETEAPI.getFailureStatus());
    }
  });
});
