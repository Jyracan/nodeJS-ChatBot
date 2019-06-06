var express=require('express');                     //Gérez un serveur http
var parser=require('body-parser');                  //Module pour parser les fichiers json
var requete=require('./requete.js');
var cookieParser = require('cookie-parser')
var app=express();

app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json
app.use(cookieParser())



app.get('/',function(req,res){
  res.clearCookie("name");
  res.render('admin');
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



app.post('/modify',function(req,res){
  requete.getAllRobots()
  let robots=requete.getReply();
  let robotM;
  let name=req.body.name;
  let personalities;
  let newname=req.body.nom;
  requete.getAllInterface();
  let interfaces=requete.getReply();
  let interface=req.body.interface;
  let newPersonality=req.body.personality;
  let token=req.body.token;
  let clientID=req.body.clientID;
  if(name!=undefined){
    res.cookie("name",name);
    requete.getARobot(name);
    robotM=requete.getReply();
    requete.getAllPersonality();
    personalities=requete.getReply();
    res.render('modify',{"robots": robots,"name":name,"robot": robotM, "personalities": personalities,"message": "", "interfaces": interfaces});
  }

  else if(newname!=undefined && newPersonality!=undefined){ //On a choisi une nouvelle personnalité ou nom
    requete.modify(req.body.bot,newname,newPersonality,interface,token,clientID);
    let message=requete.getReply();
    requete.getAllRobots()
    robots=requete.getReply();

    res.render('modify',{"robots": robots,"name":undefined, "message": message,"interfaces": interfaces});
  }
  else{ //On vient d'arriver pour la première fois
    res.render('modify',{"robots": robots,"name":req.cookies.name, "message": "","interfaces": interfaces});
  }



});

app.post('/add',function(req,res){
  let name=req.body.name;
  let personality=req.body.personality;
  let token=req.body.token;
  let clientID=req.body.cliendID;
  requete.getAllPersonality();
  let personalities=requete.getReply();
  requete.getAllInterface();
  let interfaces=requete.getReply();
  let interface=req.body.interface;
  console.log(interface);
  if(name==undefined){
    res.render('ajout',{"personalities": personalities, "ajout": "","interfaces": interfaces, "interface": interface});
  }
  else{
      requete.createARobot(name,personality,interface,token,clientID);
      res.render('ajout',{"personalities": personalities, "ajout": "Successfully added!","interfaces": interfaces, "interface": interface});
  }

});

app.post('/delete',function(req,res){
  requete.getAllRobots();
  let robots=requete.getReply();
  res.render('delete',{"robots" :robots})

});

app.post('/deleteBot',function(req,res){
  let name=req.body.name;
  let message="";
  if (name!=undefined && name!=""){
    requete.delete(name);
    if(res.statusCode==200){
      message="The bot was deleted!"
    }
    else{
      message="A error happens!"
    }
  }
  res.render('deleteSucess',{"message": message,"name": name});
});

app.get('/botList',function(req,res){
  requete.getAllRobots();
  let robots=requete.getReply();
  res.render("list",{"robots": robots});
});




app.listen(3031);
console.log("Listening on 3031")
