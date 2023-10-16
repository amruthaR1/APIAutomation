const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const testData = require("../../data/testData.json");
const assertionData = require("../../data/assertData.json");
const randomUserGenerator = require("../../utils/randomUserGenerator")


describe("Add User", () => {
  it("should get a error message when existed email used", async () => {
    try {
      const postResponse = await axios.post(
        baseURL.BaseURL + EndPoint.UserEndpoint.AddUser,
        testData.AlreadyExistingUser
      );
      expect(postResponse.status).to.be.equal(assertionData.AddUser.Fail.ErrorStatus);
      expect(postResponse.data).to.have.property(
        "message",
        assertionData.AddUser.Fail.ErrorMessage
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(
        assertionData.AddUser.Fail.ErrorStatus
      );
      expect(error.response.data).to.have.property(
        "message",
        assertionData.AddUser.Fail.ErrorMessage
      );
    }
  });

  it("should add a user", async ()=>{
    const randomUser = randomUserGenerator()
    const postResponse = await axios.post(
      baseURL.BaseURL + EndPoint.UserEndpoint.AddUser,
      randomUser
    );
    expect(postResponse.status).to.be.equal(assertionData.AddUser.Success.SuccessStatus);
    expect(postResponse.data.user.firstName).to.be.equal(randomUser.firstName);
    expect(postResponse.data.user.lastName).to.be.equal(randomUser.lastName);
    
  })
});
