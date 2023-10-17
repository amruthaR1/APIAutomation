const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const assertionData = require("../../data/assertData.json");

describe("Get contact", () => {
  it("Sholud get a contact", async () => {
    const authToken = token.Token.CorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(
      baseURL.BaseURL +
        EndPoint.ContactEndPoint.GetContact +
        "652e0ef1fde4e500139b9650",
      config
    );
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    try {
      const response = await axios.get(
        baseURL.BaseURL +
          EndPoint.ContactEndPoint.GetContact +
          "652e0ef1fde4e500139b9650",
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
