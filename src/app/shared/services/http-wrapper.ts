import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createAuthorizationHeader() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('authToken'));
    return headers;
  }

  get(url, params = null) {
    const headers = this.createAuthorizationHeader();
    if (params) {
      const options = new RequestOptions(_.merge(params, {headers }));
      return this.http.get(url, options);
    }
    return this.http.get(url, {
      headers
    });
  }

  post(url, data) {
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers
    });
  }

  put(url, data) {
    const headers = this.createAuthorizationHeader();
    return this.http.put(url, data, {
      headers
    });
  }

  delete(url, data = null) {
    const headers = this.createAuthorizationHeader();
    headers.append('Content-Type', 'application/json');

    if (data) {
      const options = new RequestOptions(_.merge(data, {headers }));
      return this.http.delete(url, options);
    }

    return this.http.delete(url, {
      headers
    });
  }
}
