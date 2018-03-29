import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }


  public getCrime(crime_end_type, crime_type) {
    return this.http.post('http://localhost:5000/api/crime', { crime_end_type: crime_end_type, crime_type: crime_type });

  }

  public getWork(wvtName, typeName, branch) {
    return this.http.post('http://localhost:5000/api/work', { worker_type_name: wvtName, value_type_name: typeName, branch_name: branch });
  }

  public getEducation(gender, eduTypeName) {
    return this.http.post('http://localhost:5000/api/education', { gender: gender, educationType: eduTypeName });
  }

  public getCrimeType() {
    return this.http.get('http://localhost:5000/api/crime-types');
  }

  public getWorkValueType() {
    return this.http.get('http://localhost:5000/api/work-types');
  }

  public getEducationType() {
    return this.http.get('http://localhost:5000/api/education-types');
  }

}
