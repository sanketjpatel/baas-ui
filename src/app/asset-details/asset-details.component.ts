import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
declare let google: any;

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetDetailsComponent implements OnInit {

  centerLat: number;
  centerLng: number;
  fitbounds: any;
  map: any;
  centerPoint: any;
  urlLocationId: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.initMap();
  }

  onBackClick() {
    this.router.navigate(['/assets']);
  }

  initMap() {
    const uluru = {lat: 41.878, lng: -87.62};
    const styledMapType = new google.maps.StyledMapType([
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#212121'
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#212121'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#181818'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1b1b1b'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#2c2c2c'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8a8a8a'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#373737'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#3c3c3c'
          }
        ]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
          {
            color: '#4e4e4e'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#3d3d3d'
          }
        ]
      }
    ]);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    const marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
}
