const leaf 		= require("steem");
const lib 		= require("./lib.js");
const plugins 	= require("./../plugins/plugins.js");

var query = {"limit":100,"truncate_body":500};

plugins.showConsoleWarning();

leaf.api.getDiscussionsByTrending(query, function(err, result) {
	var featuring_post_1 = result[0];
	var featuring_post_2 = result[1];
	var featuring_post_3 = result[2];

	lib.appendFeaturingPost_Big(featuring_post_1, function(out1){
		if(out1.status == "done"){
			lib.appendFeaturingPost_Small(featuring_post_2, function(out2){
				if(out2.status == "done"){
					lib.appendFeaturingPost_Small(featuring_post_3, function(out3){
						if(out3.status == "done"){
							lib.appendTrendingPostsToFeed(result);
						}
					});
				}
			});
		}		
	});		
});

