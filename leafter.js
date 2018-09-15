const app = require('express')();
const express = require('express');
const plugins = require('./server/plugins.js')
const path = require('path');
const serverLib = require('./server/serverlib.js');
const ejs = require('ejs');
const PORT = process.env.PORT || 4000;


const server = app.listen(PORT);
serverLib.listen(server);

console.log("Leafter service is running...")



app.use(express.static(path.join(__dirname, './view')));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("../view/pages/index.ejs")
});

app.get("/trending", function(req, res){
	res.render("../view/pages/trending.ejs")
});

app.get("/hot", function(req, res){
	res.render("../view/pages/hot.ejs")
});

app.get("/created", function(req, res){
	res.render("../view/pages/created.ejs")
});

app.get("/create", function(req, res){
	res.render("../view/pages/create_newPost.ejs")
});

app.get("/login",function(req, res){
	res.render("../view/pages/login.ejs")
});

app.get('/@:id', function(req,res) {
	res.render("../view/pages/user_feed.ejs")
});

app.get('/@:id/profile', function(req,res) {
	res.render("../view/pages/user_profile.ejs")
});

app.get('/@:id/settings', function(req,res) {
	res.render("../view/pages/user_settings.ejs")
});

app.get('/@:id/wallet', function(req,res) {
	res.render("../view/pages/user_wallet.ejs")
});

app.get('/@:id/:permlink', function(req,res) {
	res.render("../view/pages/post.ejs")
});

app.get('/u/@:id/profilePic', function(req,res) {
	plugins.getProfilePicture(req.params.id, function(out){
		res.send('<img src="'+out+'" />')
	});	
});