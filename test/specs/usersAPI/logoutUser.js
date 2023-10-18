const chai = require("chai");
const expect = chai.expect;
const LOGOUTAPI = require('../../pageobjects/usersObject/logoutAPI')
const token = require("../../../data/authorizationToken.json");


describe('Logout User', () => {
    it('Should logout the user', async()=>{
        const authToken = token.Token.CorrectToken;
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };
        const response = await LOGOUTAPI.makeLogoutRequest(config);
        expect(response.status).to.be.equal(LOGOUTAPI.getSuccessStatus());
    })
    
});