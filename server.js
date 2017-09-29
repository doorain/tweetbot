console.log("Its working");


var Twit = require('twit');
var config = require('./config');

var T = new Twit({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
