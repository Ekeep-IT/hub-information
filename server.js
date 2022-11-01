var express = require('express'),
    cors = require("cors"),
    app = express(),
    axios = require('axios');

const { Octokit } = require("@octokit/core");

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const githubUsername = process.env.USER_NAME;
const githubToken = process.env.TOKEN;

app.use(cors());

app.get("/api/user", (req, res) => {
    axios({
        method: "get",
        url: `https://api.github.com/users/${githubUsername}`,
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
        }
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        res.send(err);
    });
});




const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
    console.log('Server running on port %d', PORT);
    console.log('Mon nom de repos git hub est :' + githubUsername);
    console.log('Mon token est ..... c\'est secret :) ');
})