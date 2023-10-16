const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");


describe('Logout User', () => {
    it('Should logout the user', async()=>{
        const authToken = token.Token.CorrectToken;
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };
        const response = await axios.get(
          baseURL.BaseURL + EndPoint.UserEndpoint.LogOut,
          config
        );
        expect(response.status).to.be.equal(200);
    })
    
});