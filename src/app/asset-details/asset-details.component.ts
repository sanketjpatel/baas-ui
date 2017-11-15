import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import MAPCONFIG from './map-config';


import * as _ from 'lodash';
import * as moment from 'moment';

declare let google: any;
declare let Highcharts: any;

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetDetailsComponent implements OnInit {

  centerLat: number;
  centerLng: number;
  private assetId: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.centerLat = 41.878;
    this.centerLng = -87.62;
  }

  ngOnInit() {
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
    Highcharts.setOptions(theme);

    this.route.params.subscribe(val => {
      this.assetId = val.assetId;
      this.initMap();
      this.updateChart({});
    });
  }

  onBackClick() {
    this.router.navigate(['/assets']);
  }

  getIconUrl(location) {
    return location.locationAlertType === 'high' ? '../assets/images/red-alert.svg' : '../assets/images/no-alert.svg';
  }

  initMap() {
    const uluru = {lat: this.centerLat, lng: this.centerLng};
    const styledMapType = new google.maps.StyledMapType(MAPCONFIG);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });
    const image = {
      url: this.getIconUrl(location),
      size: new google.maps.Size(16, 16),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16),
      scaledSize: new google.maps.Size(64, 64)
    };
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    const marker = new google.maps.Marker({
      position: uluru,
      icon: image,
      map: map
    });
  }

  updateChart(options) {
    // const observationData = _.get(options, 'observationsData', []);
    // const predictionData = _.get(options, 'predictionsData', []);
    const plotBandMaxValue = _.get(options, 'plotBandMaxValue');
    const plotBandMinValue = _.get(options, 'plotBandMinValue');
    const xAxisFormatter = _.get(options, 'xAxisFormatter');
    const yAxisFormatter = _.get(options, 'yAxisFormatter');
    // const observationSeriesName = _.get(options, 'observationSeriesName');
    // const predictionSeriesName = _.get(options, 'predictionSeriesName');
    const tooltipFormatter = _.get(options, 'tooltipFormatter');
    const yAxisTitle = _.get(options, 'yAxisTitle');
    const alertLevel = _.get(options, 'alertLevel');

    const currentTime = moment().valueOf();
    // const observationValues = _.map(observationData, '1');
    // const predictionValues = _.map(predictionData, '1');

    // const observationsMin = _.min(observationValues);
    // const observationsMax = _.max(observationValues);
    // const predictionsMin = _.min(predictionValues);
    // const predictionsMax = _.max(predictionValues);

    // const yMin = _.min([plotBandMinValue, _.min([observationsMin, predictionsMin])]);
    // const yMax = _.max([plotBandMaxValue, _.max([observationsMax, predictionsMax])]);
    // const plotBandColor = alertLevel === 'high' ? alertPlotBandColor : alertFreePlotBandColor;
    // const plotLineColor = alertLevel === 'high' ? alertPlotLineColor : alertFreePlotLineColor;

    const observationZones = [
      {
        value: plotBandMinValue,
        color: '#D09494'
      }, {
        value: plotBandMaxValue,
        color: '#9D9595'
      }, {
        color: '#D09494'
      }
    ];
    const predictionZones = [
      {
        value: plotBandMinValue,
        color: '#FD5255'
      }, {
        value: plotBandMaxValue,
        color: '#84C6FD'
      }, {
        color: '#FD5255'
      }
    ];

    const chartOptions = {
      xAxis: {
        labels: {formatter: xAxisFormatter},
        plotLines: [{
          color: '#FFF',
          width: 1.5,
          label: {
            text: 'NOW',
            align: 'top',
            x: 10,
            y: 20,
            zIndex: 2,
            style: {color: '#FFF', fontWeight: 'bold'},
            rotation: 0
          },
          value: currentTime,
          zIndex: 2
        }]
      },
      yAxis: {
        // min: yMin,
        // max: yMax,
        labels: {formatter: yAxisFormatter},
        title: {text: yAxisTitle},
        plotLines: [
          {
            // color: plotLineColor,
            width: 1,
            value: plotBandMaxValue,
            id: 'maxPlotLine',
            zIndex: 2
          }, {
            // color: plotLineColor,
            width: 1,
            value: plotBandMinValue,
            id: 'minPlotLine',
            zIndex: 2
          }
        ],
        plotBands: [{
          // color: plotBandColor,
          from: plotBandMinValue,
          to: plotBandMaxValue,
          id: 'plotBand'
        }]
      },
      series: [
        {
          // name: observationSeriesName,
          // data: observationData,
          data: [1, 3, 6, 9, 2],
          zones: observationZones
        // }, {
        //   // name: predictionSeriesName,
        //   data: predictionData,
        //   zones: predictionZones,
        //   marker: {radius: 5}
        // }, {
        //   data: [observationData[observationData.length - 1], predictionData[0]],
        //   enableMouseTracking: false,
        //   showInLegend: false,
        //   marker: {enabled: false},
        //   zones: predictionZones
        }
      ],
      tooltip: {formatter: tooltipFormatter}
    };

    return Highcharts.chart('highcharts-container', chartOptions);
  }
}
