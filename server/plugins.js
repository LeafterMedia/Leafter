const leaf = require("steem");

exports.getProfilePicture = function(data, out){

	leaf.api.getAccounts([data], function(error, res){
		var json_metadata = JSON.parse(res[0].json_metadata);
		var image;
		if(json_metadata.profile.profile_image == undefined){
			image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
		}
		else{
			image = json_metadata.profile.profile_image;
		}
		out(image);
	});
    	
}