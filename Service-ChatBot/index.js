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
const interfaceList=['discord','sms'];

var bots = [];
var R2D2= new bot('R2D2','steeve',2000,'sms');
bots.push(R2D2);


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
app.get('/sms',function(req,res){
	console.log("Demande de la liste des bots sms")
	var listBot=[]
	bots.forEach( function(bot, index) {
		if(bot.getUiInterface()=="sms"){
			listBot.push(bot.toString());
		}
	});
	res.json(listBot);
});
app.get('/aide/personnalites', function(req, res){
	console.log("Demande de la liste des personnalités");
	res.json(personalityList);
});
app.get('/aide/interface', function(req, res){
	console.log("Demande de la liste des interfaces");
	res.json(interfaceList);
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
		var uiInterface = req.body.interface;
		if(uiInterface == undefined){ uiInterface ='sms'}
		if(uiInterface == 'discord'){
			var token = req.body.token;
			if(token == ''){
				console.log('Il faut le token !')
				res.send(400, 'Si vous voulez créer un bot Discord il faut renseigner le token !')
			}
			var clientID = req.body.clientID;
			if(clientID == ''){
				res.send(400, 'Si vous voulez créer un bot Discord il faut renseigner clientID !')
			}
		}
		var port = FIRST_PORT;
		nextPort = nextPort +1;
		console.log("Nouveau port : " + nextPort);
		bots.push(new bot(name,personality, nextPort, uiInterface, token, clientID));
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
    if(undefined!=name){
    	console.log("Modification du bot "+name);
    	botToUpdate = getBot(name);

    	// UPDATE OF THE PERSONALITY DOESN'T WORK CURRENTLY
    	var newPersonality = req.body.personality;
    	console.log("nouvelle personnalités : " + newPersonality)
		if(newPersonality != undefined) {
			botToUpdate.changePersonality(newPersonality);
			console.log("Personnalité du robot changé !")
		}
		//UPDATE OF THE NAME
		var newInterface = req.body.interface;
		console.log("Nouvelle Interface " + newInterface);
		if(newInterface == 'discord') {
			console.log("On demande un bot discord")
			var token = req.body.token;
			var clientID = req.body.clientID;
			console.log('Nouveau clientID ' + clientID + ' Nouveau Token ' + token);
			if(token != undefined || clientID != undefined){
				botToUpdate.changeToDiscord(token, clientID);
			}else{
				res.send(400,'Veuillez renseigner le token et le clientID');
			}
			console.log("Interface du robot changé !")
			res.send(200,'OK');
		}
		if(newInterface == 'sms'){
			if(botToUpdate.uiInterface != newInterface){
				nextPort ++;
				botToUpdate.changeToSms(nextPort);
			}
			console.log("Interface du robot changé !")
			res.send(200,'OK');
		}
	}else{
		res.send(404, 'Bot not found ! :(');
	}
});



app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`));
