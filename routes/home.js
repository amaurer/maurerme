

function home(){
};


home.prototype.init = function(mymvc, app) {

	app.get("/", function(req, res){
		var flickrSets = mymvc.models.flickr.getSetsByTitle([
			 "Photography"
			,"Brecksville River"
			,"Ohio State Reformatory"
		]);
		res.render("home", {
			 title : "Andrew Maurer - Sr. Web Developer in Cleveland."
			,flickrCollection : mymvc.models.flickr.flattenSetsToPhotos(flickrSets)
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