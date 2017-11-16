import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';
import {GlobalService} from './global-service';

@Injectable()
export class AssetsService {
  private baseUrl = 'http://localhost:3000/baas';

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
      httpClient.get(`${baseUrl}/assets/transactions`, {params: {asset: assetId, accountId: accountId || globalService.accountId}})
        .subscribe(data => resolve(_.map(data, transactionMapper)), reject);
    });
  }

  assetsListMapper(asset) {
    return {
      asset: asset,
      id: asset.dataRecord.name,
      name: asset.dataRecord.name,
      checkIn: moment().subtract( Math.random() * 12, 'hours').valueOf(),
      dueDate: moment().add(5, 'days').valueOf(),
      lat: asset.dataRecord.latitude,
      long: asset.dataRecord.longitude,
      sensorType: 'Temperature',
      rangeError: Math.random() > 0.5
    };
  }

  transactionMapper(transaction) {
    const block = {};
    block['blockId'] = transaction.id;
    if (transaction.data.temperature) {
      block['temperature'] = transaction.data.temperature;
      block['timeStamp'] = transaction.data.timestamp;
      block['temperature'] = transaction.data.temperature;
      block['lat'] = transaction.data.latitude;
      block['long'] = transaction.data.longitude;
      block['rangeError'] = transaction.data.temperature < 30 || transaction.data.temperature > 80;
    } else {
      block['data'] = transaction.data;
    }

    return block;
  }
}
