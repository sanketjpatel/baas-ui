import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AssetsService} from "../shared/services/assets-service";
import * as _ from 'lodash';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancedComponent implements OnInit {

  blockData: any;
  blockIds: any;
  displayData: any;
  accountId: any;
  assetName: any;

  constructor(private assetsService: AssetsService) { }
  ngOnInit() {
    this.displayData = undefined;
  }

  getBlockData() {
    this.displayData = undefined;
    this.assetsService.getAssetTransactions(this.assetName, this.accountId)
      .then(data => {
        console.log(data);
        this.blockData = data;
        this.blockIds = _.map(data, 'id');
      });
  }
  getBlock(id) {
    this.displayData = _.find(this.blockData, {id: id});
  }

}
