const mongo = require('mongodb').MongoClient;
const config = require('./../../../config.json');

const url = process.env.MONGO_URI || config.db;

mongo.connect(url, function(err, db){
    if(err){
        console.log(err);
    }
    else {
        console.log('MongoDB connected...');
    }

    var REGISTER_Phone_DB = db.collection('REGISTER_Phone_DB');

    exports.Register_Check_If_Phone_Already_Used = function(country_code, phone_number, result){
        var query = REGISTER_Phone_DB.find({"country_code": country_code, "phone_number": phone_number});
        query.limit(1).sort({timestamp:1}).toArray(function(err,res){
            if(res.length > 0){
                out(true);
            }
            else{
                out(false);
            }
        });
    }

    exports.Register_Save_Phone_Number_To_DB = function(country_code, phone_number){
        REGISTER_Phone_DB.insert({"country_code": country_code, "phone_number": phone_number});
    }    
});
