const leaf 				= require("steem");
const lib 				= require("./lib.js");
const MAX_TRENDING_TAGS = 11;

leaf.api.getTrendingTags(undefined, MAX_TRENDING_TAGS, function(err, result) {
	lib.appendTrendingTags(result);
});

