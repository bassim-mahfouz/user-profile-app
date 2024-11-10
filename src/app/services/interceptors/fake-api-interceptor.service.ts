import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Profile } from '../../objects/bussinessObjects/Profile';


const usersKey = 'profile-list';
let users: Profile[] = JSON.parse(localStorage.getItem(usersKey)!) || getInitialProfileList();

@Injectable()
export class FakeApiInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const { url, method, headers, body } = req;

    switch (true) {
        case url.endsWith('getProfileList') && method === 'GET':
          return getProfileList(); 
        case url.endsWith('getProfileById') && method ==='POST':
          return getProfileById(body)
        case url.endsWith('deleteProfileById') && method ==='POST':
          return deleteProfileById(body)
        case url.endsWith('addProfileById') && method ==='POST':
          return addProfileById(body)
        case url.endsWith('updateProfileById') && method ==='POST':
          return updateProfileById(body)
        default : 
          return next.handle(req);
    }
    
  }
  
}

function getInitialProfileList() {
    return [new Profile(1,"bassim","mahfouz",new Date(),['ADMINISTRATOR']),
            new Profile(2,"wassim","mahfouz",new Date(),['ACCOUNTING']),
            new Profile(3,"nassim","mahfouz",new Date(),['EMPLOYEE'])];
}

function getProfileList() {
    return getResponse({'profileList':users});  
}

function getProfileById(body : any) {
    var profile = users.find(x => x.id === body.id)
    return getResponse(profile);  
}

function deleteProfileById(body : any) {
    const index = users.findIndex(user => user.id === body.id);
    if (index !== -1) {
        users.splice(index, 1);
    }
    return getResponse({'status':'OK'});  
}

function addProfileById(body : any) {
    users.unshift(body.profile)
    return getResponse({'status':'OK'});  
}

function updateProfileById(body : any) {
    var id = body.profile.id;
    users = users.map(user =>
        user.id === id ? { ...user, ...body.profile } : user
      );
    return getResponse({'status':'OK'});  
}

function getResponse(body : any){
    return of(new HttpResponse({ status: 200, body: body })); 
}