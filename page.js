const chart = Highcharts.chart('container', {
    title: {
        text: 'Audio chart'
    },
    series: [{
        data: [4, 5, 6, 5, 7, 9, 11, 13]
    }, {
        data: [1, 3, 4, 2]
    }]
});document.getElementById('sonify').onclick = () => chart.toggleSonify();