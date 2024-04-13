/**
 * Function gets the profile items for the authenticated user if authenticated, and listens for changes.
 * @param {firebase.User} user - The authenticated user object.
 */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = user.uid;
        console.log("Current user ID:", user.uid);
        // items added by user will be stored to subcollection called profile_items
        db.collection("users").doc(currentUser).collection("profile_items").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const item = doc.data();
                    const docId = doc.id;
                    renderItem(item, docId);
                });
            })
            .catch((error) => {
                console.error("Error retrieving items:", error);
            });
    } else {
        console.error("No authenticated user found.");
    }
});

// render the item on the profile page
/**
 * Function to render an item on the profile page.
 * @param {Object} item - The item data to render.
 * @param {string} docId - The ID of the document in Firestore.
 */
function renderItem(item, docId) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    // This would create the item card of the user added item in their profile page.
    itemElement.innerHTML = `
       <div class="favorited-item">
    <div class="text-decoration-none text-dark">
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 id='name' class="">${item.name}</h1>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <h5 id="price" class="card-title mt-2">Current Price: ${item.price}</h5>
                    </div>
                    <div class="col">
                        <img src="${item.imageUrl}" class="card-img-top mt-2" style="max-width:200px;">
                    </div>
                </div>
                <p id="description" class="card-text mt-4">${item.description}</p>
            </div>
        </div>
    </div>
    <br>
    <button class="delete-btn btn btn-warning btn-lg mb-4 mx-2">Delete Item</button>
</div>

`; //added div favorited item for the css
    const itemContainer = document.getElementById("itemContainer");
    itemContainer.appendChild(itemElement);

    // Event listener for the delete button
    itemElement.querySelector(".delete-btn").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents the click event from triggering the parent element's click event
        deleteItem(docId, itemElement); // Pass itemElement reference to deleteItem function
    });

    // set the local storage to the clicked on item for item page to handle
    itemElement.addEventListener("click", () => {
        localStorage.setItem('name', item.name);
        localStorage.setItem('price', item.price);
        localStorage.setItem('description', item.description);
        localStorage.setItem('code', item.code);
        localStorage.setItem('price_history', item.price_history);
        localStorage.setItem('update_history', item.update_history);
        localStorage.setItem('review', item.review);
        localStorage.setItem('condition', item.condition);
        localStorage.setItem('value', item.value);
        localStorage.setItem('docID', docId);
        localStorage.setItem('imageUrl', item.imageUrl);
        window.location.href = '../main_pages/item_page.html';
    });
}

/**
 * Function that delete an item from the user's profile items collection and the  items collection.
 * @param {string} docId - The ID of the document to delete from Firestore.
 * @param {HTMLElement} itemElement - The HTML element representing the item to delete.
 */
function deleteItem(docId, itemElement) {
    // get the ref to the item document in Firestore from user's profile_items subcollection
    const currentUser = firebase.auth().currentUser.uid;
    const itemRef = db.collection("users").doc(currentUser).collection("profile_items").doc(docId);

    // get the item data to access the code field
    itemRef.get().then((doc) => {
        if (doc.exists) {
            const itemData = doc.data();
            const itemCode = itemData.code;

            // delete item from user's profile items collection (removes item in profile page)
            itemRef.delete().then(() => {
                console.log("Item successfully deleted from the user's profile items collection!");
                itemElement.remove();
                alert("Item has been deleted.");
            }).catch((error) => {
                console.error("Error deleting item from the user's profile items collection:", error);
            });

            // delete item from the global items collection using the item code (removes it from the item collection which displays items in main page)
            db.collection("items").where("code", "==", itemCode).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log("Global item successfully deleted!");
                    }).catch((error) => {
                        console.error("Error deleting global item:", error);
                    });
                });
            }).catch((error) => {
                console.error("Error retrieving global item:", error);
            });
        } else {
            console.log("Item document not found in the user's profile items collection.");
        }
    }).catch((error) => {
        console.error("Error retrieving item document from the user's profile items collection:", error);
    });
}
