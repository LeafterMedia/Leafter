const leaf 		= require("steem");
const lib 		= require("./lib.js");
const plugins 	= require("./../plugins/plugins.js");

var url 		= window.location.href.split("/");
var author 		= url[3];
var raw 		= author.split("");
	raw.shift();
	author 		= raw.join("");
var permlink 	= url[4];

plugins.showConsoleWarning();
lib.appendPost(author, permlink);
lib.appendComments(author, permlink);

