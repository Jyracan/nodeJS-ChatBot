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
var nextPort = 2000;
const personalityList = ['steeve', 'stupid'];

var bots = [];
var mockBot = new bot('mockBot','steeve', 2000, 'discord')
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
function deleteBot(name){
	res = null;
	bots.forEach(function(bot, i) {
		console.log(i)
		if(bot.getName() == name){
			delete bots[i];
		}
	});

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
		if(name == undefined || name == "") {name = "Anne Onyme";}
		console.log('Son nom sera ' + name);
		var personality = req.body.personality;
		if(personality == undefined) {personality = "steeve";}
		var flag = true;
		var port = FIRST_PORT;
		nextPort = nextPort +1;
		console.log("Nouveau port : " + nextPort);
		/*
		while(flag){
			flag = false;
			bots.forEach( function(bot, index) {
				if(bot.port == port){
					flag = true;
					port = port +1;
				}
			});
			
		}*/
		bots.push(new bot(name,personality, nextPort, 'sms'));
		res.send(200, 'Fait');
	}
	else{
		res.send(400, 'Veuillez envoyer un JSON');
	}
});

//DELETE
app.delete('/:name',function(req, res) {
	var name = req.params.name;
	console.log("Suppression du bot "+name);
    if(name!=undefined){
    	deleteBot(name);
		res.send(200,'OK');
    }else{
		res.send(404, 'Bot not found ! :(');
	}
});
//PUT
app.put('/:name',function(req, res) {
	var name = req.params.name;
	console.log("Modification du bot "+name);
    if(undefined!=name){
    	// UPDATE OF THE PERSONALITY
    	var newPersonality = req.body.personality;
    	console.log("np " + newPersonality)
		if(newPersonality != undefined) {
			botToUpdate = getBot(name);
			botToUpdate.changePersonality(newPersonality);
			console.log("Personnalité du robot changé !")
		}
		//UPDATE OF THE NAME
		var newName = req.body.name;
		console.log("nn " + newName)

		if(newName != undefined) {
			botToUpdate = getBot(name);
			botToUpdate.changeName(newName);
			console.log("Nom du robot changé !")
		}
		res.send(200,'OK');
    }else{
		res.send(404, 'Bot not found ! :(');
	}
});


app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));
