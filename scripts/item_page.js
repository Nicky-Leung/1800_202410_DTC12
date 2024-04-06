function show_item() {
    // Get item from local storage and show its information on the page
    var name = localStorage.getItem('name');
    var price = localStorage.getItem('price');
    var description = localStorage.getItem('description');
    var code = localStorage.getItem('code');
    var docid = localStorage.getItem('docId');


    // Create a card for the item
    card_container = document.getElementById("item-information");
    card_container.innerHTML = "";
    card = document.createElement("div");

    card.innerHTML = `
    <br>
    <br>
    <div class="container-fluid" id="item-information">
        <div class="item" id="item" style="display:flex">
            <h2>${name}</h2>
            <img style="max-width:200px" src="images/${code}.jpg" alt="Item Image">
        </div>
        <div class="card" id="cardi">
            <p>Price: ${price}<br>Condition: Used<br>Colour: Black</p>
            <p>${description}</p>
            <svg id="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" onclick="toggleFill(); addToFavorites()">
                <path id="heartPath" fill="none" stroke="red" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <a href="https://www.ebay.com/sch/i.html?_nkw=${name}" target="_blank"><button type="button" class="btn btn-primary">Buy on Ebay</button></a>
            <a href="https://www.facebook.com/marketplace/104034516300688/search?query=${name}" target="_blank"><button type="button" class="btn btn-primary">Buy on FB Marketplace</button></a>
            <a href= "existing_items_edit.html"><button type="button" class="btn btn-primary">Edit</button></a>
        </div>  
    </div>
`;

    // Add the card to the page
    card_container.append(card)
}

// Get the price of the item from local storage


function show_chart() {
    // Create chart for item infomration

    // Initialize data object for pricehistory

    const data = {
        labels: localStorage.getItem('update_history').split(",").slice(-5),
        datasets: [{
            label: 'Price History',
            data: localStorage.getItem('price_history').split(",").slice(-5),
            fill: true,
            borderColor: 'rgb(254,183,52)',
            tension: 0.1

        }
        ]
    };

    // Create chart for price history
    new Chart(document.getElementById('chart'), {

        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return '$' + value;
                        }
                    }
                }
            }
        }

    });

    // Initialize data object for radar chart
    const radardata = {
        labels: ['Review', 'Value', 'Condition'],
        datasets: [{
            label: 'Review',
            data: [localStorage.getItem('review'), localStorage.getItem('value'), localStorage.getItem('condition')],
            fill: true,
            borderColor: 'rgb(254,183,52)',
            tension: 0.1
        }
        ]

    };

    // Create radar chart
    new Chart(document.getElementById('radarchart'), {

        type: 'radar',
        data: radardata,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

function addToFavorites() {
    // Retrieve item details
    var name = localStorage.getItem('name');
    var price = localStorage.getItem('price');
    var description = localStorage.getItem('description');
    var code = localStorage.getItem('code');
    var price_history = localStorage.getItem('price_history')


    // Check if the item is already in favorites
    var favoritesRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("saveditems");
    console.log(firebase.auth().currentUser.uid)
    console.log(favoritesRef)
    var query = favoritesRef.where("name", "==", name).limit(1);

    query.get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
            // If item is not found in favorites, add it
            favoritesRef.add({
                name: name,
                price: price,
                description: description,
                code: code,
                price_history: price_history
            })
                .then(function (docRef) {
                    console.log("Item added to favorites with ID: ", docRef.id);
                    alert("Item added to favorites!");
                })
                .catch(function (error) {
                    console.error("Error adding item to favorites: ", error);
                    alert("Error adding item to favorites. Please try again later.");
                });
        } else {
            // if item is found in favorites, remove it
            querySnapshot.forEach(function (doc) {
                doc.ref.delete().then(function () {
                    console.log("Item removed from favorites");
                    alert("Item removed from favorites!");
                }).catch(function (error) {
                    console.error("Error removing item from favorites: ", error);
                    alert("Error removing item from favorites. Please try again later.");
                });
            });
        }
    }).catch(function (error) {
        console.error("Error checking favorites: ", error);
        alert("Error checking favorites. Please try again later.");
    });
}

show_item();
show_chart();
