import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Profile } from '../../objects/bussinessObjects/profile';


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

function basicDetails(user: any) {
    const { id, username, firstName, lastName } = user;
    return { id, username, firstName, lastName };
}

function getInitialProfileList() {
    return [{id:1, username : "bmahfouz", firstName:"bassim", lastName:"mahfouz"},
            {id:2, username : "wmahfouz", firstName:"wassim", lastName:"mahfouz"},
            {id:3, username : "nmahfouz", firstName:"nassim", lastName:"mahfouz"}];
}

function getProfileList() {
    // var profileList = users.map(x => basicDetails(x));
    return getResponse(users);  
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
    return getResponse('OK');  
}

function addProfileById(body : any) {
    users.push(body.profile)
    return getResponse('OK');  
}

function updateProfileById(body : any) {
    var id = body.profile.id;
    users = users.map(user =>
        user.id === id ? { ...user, ...body.profile } : user
      );
    return getResponse('OK');  
}

function getResponse(body : any){
    return of(new HttpResponse({ status: 200, body: body })).pipe(delay(500)); 
}