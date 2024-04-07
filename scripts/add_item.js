function fillstars(star, index, stars) {
    star.addEventListener("click", function () {
        for (let i = 0; i <= index; i++) {
            stars[i].innerHTML = "star"
        }
        for (let j = index + 1; j < stars.length; j++) {
            stars[j].innerHTML = "star_outline";
        }

    }
    )
};

// count the amount of filled stars in the review
function countstars(stars) {
    let count = 0
    stars.forEach(star => {
        if (star.innerHTML === "star") {
            count++
        }
    })
    return count
}

// grab all stars for each review items 
let userReviewStars = document.querySelectorAll("#userReview .star")
// fill the stars visually based on the index of the star clickeds
userReviewStars.forEach(fillstars)
let userConditionStars = document.querySelectorAll("#condition .star")
userConditionStars.forEach(fillstars)
let userPriceStars = document.querySelectorAll("#price .star")
userPriceStars.forEach(fillstars)

// Get reference to Firebase storage
var storageRef = firebase.storage().ref();

// Upload image to Firebase storage
function uploadImage(file) {
    var imageName = file.name;
    var imageRef = storageRef.child('item_images/' + imageName); // Store the images in "item_images" folder
    return imageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(error => console.error('error uploading image:', error));
}

// Function to add the item to both collections
async function addItemToCollections(itemData) {
    // Add item to the 'items' collection
    const itemsCollectionRef = await db.collection("items").add(itemData);

    // Add item to the 'profile_items' subcollection of the current user
    const profileItemsCollectionRef = await db.collection("users").doc(firebase.auth().currentUser.uid)
        .collection("profile_items").add(itemData);

    return { itemsCollectionRef, profileItemsCollectionRef };
}

// Update the form submit event listener to call the new function
document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    var name = document.getElementById("itemName").value;
    var price = document.getElementById("itemPrice").value;
    var description = document.getElementById("itemDescription").value;
    var review = countstars(userReviewStars);
    var condition = countstars(userConditionStars);
    var value = countstars(userPriceStars);

    var imageFile = document.getElementById("itemImage").files[0];
    var imageUrl = await uploadImage(imageFile);
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    // Create an object with the item data
    var itemData = {
        name: name,
        code: name.replace(/\s/g, '').toLowerCase(),
        price: price,
        price_history: [price],
        update_history: [formattedDate],
        description: description,
        review: review,
        condition: condition,
        value: value,
        imageUrl: imageUrl
    };

    // Add the item to both collections
    await addItemToCollections(itemData)
        .then(function (ref) {
            console.log("Item added with ID to items collection: ", ref.itemsCollectionRef.id);
            console.log("Item added with ID to profile_items subcollection: ", ref.profileItemsCollectionRef.id);
            window.location.href = "profile.html";
        })
        .catch(function (error) {
            console.error("Error adding item: ", error);
        });
});
