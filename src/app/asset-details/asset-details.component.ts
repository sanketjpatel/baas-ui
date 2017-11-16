import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import MAPCONFIG from './map-config';
import CHART_THEME from './chart-theme';


import * as _ from 'lodash';
import * as moment from 'moment';
import {MatSort, MatTableDataSource} from '@angular/material';
import {GlobalService} from '../shared/services/global-service';
import {AssetsService} from '../shared/services/assets-service';

declare let google: any;
declare let Highcharts: any;

export interface Element {
  blockId: string;
  timeStamp: number;
  temperature: number;
  lat: number;
  long: number;
  rangeError: boolean;
}

const ELEMENT_DATA: Element[] = [];

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
  assetName: any;
  assetData: any;
  dummyDataBlock = {
    blockId: 'id2',
    timeStamp: moment().unix(),
    temperature: 55,
    lat: 41.7953615,
    long: -87.1388979,
    rangeError: false
  };

  displayedColumns = ['timeStamp', 'temperature', 'lat', 'long', 'rangeError', 'block'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
   data: object;
   showPopover = false;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assetsService: AssetsService
  ) {
    this.alertFreePlotLineColor = '#289DDD';
    this.alertFreePlotBandColor = '#26323A';
    this.alertPlotBandColor = 'rgba(253, 82, 85, 0.2)';
    this.alertPlotLineColor = '#F00';
  }

  clean(arrayVar) {
    while(arrayVar.length) {
      arrayVar.pop();
    }
  }

  ngOnInit() {
    let map;
    let marker;
    let assetData = [];
    Highcharts.setOptions(CHART_THEME);

    function temperatureTooltipFormatter() {
      const yValue = `${Number(this.y).toFixed()} °F`;
      const xValue = timeFormat(this.x);

      return `<span>Time: ${xValue}</span><br /><b>Temperature: ${yValue}</b><br/>`;
    }

    function timeFormat(epochTimeValue) {
      return moment(epochTimeValue * 1000).format('MMM DD h:mm a');
    }

    function timeLabelFormatter() {
      return timeFormat(this.value);
    }

    function markerClickCallback() {
      const blockData = assetData[this.index];

      const location = {lat: blockData.lat, lng: blockData.long};
      map.setCenter(location);
      marker.setPosition(location);
    }

    this.route.queryParams
      .subscribe(params => {
        this.assetName = params.assetName;
        this.assetsService.getAssetTransactions(params.assetId, params.accountId)
          .then(data => {
            this.assetData = data;
            if (this.assetData.length < 2) {
              this.assetData.push(this.dummyDataBlock);
            }
            assetData = this.assetData;
            this.clean(ELEMENT_DATA);
            _.forEach(this.assetData, obs => ELEMENT_DATA.push(obs));
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);

            this.centerLat = this.assetData[0].lat;
            this.centerLng = this.assetData[0].long;

            const mapMarker = this.initMap();
            map = mapMarker[0];
            marker = mapMarker[1];
            this.updateChart({
              observationsData: _.map(this.assetData, (observation: any) => [observation.timeStamp, observation.temperature]),
              plotBandMaxValue: 80,
              plotBandMinValue: 30,
              yMax: 90,
              yMin: 20,
              xAxisFormatter: timeLabelFormatter,
              tooltipFormatter: temperatureTooltipFormatter,
              markerClickCallback: markerClickCallback,
              alertLevel: 'high'
            });
          });
      });
  }

  onBackClick() {
    this.router.navigate(['/assets']);
  }

  getIconUrl(location) {
    return location.locationAlertType === 'high' ? '../assets/images/red-alert.svg' : '../assets/images/no-alert.svg';
  }

  showData(data) {
    this.data = data;
    this.showPopover = true;
  }

  hidePopover() {
    this.showPopover = false;
  }

  initMap() {
    const location = {lat: this.centerLat, lng: this.centerLng};
    const styledMapType = new google.maps.StyledMapType(MAPCONFIG);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: location,
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
      position: location,
      icon: image,
      map: map
    });

    return [map, marker];
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
    const markerClickCallback = _.get(options, 'markerClickCallback', _.noop);
    const observationValues = _.map(observationData, '1');

    const observationsMin = _.min(observationValues);
    const observationsMax = _.max(observationValues);

    let yMin = _.min([plotBandMinValue, observationsMin]);
    let yMax = _.max([plotBandMaxValue, observationsMax]);
    const range = yMax - yMin;
    yMax += range / 10;
    yMin -= range / 10;
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
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: markerClickCallback
            }
          }
        }
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
