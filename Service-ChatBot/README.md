# Service - ChatBot

Run on port 8080 by default.



## What this service does : 

- [x] Creation of an object robot 
- [x] Creation of a collection of robot
- [x] Instanciation of a bot via HTTP request (POST)
- [ ] Destruction of a bot via HTTP request (DEL)
- [ ] Modification of a bot via HTTP request (PUT)
- [x] Getting a list of all the bots via HTTP request (GET)
- [x] Getting a specific bot via his name

## Random informations 

When you launch this web service a bot is create is name is mockBot and he as the personnality of Steeve (https://github.com/aichaos/rivescript-js/blob/master/eg/brain/begin.rive).

## How to GET the list of bots ?

Simply create a GET request at : http://localhost:8080/

You will receive an answer formated like this :

```JSON
[{
  "name": "mockBot",
  "personality": "steeve",
  "port": 2020
}, {
  "name": "test",
  "personality": "steeve",
  "port": 2001
}]
```

And if you know the name of a bot and you want details on it do a GET request at : http://localhost:8080/BOT_NAME

You will be served an answer formated like this :

```JSON
{"name":"mockBot","personality":"steeve","port":2020}
```

## How to POST a bot on this service ?

You need to create a POST request and send a JSON like this :

```JSon
{"name" : "test", "personality":"steeve"}
```

If you send an empty JSON or if informations are lacking the name will be "Anne Onyme" and the personnality "Steeve".

The bot will take a port which isn't currently used starting with the port 2000.

