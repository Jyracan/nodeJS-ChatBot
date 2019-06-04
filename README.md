# nodeJS-ChatBot
Web service to administrate ChatBot using RiveScript, and two clients to use this web service.

## How to install ?

Go to the root of the projet and type :
```
$ npm install
```
And that's it !

## How to run the project ?

Go to the Service-ChatBot folder and run index.js with the following command :
```
$ node index.js
```
This will start the bot services.

If you want to interract with your bot, you can run the Client server going to the Client folder and running with the same command the index.js.
Then if you go with your browser at http://localhost:3030/ you will be able to chat with your bot.

If you want to modify your bot, run the index.js in the Admin folder and go to http://localhost:3031/ .

## What does the web service does ?
You will find a description of all of what the web service does [here](https://github.com/Jyracan/nodeJS-ChatBot/tree/master/Service-ChatBot/README.md).

## What's in ?

This project include the following libraries :

- body-parser (https://github.com/expressjs/body-parser)
- cookie-parser (https://github.com/expressjs/cookie-parser)
- discord.js (https://github.com/discordjs)
- ejs (https://github.com/tj/ejs)
- express (https://github.com/expressjs/express)
- rivescript (https://github.com/aichaos/rivescript-js)
