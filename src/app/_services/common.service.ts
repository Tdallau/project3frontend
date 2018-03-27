import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

<<<<<<< HEAD
  public getCrime(crime_end_type, crime_type) {
    return this.http.post('http://localhost:5000/api/crime', {crime_end_type : crime_end_type, crime_type_name : crime_type});
=======
  public getCrime(crime_end_type = 'Geregistreerde misdrijven', crime_type = '') {
    return this.http.post('http://localhost:5000/api/crime', {crime_end_type : crime_end_type, crime_type : crime_type});
>>>>>>> 8b6b429f8f1c7ca42dcb46f81808ab771b1f2b27
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
