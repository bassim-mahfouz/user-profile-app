import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../objects/bussinessObjects/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  generic_url = "http://localhost:8080/profiles/";
  
  constructor(private http: HttpClient) {}

  getProfileList(): Observable<any> {    
    return this.http.get<any[]>(`${this.generic_url}/getProfileList`);
  }
  
  getProfileById(id: number): Observable<any> {
    return this.http.post<any>(`${this.generic_url}/getProfileById`, { id });
  }

  deleteProfileById(id: number): Observable<any> {
    return this.http.post<any>(`${this.generic_url}/deleteProfileById`, { id });
  }

  addProfileById(profile : Profile): Observable<any> {
    return this.http.post<any>(`${this.generic_url}/addProfileById`, { profile : profile });
  }

  updateProfileById(profile : Profile): Observable<any> {
    return this.http.post<any>(`${this.generic_url}/updateProfileById`, { profile : profile });
  }


}
