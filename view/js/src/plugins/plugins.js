const showdown  	= require('showdown');
var converter 		= new showdown.Converter();
var xssFilters 		= require('xss-filters');


exports.convertMarkdown2HTML_and_clean = function(data, out){
	var html_body 		= converter.makeHtml(data);
		html_body 		= html_body.replace(/<img[^>]*>/g,"");
		html_body 		= html_body.replace(/<div[^>]*>/g,"");
		html_body 		= html_body.replace(/<h1[^>]*>/g,"");
		html_body 		= html_body.replace(/<h2[^>]*>/g,"");
		html_body 		= html_body.replace(/<h3[^>]*>/g,"");
		html_body 		= html_body.replace(/<h4[^>]*>/g,"");
		html_body 		= html_body.replace(/<b[^>]*>/g,"");
		html_body 		= html_body.replace(/<i[^>]*>/g,"");
		html_body 		= html_body.replace(/<iframe[^>]*>/g,"");
		html_body 		= html_body.replace(/<a[^>]*>/g,"");
		html_body 		= html_body.replace(/<a href[^>]*>/g,"");
		html_body 		= html_body.replace(/<p[^>]*>/g,"");
		html_body 		= html_body.replace(/<[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/div[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/h1[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/h2[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/h3[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/h4[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/b[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/i[^>]*>/g,"");
		html_body 		= html_body.replace(/<\/p[^>]*>/g,"");
		html_body 		= xssFilters.inHTMLData(html_body);
	out(html_body);
}

exports.timeDifference = function(current, previous) {

    var msPerMinute 	= 60 * 1000;
    var msPerHour 		= msPerMinute * 60;
    var msPerDay 		= msPerHour * 24;
    var msPerMonth 		= msPerDay * 30;
    var msPerYear 		= msPerDay * 365;
    var elapsed 		= current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

exports.showConsoleWarning = function(){
	console.log("Welcome To Leafter ! \n" +
				"WARNING : If you are not a developper, or somebody brought you here to insert some code," +
				"please close this tab immediatly and report this user to us. Your account and your funds may be at risk.");
}