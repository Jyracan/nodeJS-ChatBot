var express=require('express');                     //Gérez un serveur http
var parser=require('body-parser');                  //Module pour parser les fichiers json
var requete=require('./requete.js');
var chatroom=require('./chatroom');
var cookieParser = require('cookie-parser')
var app=express();

app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json
app.use(cookieParser())

let chats=[];

app.get('/',function(req,res){
  res.render('connexion');
});

app.post('/choice',function(req,res){ //Permet de choisir le robot
  requete.getAllRobots()
  let pseudo;
  //console.log(req.cookies.pseudo);
  if(req.cookies.pseudo==undefined){
      pseudo=req.body.pseudo;
      res.cookie("pseudo",pseudo);
  }

  res.render('choix');
});

app.post('/choiceBot',function(req,res){ //Permet de choisir le robot
  requete.getAllRobots()
  let robots=requete.getReply();
  res.render('choixrobot',{"robots":robots});
});

app.post('/admin',function(req,res){
  res.clearCookie("name");
  res.render('admin')
});

app.get('/chat',function(req,res){
  res.render('main',{'chat': ""});
});

app.post('/modify',function(req,res){
  requete.getAllRobots()
  let robots=requete.getReply();
  let robotM;
  let name=req.body.name;
  let personalities;
  let newname=req.body.nom;
  let newPersonality=req.body.personality
  if(name!=undefined){
    res.cookie("name",name);
    requete.getARobot(name);
    robotM=requete.getReply();
    requete.getAllPersonality();
    personalities=requete.getReply();
    res.render('modify',{"robots": robots,"name":name,"robot": robotM, "personalities": personalities,"message": ""});
  }

  else if(newname!=undefined && newPersonality!=undefined){ //On a choisi une nouvelle personnalité ou nom
    console.log("Nom="+newname);
    console.log("bot="+req.body.bot);
    requete.modify(req.body.bot,newname,newPersonality);
    requete.getAllRobots()
    robots=requete.getReply();
    res.render('modify',{"robots": robots,"name":undefined, "message": "Bot modified"});
  }
  else{ //On vient d'arriver pour la première fois
    res.render('modify',{"robots": robots,"name":req.cookies.name, "message": ""});
  }



});

app.post('/add',function(req,res){
  let name=req.body.name;
  let personality=req.body.personality;
  requete.getAllPersonality();
  let personalities=requete.getReply();
  if(name==undefined){
    res.render('ajout',{"personalities": personalities, "ajout": ""});
  }
  else{
      requete.createARobot(name,personality);
      res.render('ajout',{"personalities": personalities, "ajout": "Successfully added!"});
  }

});

app.post('/chat',function(req,res){
  let chat=req.body.personne; //message de l'utilisateur
  let pseudo=req.cookies.pseudo; //Son pseudo
  let id=req.body.id;         //id de la chatroom
  let name=req.body.name;     //nom robot

  requete.getARobot(name);

  let port=requete.getReply().port;     //port du robot



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
    res.render('main',{"chat": chats[ind].getConv(), "id": id, "port" : port, "name": name, "pseudo": pseudo});
  }
  else{ //init car on vient d'arriver sans message
    if(chat==null || chat==undefined){
      let id=Math.floor(Math.random() * Math.floor(50000));
      chats.push(new chatroom(id,[""]))
      res.render('main',{ "chat": [], "reply": "", "id" : id, "port": port, "name": name, "pseudo" : pseudo
    });
    }

  }
});


app.listen(3030);
console.log("Listening on 3030")
