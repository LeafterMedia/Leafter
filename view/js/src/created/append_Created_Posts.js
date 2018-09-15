const leaf 		= require("steem");
const lib 		= require("./lib.js");
const plugins 	= require("./../plugins/plugins.js");

plugins.showConsoleWarning();

var query = {"limit": 100,"truncate_body": 500};

leaf.api.getDiscussionsByCreated(query, function(err, result) {
	lib.appendPostsToFeed(result);	
});