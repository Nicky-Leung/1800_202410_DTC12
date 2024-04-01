firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const currentUser = user.uid;
        console.log("Current user ID:", user.uid);
        db.collection("users").doc(currentUser).collection("profile_items").get()
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
    itemElement.addEventListener("click", () => {
        localStorage.setItem('name', item.itemName);
        localStorage.setItem('price', item.itemPrice);
        localStorage.setItem('description', item.itemDescription);
        localStorage.setItem('code', item.itemCode);
        localStorage.setItem('price_history', item.price_history);
        window.location.href = 'item_page.html';

    });
}

