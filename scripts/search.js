document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    displaySearchResults(searchQuery);
});

function displaySearchResults(query) {
    db.collection("items").get().then(items => {
        items.forEach(async doc => {
            let name = doc.data().name;
            if (name.toLowerCase().includes(query.toLowerCase())) {
                let price = doc.data().price;
                try {
                    var description = await fetchDescriptionFromWikipedia(doc.data().name);
                } catch (error) {
                    var description = doc.data().description;
                }
                if (description == null) {
                    description = doc.data().description;
                }
                let code = doc.data().code;
                let price_history = doc.data().price_history;

                let card_container = document.getElementById("search-container");
                let card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<div class="text-decoration-none text-dark">
                                  <h1> Showing Results for: ${name}</h1>
                    <div class="card mb-3">
    
                        <div class="card-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col text-left-start">
                                        <h1 id="name">${name}</h5>
                                        <br><br><br>
                                        <h5 class="card-title">Current Price: ${price}</h5>
                                    </div>
                                    <img src="images/${code}.jpg" class="card-img-top col" style="height:20vh; width:20vh">
                                </div>
                            </div>
                            <p class="card-text">${description}</p>
                            <a class="btn btn-md" style="background-color: #FEB734" onclick='console.log("deleted item from my items"); event.stopPropagation(); deleteItem(event, this)'>Delete Item</a>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>`;

                card.addEventListener('click', function () {
                    localStorage.setItem('name', name);
                    localStorage.setItem('price', price);
                    localStorage.setItem('description', description);
                    localStorage.setItem('code', code);
                    localStorage.setItem('price_history', price_history);
                    window.location.href = 'item_page.html';
                });
                card_container.append(card);
            }
        });
    });
}
