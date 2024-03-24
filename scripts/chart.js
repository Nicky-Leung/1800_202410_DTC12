const chart = require('chart.js/auto');

const labels = Util.months({count: 7});
const data = {
    labels: labels,
    data: localStorage.getItem('price_history'),
    fill: false, 
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
}

new chart (document.getElementById('chart'), {

    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

});

    