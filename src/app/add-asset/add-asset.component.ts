import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssetComponent implements OnInit {

  sensors = [];
  constructor(private router: Router) {}
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


}
