const projectData = {}

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env)
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

const port = 8383;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const Data = [];

app.get('/getData', getData);

function getData (req, res) {
  res.send(Data);
  console.log(Data);
};

app.post('/post', postData);

function postData(req,res){
  console.log(req.body)
  object1 = {
    countryName: req.body.countryName,
    name: req.body.name,
    highTemp: req.body.highTemp,
    lowTemp: req.body.lowTemp,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  };
  Data.push(object1);
  res.send(Data)
}
