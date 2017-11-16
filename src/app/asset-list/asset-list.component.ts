import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { GlobalService } from '../shared/services/global-service';
import { AssetsService } from '../shared/services/assets-service';
import * as _ from 'lodash';
import 'rxjs/Rx';

export interface Element {
  id: string;
  name: string;
  checkIn: string;
  dueDate: string;
  lat: string;
  long: string;
  sensorType: string;
  rangeError: string;
}

const ELEMENT_DATA: Element[] = [];

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetListComponent implements OnInit {

  displayedColumns = ['name', 'checkIn', 'dueDate', 'lat', 'long', 'sensorType', 'rangeError', 'details'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private assetsService: AssetsService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.assetsService.getAssetsList().then(data => {
      _.forEach(data, record => {
        ELEMENT_DATA.push(record);
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  onAddAsset() {
    return this.router.navigate(['/add-asset']);
  }

  navigateToAsset(asset) {
    this.globalService.asset = asset;
    this.router.navigate(['/asset-details'], {queryParams: {assetId: asset.asset, assetName: asset.dataRecord.name, accountId: this.globalService.accountId}});
  }

  goToAdv() {
    return this.router.navigate(['/advanced']);
  }
}
