var element = function(id){	return document.getElementById(id);	}

var REGISTER_Error_Already_Used				= element("REGISTER_Error_Already_Used");
var REGISTER_Error_Phone_Number				= element("REGISTER_Error_Phone_Number");
var REGISTER_Error_Abort					= element("REGISTER_Error_Abort");
var REGISTER_form							= element("REGISTER_form");
var REGISTER_Verify_form					= element("REGISTER_Verify_form");
var REGISTER_Password_Policy				= element("REGISTER_Password_Policy");
var REGISTER_Checkout						= element("REGISTER_Checkout");
var REGISTER_Success						= element("REGISTER_Success");
var retry_status							= element("retry_status");
var REGISTER_agree_on_password_policy		= element("REGISTER_agree_on_password_policy");




exports.success = function(){
	REGISTER_Checkout.style.display = "none";
	REGISTER_Success.style.display = "block";
}

exports.handleRetry = function(){
	retry_status.innerHTML = "Wrong validation code. Please retry.";
	setTimeout(function(){ 
		retry_status.innerHTML = "";
	}, 5000);
}

exports.handleAbort = function(){
	REGISTER_Verify_form.style.display = "none";
	REGISTER_Error_Abort.style.display = "block";
}

exports.showCheckout = function(){
	REGISTER_agree_on_password_policy.style.display = "none";
	REGISTER_Checkout.style.display = "block";
}

exports.showAgreeButton = function(){
	REGISTER_agree_on_password_policy.style.display = "block";
}

exports.showVerifyForm = function(){
	REGISTER_form.style.display 		= "none";
	REGISTER_Verify_form.style.display 	= "block";
}

exports.showPasswordPolicy = function(){
	REGISTER_Verify_form.style.display = "none";
	REGISTER_Password_Policy.style.display = "block";
}

exports.handlePhoneNumberError = function(){			
	REGISTER_form.style.display = "none";
	REGISTER_Error_Phone_Number.style.display = "block";
}

exports.handleNumberAlreadyUsed = function(){
	REGISTER_form.style.display = "none";
	REGISTER_Error_Already_Used.style.display = "block";
}
