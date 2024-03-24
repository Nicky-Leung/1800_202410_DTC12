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

function show_chart () {
const data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
        label: 'Price History',
        data: localStorage.getItem('price_history').split(",").reverse(),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }
    ]
};

new Chart(document.getElementById('chart'), {

    type: 'line',
    data: data,

});

const radardata = {
    labels: ['User Review', 'Critic Review', 'Price', 'Popularity'],
    datasets: [{
        label: 'Review',
        data: [4, 3, 2, 4],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }
    ]

};


new Chart(document.getElementById('radarchart'), {

    type: 'radar',
    data: radardata,
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 5
            }
        }
    }
});
}
show_chart();
show_item();
