const leaf 		= require("steem");
const lib 		= require("./lib.js");

var MAX_POPULAR_POSTS = 6;

var query = {"limit": MAX_POPULAR_POSTS, "truncate_body": 10};


leaf.api.getDiscussionsByHot(query, function(err, result) {
	lib.appendPopularPosts(result);
});


