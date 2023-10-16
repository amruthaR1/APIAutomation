const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");

describe("Login User", () => {
  it("Should Login the user when correct email and password is provided", async () => {
    const data = token.Credentials.ValidCredentials;
    const response = await axios.post(
      baseURL.BaseURL + EndPoint.UserEndpoint.LogIn,
      data
    );
    expect(response.status).to.be.equal(200);
  });

  it("Should give 401 status when provided with incorrect credentials", async () => {
    const data = token.Credentials.InvalidCredentials;
    try {
      const response = await axios.post(
        baseURL.BaseURL + EndPoint.UserEndpoint.LogIn,
        data
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(401);
    }
  });
});
