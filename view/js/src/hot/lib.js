const showdown  			= require('showdown');
const plugins 				= require("./../plugins/plugins.js");
const config 				= require('./../../../../config.json');

var Converter 				= new showdown.Converter();
var MAX_POST_PER_PAGE 		= config.MAX_POST_PER_PAGE;
var feed 					= document.getElementById("feed");

exports.appendPostsToFeed = function(data){
	for(var i = 0; i < MAX_POST_PER_PAGE; i++){

		var author			= data[i].author;
		var timestamp		= Date.parse(data[i].created);
		var permlink		= data[i].permlink
		var json_metadata 	= JSON.parse(data[i].json_metadata);
		var tag1 			= json_metadata.tags[0];
		var tag2 			= json_metadata.tags[1];
		var url 			= data[i].url;
		var title 			= data[i].title;
			title 			= title.slice(0, 30) + "...";
		var body 			= data[i].body;
		var leafts 			= data[i].active_votes.length; 

		var image;
		if(json_metadata.image == undefined){
			image = "images/NoImage.png";
		}
		else{
			image = json_metadata.image[0];
		}

		plugins.convertMarkdown2HTML_and_clean(body, function(out){
			html_body 				= out.slice(0, 144) + "..."		
			var currentTime 		= Date.now()
			var relativeTime 		= plugins.timeDifference(currentTime, timestamp);
			
			var article 			= document.createElement('article');
				article.innerHTML	= '<div class="entry__thumb"><a href="/@'+author+'/'+permlink+'" class="entry__thumb-link"><img style="width: 360px; height: 320px;" src="'+image+'" alt=""></a></div><div class="entry__text"><div class="entry__header"><div class="entry__date"><a href="/@'+author+'/'+permlink+'">'+relativeTime+'</a></div><h1 class="entry__title"><a href="/@'+author+'/'+permlink+'">'+title+'</a></h1></div><div class="entry__excerpt"><span>'+html_body+'</span></div><div class="entry__meta"><span class="entry__meta-links"><a href="/trending/INSERT_ARTICLE_FIRST_TAG">'+tag1+'</a><a href="/trending/INSERT_ARTICLE_SECOND_TAG">'+tag2+'</a></span></div></div>'
				article.setAttribute('class', 'masonry__brick entry format-standard');
				article.setAttribute('data-aos', 'fade-up');
			feed.appendChild(article);	
		});
	}
}