import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:5035/api';

  constructor(private http: HttpClient) { }

  validateUser(loginObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Users/Validate`, loginObj);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/TaskItems`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/TaskItems`, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/TaskItems/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/TaskItems/${taskId}`);
  }
}

