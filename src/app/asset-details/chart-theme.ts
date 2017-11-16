const theme = {
  chart: {
    type: 'line',
    backgroundColor: '#282828',
    style: {fontFamily: `'Roboto', sans-serif`},
    plotBorderColor: '#606060'
  },
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aee', '#ff0066', '#eae', '#55BF3B', '#DF5353', '#7798BF', '#aee'],
  credits: {style: {display: 'none'}},
  drilldown: {
    activeAxisLabelStyle: {color: '#F0F0F0'},
    activeDataLabelStyle: {color: '#F0F0F0'}
  },
  labels: {style: {color: '#707070'}},
  legend: {
    enabled: false,
    itemStyle: {color: '#E0E0E0'},
    itemHoverStyle: {color: '#FFF'},
    itemHiddenStyle: {color: '#606060'}
  },
  navigation: {
    buttonOptions: {
      symbolStroke: '#DDD',
      theme: {fill: '#505050'}
    }
  },
  plotOptions: {
    series: {
      marker: {
        symbol: 'circle',
        radius: 4,
        lineWidth: 1
      }
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: '#505050',
      stroke: '#000',
      style: {color: '#CCC'},
      states: {
        hover: {
          fill: '#707070',
          stroke: '#000',
          style: {color: '#FFF'}
        },
        select: {
          fill: '#000',
          stroke: '#000',
          style: {color: '#FFF'}
        }
      }
    },
    inputBoxBorderColor: '#505050',
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {color: 'silver'}
  },
  title: {text: null},
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    crosshairs: true,
    shared: true,
    style: {color: '#F0F0F0'}
  },
  xAxis: {
    gridLineColor: '#707070',
    gridLineWidth: 1,
    labels: {style: {color: '#E0E0E0'}},
    lineColor: '#707070',
    minorGridLineColor: '#505050',
    tickColor: '#707070',
    tickWidth: 1,
    title: {style: {color: '#A0A0A0'}}
  },
  yAxis: {
    gridLineColor: '#707070',
    gridLineWidth: 1,
    labels: {style: {color: '#E0E0E0'}},
    lineColor: '#707070',
    minorGridLineColor: '#505050',
    tickColor: '#707070',
    tickWidth: 1,
    title: {style: {color: '#A0A0A0'}}
  }
};

export default theme;
