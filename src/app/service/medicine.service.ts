import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine } from '../model/Medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public baseAPIUrl: string = environment.apiUrl + '/api/';
  constructor(private http: HttpClient) { }

  getMedicine(): Observable<any> {
    return this.get(this.baseAPIUrl + "Medicine/GetMedicine");
  }

  updateMedicine(medicine: Medicine): Observable<any> {
    return this.post(this.baseAPIUrl + "Medicine/AddMedicine", medicine);
  }

  get(url: any): Observable<any> {
    let options: any;
    options = new HttpHeaders({ 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                              });
    return this.http.get(url, options);
  }

  post(url: any, data: any): Observable<any> {
    let options: any;
    options = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post(url, data, options);
  }

}
