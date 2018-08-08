#!/usr/bin/env node

async function doThing() {
  var shapewaysClient = require("../../lib_oauth2/client_oauth2");
  var client = new shapewaysClient.Client("CLIENT_KEY", "CLIENT_SECRET");
  await client.authorize();
  await client.uploadModel("/path/to/file");
}

try {
  doThing();
}
catch(e){console.log(e);}
