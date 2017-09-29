console.log("Node Server Running");


var Twit = require('twit');
var config = require('./config');

var T = new Twit({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


///////////////////Functions ////////////////////
//---------Search Twitter---------//
function search(){
  var params = {
    q: 'Taylor Swift',
    count: '20'
  }

  T.get('search/tweets', params, gotData);
  function gotData(err, data, response){
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text)
    }
  };
}
//search()

//---------Post To Twitter Account---------//
function tweetIt(txt){
  var tweet = {
    status: txt
  }

  T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
    if (err){
      console.log("Error with tweet!");
    }
    else (console.log("Tweet Posted!"));
  }
}
//tweetIt()

//---------setting up user Stream---------//
//setting up user Stream
var stream = T.stream('user');

stream.on('follow', followed);

function followed(eventMsg){
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  console.log('@' + screenName + ' Just followed you!');

  tweetIt('@' + screenName + ' Thanks for the follow!')

}
