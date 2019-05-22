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
const personalityList = ['steeve', 'translater'];

var bots = [];
var mockBot = new bot('mockBot','steeve', 2020)
bots.push(mockBot);


function  getBot(name){
	res = null;
	bots.forEach(function(bot, i) {
		if(bot.getName() == name){
			res = bot;
		}
	});
	return res;
}


// GET
app.get('/', function(req, res){
	console.log("Demande de la liste des bots");
	var listBot =[];
	bots.forEach( function(bot, index) {
		listBot.push(bot.toString());
	});
	res.json(listBot);
});
app.get('/aide/personnalites', function(req, res){
	console.log("Demande de la liste des personnalités");
	res.json(personalityList);
});
app.get('/:name', function(req, res){
	console.log('On demande les informations du bot '+req.params.name );
	var bot = getBot(req.params.name);
	if(bot != null){
		res.json(bot.toString());
	}
	else{
		res.send('404', 'Bot not found ! :(');
	}
});

// POST
app.post('/', function(req, res){
	console.log('Demande de création d\'un bot');
	if(req.is('json')){
		var name = req.body.name;
		if(name == undefined) {name = "Anne Onyme";}
		console.log('Son nom sera ' + name);
		var personality = req.body.personality;
		if(personality == undefined) {personality = "steeve";}
		var flag = true;
		var port = FIRST_PORT;
		while(flag){
			flag = false;
			bots.forEach( function(bot, index) {
				if(bot.port == port){
					flag = true;
					port = port +1;
				}
			});
			
		}
		bots.push(new bot(name,personality, port));
		res.send(200, 'Fait');
	}
	else{
		res.send(400, 'Veuillez envoyer un JSON');
	}
});

//DELETE
app.delete('/:name',function(req, res) {
	console.log("Suppression du bot "+name);
    if(undefined!=name){
		res.send(200,'OK');
    }else{
		res.send(404, 'Bot not found ! :(');
	}
});
//PUT
app.put('/:name',function(req, res) {
	console.log("Modification du bot "+name);
    if(undefined!=name){
    	// UPDATE OF THE PERSONALITY
    	var personality = req.body.personality;
		if(personality != undefined) {
			bot = getBot(name);
			bot.changePersonality(personality);

			console.log("Personnalité du robot changé !")
		}
		//UPDATE OF THE NAME


		res.send(200,'OK');
    }else{
		res.send(404, 'Bot not found ! :(');
	}
});


app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));