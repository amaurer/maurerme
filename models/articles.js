

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
		for (var i = dirs.length - 1; i >= 0; i--) {
			self.articles[dirs[i]] = JSON.parse(
					self.fs.readFileSync(
						self.path.join(self.articleDir, dirs[i], "meta.json")
					)
			);
			self.articles[dirs[i]].content = self.markdown.toHTML(
				self.fs.readFileSync(
					self.path.join(self.articleDir, dirs[i], "content.md")
				).toString()
			);
			self.articles[dirs[i]].displayDate = [dirs[i].substr(4,2), dirs[i].substr(6,2), dirs[i].substr(0,4)].join("/") 
		};
		//Have to load tags here because the readdir is async
		self.loadTags();
	});
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