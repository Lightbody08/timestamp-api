var express = require("express");
var app = express();
var moment = require("moment");

app.get('/', function (req, res) {
  //Home Page set up.
  res.sendFile('index.html', {root:__dirname});
  //res.send('Hello World!');
});

app.get('/:date', function (req, res) {
  var givenDate = req.params.date;
  var currDate = "";
  var timestampObj = {
      unix: null,
      natural: null
  }
  
  //If paramater is a valid Unix date,
  //use moment set it to current date.
  //Else it should be anatural date,
  //set it using a particular moment format.
  if (moment.unix(givenDate).isValid()) {
   currDate = moment.unix(givenDate);
  } else {
   currDate = moment(givenDate, 'MMMM DD, YYYY');
  }
  
  //If this is an actual date,
  //assign the timestamp object the appropriate variables.
  if (currDate.isValid()) {
      timestampObj.natural = currDate.format("MMMM DD, YYYY");
      timestampObj.unix = currDate.format('X');
  }
  
  res.send(timestampObj);
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT + '.');
});