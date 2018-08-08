
var shapewaysApi = require("../../lib_oauth2/client_oauth2");

// Main method
async function runProgram(options) {

  // authorization code
  var client = new shapewaysApi.Client(options.clientKey, options.clientSecret);
  await client.authorize();

  // application code
  var modelData = await client.uploadModel(options.pathToModel)
}

try {
  /**
    * requires a json-encoded file with following format:
    * {
    *   clientKey: 'client_key',
    *   clientSecret: 'client_secret'
    * }
    */
  var credentials = require('./client-credentials');
  runProgram(credentials.clientKey, credentials.clientSecret);
} catch (e) {
  console.err(e);
}
