import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';
import {GlobalService} from "./global-service";

@Injectable()
export class AssetsService {
  private baseUrl = 'http://10.36.30.141:3000/baas';

  constructor(private httpClient: HttpClient, private globalService: GlobalService) {
  }

  getAssetsList() {
    const httpClient = this.httpClient;
    const baseUrl = this.baseUrl;
    const assetMapper = this.assetsListMapper;

    return new Promise(function (resolve, reject) {
      httpClient.get(`${baseUrl}/assets`).subscribe(data => {
        // Read the result field from the JSON response.
        return resolve(_.map(data, assetMapper));
      });
    });
  }

  getAssetTransactions(assetId, accountId) {
    const httpClient = this.httpClient;
    const baseUrl = this.baseUrl;
    const transactionMapper = this.transactionMapper;
    const globalService = this.globalService;

    return new Promise(function (resolve, reject) {
      httpClient.get(`${baseUrl}/assets/transactions`, {params: {asset: assetId, accountId: accountId || globalService.accountId}}).subscribe(data => {
        // Read the result field from the JSON response.
        return resolve(_.map(data, transactionMapper));
      });
    });
  }

  assetsListMapper(asset) {
    // console.log(asset);
    return {
      asset: asset,
      id: asset.dataRecord.name,
      name: asset.dataRecord.name,
      checkIn: moment().subtract( Math.random() * 12, 'hours').valueOf(),
      dueDate: moment().add(5, 'days').valueOf(),
      lat: asset.dataRecord.latitude,
      long: asset.dataRecord.longitude,
      sensorType: 'Temperature',
      rangeError: true
    };
  }

  transactionMapper(transaction) {
    // console.log(asset);
    return transaction;
  }
}
