function writeTechItemDB(max) {


    //create mock data and their prices 
    let techItems = {
        'iPhone 13': 699,
        'Samsung Galaxy S21': 799,
        'MacBook Pro': 1299,
        'Dell XPS 13': 999,
        'Apple Watch Series 7': 399,
        'Google Pixel 6': 599,
        'Amazon Echo Dot': 49.99,
        'Sony PlayStation 5': 499.99,
        'Nintendo Switch': 299.99,
        'Oculus Quest 2': 299,
        'HP Spectre x360': 1049.99,
        'iPad Pro': 799,
        'Microsoft Surface Pro 7': 749.99,
        'Roku Streaming Stick+': 49.99,
        'Bose QuietComfort 35 II': 299,
        'Canon EOS M50 Mark II': 699,
        'GoPro HERO10 Black': 399,
        'DJI Mavic Air 2': 799,
        'Logitech MX Master 3': 99.99,
        'WD My Passport': 119.99
    };

    let techname = Object.keys(techItems);
    let values = Object.values(techItems);
    //define a variable for the collection you want to create in Firestore to populate data
    var items = db.collection("items");
    for (i = 0; i < techname.length; i++) {
        items.add({ //add to database, autogen ID
            code: techname[i].replace(/\s/g, '').toLowerCase(), //remove spaces and convert to lowercase
            name: techname[i],
            price: values[i],
            description: "This is a description for " + techname[i],
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}

function readTechItemDB() {
    //define a variable for the collection you want to read from Firestore
   db.collection("items").get().then(items => {
        items.forEach(doc => {
            let name = doc.data().name;
            let price = doc.data().price;
            let description = doc.data().description;
            let code = doc.data().code;

            title = document.getElementById('name')
            title.innerHTML = name;
            console.log(description);
            price_card = document.getElementById('price')
            price_card.innerHTML = 'Current Price: '+ price;
            description_card = document.getElementById('description')
            description_card.innerHTML = description;
        });
    });
}

readTechItemDB(); //call the function to read from the database
