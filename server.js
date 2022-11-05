var express = require('express'),
	cors = require('cors'),
	app = express(),
	axios = require('axios');

const { Octokit } = require('@octokit/core');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(cors());

app.get('/auth', (req, res) => {
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,repos,user:email,read:org`
	);
});

app.get('/callback', async (req, res) => {
	try {
		const response = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: clientId,
				client_secret: clientSecret,
				code: req.query.code,
			},
			{
				headers: {
					Accept: 'application/json',
				},
			}
		);
		console.log(JSON.stringify(response.data));
		res.send('you are authorized ' + response.data.access_token);
	} catch (error) {
		console.log(err);
	}
});

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
	console.log('Server running on port %d', PORT);
});
