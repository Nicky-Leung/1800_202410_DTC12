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
        data: [4,3,2,4],
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
