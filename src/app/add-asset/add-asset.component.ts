import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../shared/services/global-service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {

  sensors = [];
  assetname: '';
  sensor: '';
  min: '';
  max: '';
  date: '';
  constructor(private router: Router, private globalService: GlobalService) {}
  ngOnInit() {
    this.sensors = [
      {
        name: 'temperature',
        value: 'temperature'
      },
      {
        name: 'pressure',
        value: 'pressure'
      }
    ];
  }

  onBackClick() {
    this.router.navigate(['/assets']);
  }
  onAddAsset() {
    this.globalService.assets.push({
      id: 'uuid' + Math.floor(100 * Math.random()),
      name: this.assetname,
      sensorType: this.sensor,
      dueDate: this.date
    });
    console.log(this.globalService.assets);
    this.router.navigate(['/assets']);
  }

}
