

function articles(){
};


articles.prototype.init = function(mymvc, app) {

	app.get("/articles/", function(req, res){
		res.render("articles", {
			title : "Articles from Andrew Maurer in Cleveland on Node.js, JavaScript, ColdFusion, Apache JMeter and other fun stuff."
		});
	});

	app.get("/articles/:wholedate/:inc/:title", function(req, res, next){
		// Read articles by id [wholedate+inc]
		if(article.length === 0){
			next();
			return;
		};
		res.render("article-details", {
			articleData : true
		});
	});

};



module.exports = new articles();