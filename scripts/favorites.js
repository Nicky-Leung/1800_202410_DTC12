
function fetchFavorites() {
     firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user is logged in")
                console.log(user.displayName)
                currentUser = user.uid;
                console.log(currentUser)
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
                       
            
            
                        itemContainer.innerHTML = `
                        <h2>${itemData.name}</h2>
                        <a href="item_page.html" style="text-decoration: none; color: inherit;">
                            <img style="max-width:200px" src="images/${itemData.code}.jpg" alt="Item Image">
                            <p>Price: ${itemData.price}</p>
                            <p>Description: ${itemData.description}</p>
                            <!-- Add any additional information you want to display -->
                        </a>
            `;
                        itemContainer.addEventListener("click", function () {
                            localStorage.setItem("name", itemData.name);
                            localStorage.setItem("price", itemData.price);
                            localStorage.setItem("description", itemData.description);
                            localStorage.setItem("code", itemData.code);
                            localStorage.setItem("price_history", itemData.price_history);
                            window.location.href = 'item_page.html';
            
                        });
                        itemContainer.appendChild(itemLink);
            
                        var favoritesArea = document.getElementById("favoritesArea");
                        favoritesArea.appendChild(itemContainer);
                    });
                }).catch(function (error) {
                    console.error("Error fetching favorites: ", error);
                });

                
            } else {
                console.log("user is NOT logged in")
            }
        });

   
}

window.onload = function () {
    fetchFavorites();
};
