import { Injectable,  } from '@angular/core';
import { CommonDAO } from '../interface/CommonDAO';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {

private readonly url: string;

  constructor( url: string, private httpClient: HttpClient ) {
    this.url = url;
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url );
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/id/' + id);
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update', t);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/' + id);
  }
}
