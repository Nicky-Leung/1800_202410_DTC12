// Add event listener to the search form
document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let itemName = document.getElementById("itemName").value; // Get item name from form input

    // Call readFilteredTechItemDB with the entered item name
    readFilteredTechItemDB(itemName);
})