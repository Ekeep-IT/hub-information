var express = require('express'),
	cors = require('cors'),
	app = express(),
	axios = require('axios');

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

app.get('/callback', (req, res) => {
	axios
		.post(
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
		)
		.then((result) => {
			console.log(JSON.stringify(result.data));
			res.send('you are authorized ' + result.data.access_token);
		})
		.catch((err) => {
			console.log(err);
		});
});

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
	console.log('Server running on port %d', PORT);
});
