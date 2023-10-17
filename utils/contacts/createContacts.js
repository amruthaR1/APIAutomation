const axios = require("axios");
const getRandomContact = require("./randomContactGenerator");
const baseURL = require("../../data/baseURL.json");
const EndPoint = require("../../data/endPoints.json");
const token = require("../../data/authorizationToken.json");

const createContact = async () => {
  const newContact = getRandomContact();
  const authToken = token.Token.CorrectToken;
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const response = await axios.post(
    baseURL.BaseURL + EndPoint.ContactEndPoint.AddContact,
    newContact,
    config
  );
  return response.data;
};

module.exports = createContact;
