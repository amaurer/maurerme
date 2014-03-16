

function etc(){
};


etc.prototype.init = function(mymvc, app) {

	var self = this;

	app.get("/robots.txt", function(req, res){
		res.send(200, "");
	});

	app.get("/sitemap.xml", function(req, res){
		res.send(200, "");
	});

	app.use(function(req, res){
		res.status(404);
		res.render("404", {
			pageTitle : "404 Error"
		});
	});


};



module.exports = new etc();