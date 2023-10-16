const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");

describe("Get User", () => {
  it("should get an already existing user", async () => {
    const authToken = token.Token;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(
      baseURL.BaseURL + EndPoint.UserEndpoint.GetUser,
      config
    );
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("firstName", "Xavier");
    expect(response.data).to.have.property("lastName", "Lucas");
    expect(response.data).to.have.property("email", "xavier.lucas@gmail.com");
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = "123456";
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL + EndPoint.UserEndpoint.GetUser,
        config
      );
      expect(response.status).to.be.equal(401);
      expect(response.data).to.have.property("error", "Please authenticate.");
    } catch (error) {
        expect(error.response.status).to.be.equal(401);
        expect(error.response.data).to.have.property("error", "Please authenticate.");
    }
  });
});
