

function flickr(){
	this.path = require("path");
	this.Flickr = require("flickrapi");
    this.data = this.Flickr.loadLocally(this.path.join(__dirname, "../flickrdata/"));
    this.moment = require("moment");
    this.decorateData();
};


flickr.prototype.init = function(mymvc, app) {
	
};


flickr.prototype.decorateData = function() {
	var x, n, i;
	for(n in this.data.photosets){
		x = this.data.photosets[n];
		x.displayDate = this.moment(x.date_create * 1000).format("L");
		// Join photo data to set
		for (i = x.photos.length - 1; i >= 0; i--) {
			x.photos[i] = this.data.photos[x.photos[i]];
		};
	};
};


flickr.prototype.getSets = function(setID) {
	if(setID != null){
		return this.data.photosets[setID];
	};
	return this.data.photosets;
};


flickr.prototype.getAllPhotos = function() {
	return this.data.photos;
};


flickr.prototype.getSetsByTitle = function(titleArray, blackListBoolean) {
	var n, x, results = {}, ta = titleArray || [];
	for(n in this.data.photosets){
		x = this.data.photosets[n];
		if(blackListBoolean === true){
			if(ta.indexOf(x.title._content) === -1){
				results[n] = x;
			};
		} else {
			if(ta.indexOf(x.title._content) !== -1){
				results[n] = x;
			};
		}
	};
	return results;
};


flickr.prototype.flattenSetsToPhotos = function(photoSets) {
	var n, x, i, results = {}, ps = photoSets || {}, resultsArray = [];
	for(n in ps){
		for (i = ps[n].photos.length - 1; i >= 0; i--) {
			x = ps[n].photos[i].id;
			results[x] = this.data.photos[x];
		};
	};
	for(n in results){
		resultsArray.push(results[n]);
	};
	return resultsArray;
};



module.exports = new flickr();