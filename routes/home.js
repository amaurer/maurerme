

function home(){
};


home.prototype.init = function(mymvc, app) {

	app.get("/", function(req, res){
		res.render("home");
	});

};



module.exports = new home();