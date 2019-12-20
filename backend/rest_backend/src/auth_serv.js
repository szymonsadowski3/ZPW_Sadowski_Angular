import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/version', (req, res) => res.send('1.0.0'));


mongoose.connect('mongodb+srv://admin:admin@cluster0-dfjjj.mongodb.net/test?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function() {
  console.log("Połączenie udane!");
});


const Schema = mongoose.Schema;
const RoleMapping = new Schema({
  email: String,
  role: String,
});

mongoose.model('RoleMapping', RoleMapping);

const RoleMappingModel = mongoose.model('RoleMapping');

// const newRola = new RoleMappingModel({
//   email: 'szymonsadowski3@gmail.com',
//   role: 'admin',
// });
//
// newRola.save((err, wycieczka) => {
//   console.log('done');
// });

app.get('/roles', function (req, res) {
  RoleMappingModel.find({}, (err, tasks) => {
    res.send(tasks);
  });
});

app.get('/roles/:email', function (req, res) {
  console.log(req.params['email']);
  RoleMappingModel.findOne({'email': req.params['email']}, (err, tasks) => {
    res.send(tasks);
  });
});

app.server.listen(5002, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

process.on('exit', function() {
  mongoose.disconnect();
});


export default app;
