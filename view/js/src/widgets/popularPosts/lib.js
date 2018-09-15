const plugins 	= require("./../../plugins/plugins.js");

var mostViewed 	= document.getElementById("mostViewed");

exports.appendPopularPosts = function(data){
	for(var i = 0; i < data.length; i++){
		var author 			= data[i].author;
		var timestamp 		= Date.parse(data[i].created);
		var permlink 		= data[i].permlink;
		var json_metadata 	= JSON.parse(data[i].json_metadata);
		var title 			= data[i].title;
			title 			= title.slice(0, 30) + "...";

		var image;
		if(json_metadata.image == undefined){
			image = "images/NoImage.png";
		}
		else{
			image = json_metadata.image[0];
		}		
		var currentTime 		= Date.now();
		var relativeTime 		= plugins.timeDifference(currentTime, timestamp);
		var article 			= document.createElement('article');
			article.innerHTML 	= '<a href="#0" class="popular__thumb"><img src="'+image+'" alt=""></a><h5><a href="#0">'+title+'</a></h5><section class="popular__meta"><span class="popular__author"><span>By</span> <a href="#0"> '+author+'</a></span><span class="popular__date">'+relativeTime+'</span></section>';
			article.setAttribute('class', 'col-block popular__post');	
		mostViewed.appendChild(article);		
	}
}