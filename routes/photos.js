
function photos(){
};


photos.prototype.init = function(mymvc, app) {

	app.get("/photos/", function(req, res){
		res.render("photos", {
			title : "Photos from Andrew Maurer around Cleveland and beyond.",
			photoSets : mymvc.models.flickr.getSetsByTitle(["Christmas 2010", "Angela"], true)
		});
	});

	app.get("/photos/:setID/:setTitle/", function(req, res){
		res.render("photo-set", {
			title : "Photos from Andrew Maurer around Cleveland and beyond.",
			flickrSet : mymvc.models.flickr.getSets(req.params.setID)
		});
	});

};


module.exports = new photos();