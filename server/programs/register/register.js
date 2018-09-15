const server    = require("./../../serverlib.js")
const db        = require('./../db/db.js');
const leafOp    = require('./../leaf/leaf-wrapper');
const config    = require('./../../../config.json');
const request   = require('request');

var users           = {};
var phones_cooldown = {};

exports.handleRegister = function(data, socket){

    var socketID                        = socket.id;
    var api_key                         = config.twilio.api_key;
    var via                             = config.twilio.method;
    var country_code                    = data.country_code;
    var phone_number                    = data.phone_number;
    var account                         = data.account;
    users.socketID.communicationKey     = data.communicationKey;

    db.Register_Check_If_Phone_Already_Used(country_code, phone_number, function(result){
        if(result == true){
            sendStatus("already used", socket);            
        }
        else{ // If the phone number isn't already used
            var api_point = "https://api.authy.com/protected/json/phones/verification/start?";
            var query = api_point + 
                        "api_key="       + api_key      + 
                        "&via="          + via          + 
                        "&country_code=" + country_code + 
                        "&phone_number=" + phone_number;

            request.post(query, function (error, response, body) {
                if(body.success == true){
                    users.socketID.account      = account;
                    users.socketID.country_code = country_code;
                    users.socketID.phone_number = phone_number;
                    users.socketID.retries      = 0;
                    users.socketID.state        = false;
                }
                else{
                    sendStatus("phone error", socket);                    
                } 
            });
        }
    });
}

exports.handleVerify = function(data, socket){

    var socketID                = socket.id;
    var api_key                 = config.twilio.api_key;
    var country_code            = data.country_code;
    var phone_number            = users.socketID.phone_number;
    var verification_code       = data.phone_number;
    var account                 = data.account;

    if (users.socketID.country_code     == country_code && 
        users.socketID.phone_number     == phone_number && 
        users.socketID.account          == account &&
        users.socketID.retries          < 3 &&
        users.socketID.state            == false){      //If legit session

        if (phones_cooldown.phone_number                == undefined || 
            Date.now() - phones_cooldown.phone_number   >= 600000){     //If not cooled down

        var api_point = "https://api.authy.com/protected/json/phones/verification/check?";
        var query = api_point + 
                    "api_key="            + api_key      +
                    "&country_code="      + country_code + 
                    "&phone_number="      + phone_number + 
                    "&verification_code=" + verification_code;

        request(query, function (error, response, body) {
            if(body.success == true){   
                db.Register_Save_Phone_Number_To_DB(country_code, phone_number);
                users.socketID.state = true;
                sendStatus("first step success", socket);
            }
            else{   //If bad passcode
                users.socketID.retries++;
                sendStatus("retry", socket);
            }
        });
        }
        else{   //If cooled down
            sendStatus("operation abort", socket);
        }
    }
    if(users.socketID.retries >= 3){    //If too much retries, cooldown this phone number
        phones_cooldown.phone_number = Date.now();
        sendStatus("operation abort", socket);
    } 
}

exports.finalizeAccount = function(data, socket){
    var socketID = socket.id;
    if(users.socketID.state == true){   //If verification is true
        leafOp.createAccount(data, function(out){
            if(out.success == true){
                sendStatus("account created", socket);
                users.socketID = undefined;
            }
        });
    }
}

function sendStatus(method, socket){
    var socketID            = socket.id;
    var recipient           = users.socketID.communicationKey;
    var container           = {};
        container.method    = method;

    server.sendSocket(recipient, container, socket);
}