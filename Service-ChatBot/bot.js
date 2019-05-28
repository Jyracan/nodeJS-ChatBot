const RiveScript = require('rivescript')
const express = require('express')
const bodyParser = require('body-parser');
const kill =require('kill-port');

class robot { 	
	constructor(name, personality, port){
		this.name = name;
		this.port = port;
		this.personality=personality;
		this.bot = new RiveScript();
		this.bot.loadFile("./brain/"+personality+".rive").then(this.success_handler.bind(this)).catch(this.error_handler);
		this.app = express();

		this.changePersonality = function (newPersonality) {
			this.bot = new RiveScript();
			kill(this.port,'tcp').then(console.log).catch(console.log);
			this.personality = newPersonality;
			this.bot.loadFile('./brain/'+newPersonality+'.rive').then(this.success_handler.bind(this)).catch(this.error_handler);
		}

		this.changeName = function(newName){
			this.name = newName;
			this.bot.setVariable ("name", newName)
		}

		this.delete = function(){
			console.log(port)
			//kill(this.port,'tcp').then(console.log).catch(console.log);
			this.name = null;
			this.port = null;
			this.personality = null;
			this.bot = null;
			this.app = null;
		}

		this.toString = function(){
			return {
				name : this.name,
				personality : this.personality,
				port : this.port
			}
		}

		this.getName = function(){
			return this.name;
		}
	}

	// Send a JSON error to the browser.
	error(res, message) {
		res.json({
			"status": "error",
			"message": message
		});
	}
	success_handler() {
		console.log("Brain loaded!");
		this.bot.sortReplies();
		var bot = this.bot;

		function getReply(req, res) {
			console.log('Soliciting an answer !');
			// Get data from the JSON post.
			var username = req.body.username;
			var message  = req.body.message;
			var vars     = req.body.vars;
			console.log('\tFrom : ' + username + '\n\tMessage : ' + message +'\n\tVars  ' +vars);
			// Make sure username and message are included.
			if (typeof(username) === "undefined" || typeof(message) === "undefined") {
				return error(res, "username and message are required keys");
			}
			// Copy any user vars from the post into RiveScript.
			if (typeof(vars) !== "undefined") {
				for (var key in vars) {
					if (vars.hasOwnProperty(key)) {
						bot.setUservar(username, key, vars[key]);
					}
				}
			}

			// Get a reply from the bot.
			bot.reply(username, message, this).then(function(reply) {
				// Get all the user's vars back out of the bot to include in the response.
				vars = bot.getUservars(username);

				// Send the JSON response.
				res.json({
					"status": "ok",
					"reply": reply,
					"vars": vars
				});
			}).catch(function(err) {
				res.json({
					"status": "error",
					"error": err
				});
			});
		}


		// Parse application/json inputs.
		this.app.use(bodyParser.json());
		this.app.set("json spaces", 4);

		// Set up routes.
		this.app.post("/reply", getReply);
		this.app.get("/", this.showUsage);
		this.app.get("*", this.showUsage);

		// Start listening.
		this.app.listen(this.port, function() {
			console.log("The bot is listening (normaly ...)");
		});
	}

	error_handler (loadcount, err) {
			console.log("Error loading batch #" + loadcount + ": " + err + "\n");
	}

	// All other routes shows the usage to test the /reply route.
	showUsage(req, res) {
		var egPayload = {
			"username": "soandso",
			"message": "Hello bot",
			"vars": {
				"name": "Soandso"
			}
		};
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write("Usage: curl -i \\\n");
		res.write("   -H \"Content-Type: application/json\" \\\n");
		res.write("   -X POST -d '" + JSON.stringify(egPayload) + "' \\\n");
		res.write("   http://localhost:2001/reply");
		res.end();
	}
}

module.exports=robot;