

function photos(){
};


photos.prototype.init = function(mymvc, app) {

	app.get("/photos/", function(req, res){
		res.render("photos", {
			title : "Photos from Andrew Maurer around Cleveland."
		});
	});

};

photos.prototype.test = function() {


};



module.exports = new photos();