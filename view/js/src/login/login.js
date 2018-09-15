const lib = require('./lib.js');
const io = require('socket.io-client');
const UI = require('./UI.js');
var socket = io.connect();

var REGISTER_options = {};
var communicationKeys;

lib.generateCommunicationKeys(function(out){	communicationKeys = out; });

var element = function(id){	return document.getElementById(id);	}

var REGISTER_username 						= element("REGISTER_username");
var REGISTER_phone							= element("REGISTER_phone");
var REGISTER_validation_button 				= element("REGISTER_validation_button");
var REGISTER_2fa 							= element("REGISTER_2fa");
var REGISTER_verify_2fa_button				= element("REGISTER_verify_2fa_button");
var GeneratedMasterPassword					= element("GeneratedMasterPassword");
var check1									= element("check1");
var check2									= element("check2");
var REGISTER_agree_on_password_policy		= element("REGISTER_agree_on_password_policy");	
var REGISTER_Password_Checkout				= element("REGISTER_Password_Checkout");
var REGISTER_verify_Password_Checkout		= element("REGISTER_verify_Password_Checkout");

if(socket !== undefined){ //If client/server connection is live*/

	socket.on('safeSocket', function(data){
        lib.decodeSafeSocket(data, communicationKeys.private, function(out){
            if(out.request != undefined){
                switch(out.request) {
                    case "already used":
                        return UI.handleNumberAlreadyUsed();

                    case "phone error":
                        return UI.handlePhoneNumberError();

                    case "first step success":
                        return secondStepRegistration(socket);

                    case "account created":
                        return UI.success();

                    case "retry":
                        return UI.handleRetry();

                    case "operation abort":
                        return UI.handleAbort();
                }
            }
        });
    });		

	REGISTER_validation_button.addEventListener("click",function() {
		return register({
							username: REGISTER_username.value, 
							country_code: REGISTER_country_code.value, 
							phone_number: REGISTER_phone.value
						});
	});

	REGISTER_verify_2fa_button.addEventListener("click", function(){
		return verify({
						username: REGISTER_options.username, 
						country_code: REGISTER_options.country_code, 
						phone_number: REGISTER_options.phone_number, 
						verification_code: REGISTER_2fa.value
					})
	});

	if(check1.checked == true && check2.checked == true){
		UI.showAgreeButton();
	}

	REGISTER_agree_on_password_policy.addEventListener("click", function(){
		UI.showCheckout();
	});

	REGISTER_verify_Password_Checkout.addEventListener("click", function(){
		lib.generateNewWallet(REGISTER_Password_Checkout.value, REGISTER_options.username, function(out){
			var container = {};
			container.method = "finalize account";
			container.account = REGISTER_options.username;
			container.owner = out.owner.public;
			container.active = out.active.public;
			container.posting = out.posting.public;
			container.memo = out.memo.public;
		sendSocket(container, socket);
		});
	});


	function register(data){
		REGISTER_options.username 		= data.username;
		REGISTER_options.country_code 	= data.country_code;
		REGISTER_options.phone_number 	= data.phone_number;

		var container 					= {};
			container.method 			= "register";
			container.account 			= data.username;
			container.country_code 		= data.country_code;
			container.phone_number 		= data.phone_number;
			container.communicationKey 	= communicationKeys.public;

		sendSocket(container, socket);

		UI.showVerifyForm();
	}

	function verify(data){

		var container = {};
			container.method = "verify";
			container.account = data.username;
			container.country_code = data.country_code;
			container.phone_number = data.phone_number;
			container.verification_code = data.verification_code;
		sendSocket(container, socket);			
	}

	function secondStepRegistration(){
		UI.showPasswordPolicy();
		lib.generateNewMasterPassword(function(out){
			GeneratedMasterPassword.innerHTML = out;
		});
	}

	

	function sendSocket(container, socket){
		lib.encodeSafeSocket(container, function(out){
			socket.emit("safeSocket", out);
		});	
	}
}



