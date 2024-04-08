firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = user.uid;
        console.log("Current user ID:", user.uid);
        db.collection("users").doc(currentUser).collection("profile_items").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const item = doc.data();
                    const docId = doc.id; // Retrieve the document ID
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

function renderItem(item, docId) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
    <div class="favorited-item">  
        <h2>${item.name}</h2>
        <a href="item_page.html" style="text-decoration: none; color: inherit;">
            <img style="max-width:200px" src="${item.imageUrl}" alt="Item Image">
            <p style="font-weight: bold;">Current price: ${item.price}</p>
            <p>Description: ${item.description}</p>
        </a>
        <button class="delete-btn btn btn-warning btn-lg mb-4">Delete Item</button>
    </div>
`; //added div favorited item for the css
    const itemContainer = document.getElementById("itemContainer");
    itemContainer.appendChild(itemElement);

    // Event listener for the delete button
    itemElement.querySelector(".delete-btn").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents the click event from triggering the parent element's click event
        deleteItem(docId, itemElement); // Pass itemElement reference to deleteItem function
    });

    // Event listener for item click
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
        window.location.href = 'item_page.html';
    });
}
function deleteItem(docId, itemElement) {
    // Retrieve the reference to the item document in Firestore from the user's profile items collection
    const currentUser = firebase.auth().currentUser.uid;
    const itemRef = db.collection("users").doc(currentUser).collection("profile_items").doc(docId);

    // Retrieve the item data to access the code field
    itemRef.get().then((doc) => {
        if (doc.exists) {
            const itemData = doc.data();
            const itemCode = itemData.code;

            itemRef.delete().then(() => {
                console.log("Item successfully deleted from the user's profile items collection!");
                itemElement.remove();
                alert("Item has been deleted.");
            }).catch((error) => {
                console.error("Error deleting item from the user's profile items collection:", error);
            });

            // Now, delete the item from the global items collection using the item code
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
