const express = require('express');
const app = express();
const moment = require('moment');
const port = process.env.PORT || "8000";

const months = ["January", "February", "March", "April", 
                "May", "June", "July", "August", "September",
                "October", "November", "December"];
app.use(express.static('public'));

app.get('/:date', function (req, res) {
  let result = {unix: null, natural: null};
  var date = (req.params.date);
  var dateFormat = "MMMM D, YYYY";
  var valid = false;

  if(isNaN(date)){
      result.natural = moment(date).format("MMMM D, YYYY");
      result.unix = moment(result.natural).unix();
  } else {
      // is a number, which means it is an unix timestamp
     result.natural = moment.unix(date).format("MMMM D, YYYY");
     result.unix = moment(result.natural).unix();
  }
  if(!result.unix) result.natural = null;
  
  res.json(result);
});


app.listen(port, function () {
  console.log(`Timestamp API listening on port ${port}!`)
});