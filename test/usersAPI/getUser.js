const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const data = require("../../data/testData.json")
const assertionData = require("../../data/assertData.json");

describe("Get User", () => {
  it("should get an already existing user", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(
      baseURL.BaseURL + EndPoint.UserEndpoint.GetUser,
      config
    );
    expect(response.status).to.be.equal(assertionData.GetUser.Success.SuccessStatus);
    expect(response.data).to.be.an("object");
    expect(response.data.firstName).to.be.equal(data.AlreadyExistingUser.firstName);
    expect(response.data.lastName).to.be.equal(data.AlreadyExistingUser.lastName);
    expect(response.data.email).to.be.equal(data.AlreadyExistingUser.email);
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL + EndPoint.UserEndpoint.GetUser,
        config
      );
      expect(response.status).to.be.equal(assertionData.GetUser.Fail.ErrorStatus);
      expect(response.data).to.have.property("error", assertionData.GetUser.Fail.ErrorMessage);
    } catch (error) {
        expect(error.response.status).to.be.equal(assertionData.GetUser.Fail.ErrorStatus);
        expect(error.response.data).to.have.property("error", assertionData.GetUser.Fail.ErrorMessage);
    }
  });
});
