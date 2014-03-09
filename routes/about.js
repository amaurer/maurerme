

function about(){
};


about.prototype.init = function(mymvc, app) {

	app.get("/about/", function(req, res){
		res.render("about");
	});

};



module.exports = new about();