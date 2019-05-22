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
listBot.push({
	name : 'mockBot',
	personality : 'steeve',
	port : 2020
})

function  getBot(name){
	tmp = null;
	listBot.forEach(function(bot, i) {
		if(bot.name == name){
			tmp = bot;
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
app.get('/:name', function(req, res){
	console.log('On demande les informations du bot '+req.params.id );
	var bot = null;
	bot = getBot(req.params.name);
	if(bot != null){
		res.json(getBot(req.params.name));
	}
	else{
		res.send('404', 'Bot not found ! ;)');
	}
});

// POST

app.post('/', function(req, res){
	console.log('Demande de création d\'un bot');
	if(req.is('json')){
		console.log('On crée un bot');
		var name = req.body.name;
		if(name == undefined) {name = "Anne Onyme";}
		console.log('Son nom sera ' + name);
		var personality = req.body.personality;
		if(personality == undefined) {personality = "steeve";}
		var flag = true;
		var port = FIRST_PORT;
		while(flag){
			flag = false;
			listBot.forEach( function(bot, index) {
				if(bot.port == port){
					flag = true;
					port = port +1;
				}
			});
			
		}
		bots.push(new bot(name,personality, port));
		listBot.push({
			name : name,
			personality : personality,
			port : port
		})
		res.send(200, 'Fait');
	}
	else{
		res.send(400, 'Veuillez envoyer un JSON');
	}
});

app.delete('/:name',function(req, res) {
	console.log("Supprssion du bot "+name);
    if(undefined!=name){
		res.send(200,'OK');
    }else{
		res.send(404, 'Page introuvable !');
	}
});


app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));