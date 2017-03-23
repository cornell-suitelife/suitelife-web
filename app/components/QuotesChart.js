import React, { Component } from 'react';
import { Pie, Bar } from 'react-chartjs-2';

class QuotesChart extends Component {
  render() {

    var quoters = {};

    for (var i = 0; i < this.props.quotes.length; i++) {
      const author = this.props.quotes[i].author;
      if (author in quoters) quoters[author] += 1;
      else quoters[author] = 1;
    }

    const quoterKeys = Object.keys(quoters)
    quoterKeys.sort((a, b) => {
      return quoters[a] > quoters[b];
    });

    const data = {
        labels: quoterKeys,
        datasets: [
          {
            label: 'Quotes',
            data: quoterKeys.map((key, i) => quoters[key]),
            backgroundColor: [
              '#2ecc71',
              '#3498db',
              '#f1c40f',
              '#e67e22',
              '#e74c3c',
              '#9b59b6'
            ]
          }
        ]
    };

    const pieOptions = {
      title: {
        display: true,
        text: 'Number of Quotes per Suite Member'
      }
    };

    const barOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return (
      <div>
        <Pie data={data} options={pieOptions}/>
        <br />
        <Bar data={data} options={barOptions}/>
      </div>
    );
  }
}

export default QuotesChart;
