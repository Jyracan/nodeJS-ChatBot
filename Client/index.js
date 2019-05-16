var express=require('express');                     //Gérez un serveur http
var parser=require('body-parser');                  //Module pour parser les fichiers json
var requete=require('./requete.js');
var chatroom=require('./chatroom');
var app=express();

app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json

let chats=[];
/**
* Page principal du site offrant les choix CRUB pour les deux API
*
**/
app.get('/',function(req,res){
  res.render('connexion');
});


app.get('/chat',function(req,res){
  res.render('main',{'chat': ""});
});

app.post('/chat',function(req,res){
  let chat=req.body.chat;
  let pseudo=req.body.pseudo;
  if((chat!=null || chat!=undefined) && (pseudo!=null || pseudo!=undefined)){
    requete.reply(pseudo,chat);
    let reponse=requete.getReply();
    console.log(reponse);
    res.render('main',{"chat": chat,"pseudo": pseudo, "reply": reponse});

  }
  else{
    if(chat==null || chat==undefined){
      let id=Math.floor(Math.random() * Math.floor(50000));
      chats.push(new chatroom(id,req.body.room))
    }
    res.render('main',{ "chat": "", "pseudo": pseudo, "reply": ""
  });
  }
});


app.listen(3030);
console.log("Listening on 3030")
