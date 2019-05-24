var express=require('express');                     //Gérez un serveur http
var app=express();
var parser=require('body-parser');
const Discord = require("discord.js");
const client = new Discord.Client();
var requete=require("./requete.js");
var max=0;

app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var chaine=msg.content;
  var position = chaine.indexOf("<@581463946519773204>");
  if(position!=-1){
    let message=msg.content.replace("<@581463946519773204>","");
 //   console.log(message);
    requete.reply(msg.author.username,message,2000); //En dur pour le moment
    let reponse=requete.getReply();
    msg.reply(reponse.reply);
}

});
client.login('NTgxNDYzOTQ2NTE5NzczMjA0.XOfqkA.GcgE29L6ABlQqZeYuFuY2Rh1mCI');

/*
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
*/
