/**
* Ce fichier contient toutes les fonctions forgeant des requêtes pour l'API tag
*
*/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var invocation=new XMLHttpRequest();

var reponse={};                  //Stocke les réponses du bot

/**
* Cette fonction permet de récupérer l'objet tag contenant les réponses des requêtes
*/
exports.getReply = function() {
  return reponse;
};


/**
* Cette fonction permet d'obtenir une réponse du robot
*/
exports.reply=function(username,msg,id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={"username":username,"message":msg}
    invocation.open('POST', "http://localhost:"+id+"/reply", false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	reponse = JSON.parse(invocation.responseText);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(tag));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

/**
* Cette fonction permet d'obtenir la liste des robots
*/
exports.getAllRobots=function(){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080', false);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){
    	try{
          	reponse = JSON.parse(invocation.responseText);
    	}catch(err){
    		console.log("invocation.responseText "+invocation.responseText);
    	}

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}
