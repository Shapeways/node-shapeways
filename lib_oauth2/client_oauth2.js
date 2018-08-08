var querystring = require("querystring");
var rp = require('request-promise');
var fs = require('fs');


/**
 * Represents an Oauth2 Client
 *
 * @constructor
 * @param {String} key      client key
 * @param {String} secret   client secret
 */
function Client(key, secret) {
  this.key = key;
  this.secret = secret;
  this.token = null; // eventual home for Bearer token after .authorize() is called
}

/**
 * Authorize an Oauth2 client, and save its bearer token into the Client object
*/
Client.prototype.authorize = async function authorizeClient() {
  var options = {
    url: "https://api.shapeways.com/oauth2/token",
    headers: {
      "grant_type": "client_credentials"
    },
    auth: {
      user: this.key,
      pass: this.secret
    },
    form: {
      "grant_type": "client_credentials"
    }
  }
  let result = await rp.post(options);
  this.token = JSON.parse(result)["access_token"];
}

/**
 * Retrieve a list of materials.  Requires a bearer token to work.
 *
 * @return {String} a dictionary of materials objects indexed by materialID
*/
Client.prototype.getMaterials = async function getMaterials() {
  var options = {
    url: "https://api.shapeways.com/materials/v1",
    headers: {
      "Authorization" : "Bearer " + this.token
    }
  }
  let result = await rp.get(options);
  var materialsDict = JSON.parse(result)["materials"];
  return materialsDict;
}

/**
 * Upload a model to shapeways.
 *
 * @param {String} filePath path to the file
 * @return {String} the result of the model upload
*/
Client.prototype.uploadModel = async function uploadModel(filePath) {
  var bitmap = fs.readFileSync(filePath);
  var fileString = Buffer(bitmap).toString('base64');
  var form = {
    "fileName": "cube.stl",
    "file": fileString,
    "description": "Someone call a doctor, because this cube is SIIIICK.",
    "hasRightsToModel": 1,
    "acceptTermsAndConditions": 1
  };
  rawBody = JSON.stringify(form);
  var options = {
    url: "https://api.shapeways.com/model/v1",
    headers: {
      "Authorization" : "Bearer " + this.token
    },
    body: rawBody
  }
  let result = await rp.post(options);
  return JSON.parse(result);
}


module.exports = {
  Client: Client
}
