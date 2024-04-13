/**
 * when DOM is loaded, this is called
 * takes search query parameter from the URL and displays it
 */
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    displaySearchResults(searchQuery);
});

/**
 * Display search results for the given query.
 * @param {string} query search query
 */
function displaySearchResults(query) {
    // Get the container for the search results
    let card_container = document.getElementById("search-container");

    // Add the "Showing Results for" line at the top
    let header = document.createElement("h1");
    header.innerHTML = `Showing Results for: ${query}`;
    card_container.appendChild(header);

    // Query the Firestore for items
    db.collection("items").get().then(items => {
        items.forEach(async doc => {
            let name = doc.data().name;
            if (name.toLowerCase().includes(query.toLowerCase())) {
                let price = doc.data().price;
                try {
                    // Fetch description from Wikipedia
                    var description = await fetchDescriptionFromWikipedia(doc.data().name);
                } catch (error) {
                    // if error/ couldnt fetch, use default description
                    var description = doc.data().description;
                }
                if (description == null) {
                    description = doc.data().description;
                }
                let code = doc.data().code;
                let price_history = doc.data().price_history;
                let update_history = doc.data().update_history;
                let image = doc.data().imageUrl;
                let review = doc.data().review;
                let condition = doc.data().condition;
                let value = doc.data().value;

                // Create a card for each item
                let card = document.createElement("div");
                card.className = "card favorited-item"; // Add CSS class for styling
                card.style.border = "1px solid #feb734";
                card.style.borderRadius = "5px";
                card.style.padding = "10px";
                card.style.marginBottom = "15px";
                card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

                card.innerHTML = `<div class="text-decoration-none text-dark">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col text-left-start">
                                        <h1 id="name">${name}</h5>
                                        <br><br><br>
                                        <h5 class="card-title">Current Price: $${price}</h5>
                                    </div>
                                    <img src=${image}" class="card-img-top col favorited-item-img" style="height:20vh; width:20vh">
                                </div>
                            </div>
                            <p class="card-text">${description}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>`;

                // Add event listener to each card for item details
                card.addEventListener('click', function () {
                    // Store item details in local storage and redirect to item page
                    localStorage.setItem('name', name);
                    localStorage.setItem('price', price);
                    localStorage.setItem('description', description);
                    localStorage.setItem('code', code);
                    localStorage.setItem('price_history', price_history);
                    localStorage.setItem('update_history', update_history);
                    localStorage.setItem('imageUrl', image);
                    localStorage.setItem('review', review);
                    localStorage.setItem('condition', condition);
                    localStorage.setItem('value', value);
                    window.location.href = '../main_pages/item_page.html';
                });
                card_container.appendChild(card);
            }
        });
    });

    // Add padding to the container to create space around the cards
    card_container.style.padding = "20px";
}
