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

            // create a new card for each doc in the database with unique price and name 
            card_container = document.getElementById("card-container");
            card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<div class="text-decoration-none text-dark ">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="container">
                            <div class="row">
                                <div class="col text-left-start">
                                    <h1 id = 'name' class=>${name}</h5>
                                        <br>
                                        <br>
                                        <br>
                                        <h5 id = 'price' class="card-title">Current Price: ${price}</h5>
                                </div>
                                <image src="images/5137C009_EOSR7_RFS_18150.jpg" class="card-img-top col"
                                    style="height:20vh; width:20vh">
                                </image>
                            </div>
                        </div>
                        <p id = "description" class="card-text">${description}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
            </div>`

        ;   
            card.addEventListener('click', function () {
                card_container.innerHTML = "";
                card.innerHTML = `
                    
                    <div class="container-fluid" id="item-information">
                    <div class="item" id="item">

                        <h2>${name}</h2>
                        <img style = "max-width:200px" src="images/gucci mane.jpg" alt="Item Image">
                    </div>
                    <div class="card" id="cardi">
                        <p>Price : 
                        ${price}<br> Condition: Used <br> Colour: Black
                        </p>
                        <p>${description}</p>
                        <button onclick="showStats()" style="color:white; background-color: midnightblue;">Show Stats</button>


                    </div>
                    </div>`
                card_container.append(card)

            });
            card_container.append(card)

        })
    });

        
    }


readTechItemDB(); //call the function to read from the database
