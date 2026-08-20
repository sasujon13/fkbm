import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl = 'https://kbmcollege.edu.bd/api';
  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getDivisions(): Observable<string[]> {
    const url = `${this.baseUrl}/divisions/`;
    return this.http.get<string[]>(url);
  }

  getDistricts(division: string): Observable<string[]> {
    const url = `${this.baseUrl}/districts/?division=${division}`;
    return this.http.get<string[]>(url);
  }

  getThanas(division: string, district: string): Observable<string[]> {
    const url = `${this.baseUrl}/thanas/?division=${division}&district=${district}`;
    return this.http.get<string[]>(url);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  saveJsonData(jsonData: any) {
    return this.http.post(`${this.baseUrl}/save_json_data/`, jsonData);
  }
  
  adminRedirect(){
    //return window.location.replace("http://127.0.0.1:8000/api/admin");
    window.location.href = `http://127.0.0.1:8000/admin/`;
    // window.location.href = `${this.baseUrl}/admin/`;
    return window.location.href;
  }

  getTeachers(): Observable<any[]> {
    const url = `${this.baseUrl}/teacher`;
    return this.http.get<string[]>(url);
  }

  getDepts(): Observable<any[]> {
    const url = `${this.baseUrl}/dept`;
    return this.http.get<string[]>(url);
  }

  getLinks(): Observable<any[]> {
    const url = `${this.baseUrl}/link`;
    return this.http.get<string[]>(url);
  }

  getDepartments(deptName: string): Observable<any[]> {
    const encodedName = encodeURIComponent(deptName);
    const url = `${this.baseUrl}/department/${encodedName}/`;
    return this.http.get<string[]>(url);
  }

  getExTeachers(): Observable<any[]> {
    const url = `${this.baseUrl}/exTeacher`;
    return this.http.get<string[]>(url);
  }

  getStaffs(): Observable<any[]> {
    const url = `${this.baseUrl}/staff`;
    return this.http.get<string[]>(url);
  }

  getExStaffs(): Observable<any[]> {
    const url = `${this.baseUrl}/exStaff`;
    return this.http.get<string[]>(url);
  }

  getOtherPeoples(): Observable<any[]> {
    const url = `${this.baseUrl}/otherPeople`;
    return this.http.get<string[]>(url);
  }

  getVideos(): Observable<any[]> {
    const url = `${this.baseUrl}/videos`;
    return this.http.get<string[]>(url);
  }

  getTeacherHonours(): Observable<any[]> {
    const url = `${this.baseUrl}/teacherHonours`;
    return this.http.get<string[]>(url);
  }

  getNonMpoStaff(): Observable<any[]> {
    const url = `${this.baseUrl}/nonMpoStaff`;
    return this.http.get<string[]>(url);
  }

  getNotifications(): Observable<any> {
    const url = `${this.baseUrl}/notice`;
    return this.http.get<string[]>(url);
  }

  getPost(id: number): Observable<any> {
    const url = `${this.baseUrl}/post/${id}`;
    return this.http.get<string[]>(url);
  }

  getRoutine(): Observable<any> {
    const url = `${this.baseUrl}/routine`;
    return this.http.get<string[]>(url);
  }

  getResult(): Observable<any> {
    const url = `${this.baseUrl}/result`;
    return this.http.get<string[]>(url);
  }
}
