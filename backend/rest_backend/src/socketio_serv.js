var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');
var bodyParser = require('body-parser');

server.listen(8080);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var SECOND = 1000;
var MINUTE = 60*SECOND;

var currentPromotions = {};

app.post('/registerPromotion', function (req, res) {
  console.log(req.body);

  var tripsWithPromotion = req.body.checkedTripsForPromotion;

  tripsWithPromotion.forEach(function(tripId) {
    currentPromotions[tripId] = req.body.poziomObnizki;
  });

  console.log(currentPromotions);

  setTimeout(function() {
    tripsWithPromotion.forEach(function(tripId) {
      console.log('Finished promotion: ' + tripId);
      delete currentPromotions[tripId];
    });

    io.sockets.send({finishedPromotions: tripsWithPromotion});
    io.sockets.send({currentPromotions});
  }, req.body.czasTrwania * MINUTE);

  io.sockets.send({currentPromotions});
  res.send({msg: "Done!"});
});

io.on('connection', function(socket){
  socket.emit('message', {currentPromotions}); // emit an event to the socket
});
