
//fill the stars visually based on the index of the star clicked
docID = localStorage.getItem('docId')


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


document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // get value from form 
    var itemPrice = document.getElementById("itemPrice").value;
    var userReviewScore = countstars(userReviewStars)
    var userCriticScore = countstars(userCriticStars)
    var userConditionScore = countstars(userConditionStars)
    var userPriceScore = countstars(userPriceStars)
    var popularityScore = countstars(popularityStars)

    // Add form data to firebase
    db.collection("items").doc(docID).update({
    
        itemPrice: itemPrice,
        userReview: (userReviewScore + userReviewScore)/2,
        userCritic: (userCriticScore + userCriticScore)/2,
        userCondition: (userConditionScore + userConditionScore)/2,
        userPrice: (userPriceScore + userPriceScore)/2,
        popularity: (popularityScore+popularityScore)/2,
        price_history: firebase.firestore.FieldValue.arrayUnion(itemPrice)

        // imageUrl: imageUrl
    })
        .then(function (docRef) {
            console.log("Item added");
            // Redirect to profile page after item is added
            window.location.href = "profile.html";
        })
        .catch(function (error) {
            console.error("Error adding item: ", error);
        });
});
