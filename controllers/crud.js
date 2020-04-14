module.exports = {
	
	POST: function(req, res){
		var body = req.body;

		console.log(' -- body: ' + JSON.stringify(body));
		
		req.fb_ad_account
			.createCampaign([], {
				name: body.name || "Test Compaign",
				status: body.status || "PAUSED",
				objective: body.page_likes || req.fb_ad_campaign.Objective.page_likes,
				special_ad_category: body.special_ad_category || "NONE"
			})
			.then((result) => {
				console.log(' -- result: ' + JSON.stringify(result))
				res.status(201).send({campaign: result});
			})
			.catch((error) => {
				console.log(' -- error.status: ', error.status)
				console.log(' -- error.message: ', error.message)
				res.status(error.status).send({message: error.message});
			});
	},
	
	GET: function(req, res){
		console.log(' -- query ' + JSON.stringify(req.query));
		
		let fields = ['name'];
		let params = {
			effective_status: ['PAUSED'],
		};
		
		if (req.query.fields)
			fields = [req.query.fields]
		
		if (req.query.effective_status)
			params.effective_status = [req.query.effective_status]
		
		req.fb_ad_account
			.getCampaigns(fields, params)
			.then((result) => {
				console.log(' -- get_compaign: ' + JSON.stringify(result))
				
				let outputObj = {
					campaign: {
						data: [],
						available_fields: []
					}
				}
				
				if (result.length) {
					
					result.map((value) => {
						outputObj.campaign.data.push(value._data) 
					})
					
					outputObj.campaign.available_fields = result[0]._fields;
				}
				
				res.status(200).send(outputObj);
			})
			.catch((error) => {
				console.log(' -- error: ', error)
				res.status(error.statusCode).send({message: error.message});
			}); 
	},
	
	PUT: function(req, res){
		var body = req.body;

		console.log(' -- req.params: ' + JSON.stringify(req.params));
		console.log(' -- PUT_body: ' + JSON.stringify(body));

		// Make sure id is present in the url
		if(!req.params.id){
			return res.status(400).send({message: "Please provide id to update in request param, like /campaign/id."});
		}
		
		new req.fb_ad_campaign(req.params.id, {
			id: req.params.id,
			name: body.name 
		})
		.update()
		.then((result) => {
			console.log(' -- put_compaign: ' + JSON.stringify(result))
			res.status(200).send({campaign: 'Compaign updated successfully.'});
		})
		.catch((error) => {
			console.log(' -- error: ', error)
			res.status(error.statusCode).send({message: error.message});
		});
	},
	
	DELETE: function(req, res){
		
		if(!req.params.id){
			res.status(403).send({message: 'Pleasep provide Id to delete, like /camapaign/id.'});
		}

		new req.fb_ad_campaign(req.params.id)
		.delete()
		.then((result) => {
			console.log(' -- delete_compaign: ' + JSON.stringify(result))
			// res.status(204).send({campaign: 'Campaign deleted successfully.'});
			res.status(200).send({campaign: 'Campaign deleted successfully.'});
		})
		.catch((error) => {
			console.log(' -- error: ', error)
			res.status(error.statusCode).send({message: error.message});
		});
	}	
}
