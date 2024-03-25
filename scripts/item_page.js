function show_item() {
    //gets item from local store and shows its information on the page
    var name = localStorage.getItem('name');
    var price = localStorage.getItem('price');
    var description = localStorage.getItem('description');
    var code = localStorage.getItem('code');

    //create a card for the item
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
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round" onclick="addToFavorites()">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <a href="chart.html">Show Stats</a>
        </div>
    </div>
`;

    //add the card to the page
    card_container.append(card)
}

function show_chart() {
    // create chart for item infomration

    //initialize data object for pricehistory
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Price History',
            data: localStorage.getItem('price_history').split(",").reverse(),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }
        ]
    };

    //create chart for price history
    new Chart(document.getElementById('chart'), {

        type: 'line',
        data: data,

    });

    //initialize data object for radar chart
    const radardata = {
        labels: ['User Review', 'Critic Review', 'Price', 'Popularity', 'Condition'],
        datasets: [{
            label: 'Review',
            data: [4, 3, 2, 4, 4],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }
        ]

    };

    //create radar chart
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

    // Check if the item is already in favorites
    var favoritesRef = db.collection("favorites");
    var query = favoritesRef.where("name", "==", name).limit(1);

    query.get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
            // Item not found in favorites, add it
            favoritesRef.add({
                name: name,
                price: price,
                description: description,
                code: code
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
            // Item found in favorites, remove it
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
