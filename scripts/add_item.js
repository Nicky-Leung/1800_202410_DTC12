
//fill the stars visually based on the index of the star clicked
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
let userCriticStars = document.querySelectorAll("#criticReview .star")
userCriticStars.forEach(fillstars)
let userConditionStars = document.querySelectorAll("#condition .star")
userConditionStars.forEach(fillstars)
let userPriceStars = document.querySelectorAll("#price .star")
userPriceStars.forEach(fillstars)
let popularityStars = document.querySelectorAll("#popularity .star")
popularityStars.forEach(fillstars)


// get reference to firebase storage
var storageRef = firebase.storage().ref();

// upload image to firebase storage
function uploadImage(file) {
    // can maybe change name later
    var imageName = file.name;

    // upload file to firebase storage
    var imageRef = storageRef.child('images/' + imageName);
    return imageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(error => console.error('error uploading image:', error));
}


document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    var itemName = document.getElementById("itemName").value;
    var itemPrice = document.getElementById("itemPrice").value;
    var itemDescription = document.getElementById("itemDescription").value;
    var userReviewScore = countstars(userReviewStars)
    var userCriticScore = countstars(userCriticStars)
    var userConditionScore = countstars(userConditionStars)
    var userPriceScore = countstars(userPriceStars)
    var popularityScore = countstars(popularityStars)

    var imageFile = document.getElementById("itemImage").files[0];
    var imageUrl = await uploadImage(imageFile);

    // Change "profile_items" to the name of your new collection


    db.collection("users").doc(firebase.auth().currentUser.uid).collection("profile_items").add({
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        userReview: userReviewScore,
        userCritic: userCriticScore,
        userCondition: userConditionScore,
        userPrice: userPriceScore,
        popularity: popularityScore,
        imageUrl: imageUrl
    })
        .then(function (docRef) {
            console.log("Item added with ID: ", docRef.id);
            // Redirect to profile page after item is added
            window.location.href = "profile.html";
        })
        .catch(function (error) {
            console.error("Error adding item: ", error);
        });
});
