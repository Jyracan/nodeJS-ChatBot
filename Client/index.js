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

app.get('/',function(req,res){
  res.render('connexion');
});

app.post('/choice',function(req,res){ //Permet de choisir le robot
  requete.getAllRobots()
  let pseudo=req.body.pseudo;
  let robots=requete.getReply();
  res.render('choix',{"robots":robots,"pseudo": pseudo});
});


app.get('/chat',function(req,res){
  res.render('main',{'chat': ""});
});

app.post('/chat',function(req,res){
  let chat=req.body.personne; //message de l'utilisateur
  let pseudo=req.body.pseudo; //Son pseudo
  let id=req.body.id;         //id de la chatroom
  let port=req.body.port;     //port du robot
  let name=req.body.name;     //nom robot
  console.log(name);
  if((chat!=null || chat!=undefined) && (pseudo!=null || pseudo!=undefined)){
    requete.reply(pseudo,chat,port); //envoie recherche au bon robot
    let reponse=requete.getReply();
    let conv1=pseudo+" : "+chat;
    let conv2=name+" : "+reponse.reply;
    let ind=0;
    chats.forEach(function(item, index, array) {  //recherche de la bonne conversation
      if(item.getId()==id){
        ind=index;
      }
    });
    chats[ind].getConv().push(conv1); //Ajoute conversation au tableau
    chats[ind].getConv().push(conv2);
    res.render('main',{"chat": chats[ind].getConv(), "pseudo" : pseudo, "id": id, "port" : port, "name": name});
  }
  else{ //init car on vient d'arriver sans message
    if(chat==null || chat==undefined){
      let id=Math.floor(Math.random() * Math.floor(50000));
      chats.push(new chatroom(id,[""]))
    }
    res.render('main',{ "chat": [], "pseudo": pseudo, "reply": "", "id" : id, "port": port, "name": name
  });
  }
});


app.listen(3030);
console.log("Listening on 3030")
