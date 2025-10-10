import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BillModel} from '../interfaces/bill.model';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl = 'https://strapi-cloud-template-blog-ab0ea8f6c9.onrender.com/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${id}`);
  }

  postTask(bill: BillModel): Observable<any> {
    const { id, ...data } = bill;
    return this.http.post(`${this.apiUrl}/tasks`, { data: data });
  }

  putTask(bill: BillModel): Observable<any> {
    const { id, documentId, ...data } = bill;
    return this.http.put(`${this.apiUrl}/tasks/${documentId}`, { data: data });
  }

  deleteTask(bill: BillModel): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${bill.documentId}`);
  }
}
