
function fetchFavorites() {
    firebase.auth().onAuthStateChanged(user => {
        // If a user is logged in:
        if (user) {
            console.log("user is logged in")
            console.log(user.displayName)
            // Save the user ID
            currentUser = user.uid;
            console.log(currentUser)
            // Favourites of the current user:
            favoritesRef = db.collection("users").doc(currentUser).collection("saveditems");
            console.log(favoritesRef)

            favoritesRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var itemData = doc.data();
                    console.log(itemData)
                    var itemContainer = document.createElement("div");
                    itemContainer.classList.add("favorited-item");
                    var itemLink = document.createElement("a");
                    itemLink.href = "item_page.html";

                    // Populate page with favourite items 
                    itemContainer.innerHTML = `
                            <div class="text-decoration-none text-dark">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col">
                                                <h1 id='name' class="">${itemData.name}</h1>
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                <h5 id="price" class="card-title mt-2">Current Price: ${itemData.price}</h5>
                                            </div>
                                            <div class="col">
                                                <img src="${itemData.imageUrl}" class="card-img-top mt-2" style="max-width:200px;">
                                            </div>
                                        </div>
                                        <p id="description" class="card-text mt-4">${itemData.description}</p>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
                    itemContainer.addEventListener("click", function () {
                        localStorage.setItem("name", itemData.name);
                        localStorage.setItem("price", itemData.price);
                        localStorage.setItem("description", itemData.description);
                        localStorage.setItem("code", itemData.code);
                        localStorage.setItem("price_history", itemData.price_history);
                        localStorage.setItem("imageUrl", itemData.imageUrl)
                        window.location.href = 'item_page.html';

                    });
                    itemContainer.appendChild(itemLink);

                    var favoritesArea = document.getElementById("favoritesArea");
                    favoritesArea.appendChild(itemContainer);
                });
            }).catch(function (error) {
                console.error("Error fetching favorites: ", error);
            });

            // If there is no user logged in:    
        } else {
            console.log("user is NOT logged in")
        }
    });


}

window.onload = function () {
    fetchFavorites();
};
