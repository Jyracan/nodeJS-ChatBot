var express=require('express');                     //Gérez un serveur http
var parser=require('body-parser');                  //Module pour parser les fichiers json
var requete=require('./requete.js');
var app=express();
app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json

/**
* Page principal du site offrant les choix CRUB pour les deux API
*
**/
app.get('/',function(req,res){
  res.render('main');
});

app.post('/',function(req,res){
  let chat=req.body.chat;
  if(chat!=null || chat!=undefined){
    console.log(chat);
  }
  res.render('main');
});


app.listen(3030);
console.log("Listening on 3030")
