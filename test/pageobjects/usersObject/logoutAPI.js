const axios = require("axios");
const baseURL = require("../../../data/baseURL.json");
const EndPoint = require("../../../data/endPoints.json");


class Logout{
    constructor(){
        this.url = baseURL.BaseURL + EndPoint.UserEndpoint.LogOut;
        this.successStatus = 200;
    }

    async makeLogoutRequest(config){
        const response = await axios.get(
          baseURL.BaseURL + EndPoint.UserEndpoint.LogOut,
          config
        );
        return response;
    }

    getSuccessStatus(){
        return this.successStatus;
    }

}

module.exports = new Logout();