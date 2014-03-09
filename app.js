/**
 * Module dependencies.
 */

var express = require("express");
var path = require("path");
var mymvc = require("mymvc");
var exphbs  = require("express3-handlebars");

var app = express();
	app.set("port", process.env.PORT || 8000);
	app.set("views", path.join(__dirname, "views"));
	app.engine("handlebars", exphbs({
		 defaultLayout: "main"
		,layoutsDir: path.join(__dirname, "/views/layouts")
		,partialsDir: path.join(__dirname, "/views/partials")
	}));
	app.set("view engine", "handlebars");
	//app.use(express.favicon());
	app.use(express.logger("dev"));
	//app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, "public")));

// development only
if ("development" == app.get("env")) {
	app.use(express.errorHandler());
	/*
	var app2 = express();
		app2.set("port", 3000);
		app2.use(app2.router);
		app2.use(express.static(path.join(__dirname, "template-orig/Producr_HTML")));
	app2.listen(app2.get("port"), function(){
	  console.log("Express server listening on port " + app2.get("port"));
	});
	*/
};

mymvc.init([app]);

app.listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port"));
});