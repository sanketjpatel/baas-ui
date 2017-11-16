import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class AssetsService {
  private baseUrl = 'http://localhost:3000/baas';

  constructor(private httpClient: HttpClient) {
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

  assetsListMapper(asset) {
    return {
      assetId: asset.asset,
      id: asset.dataRecord.name,
      name: asset.dataRecord.name,
      checkIn: moment().valueOf(),
      dueDate: moment().add(5, 'days').valueOf(),
      lat: Math.random() * 180 - 90,
      long: Math.random() * 360 - 180,
      sensorType: 'Temperature',
      rangeError: true
    };
  }
}
