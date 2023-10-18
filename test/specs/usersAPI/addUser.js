const chai = require("chai");
const expect = chai.expect;
const POSTAPI = require("../../pageobjects/usersObject/postAPI");
const testData = require("../../../data/testData.json");
const randomUserGenerator = require("../../../utils/users/randomUserGenerator");

describe("Add User", () => {
  it("should get a error message when existed email used", async () => {
    try {
      const postResponse = await POSTAPI.makePostRequest(
        testData.AlreadyExistingUser
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(
        POSTAPI.getFailureStatus()
      );
      expect(error.response.data).to.have.property(
        "message",POSTAPI.getFailureMessage()
      );
    }
  });

  it("should add a user", async () => {
    const randomUser = randomUserGenerator();
    const postResponse = await POSTAPI.makePostRequest(randomUser);
    expect(postResponse.status).to.be.equal(
      POSTAPI.getSuccessStatus()
    );
    expect(postResponse.data.user.firstName).to.be.equal(randomUser.firstName);
    expect(postResponse.data.user.lastName).to.be.equal(randomUser.lastName);
  });
});
