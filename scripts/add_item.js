/**
 * Fills the stars based on the selected star index.
 * 
 * @param {HTMLElement} star - The star element that was clicked.
 * @param {number} index - The index of the selected star.
 * @param {NodeList} stars - The list of all star elements.
 */
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


/**
 * Counts the number of stars in an array of elements.
 * 
 * @param {Array} stars - The array of elements to count stars from.
 * @returns {number} The number of stars found in the array.
 */
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


/**
 * Uploads an image file to the storage and returns a Promise that resolves to the download URL of the uploaded image.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} A Promise that resolves to the download URL of the uploaded image.
 */
function uploadImage(file) {
    var imageName = file.name;
    var imageRef = storageRef.child('item_images/' + imageName); // Store the images in "item_images" folder
    return imageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(error => console.error('error uploading image:', error));
}


/**
 * Adds an item to the collections.
 * 
 * @param {Object} itemData - The data of the item to be added.
 * @returns {Promise<Object>} - A promise that resolves to an object containing references to the added items.
 */
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

    // Retrieve item data from the form (user)inputs
    var name = document.getElementById("itemName").value;
    var price = document.getElementById("itemPrice").value;
    var description = document.getElementById("itemDescription").value;
    var review = countstars(userReviewStars);
    var condition = countstars(userConditionStars);
    var value = countstars(userPriceStars);

    // get selected image file and uploads it.
    var imageFile = document.getElementById("itemImage").files[0];
    var imageUrl = await uploadImage(imageFile);
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    // Create an object with the item data
    var itemData = {
        name: name,
        code: name.replace(/\s/g, '').toLowerCase(), // generate a code based on the item name (item name lowecased)
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
            window.location.href = "../main_pages/profile.html";
        })
        .catch(function (error) {
            console.error("Error adding item: ", error);
        });
});
