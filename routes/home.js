

function home(){
};


home.prototype.init = function(mymvc, app) {

	var self = this;

	app.get("/", function(req, res){
		res.render("home", {
			 title : "Andrew Maurer - Sr. Web Developer in Cleveland."
			,flickrCollection : mymvc.models.flickr.getSetsByTitle([
				 "Photography"
			])
		});
	});


};



module.exports = new home();