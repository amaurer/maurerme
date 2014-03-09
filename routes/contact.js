

function contact(){
};


contact.prototype.init = function(mymvc, app) {

	app.get("/contact/", function(req, res){
		res.render("contact");
	});

};

/*

var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport("Direct", {debug: true});
	transport.sendMail({
		 from : "andrew@maurer.me"
		,to : "andrew@maurer.me"
		,subject : "testing"
		,text : "hi"
	}, function(){
		console.log(arguments);
	});


*/

module.exports = new contact();