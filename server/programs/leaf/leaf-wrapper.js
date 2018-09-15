const leaf 		= require("steem");
const config 		= require('./../../../config.json');

var owner 		= config.leafter.owner;
var owner_wif 		= config.leafter.keys.owner.private;
var fee			= config.accountCreationParams.fee;
var delegation 		= config.accountCreationParams.delegation;
var jsonMetadata 	= config.accountCreationParams.jsonMetadata;
var extensions		= config.accountCreationParams.extensions;

exports.createAccount = function(data){

    var account = data.account;    
    var memo 	= { weight_threshold: 1, account_auths: [], key_auths: [[data.memo, 1]] };
    var owner 	= { weight_threshold: 1, account_auths: [], key_auths: [[data.owner, 1]] };
    var active 	= { weight_threshold: 1, account_auths: [], key_auths: [[data.active, 1]] };
    var posting = { weight_threshold: 1, account_auths: [], key_auths: [[data.posting, 1]] };    

    leaf.broadcast.accountCreateWithDelegation(owner_wif, fee, delegation, owner_account, new_account, owner, active, posting, publicKeys.memo, jsonMetadata, extensions, function(err, result) { console.log(err, result); });

}
