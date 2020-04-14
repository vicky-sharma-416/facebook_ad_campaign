// Load modules
const fbAdCompaignSdk = require('facebook-nodejs-business-sdk');
const express = require('express');
const router = express.Router();
var authorizationObj = {
	access_token: null,
	app_secret: null,
	app_id: null,
	account_id: null
}

// Middleware to sent response with headers
router.use(function(req, res, next){
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

	next();
});

// Authorize/validate incoming token
router.use(function(req, res, next){
	if(req.headers && req.headers.access_token && req.headers.app_secret && req.headers.app_id && req.headers.account_id){
		
		const adAccount = fbAdCompaignSdk.AdAccount;
		const account = 'act_' + req.headers.account_id
		
		req.fb_ad_access_token = req.headers.access_token;
		req.fb_ad_api = fbAdCompaignSdk.FacebookAdsApi.init(req.headers.access_token);
		req.fb_ad_account = new adAccount(account);
		req.fb_ad_campaign = fbAdCompaignSdk.Campaign;
		next();
	}
	else{
		res.status(401).end(JSON.stringify({message: 'Unauthorized, set access_token, app_secret, app_id, account_id in header'}));
	}	
})

// Get/id, update and delete new campaign
router.use('/campaign/:id', function(req, res){
	controllers (req, res);
})

// Create & Get new campaign
router.use('/campaign', function(req, res){
	controllers (req, res);
})

// Response undefined url 
router.use('*', function(req, res){
	res.status(404).send({message: 'Not Found, Invalid URL'});
})

// Handled error and send response
router.use(function(err, req, res, next){
	res.status(500).send({message: err})
})

// Calling controller according consumed url
function controllers (event, res){
	console.log(' -- event.method: ' + event.method);

	try{
		var controller = require('./controllers/crud.js');
		controller[event.method](event, res);
	}
	catch(err){
		res.status(404).send({message: 'Not Found, please check url'});
	}
}

module.exports = router;

