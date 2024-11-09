import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileApiService } from './services/apis/profile-api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'profile';
  errorMessage ="";
  constructor(private profileApiService : ProfileApiService){
  }

  getProfileList() {
    this.profileApiService.getProfileList().pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching profile list';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        const text = response;
      }
    );
  }
  
  getProfileById() {
    this.profileApiService.getProfileById(1).pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching profile by Id';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        const text = response;
      }
    );
  }

  deleteProfileById() {
    this.profileApiService.deleteProfileById(1).pipe(
      catchError(error => {
        this.errorMessage = 'Error deleting profile by Id';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        const text = response;
      }
    );
  }

  addProfile() {
    var profile = {id:4, username : "sirine-Fatima", firstName:"bassim", lastName:"mahfouz"}
    this.profileApiService.addProfileById(profile).pipe(
      catchError(error => {
        this.errorMessage = 'Error adding a profile';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        const text = response;
      }
    );
  }
  
  updateProfile() {
    var profile = {id:1, username : "bboss", firstName:"bassim", lastName:"mahfouz"}
    this.profileApiService.updateProfileById(profile).pipe(
      catchError(error => {
        this.errorMessage = 'Error updating a profile';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        const text = response;
      }
    );
  }

}
