/**
* Ce fichier contient toutes les fonctions forgeant des requêtes pour l'API tag
*
*/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var invocation=new XMLHttpRequest();

var tags={};                  //Stocke les réponses de l'API tag

/**
* Cette fonction permet de récupérer l'objet tag contenant les réponses des requêtes
*/
exports.getTAG = function() {
  return tags;
};

/**
* Cette fonction permet de récupérer tout les tags
*/
 exports.getAllTags=function(){
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/', false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

    		  //  console.log(response);
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




/**
* Cette fonction permet de créer un tag en fonction de ce que l'utilisateur a rentré
*/
exports.createATag=function(title){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={name: title };
    invocation.open('POST', 'http://localhost:3030', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);
    		  //  console.log(response);
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
* Cette fonction permet de récupérer un tag connaissant son id
*/
exports.getATag=function(id){
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/'+id
    , false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

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

/**
* Cette fonction permet de supprimer un tag connaissant son id
*/
 exports.deleteATag=function(id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('DELETE', 'http://localhost:3030/'+id, true);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

    		  //  console.log(response);
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

/**
* Cette fonction permet de renommer un tag connaissant son id
*/
exports.updateTag=function(id,title){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={"name": title };
    invocation.open('PUT', 'http://localhost:3030/'+id, true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags= JSON.parse(invocation.responseText);

    		  //  console.log(response);
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
