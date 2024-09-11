const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const querystring = require('querystring');

const client_id = '90eb9703676b439eb1481321bb9f9687';// 4fdb1905b11d41a98f93cb2174d065f9
const client_secret = '1666a92e502c453eb92dde0169ac2e35';// 7dbe6ed7685c4fe79c8bb81c461b46db
const redirect_uri = 'http://localhost:5173/tracklistify/callback'; // https://matifema.com/tracklistify/callback

// Function to handle the token exchange
exports.exchangeSpotifyToken = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const code = req.body.code;

        if (!code) {
            return res.status(400).send('Missing authorization code');
        }

        const authOptions = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            },
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
            }),
        };

        try {
            const response = await axios(authOptions);
            res.json(response.data); // Return access token and other data to the frontend
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            res.status(500).json({ error: 'Failed to exchange token' });
        }
    });
});
