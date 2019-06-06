# Service - ChatBot

Run on port 8080 by default.


## What this service does : 

- [x] Creation of an object robot 
- [x] Creation of a collection of robot
- [x] Instanciation of a bot via HTTP request (POST)
- [X] Destruction of a bot via HTTP request (DEL)
- [X] Modification of the name of a bot via HTTP request (PUT)
- [X] Modification of the interface of a bot (PUT)
- [ ] Modification of the personality of a bot (PUT)
- [x] Getting a list of all the bots via HTTP request (GET)
- [x] Getting a specific bot via his name (GET)
- [X] Getting a list of personnality (GET)

## Random informations 

When you launch this web service a bot is create is name is R2D2 and he as the personnality of Steeve.

## How to GET the list of bots ?

Simply create a GET request at : http://localhost:8080/

You will receive an answer formated like this :

```JSON
[{
  "name" : "Steeve",
  "personality" : "Steeve,
  "port" : 2000,
  "uiInterface" : "discord",
  "clientID" : XXXXXX,
  "token" : XXXXXXXXX
},{
  "name" : "test",
  "personality" : "Steeve,
  "port" : 2001,
  "uiInterface" : "sms",
  "clientID" : undefined,
  "token" : undefined
}]
```

And if you know the name of a bot and you want details on it do a GET request at : http://localhost:8080/BOT_NAME

You will be served an answer formated like this :

```JSON
{"name":"mockBot","personality":"steeve","port":2020, "uiInterface" : "sms"}
```

If you want to get only the bot using the sms services you can send a request at http://localhost:8080/sms

## How to GET the list of personnality or of interfaces ?

Send a GET request at http://localhost:8080/aide/personnalites or http://localhost:8080/aide/interface
you will receive a JSON like this :
```JSON
{[personnality1, personnality2, etc ...]}
```

## How to create a bot on this service ?

You need to create a POST request and send a JSON like this :

```JSon
{"name": name,"personality": personality,"interface": interface, "token" : token, "clientID" : clientID }
```

If you send an empty JSON or if informations are lacking the name will be "Anne Onyme" the personnality "Steeve" and the interface would be 'sms'.

The field token and clientID are mandatory if you want to use an discord interface (go at the end of this README to learn how to get them).

The bot will take a port which isn't currently used starting with the port 2000.


## How to delete a bot from the list ?

You have to create a DEL request with the path following at this url : http://localhost:8080/BOT_NAME

This will delete the bot from the list on the server.

## How to modify a bot ?

You have to create a PUT request with the path following at this url : http://localhost:8080/BOT_NAME

In the body of your request have to look like this :
```JSON
{"name" : name, "interface" : interface, "clientID" : clientID, "token" : token}
```
If you fill only the name, it will only change the name of the bot.
If you change the interface from 'discord' to 'sms' you won't have to fill the clientID and the token field.
Overwise those fields are mandatory !

We haven't found a way to change the personnality of the bot since it recquire to close a port and then reopen it.

## How to obtain a token and a clientID to use the ChatBot service on Discord ?

Go to this link : https://discordbots.org/bot/new

After logging on your discord account, choose discord.js as bot's library.

You'll need a ClientID. Go here to get one by creating an application : https://discordapp.com/developers/applications/

The other fields are up to you !

Finally, to get your token, select your application, select bot in the settings. Click on copy in the token field to copy it ! 

## Ressources:

- Steeve brain : https://github.com/aichaos/rivescript-js/blob/master/eg/brain/begin.rive
