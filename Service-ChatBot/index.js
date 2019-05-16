const express = require('express');
const bodyParser = require('body-parser');
const RiveScript = require('rivescript');
const bot = require('./bot.js');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

robot = new bot('steeve', 2020);

app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));
/*
app.get('/', function (req, res) {
	res.send("Hello");

});*/
