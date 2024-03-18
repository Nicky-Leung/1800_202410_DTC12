async function ebay () {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=20863&limit=3&offset=9';
    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();
    console.log(data);
}

ebay()