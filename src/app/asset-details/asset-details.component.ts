import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import MAPCONFIG from './map-config';
import CHART_THEME from './chart-theme';


import * as _ from 'lodash';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';

declare let google: any;
declare let Highcharts: any;

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetDetailsComponent implements OnInit {
  alertFreePlotLineColor: string;
  alertFreePlotBandColor: string;
  alertPlotBandColor: string;
  alertPlotLineColor: string;
  centerLat: number;
  centerLng: number;
  private assetId: string;

  displayedColumns = ['time', 'temp', 'lat', 'long', 'rangeError', 'block'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.centerLat = 41.878;
    this.centerLng = -87.62;
    this.alertFreePlotLineColor = '#289DDD';
    this.alertFreePlotBandColor = '#26323A';
    this.alertPlotBandColor = 'rgba(253, 82, 85, 0.2)';
    this.alertPlotLineColor = '#F00';
  }

  ngOnInit() {
    Highcharts.setOptions(CHART_THEME);

    this.route.params.subscribe(val => {
      this.assetId = val.assetId;
      this.initMap();
      this.updateChart({
        observationsData: [[1, 6], [2, 0], [3, 3], [4, 2]],
        plotBandMaxValue: 5,
        plotBandMinValue: 1,
        yMax: 8,
        yMin: -2,
        alertLevel: 'high'
      });
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
    const observationData = _.get(options, 'observationsData', []);
    const plotBandMaxValue = _.get(options, 'plotBandMaxValue');
    const plotBandMinValue = _.get(options, 'plotBandMinValue');
    const xAxisFormatter = _.get(options, 'xAxisFormatter');
    const yAxisFormatter = _.get(options, 'yAxisFormatter');
    const observationSeriesName = _.get(options, 'observationSeriesName');
    const tooltipFormatter = _.get(options, 'tooltipFormatter');
    const yAxisTitle = _.get(options, 'yAxisTitle');
    const alertLevel = _.get(options, 'alertLevel');
    const observationValues = _.map(observationData, '1');

    const observationsMin = _.min(observationValues);
    const observationsMax = _.max(observationValues);

    let yMin = _.min([plotBandMinValue, observationsMin]);
    let yMax = _.max([plotBandMaxValue, observationsMax]);
    const range = yMax - yMin;
    yMax += range / 20;
    yMin -= range / 20;
    const plotBandColor = alertLevel === 'high' ? this.alertPlotBandColor : this.alertFreePlotBandColor;
    const plotLineColor = alertLevel === 'high' ? this.alertPlotLineColor : this.alertFreePlotLineColor;

    const observationZones = [
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
        labels: {formatter: xAxisFormatter}
      },
      yAxis: {
        min: yMin,
        max: yMax,
        labels: {formatter: yAxisFormatter},
        title: {text: yAxisTitle},
        plotLines: [
          {
            color: plotLineColor,
            width: 1,
            value: plotBandMaxValue,
            id: 'maxPlotLine',
            zIndex: 2
          }, {
            color: plotLineColor,
            width: 1,
            value: plotBandMinValue,
            id: 'minPlotLine',
            zIndex: 2
          }
        ],
        plotBands: [{
          color: plotBandColor,
          from: plotBandMaxValue,
          to: Infinity,
          id: 'plotBandMax'
        }, {
          color: plotBandColor,
          from: -Infinity,
          to: plotBandMinValue,
          id: 'plotBandMin'
        }]
      },
      series: [
        {
          name: observationSeriesName,
          data: observationData,
          zones: observationZones
        }
      ],
      tooltip: {formatter: tooltipFormatter}
    };

    return Highcharts.chart('highcharts-container', chartOptions);
  }
}


export interface Element {
  id: string;
  time: string;
  temp: string;
  lat: string;
  long: string;
  rangeError: string;
}

const ELEMENT_DATA: Element[] = [
  {id: '1', time: 'Nov 14', temp: '22', lat: '35.92',
    long: '-77.03', rangeError: 'Yes'},
  {id: '2', time: 'Nov 14', temp: '21', lat: '35.92',
    long: '-77.03', rangeError: 'Yes'}
];
