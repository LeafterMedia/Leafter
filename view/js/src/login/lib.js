const leaf = require('steem');
const config = require('./../../../../config.json');
const libcrypto = require('@steemit/libcrypto');

var LeafterPubWif = config.SafeSocket.register.PublicKey;


exports.decodeSafeSocket = function(data, key, out){
	rawContainer = leaf.memo.decode(key, data);
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

exports.generateCommunicationKeys = function(out){
	var uniqueKeys = libcrypto.generateKeys();
    out(uniqueKeys)
}

exports.generateNewWallet = function(password, username, out){
	var newWallet = libcrypto.keysFromPassword(username, password);
	out(newWallet);
}

exports.generateNewMasterPassword = function(out){
	var newKeys = libcrypto.generateKeys();
	var ope1 = newKeys.private.split("");
	var ope2 = ope1.slice(2,51);
	var ope3 = ope2.join("");
	out(ope3);
}