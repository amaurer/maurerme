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
	app.use(express.favicon(path.join(__dirname, "/public/images/favicon.ico"))); 
	//app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, "public")));
	app.use("/articles", express.static(path.join(__dirname, "articles")));

// development only
if ("development" == app.get("env")) {
	app.use(express.errorHandler());
	app.use(express.logger("dev"));
	var app2 = express();
		app2.set("port", 3000);
		app2.use(app2.router);
		app2.use(express.static(path.join(__dirname, "template-orig")));
		app2.listen(app2.get("port"), function(){
		  console.log("Express server2 listening on port " + app2.get("port"));
		});
	/*
	var fs = require("fs");
	var customSettings = JSON.parse(fs.readFileSync("./customSettings.json"));
	var Flickr = require("flickrapi");
	var flickrOptions = {
		api_key: customSettings.flickr.apiKey,
		secret: customSettings.flickr.secretKey
	};
	Flickr.authenticate(flickrOptions, Flickr.downsync(path.join(__dirname, "/flickrdata/")));
	*/
};

mymvc.init([app]);

app.listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port"));
});