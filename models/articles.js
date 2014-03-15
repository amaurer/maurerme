

function articles(){
	this.path = require("path");
	this.fs = require("fs");
	this.markdown = require("markdown").markdown;
	this.articleDir = this.path.join(__dirname, "../articles/");
	this.tags = null;
	this.articles = null;
};


articles.prototype.init = function(mymvc) {
	this.loadArticles();
};


articles.prototype.loadArticles = function() {
	var self = this;
	self.articles = {};
	self.fs.readdir(self.articleDir, function(e, dirs) {
		if(e){
			throw e;
		};
		var i, path, stat;
		for (i = dirs.length - 1; i >= 0; i--) {
			// Setup
			path = self.path.join(self.articleDir, dirs[i]);
			stat = self.fs.statSync(path);
			// Filter anything not a directory
			if(stat.isFile()) continue;
			// Pass to decorator
			self.contentObjectDecorator(dirs[i], path)
		};
		// Have to load tags here because the readdir is async
		self.loadTags();
	});
};


articles.prototype.contentObjectDecorator = function(name, path) {
	var matchResult = null;
	this.articles[name] = JSON.parse(
		this.fs.readFileSync(path + "/meta.json")
	);
	this.articles[name].content = this.markdown.toHTML(
		this.fs.readFileSync(path + "/content.md").toString()
	);
	this.articles[name].displayDate = [name.substr(4,2), name.substr(6,2), name.substr(0,4)].join("/");
	matchResult = this.articles[name].content.match(/src\s*=\s*"(.+?)"/);
	this.articles[name].image = (matchResult != null)? matchResult[0] : null;
};


articles.prototype.loadTags = function() {
	var results = {}, n, i, x;
	for(n in this.articles){
		if(this.articles[n].tags == null) continue;
		for (i = this.articles[n].tags.length - 1; i >= 0; i--) {
			x = this.articles[n].tags[i].toLowerCase();
			if(results[x] == null){
				results[x] = 0;
			};
			results[x]++;
		};
	};
	this.tags = results;
};


articles.prototype.getArticles = function() {
	return this.articles;
};


articles.prototype.getArticleByID = function(articleID) {
	if(this.articles[articleID] == null){
		return null;
	};
	return this.articles[articleID];
};


module.exports = new articles();