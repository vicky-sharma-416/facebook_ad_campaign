# facebook_ad_campaign

1. Run command "npm install"
2. Go inside folder and from the root run command "node server.js"
3. To create new compaign please use below url and set header in postman
4. Create new app and use thier credential to add compaign
POST => {
 url: http://localhost:8081/campaign,
 headers: {
 	Content-Type: application/json,
        access_token: facebook_access_token(with 'ads_management' pemission),
	app_secret: facebook_app_secret,
	app_id: facebook_app_id,
	account_id: facebook_account_id
 }
}

GET =>
{
 url: http://localhost:8081/campaign OR http://localhost:8081/campaign??fields=name,objective&effective_status=PAUSED,
 headers: {
 	Content-Type: application/json,
        access_token: facebook_access_token(with 'ads_management' pemission),
	app_secret: facebook_app_secret,
	app_id: facebook_app_id,
	account_id: facebook_account_id
 }
}

PUT =>
{
 url: http://localhost:8081/campaign/ID,
 body: {
 	"name": "TEST 8 updated Campaign"
 },
 headers: {
 	Content-Type: application/json,
        access_token: facebook_access_token(with 'ads_management' pemission),
	app_secret: facebook_app_secret,
	app_id: facebook_app_id,
	account_id: facebook_account_id
 }
}

DELETE => 
{
 url: http://localhost:8081/campaign/ID,
 headers: {
 	Content-Type: application/json,
        access_token: facebook_access_token(with 'ads_management' pemission),
	app_secret: facebook_app_secret,
	app_id: facebook_app_id,
	account_id: facebook_account_id
 }
}


