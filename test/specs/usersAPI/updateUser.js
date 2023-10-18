const chai = require("chai");
const expect = chai.expect;
const UPDATEAPI = require("../../pageobjects/usersObject/updateAPI");
const assertionData = require("../../../data/assertData.json");
const createUser = require("../../../utils/users/createUser");
const token = require("../../../data/authorizationToken.json");

describe("Update User", () => {
  before(async () => {
    user = await createUser();
  });
  it("should update user data", async () => {
    const authToken = user.token;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    const data = { firstName: "amr" };

    const response = await UPDATEAPI.makeUpdaterequest(data, config);

    expect(response.status).to.be.equal(UPDATEAPI.getSuccessStatus());
    expect(response.data._id).to.be.equal(user.user._id);
    expect(response.data.firstName).to.be.equal(data.firstName);
  });

  it("Should get error message when wrong token provided", async () => {
    const authToken = token.Token.IncorrectToken;
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const data = { firstName: "amr" };
    try {
      const response = await UPDATEAPI.makeUpdaterequest(data, config);
    } catch (error) {
      expect(error.response.status).to.be.equal(UPDATEAPI.failureStatus);
      expect(error.response.data).to.have.property(
        "error",
        UPDATEAPI.failureMessage
      );
    }
  });
});
