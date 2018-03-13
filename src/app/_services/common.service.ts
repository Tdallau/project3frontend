import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getCrime(crime_end_type = 'Geregistreerde misdrijven') {
    return this.http.post(this.url + 'api/crime', { 'crime_end_type' : crime_end_type})
      .map(result => result);
  }

  getWork(wvtName = 'Banen') {
    return this.http.post(this.url + 'api/work', { 'wvtName' : wvtName})
      .map(result => result);
  }

  getEducation(gender = 'Totaal mannen en vrouwen') {
    return this.http.post(this.url + 'api/education', { 'gender' : gender})
      .map(result => result);
  }

  merge_array(array1, array2) {
    const result_array = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while (len--) {
      const item = arr[len];

        if (!assoc[item]) {
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}

}
