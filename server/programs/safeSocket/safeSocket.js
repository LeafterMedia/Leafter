const leaf = require('steem');
const config = require('../../../config.json');

var PrivateKey = config.SafeSocket.register.PrivateKey;

exports.decodeSafeSocket = function(data, out){
	rawContainer = leaf.memo.decode(PrivateKey, data);
	raw = rawContainer.split("");
	raw.shift();
	raw = raw.join("");
	var decodedContainer = JSON.parse(raw);
	out(decodedContainer);
}

exports.encodeSafeSocket = function(recipient, data, out){	
    var Container = "#" + JSON.stringify(data);
    var encodedContainer = leaf.memo.encode(PrivateKey, recipient, Container);
    out(encodedContainer);		
}