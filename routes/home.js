

function home(){
};


home.prototype.init = function(mymvc, app) {

	app.get("/", function(req, res){
		res.render("home", {
			projectPost : [{
				 img : "test.jpg"
				,imgAlt : "test"
				,title : "test"
				,desc : "test"
			}]
		});
	});

	app.use(function(req, res){
		res.status(404);
		res.render("404", {
			pageTitle : "404 Error"
		});
	});

};



module.exports = new home();