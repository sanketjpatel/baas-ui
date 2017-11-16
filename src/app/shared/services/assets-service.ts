import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AssetsService {
  private baseUrl = 'http://localhost:3000/baas';

  constructor(private httpClient: HttpClient) {
  }

  getAssetsList() {
    const httpClient = this.httpClient;
    const baseUrl = this.baseUrl;
    return new Promise(function (resolve, reject) {
      httpClient.get(`${baseUrl}/assets`).subscribe(data => {
        // Read the result field from the JSON response.
        return resolve(data);
      });
    });
  }

  assetsListMapper(asset) {

  }
}
