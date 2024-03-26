const stars_containers = document.querySelectorAll("label[for='itemReview']");


stars_containers.forEach(
    function (stars) {
        stars.forEach(function (star, index){
            star.addEventListener('click',() => {
        
        for (let i = 0; i <= index; i++) {
            document.getElementById(`star${i+1}`).textContent = 'star' ;
}
}
)})});



document.getElementById("addItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var itemName = document.getElementById("itemName").value;
    var itemPrice = document.getElementById("itemPrice").value;
    var itemDescription = document.getElementById("itemDescription").value;

    // Change "profile_items" to the name of your new collection
    const stars = document.querySelectorAll('.star');


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
