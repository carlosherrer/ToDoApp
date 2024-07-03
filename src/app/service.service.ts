import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  taskName: string;
  taskDescription: string;
  date: string;
  assignedPerson: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:5035/api';

  constructor(private http: HttpClient) { }

  validateUser(loginObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Users/Validate`, loginObj);
  }

  getTasks(data?: any): Observable<any[]> {
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

  getFilteredTasks(status?: string, assignedPerson?: string): Observable<TaskItem[]> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    if (assignedPerson) {
      params = params.append('assignedPerson', assignedPerson);
    }
    return this.http.get<TaskItem[]>(`${this.baseUrl}/TaskItems/TaskItems`, { params });
  }
}

