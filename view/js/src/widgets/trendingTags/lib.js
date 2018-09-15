var TrendingTags = document.getElementById("TrendingTags");

exports.appendTrendingTags = function(data){
	for(var i = 1; i < data.length; i++){
		var name 			= data[i].name;
		var tag 			= document.createElement('a');		
			tag.innerHTML 	= name;
			tag.setAttribute('href', '/trending/'+ name);
		TrendingTags.appendChild(tag);		
	}
}