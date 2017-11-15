import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import MAPCONFIG from './map-config';

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

  constructor(private router: Router) {
    this.centerLat = 41.878;
    this.centerLng = -87.62;
  }

  ngOnInit() {
    this.initMap();
  }

  onBackClick() {
    this.router.navigate(['/assets']);
  }

  initMap() {
    const uluru = {lat: this.centerLat, lng: this.centerLng};
    const styledMapType = new google.maps.StyledMapType(MAPCONFIG);
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
