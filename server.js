console.log("Node Server Running");


var Twit = require('twit');
var config = require('./config');
// Require NODE FileShare//
var fs = require('fs');

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
// tweetMedia();
function tweetMedia(processing){
                  ////Tweet Image////
  function processing(){
    var fileName = 'nodeimg.png';
    var params = {
      encoding: 'base64'
    }
    var b64 = fs.readFileSync(fileName, params);

    T.post('media/upload', { media_data: b64 }, uploaded);

    function uploaded(err, data, response){
      var id = data.media_id_string;
      var tweet = {
        status: '#Nodejs is posting this Image!',
        media_ids: [id]
      }
      T.post('statuses/update', tweet, tweeted);
    }

    function tweeted(err, data, response) {
      if (err){
        console.log("Error with tweet!");
      }
      else {
        console.log("Tweet Posted!");
      }
    }
  }
}
                  ////Tweet Text////
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
  };


}

//---------Tweet after Follow---------//
        //Setting up user Stream//
var stream = T.stream('user');
        //Listen for event//
stream.on('follow', followed);
        //If Follow event send
function followed(eventMsg){
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  console.log('@' + screenName + ' Just followed you!');

  tweetIt('Thanks for the follow @' + screenName +'!' )

}
