const express = require('express');
const app = express();
const cors = require('cors');
const { DateTime } = require('luxon');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', function (req, res) {
  const dateParam = req.params.date;
  if(dateParam){
    let date;

    if (/^\d{5,}$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }

    if (date.toString() === 'Invalid Date') {
      res.json({ error: 'Invalid Date' });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
  } else {
    const currentTime = DateTime.now().setZone('Africa/Nairobi').toMillis();
    const currentUTC = DateTime.now().toUTC().toRFC2822();
    res.json({
      unix: currentTime,
      utc: currentUTC
    });
  }
 
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
