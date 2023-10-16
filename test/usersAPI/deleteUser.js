const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const createUser = require("../../utils/createUser");
const token = require('../../data/authorizationToken.json')

describe("Delete User", () => {
  before(async () => {
    user = await createUser();
  });
  it("Should delete the existing user", async () => {
    const authToken = user.token;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.delete(
      baseURL.BaseURL + EndPoint.UserEndpoint.PatchUser,
      config
    );
    expect(response.status).to.be.equal(200);
  });
  it("Should give 401 status if provided wrong token", async()=>{
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.delete(
        baseURL.BaseURL + EndPoint.UserEndpoint.DeleteUser,
        
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(401);
    }
  })
});
