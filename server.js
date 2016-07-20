var express = require("express");
var app = express();
var moment = require("moment");

app.get('/', function (req, res) {
  //Home Page set up.
  //res.sendFile <---- HINT
  res.send('Hello World!');
});

app.get('/:date', function (req, res) {
  //Check if date is a valid date.
  //Convert natural to unix
  //or convert unix to natural.
  //Send the result.
  var givenDate = req.params.date;
  var currDate = "";
  var timestampObj = {
      unix: null,
      natural: null
  }
  
  if (moment.unix(givenDate).isValid()) {
   currDate = moment.unix(givenDate);
  } else {
   currDate = moment(givenDate, 'MMMM DD, YYYY');
  }
  
  if (currDate.isValid()) {
      timestampObj.natural = currDate.format("MMMM DD, YYYY");
      timestampObj.unix = currDate.format('X');
  }
  
  res.send(timestampObj);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});