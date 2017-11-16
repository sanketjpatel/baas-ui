import {Injectable} from '@angular/core';
import {HttpClient} from './http-wrapper';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AssetsService {
  private baseUrl = 'http://localhost:3000/baas';

  constructor(private httpClient: HttpClient) {
  }

  getAssetsList() {
    return this.httpClient.get(`${this.baseUrl}/assets`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }
}
