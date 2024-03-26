firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Current user ID:", currentUserID);
        db.collection("profile_items")
            .where("userID", "==", currentUserID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const item = doc.data();
                    renderItem(item);
                });
            })
            .catch((error) => {
                console.error("Error retrieving items:", error);
            });
    } else {
        console.error("No authenticated user found.");
    }
});

function renderItem(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
        <h3>${item.itemName}</h3>
        <p>Price: ${item.itemPrice}</p>
        <p>Description: ${item.itemDescription}</p>
    `;
    const itemContainer = document.getElementById("itemContainer");
    itemContainer.appendChild(itemElement);
}

