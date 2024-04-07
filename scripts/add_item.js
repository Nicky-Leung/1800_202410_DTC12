// Fill the stars visually based on the index of the star clicked
function fillstars(star, index, stars) {
    star.addEventListener("click", function () {
        for (let i = 0; i <= index; i++) {
            stars[i].innerHTML = "star";
        }
        for (let j = index + 1; j < stars.length; j++) {
            stars[j].innerHTML = "star_outline";
        }
    });
}

// Count the amount of filled stars in the review
function countstars(stars) {
    let count = 0;
    stars.forEach(star => {
        if (star.innerHTML === "star") {
            count++;
        }
    });
    return count;
}

// Grab all stars for each review items
let userReviewStars = document.querySelectorAll("#userReview .star");
userReviewStars.forEach(fillstars);
let userCriticStars = document.querySelectorAll("#criticReview .star");
userCriticStars.forEach(fillstars);
let userConditionStars = document.querySelectorAll("#condition .star");
userConditionStars.forEach(fillstars);
let userPriceStars = document.querySelectorAll("#price .star");
userPriceStars.forEach(fillstars);
let popularityStars = document.querySelectorAll("#popularity .star");
popularityStars.forEach(fillstars);

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

    var itemName = document.getElementById("itemName").value;
    var itemPrice = document.getElementById("itemPrice").value;
    var itemDescription = document.getElementById("itemDescription").value;
    var userReviewScore = countstars(userReviewStars);
    var userCriticScore = countstars(userCriticStars);
    var userConditionScore = countstars(userConditionStars);
    var userPriceScore = countstars(userPriceStars);
    var popularityScore = countstars(popularityStars);

    var imageFile = document.getElementById("itemImage").files[0];
    var imageUrl = await uploadImage(imageFile);

    // Create an object with the item data
    var itemData = {
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        userReview: userReviewScore,
        userCritic: userCriticScore,
        userCondition: userConditionScore,
        userPrice: userPriceScore,
        popularity: popularityScore,
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
