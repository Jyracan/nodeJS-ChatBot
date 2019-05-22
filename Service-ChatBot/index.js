const express = require('express');
const bodyParser = require('body-parser');
const RiveScript = require('rivescript');
const bot = require('./bot.js');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// BOTS
const FIRST_PORT = 2000;

var listBot = [];

var bots = [];

bots.push(new bot('mockBot','steeve', 2020));
listBot.push({})

function  getBot(index){
	tmp = 'La tâche d\'id ' + index + ' n\'existe pas ';
	listBot.forEach( function(bot, i) {
		if(bot.id == index){
			tmp =tache;
		}
	});
	return tmp;
}

function majBot(index,bot){
	
}

// GET

app.get('/', function(req, res){
	console.log("Demande de la liste des bots")
	res.json(listBot);
});
app.get('/:id', function(req, res){
	if(req.is('json')){
		console.log('On màj un bot ');
		res.json(getBot(req.params.id));
	}
	else{
		res.send(400, 'Veuillez envoyer un JSON');
	}
});

// POST

app.post('/', function(req, res){
	if(req.is('json')){
		console.log('On crée un bot');
		var name = req.body.name;
		if(name == undefinied) {name = "No name";}
		var personality = req.body.personality;
		if(personality == undefinied) {personality = "steeve";}
		var flag = true;
		var port = FIRST_PORT;
		while(flag){
			flag = false;
			listBot.forEach( function(bot, index) {
				if(bot.port == port){
					flag = true;
				}
			});
			port = port +1;
		}
		bots.push(new bot(name,personality, port));
		res.send(200, 'Done');
	}
	else{
		res.send(400, 'Veuillez envoyer un JSON');
	}
});

app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));