

function articles(){
};


articles.prototype.init = function(mymvc, app) {

	app.get("/articles/", function(req, res){
		res.render("articles");
	});

};



module.exports = new articles();