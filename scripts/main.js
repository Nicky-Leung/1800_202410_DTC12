/**
 * Updates the value, review, and condition of items in the database.
 */
async function updateItem() {
    // Update value of item in database
    await db.collection("items").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Generate values for review, condition, and value
            doc.ref.update({
                review: Math.ceil(Math.random() * 5),
                condition: Math.ceil(Math.random() * 5),
                value: Math.ceil(Math.random() * 5),
            });
        });
    });

}


/**
 * Writes tech items to the database.
 * 
 * @param {number} max - The maximum number of items to write.
 */
async function writeTechItemDB(max) {
    // Create mock data and their prices 
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
    // Define a variable for the collection you want to create in Firestore to populate data
    var items = db.collection("items");
    for (i = 0; i < techname.length; i++) {
        console.log(i)
        let price = values[i]
        let description = await fetchDescriptionFromWikipedia(techname[i])

        console.log(description)

        await items.add({ // Add to database, autogen ID
            code: techname[i].replace(/\s/g, '').toLowerCase(), //remove spaces and convert to lowercase
            name: techname[i],
            price: price,
            price_history: [price],
            description: description,
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),
            update_history: ['3/10/2024', '3/21/2024', '3/30/2024', '4/1/2024', '4/2/2024']
        })
    }
}



/**
 * Fetches the description of an item from Wikipedia API.
 * 
 *
 * @param {string} itemName - The name of the item to fetch the description for.
 * @param {string} description - The default description from Firestore collection.
 * @description If the description is found, it is returned. Otherwise, the description from Firestore collection is returned.
 * @returns {Promise<string>} - A promise that resolves when the description of the item is returned.
 */
function fetchDescriptionFromWikipedia(itemName, description) {
    // Construct URL that points to wiki summary of the item 
    let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${itemName}`;
    // Retrieve data from wiki API
    return fetch(apiUrl)
        // Extract JSON data, throw error if the data is not found
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.extract) {
                return data.extract;
            } else {
                throw new Error("Description not found");
            }
        })
        // Catch any errors in fetching or processing data
        .catch(error => {
            console.error("Error fetching description from Wikipedia:", error);
            return description; // Return the description from Firestore collection
        });
}

/**
 * Reads tech items from the database and displays them on the main page.
 * 
 * @description This function reads from the database and creates cards for each item to display on main page
 */
function readTechItemDB() {
    // Define a variable for the collection to be read from Firestore
    db.collection("items").get().then(items => {
        items.forEach(async doc => {
            let docId = doc.id;
            let name = doc.data().name;
            let price = doc.data().price;

            try {
                var description = await fetchDescriptionFromWikipedia(doc.data().name);
            } catch (error) {
                // use firebase description if error occurs when fetching from wiki 
                var description = doc.data().description;
            }
            // if description is null then use firebase description
            if (description == null) {
                description = doc.data().description;
            }
            let code = doc.data().code;
            let price_history = doc.data().price_history;
            let update_history = doc.data().update_history;
            let value = doc.data().value;
            let condition = doc.data().condition;
            let review = doc.data().review;
            let image = doc.data().imageUrl

            // create a new card for each doc in the database with unique price and name 
            card_container = document.getElementById("card-container");
            card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<div class="text-decoration-none text-dark" >
                    <div class="card-body">
                        <div class="container" >
                            <div class="row">
                                <div class="col text-left-start">
                                   <h1 id='name' class="">${name}
                                   </h1>
                                        <br>
                                        <br>
                                        <br>
                                        <h5 id = 'price' class="card-title">Current Price: $${price}</h5>
                                </div>
                                <image src="${image}" class="card-img-top col"
                                    style="height:20vh; width:20vh">
                                </image>
                            </div>
                        </div>
                        <p id = "description" class="card-text">${description}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                       
                            </div>
                    </div>        
            </div>`
            // set local storage to the item details onclick for item page
            card.addEventListener('click', function () {
                localStorage.setItem('name', name);
                localStorage.setItem('price', price);
                localStorage.setItem('description', description);
                localStorage.setItem('code', code);
                localStorage.setItem('price_history', price_history);
                localStorage.setItem('docId', docId);
                localStorage.setItem('update_history', update_history);
                localStorage.setItem('value', value);
                localStorage.setItem('condition', condition);
                localStorage.setItem('review', review);
                localStorage.setItem('imageUrl', image);
                window.location.href = '../main_pages/item_page.html';
            });
            card_container.append(card)
        })
    });
}



// Find the closest parent element 
function findParentBySelector(elm, selector) {
    var current = elm.parentNode;
    while (current && !current.matches(selector)) {
        current = current.parentNode;
    }
    return current;
}

readTechItemDB(); //call the function to read from the database


/**
 * Retrieves the name of the authenticated user from Firestore and updates the corresponding HTML element.
 */
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("User is logged in");
            console.log("User display name:", user.displayName);
            // Get the reference to the document in the users collection corresponding to the user's UID
            var userDocRef = db.collection("users").doc(user.uid);

            // Get the document snapshot and retrieve the name field
            userDocRef.get().then(doc => {
                if (doc.exists) {
                    var userData = doc.data();
                    var userName = userData.name;
                    console.log("User name from Firestore:", userName);
                    document.getElementById("name-goes-here").innerHTML = userName;
                } else {
                    console.log("No such document!");
                }
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        } else {
            console.log("User is NOT logged in");
        }
    });
}

getNameFromAuth()
