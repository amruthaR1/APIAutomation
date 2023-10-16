const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../data/baseURL.json");
const userEndPoint = require("../data/endPoints.json");
const testData = require("../data/testData.json");
const assertionData = require("../data/assertData.json")


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
    const payload = {
      firstName: "Test",
      lastName: "User",
      email: "Test1.User1@gamil.com",
      password: "myPassword",
    };

    const postResponse = await axios.post(baseURL.baseURL+userEndPoint.AddUser, payload);
    console.log(postResponse.data);
    expect(postResponse.status).to.be.equal(201);
    expect(postResponse.data.user.firstName).to.be.equal('Test');
    
  })
});
