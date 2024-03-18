
let tech_items = ['iPhone 13', 'Samsung Galaxy S21', 'MacBook Pro', 'Dell XPS 13', 'Apple Watch Series 7', 'Google Pixel 6', 'Amazon Echo Dot', 'Sony PlayStation 5', 'Nintendo Switch', 'Oculus Quest 2', 'HP Spectre x360', 'iPad Pro', 'Microsoft Surface Pro 7', 'Roku Streaming Stick+', 'Bose QuietComfort 35 II', 'Canon EOS M50 Mark II', 'GoPro HERO10 Black', 'DJI Mavic Air 2', 'Logitech MX Master 3', 'WD My Passport SSD'];



function writeTechItemDB(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var items = db.collection("items");
    for (i = 0; i < tech_items.length; i++) {
        items.add({ //add to database, autogen ID
            code: tech_items[i].replace(/\s/g, '').toLowerCase(), //remove spaces and convert to lowercase
            name: tech_items[i],
            price: Math.floor(Math.random() * 1000) + 1, //random price
            description: "This is a description for " + tech_items[i],
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}

