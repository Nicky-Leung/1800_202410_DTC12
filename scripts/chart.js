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

