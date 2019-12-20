import http from 'http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/version', (req, res) => res.send('1.0.0'));


mongoose.connect('mongodb+srv://USER:PASS@cluster0-dfjjj.mongodb.net/test?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function() {
 console.log("Połączenie udane!");
});


const Schema = mongoose.Schema;

// Wycieczka Model
const Wycieczka = new Schema({
  nazwa: String,
  docelowyKrajWycieczki: String,
  dataRozpoczecia: String,
  dataZakonczenia: String,
  cenaJednostkowa: Number,
  maxIloscMiejsc: Number,
  opis: String,
  linkDoZdj: String,
  ileZarezerwowano: Number,
  oceny: Array,
});

mongoose.model('Wycieczka', Wycieczka);

const WycieczkaModel = mongoose.model('Wycieczka');
// /Wycieczka Model


// Order Model
const Order = new Schema({
  creationDate: String,
  products: [{
    count: Number,
    trip: Wycieczka
  }]
});

mongoose.model('Order', Order);

const OrderModel = mongoose.model('Order');
// /Order Model


// Wycieczki endpoints
app.get('/wycieczki', function (req, res) {
  WycieczkaModel.find({}, (err, tasks) => {
    res.send(tasks);
  });
});

app.get('/wycieczki/:wycieczkaId', function (req, res) {
  WycieczkaModel.findOne({'_id': req.params['wycieczkaId']}, (err, tasks) => {
    res.send(tasks);
  });
});

app.post('/wycieczki', (req, res) => {
  console.log("Otrzymano żądanie POST dla strony głównej");

  const newWycieczka = new WycieczkaModel(req.body);

  newWycieczka.save((err, wycieczka) => {
    res.send(wycieczka._id);
  });
});

app.delete('/wycieczki/:wycieczkaId', (req, res) => {
  WycieczkaModel.remove({_id: req.params['wycieczkaId']}, (err, task) => {
    res.send({status: "OK"});
  });
});

app.delete('/wycieczki', (req, res) => {
  WycieczkaModel.remove({}, () => {
    res.send({status: "OK"});
  });
});

app.put('/wycieczki/:wycieczkaId', (req, res) => {
  WycieczkaModel.update( {_id: req.params['wycieczkaId']},
    req.body,
    {multi: false},
    (err, rows_updated) => {
      res.send({rows_updated});
    }
  );
});
// /Wycieczki endpoints

// Orders endpoints
app.get('/orders', function (req, res) {
  OrderModel.find({}, (err, tasks) => {
    res.send(tasks);
  });
});

app.get('/orders/:orderId', function (req, res) {
  OrderModel.find({'_id': req.params['orderId']}, (err, tasks) => {
    res.send(tasks);
  });
});

app.post('/orders', (req, res) => {
  console.log("Otrzymano żądanie POST dla strony głównej");

  const newOrder = new OrderModel(req.body);

  newOrder.save((err, order) => {
    res.send(order._id);
  });
});
// /Orders endpoints


app.server.listen(5001, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

process.on('exit', function() {
  mongoose.disconnect();
});


export default app;
