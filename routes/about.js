

function about(){
};


about.prototype.init = function(mymvc, app) {

	app.get("/about/", function(req, res){
		res.render("about", {
			title : "About Andrew Maurer in Cleveland"
		});
	});

};



module.exports = new about();