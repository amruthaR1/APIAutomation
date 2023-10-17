const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const assertionData = require("../../data/assertData.json");

describe("Get contact List", () => {
  it("Sholud get the list of contacts", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(
      baseURL.BaseURL + EndPoint.ContactEndPoint.GetContactList,
      config
    );
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("array");
  });
  
  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL + EndPoint.ContactEndPoint.GetContactList,
        config
      );
    } catch (error) {
        console.log('in Catch')
        console.log(error.response.data)
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
