const express = require('express')
const bodyParser=require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Create
app.post('/:id', function(req,res){

})
// Read
app.get('/:id', function(req, res){

})
// Update
app.put('/:id', function(req, res){

})
// Delete
app.delete('/:id', function(req, res){

}) 

app.listen(port, () => console.log(`Web service running on : http://localhost:${port}`))