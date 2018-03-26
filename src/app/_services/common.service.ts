import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  public getCrime() {
    return this.http.post('http://localhost:5000/api/crime', {});
  }

  public getWork() {
    return this.http.post('http://localhost:5000/api/work', {});
  }

  public getEducation() {
    return this.http.post('http://localhost:5000/api/education', {});
  }

}
