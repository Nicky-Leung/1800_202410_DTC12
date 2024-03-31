
//fill the stars visually based on the index of the star clicked
function fillstars (star, index, stars) {
    star.addEventListener("click", function() {
    for (let i = 0; i <= index; i++) {
        stars[i].innerHTML = "star"
    }

})}


// grab all stars for each review items 
let userReviewStars = document.querySelectorAll("#userReview .star")
console.log(userReviewStars)
userReviewStars.forEach (fillstars)
let userCriticStars = document.querySelectorAll("#criticReview .star")
userCriticStars.forEach (fillstars)

let userConditionStars = document.querySelectorAll("#condition .star")
userConditionStars.forEach (fillstars)
let userPriceStars = document.querySelectorAll("#price .star")
userPriceStars.forEach (fillstars)
let popularityStars = document.querySelectorAll("#popularity .star")
popularityStars.forEach (fillstars)





document.getElementById("addItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var itemName = document.getElementById("itemName").value;
    var itemPrice = document.getElementById("itemPrice").value;
    var itemDescription = document.getElementById("itemDescription").value;

    // Change "profile_items" to the name of your new collection


    db.collection("profile_items").add({
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription
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
