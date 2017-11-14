import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {

  sensors = [];
  constructor() { }

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

}
