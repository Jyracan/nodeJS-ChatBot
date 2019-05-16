class chatroom{
/**
* Permet de créer une tâche
* @constructor
*/
  constructor(id,conv) {
  this.id=id;
  this.conv=conv;
}

getId() {
  return this.id;
}
getConv() {
  return this.conv;
}

setId(id) {
  this.id=id;
}

setConv(name) {
  this.conv=name;
}



}

module.exports=chatroom;
