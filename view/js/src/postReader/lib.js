const leaf 			= require("steem");
const showdown  	= require('showdown');
const plugins 		= require("./../plugins/plugins.js");
const xss 			= require("xss");
var converter 		= new showdown.Converter();

var feed 			= document.getElementById("feed");
var commentsSection = document.getElementById("commentsSection");

exports.appendPost = function(author, permlink){
	leaf.api.getContent(author, permlink, function(err, result) {
		leaf.api.getAccounts([author], function(error, res){
			var authorProfilPicture;
			var authorDescription;
			if(res[0].json_metadata.length){
				var json_metadata2 	= JSON.parse(res[0].json_metadata);
				authorProfilPicture = json_metadata2.profile.profile_image;
				authorDescription 	= json_metadata2.profile.about;
			}
			else{
				authorProfilPicture = "images/NoImage.png";
				authorDescription 	= "No description."
			}		
			var timestamp 			= Date.parse(result.created);
			var json_metadata 		= JSON.parse(result.json_metadata);
			var tag1 				= json_metadata.tags[0];
			var tag2 				= json_metadata.tags[1];
			var tag3 				= json_metadata.tags[2];
			var tag4 				= json_metadata.tags[3];
			var tag5 				= json_metadata.tags[4];
			var title 				= result.title;
			var body 				= result.body;
			var currentTime 		= Date.now()
			var relativeTime 		= plugins.timeDifference(currentTime, timestamp);

			var html_body 			= converter.makeHtml(body);
                html_body 			= xss(html_body)

			var article 			= document.createElement('article');	
				article.innerHTML 	= '<div class="s-content__header col-full"><h1 class="s-content__header-title">'+title+'</h1><ul class="s-content__header-meta"><li class="date">'+relativeTime+'</li><li class="cat">In <a href="#0">'+tag1+'</a><a href="#0">'+tag2+'</a></li></ul></div> <!-- end s-content__header --><div class="s-content__media col-full">'+html_body+'</div> <!-- end s-content__media --><div id="postContent" class="col-full s-content__main"><p class="s-content__tags"><span>Post Tags</span><span class="s-content__tag-list"><a href="/trending/'+tag1+'">'+tag1+'</a><a href="/trending/'+tag2+'">'+tag2+'</a><a href="/trending/'+tag3+'">'+tag3+'</a><a href="/trending/'+tag4+'">'+tag4+'</a><a href="/trending/'+tag5+'">'+tag5+'</a></span></p> <!-- end s-content__tags --><div class="s-content__author"><img style="width: 50px;height:50px; border-radius:50px;" src="'+authorProfilPicture+'" alt=""><div class="s-content__author-about"><h4 class="s-content__author-name"><a href="#0">'+author+'</a></h4><p>'+authorDescription+'</p></div></div></div> <!-- end s-content__main -->'
				article.setAttribute('class', 'row format-standard"');
			feed.appendChild(article);

		});	
	});
}

exports.appendComments = function(author, permlink){
    leaf.api.getContentReplies(author, permlink, function(err, result) {
        for(var i = 0; i < result.length; i++){            
            var replier 			= result[i].author;
            var timestamp 			= Date.parse(result[i].created);
            var body 				= result[i].body;
            var replyPermlink 		= result[i].permlink;
            var children 			= result[i].children;
            var currentTime 		= Date.now();
            var relativeTime 		= plugins.timeDifference(currentTime, timestamp);

            var html_body 			= converter.makeHtml(body);
            html_body 				= xss(html_body);
            

            var authorProfilPicture = "http://localhost:4000/u/@kingswisdom/profilePic";
            var comment 			= document.createElement('li');
            	comment.innerHTML 	= '<div class="comment__avatar"><img width="50" height="50" class="avatar" src="'+authorProfilPicture+'" alt=""></div><div class="comment__content"><div class="comment__info"><cite>'+replier+'</cite><div class="comment__meta"><time class="comment__time">'+relativeTime+'</time><a class="reply" href="#0">Reply</a></div></div><div class="comment__text"><p>'+html_body+'</p></div></div>';
            	comment.setAttribute('class', 'depth-1 comment');
            	comment.setAttribute('id', replyPermlink);
            commentsSection.appendChild(comment);
            if(result[i].children != 0){
                leaf.api.getContentReplies(replier, replyPermlink, function(err, result) {
			        for(var i = 0; i < result.length; i++){            
			            var replier 		= result[i].author;
				        var timestamp 		= Date.parse(result[i].created);
				        var body 			= result[i].body;
				        var replyPermlink 	= result[i].permlink;
				        var children 		= result[i].children;
				        var currentTime 	= Date.now();
				        var relativeTime 	= plugins.timeDifference(currentTime, timestamp);

				        var html_body 		= converter.makeHtml(body);
				        html_body 			= xss(html_body);

				        var authorProfilPicture = "http://localhost:4000/u/@kingswisdom/profilePic";

				        var comment = document.createElement('li');
				            comment.setAttribute('class', 'depth-2 comment');
				            comment.setAttribute('id', replyPermlink);
				            comment.innerHTML = '<div class="comment__avatar"><img width="50" height="50" class="avatar" src="'+authorProfilPicture+'" alt=""></div><div class="comment__content"><div class="comment__info"><cite>'+replier+'</cite><div class="comment__meta"><time class="comment__time">'+relativeTime+'</time><a class="reply" href="#0">Reply</a></div></div><div class="comment__text"><p>'+html_body+'</p></div></div>';
				            commentsSection.appendChild(comment);
			        }
			    });
            }
        }
    });
}