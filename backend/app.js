var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri  = 'mongodb://dbMean:I87cgTbKt5eGqYrq@cluster0-shard-00-00.funux.mongodb.net:27017,cluster0-shard-00-01.funux.mongodb.net:27017,cluster0-shard-00-02.funux.mongodb.net:27017/mean?ssl=true&replicaSet=atlas-9kyu01-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const userRoute = require('./routes/user.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
});