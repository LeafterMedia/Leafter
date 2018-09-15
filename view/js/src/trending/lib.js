const leaf 			= require("steem");
const plugins 		= require("./../plugins/plugins.js");

var MAX_POST_PER_PAGE 	= 23;
var feed 				= document.getElementById("feed");
var featured 			= document.getElementById("featuredPosts");


exports.appendFeaturingPost_Big = function(data, output){
	leaf.api.getAccounts([data.author], function(error, res){
		var authorProfilPicture;
		if(res[0].json_metadata.length){
			var json_metadata2 	= JSON.parse(res[0].json_metadata);
			authorProfilPicture = json_metadata2.profile.profile_image;
		}
		else{
			authorProfilPicture = "../images/NoImage.png";
		}		
		var author 			= data.author;
		var timestamp 		= Date.parse(data.created);
		var permlink 		= data.permlink
		var json_metadata 	= JSON.parse(data.json_metadata);
		var tag1 			= json_metadata.tags[0];
		var tag2 			= json_metadata.tags[1];
		var url 			= data.url;
		var title 			= data.title;
			title 			= title.slice(0, 35) + "...";
		var body 			= data.body;
		var leafts 			= data.active_votes.length;
		var image;
		if(json_metadata.image == undefined){
			image = "../images/NoImage.png";
		}
		else{
			image = json_metadata.image[0];
		}
		//Markdown to html conversion//
		plugins.convertMarkdown2HTML_and_clean(body, function(out){
			var html_body 			= out.slice(0, 144) + "...";			
			var currentTime 		= Date.now();
			var relativeTime 		= plugins.timeDifference(currentTime, timestamp);
			var article 			= document.createElement('div');
				article.innerHTML 	= '<div class="entry" style="background-image:url('+image+');"><div class="entry__content"><span class="entry__category"><a href="/trending/'+tag1+'">'+tag1+'</a></span><h1><a href="/@'+author+'/'+permlink+'" title="">'+title+'</a></h1><div class="entry__info"><a href="#0" class="entry__profile-pic"><img class="avatar" src="'+authorProfilPicture+'" alt=""></a><ul class="entry__meta"><li><a href="#0">'+author+'</a></li><li>'+relativeTime+'</li></ul></div></div> <!-- end entry__content --></div> <!-- end entry -->'
				article.setAttribute('class', 'featured__column featured__column--big');
			featured.appendChild(article);
			output({status: "done"});	
		});
	});
}

exports.appendFeaturingPost_Small = function(data, output){
	leaf.api.getAccounts([data.author], function(error, res){
		var authorProfilPicture;
		if(res[0].json_metadata.length){
			var json_metadata2 	= JSON.parse(res[0].json_metadata);
			authorProfilPicture = json_metadata2.profile.profile_image;
		}
		else{
			authorProfilPicture = "../images/NoImage.png";
		}	
		var author 			= data.author;
		var timestamp 		= Date.parse(data.created);
		var permlink 		= data.permlink;
		var json_metadata 	= JSON.parse(data.json_metadata);
		var tag1 			= json_metadata.tags[0];
		var tag2 			= json_metadata.tags[1];
		var url 			= data.url;
		var title 			= data.title;
			title 			= title.slice(0, 30) + "...";
		var body 			= data.body;
		var leafts 			= data.active_votes.length;
		var image;
		if(json_metadata.image == undefined){
			image = "../images/NoImage.png";
		}
		else{
			image = json_metadata.image[0];
		}
		plugins.convertMarkdown2HTML_and_clean(body, function(out){			
			var currentTime 		= Date.now();
			var relativeTime 		= plugins.timeDifference(currentTime, timestamp);
			var html_body 			= out.slice(0, 144) + "...";
			var article 			= document.createElement('div');
				article.innerHTML 	= '<div class="entry" style="background-image:url('+image+');"><div class="entry__content"><span class="entry__category"><a href="/trending/'+tag1+'">'+tag1+'</a></span><h1><a href="/@'+author+'/'+permlink+'" title="">'+title+'</a></h1><div class="entry__info"><a href="#0" class="entry__profile-pic"><img class="avatar" src="'+authorProfilPicture+'" alt=""></a><ul class="entry__meta"><li><a href="#0">'+author+'</a></li><li>'+relativeTime+'</li></ul></div></div> <!-- end entry__content -->'
				article.setAttribute('class', 'featured__column featured__column--small');
			featured.appendChild(article);	
			output({status: "done"});
		});
	});
}

exports.appendTrendingPostsToFeed = function(data) {
	for(var i = 3; i < MAX_POST_PER_PAGE; i++){
		var author 			= data[i].author;
		var timestamp 		= Date.parse(data[i].created);
		var permlink 		= data[i].permlink
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
			image = "../images/NoImage.png";
		}
		else{
			image = json_metadata.image[0];
		}

		plugins.convertMarkdown2HTML_and_clean(body, function(out){
			var currentTime 		= Date.now()
			var relativeTime 		= plugins.timeDifference(currentTime, timestamp);
			var html_body 			= out.slice(0, 144) + "..."
			var article 			= document.createElement('article');	
				article.innerHTML 	= '<div class="entry__thumb"><a href="/@'+author+'/'+permlink+'" class="entry__thumb-link"><img style="width: 360px; height: 320px;" src="'+image+'" alt=""></a></div><div class="entry__text"><div class="entry__header"><div class="entry__date"><a href="/@'+author+'/'+permlink+'">'+relativeTime+'</a></div><h1 class="entry__title"><a href="/@'+author+'/'+permlink+'">'+title+'</a></h1></div><div class="entry__excerpt"><span>'+html_body+'</span></div><div class="entry__meta"><span class="entry__meta-links"><a href="/trending/INSERT_ARTICLE_FIRST_TAG">'+tag1+'</a><a href="/trending/INSERT_ARTICLE_SECOND_TAG">'+tag2+'</a></span></div></div>'
				article.setAttribute('class', 'masonry__brick entry format-standard');
				article.setAttribute('data-aos', 'fade-up');	
			feed.appendChild(article);
		});
	}
}