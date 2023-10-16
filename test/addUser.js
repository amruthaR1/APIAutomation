const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../data/baseURL.json");
const userEndPoint = require("../data/endPoints.json");
const testData = require("../data/testData.json");
const assertionData = require("../data/assertData.json");
const randomUserGenerator = require("../utils/randomUserGenerator")


describe("Add User", () => {
  it("should get a error message when existed email used", async () => {
    try {
      const postResponse = await axios.post(
        baseURL.BaseURL + userEndPoint.AddUser,
        testData.AlreadyExistingUser
      );
      expect(postResponse.status).to.be.equal(assertionData.AddUserFail.ErrorStatus);
      expect(postResponse.data).to.have.property(
        "message",
        assertionData.AddUserFail.ErrorMessage
      );
    } catch (error) {
      expect(error.response.status).to.be.equal(assertionData.AddUserFail.ErrorStatus);
      expect(error.response.data).to.have.property(
        "message",
        assertionData.AddUserFail.ErrorMessage
      );
    }
  });

  it("should add a user", async ()=>{
    const randomUser = randomUserGenerator()
    const postResponse = await axios.post(
      baseURL.BaseURL + userEndPoint.AddUser,
      randomUser
    );
    expect(postResponse.status).to.be.equal(assertionData.AddUserSuccess.ErrorStatus);
    expect(postResponse.data.user.firstName).to.be.equal(randomUser.firstName);
    expect(postResponse.data.user.lastName).to.be.equal(randomUser.lastName);
    
  })
});
