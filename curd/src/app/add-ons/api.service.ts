import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Datas} from '../add-ons/datas'
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/users`;


@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

editvalue=false;
idvalue!: any;

 getAll() {
    return this.http.get(baseUrl).pipe(catchError(this.errorHandler))
}

getById(id: any) {
    return this.http.get(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler))
}

create(params: any) {
  return this.http.post<Datas>(baseUrl,params).pipe(catchError(this.errorHandler))
}
update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params).pipe(catchError(this.errorHandler))
}

delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(catchError(this.errorHandler))
}
errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
