

docID = localStorage.getItem('docId')

/**
 * Fills the stars based on the selected star index.
 * 
 * @param {HTMLElement} star - The clicked on star element.
 * @param {number} index -  Index of the clicked star.
 * @param {NodeList} stars - List of star elements.
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



// get reference to firebase storage
var storageRef = firebase.storage().ref();


document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // get value from form 
    var itemPrice = document.getElementById("itemPrice").value;
    var userReviewScore = countstars(userReviewStars)
    var userConditionScore = countstars(userConditionStars)
    var userPriceScore = countstars(userPriceStars)
    const today = new Date();
    const formattedDate = today.toLocaleDateString();


    // Add form data to firebase
    db.collection("items").doc(docID).update({
    
        price: itemPrice,
        review: userReviewScore,
        value: userPriceScore,
        condition: userConditionScore,
        price_history: firebase.firestore.FieldValue.arrayUnion(itemPrice),
        last_update: firebase.firestore.FieldValue.serverTimestamp(),
        update_history: firebase.firestore.FieldValue.arrayUnion(formattedDate)

        // imageUrl: imageUrl
    })
        .then(function (docRef) {
            console.log("Item added");
            // Redirect to profile page after item is added
            
            window.location.href = "../main_pages/main.html";
        })
        .catch(function (error) {
            console.error("Error adding item: ", error);
        });
});
