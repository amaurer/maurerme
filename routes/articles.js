

function articles(){
};


articles.prototype.init = function(mymvc, app) {

	app.get("/articles/", function(req, res){
		res.render("articles", {
			 title : "Articles from Andrew Maurer in Cleveland on Node.js, JavaScript, ColdFusion, Apache JMeter and other fun stuff."
			,articles : mymvc.models.articles.getArticles()
		});
	});

	app.get("/articles/:urlID/:title/", function(req, res, next){
		var article = mymvc.models.articles.getArticleByID(req.params.urlID);
		if(article == null){
			next();
			return;
		};
		res.render("article", {
			articleData : article
		});
	});

};



module.exports = new articles();