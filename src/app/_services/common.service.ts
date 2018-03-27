import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }


  public getCrime(crime_end_type, crime_type) {
    return this.http.post('http://localhost:5000/api/crime', {crime_end_type : crime_end_type, crime_type_name : crime_type});

  }

  public getWork() {
    return this.http.post('http://localhost:5000/api/work', {});
  }

  public getEducation() {
    return this.http.post('http://localhost:5000/api/education', {});
  }

  public getCrimeType() {
    return this.http.get('http://localhost:5000/api/crime-types');
  }

}
