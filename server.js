console.log("Its working");


var Twit = require('twit');
var config = require('./config');

var T = new Twit({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


var params = {
  q: 'dorian',
  count: '2'
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text)
  }

};

T.get('followers/ids', { screen_name: 'doorainm' },  function (err, data, response) {
  console.log(data)
})
