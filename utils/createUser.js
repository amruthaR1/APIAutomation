const { default: axios } = require("axios");
const randomUser = require("./randomUserGenerator");
const baseURL = require("../data/baseURL.json");
const EndPoint = require("../data/endPoints.json");

const createUser = async () => {
  const user = randomUser();
  const response = await axios.post(
    baseURL.BaseURL + EndPoint.UserEndpoint.AddUser,
    user
  );
  return response.data;
};

module.exports = createUser;


