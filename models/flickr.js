

function flickr(){
	var path = require("path");
	this.Flickr = require("flickrapi");
    this.data = this.Flickr.loadLocally(path.join(__dirname, "../flickrdata/"));
    return this;
};


flickr.prototype.init = function(mymvc, app) {
	
};


flickr.prototype.getSets = function() {
	return this.data.photosets;
};


flickr.prototype.getAllPhotos = function() {
	return this.data.photos;
};


flickr.prototype.getSetsByTitle = function(titleArray) {
	var n, x, results = {}, ta = titleArray || [];
	for(n in this.data.photosets){
		x = this.data.photosets[n];
		if(ta.indexOf(x.title._content) !== -1){
			results[n] = x;
		};
	};
	return results;
};


flickr.prototype.flattenSetsToPhotos = function(photoSets) {
	var n, x, i, results = {}, ps = photoSets || {};
	for(n in ps){
		for (i = ps[n].photos.length - 1; i >= 0; i--) {
			x = ps[n].photos[i];
			results[x] = this.data.photos[x];
		};
	};
	return results;
};



module.exports = new flickr();