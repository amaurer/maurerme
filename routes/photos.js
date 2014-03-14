
function photos(){
};


photos.prototype.init = function(mymvc, app) {

	app.get("/photos/", function(req, res){
		res.render("photos", {
			title : "Photos from Andrew Maurer around Cleveland."
		});
	});

};


module.exports = new photos();