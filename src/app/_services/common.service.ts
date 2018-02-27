import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

  url = "http://localhost:5000/"

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url + "api/crime/");
  }

}
