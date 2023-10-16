const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");
const assertionData = require("../../data/assertData.json");

describe("Update User", () => {
  it("should update user data", async () => {
    const authToken = token.updateUserToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    const data = { firstName: "amr" };

    const response = await axios.patch(
      baseURL.BaseURL + EndPoint.UserEndpoint.PatchUser,
      data,
      config
    );

    expect(response.status).to.be.equal(200)
    expect(response.data._id).to.be.equal("652cdc68a1304d0013421512");
    expect(response.data.firstName).to.be.equal(data.firstName)
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const data = { firstName: "amr" };
    try {
      const response = await axios.patch(
        baseURL.BaseURL + EndPoint.UserEndpoint.GetUser,data,
        config
      );
      expect(response.status).to.be.equal(
        assertionData.GetUser.Fail.ErrorStatus
      );
      expect(response.data).to.have.property(
        "error",
        assertionData.GetUser.Fail.ErrorMessage
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
