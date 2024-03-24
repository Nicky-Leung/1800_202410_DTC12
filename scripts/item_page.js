
function show_item() {

    var name = localStorage.getItem('name');
    var price = localStorage.getItem('price');
    var description = localStorage.getItem('description');
    var code = localStorage.getItem('code');


    card_container = document.getElementById("item-information");
    card_container.innerHTML = "";
    card = document.createElement("div");
    card.innerHTML = `
    
    <br>
    <br>
    <div class="container-fluid" id="item-information">
    <div class="item" id="item" style = "display:flex">

        <h2>${name}</h2>
        <img style = "max-width:200px" src="images/${code}.jpg" alt="Item Image">
    </div>
    <div claass="card" id="cardi">
        <p>Price : 
        ${price}<br> Condition: Used <br> Colour: Black
        </p>
        <p>${description}</p>
        <a href="chart.html">Show Stats</a>


    </div>
    </div>`
    card_container.append(card)

}
show_item();