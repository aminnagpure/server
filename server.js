var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


var cors = require('cors');
app.use(cors());

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var Exchanges=mongoose.model('Exchanges',{
  name:String,
  ethadd:String,
  approved:{type:String,maxlength:1,default:'N'},
  dt:{ type : Date, default: Date.now }


})

var ExchangesEth=mongoose.model('exchangeseth',{
  exchange:String,
  ethaddress:String,
  approved:{type:String,maxlength:1,default:'N'},
  totaleth:Number,
  dt:{ type : Date, default: Date.now }


})



var dbUrl = 'mongodb://amin:gandmasti1234@ds133981.mlab.com:33981/a1'


app.get('/messages', (req, res) => {

  console.log('got message');
  /*Message.find({},(err, messages)=> {
    res.send(messages);
  })
  */
  res.send({"hey":"data"});
})
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {

/*  console.log('in post msg');
  console.log(req.body);
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
*/
kk={
  name:'binance',
  ethadd:'sdfsd',
  approved:'N'
}

var exch=new Exchanges(req.body);
exch.save((err)=>{
  if(err){
    console.log(err);
  }
});

})

app.post('/addeth', (req, res) => {

console.log(req.body);
var exch=new ExchangesEth(req.body);
exch.save((err)=>{
  if(err){
    console.log(err);
  }
});
});

app.get('/showeth',(req,res)=>{


const query = {exchange:req.query.id}
const projection = {}
const options = { sort: { id: 1 }, limit: 2}

ExchangesEth.find(query, projection, options).exec((err, docs)=> {
//  console.log(docs);
res.send(docs);
    //res.json(docs);
 });




});



io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose
  .connect(dbUrl,{useNewUrlParser:true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});
