let adaID=0;
const price = document.querySelector(".closing_price");
const rate = document.querySelector(".fluctate_rate_24H");
const traded = document.querySelector(".units_traded");
const options = {method: 'GET', headers: {accept: 'application/json'}};

function adaUpdate() {
    fetch('https://api.bithumb.com/public/ticker/ADA_KRW', options)
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(data => {
      price.textContent = data.data.closing_price;
      traded.textContent = data.data.units_traded;


      if(((data.data.closing_price - data.data.prev_closing_price) / data.data.prev_closing_price * 100) >= 0) {
        rate.textContent = '+'+((data.data.closing_price - data.data.prev_closing_price) / data.data.prev_closing_price * 100).toFixed(2)+'%';
        rate.style.color = "red";
      }
      else {
        rate.textContent = ((data.data.closing_price - data.data.prev_closing_price) / data.data.prev_closing_price * 100).toFixed(2)+'%';
        rate.style.color = "blue";
      }
      //console.log(data);
    })
    .catch(err => console.error(err));
}












var chart;
var series = [
    { name: 'ADA', data: [] },
];

function ticker(idx) {
    url = 'https://api.bithumb.com/public/ticker/' + series[idx].name + '_KRW';
    $.get(url, function(data, status){
        point = [new Date().getTime(), parseFloat(data['data']['closing_price'])];

        var series = chart.series[idx],
            shift = series.data.length > 1000;
        chart.series[idx].addPoint(point, true, shift);
    }, 'json');
}

function requestData() {
    for (var idx in series){
        ticker(idx);
    }
    setTimeout(requestData, 500);
}

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'stock-graph',
            events: {
                load: requestData
            }
        },
        credits: {
          enabled: 1
        },
        accessibility: {
          enabled: false
        },
        exporting: {
          buttons: {
               contextButton: {
                   enabled: false
               }
          }
        },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              }
          }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: series
    });
});












adaID = setInterval(adaUpdate, 1000);