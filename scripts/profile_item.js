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
    <div class="favorited-item">  
        <h2>${item.price}</h2>
        <a href="item_page.html" style="text-decoration: none; color: inherit;">
            <img style="max-width:200px" src="${item.imageUrl}" alt="Item Image">
            <p style="font-weight: bold;">Current price: ${item.price}</p>
            <p>Description: ${item.itemDescription}</p>
        </a>
    </div>
`; //added div favorited item for the css
    const itemContainer = document.getElementById("itemContainer");
    itemContainer.appendChild(itemElement);
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
        window.location.href = 'item_page.html';
    });
}

