const express = require('express');

const app = express();
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const port = 3000;

const ebayAuthToken = new EbayAuthToken({
    clientId: 'NickyLeu-midas-SBX-a4c412560-2ad0c1b4',
    clientSecret: 'SBX-4c4125606215-17ac-4eb0-b660-b7fe',
    redirectUri: '',
    env: 'SANDBOX',
});


app.get('/item', async (req, res) => {
    const fetch = (await import('node-fetch')).default;
   
    const itemId = 'v1|2200077988|0'; // replace with your actual item id
    const url = `https://api.sandbox.ebay.com/buy/browse/v1/item/${itemId}`
    const apiKey = await (async () => {
        try {
        const resp = await ebayAuthToken.getApplicationToken('SANDBOX');
        response= JSON.parse(resp);
        return response.access_token;
        }
        catch (error) { console.error('Error:', error); }
    })();
    console.log(apiKey);
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.error('Error:', error));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});