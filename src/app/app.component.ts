
import { Component } from '@angular/core';
import { ProfileApiService } from './services/apis/profile-api.service';
import { catchError, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Profile } from './objects/bussinessObjects/Profile';
import { Permission } from './objects/enums/Permission';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule,TableModule,SplitterModule,PanelModule,CalendarModule,MultiSelectModule,
            MenuModule,ToastModule,ReactiveFormsModule,InputTextModule,FormsModule,FlexLayoutModule,MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'profile';
  errorMessage ="";
  profileList : Profile[] =[];
  actionItems: MenuItem[] = [];
  selectedProfile: any ;
  isProfileSelected : boolean = false;
  formGroup: FormGroup = this.initializeForm();
  permissionList! :any[];
  values! :any[];
  messages :any[] = [];
  constructor(private profileApiService : ProfileApiService,private datePipe :DatePipe){}

  ngOnInit(){
    this.getProfileList();
    this.initializeActionItems();
    this.initializePermissionList();
  }

  // initiazation functions
  initializeActionItems() {
    this.actionItems = [
      { label: 'Update', icon: 'pi pi-pencil', command: (event) => this.editProfile() },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => this.deleteProfile() }
    ];
  }

  initializeForm(){
    return new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      permission: new FormControl(''),
      birthDate: new FormControl('')});
  }

  initializePermissionList(){
    this.permissionList = Object.keys(Permission).map(key => ({
      name: Permission[key as keyof typeof Permission], 
      code: key                                   
  }));
  }

  // Action Functions
  onClearClicked(){
    this.formGroup = this.initializeForm();
    this.isProfileSelected = false;
  }

  onSaveClicked(){
    this.isProfileSelected? this.updateProfile():this.addProfile();
  }

  // APIs call
  getProfileList() {
    this.profileApiService.getProfileList().pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching profile list';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        this.profileList = response.profileList;
      }
    );
  }

  deleteProfile() {
    this.profileApiService.deleteProfileById(this.selectedProfile.id).pipe(
      catchError(error => {
        this.errorMessage = 'Error deleting profile by Id';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        this.handleResponse(response)
        this.refreshScreen();
      }
    );
  }

  addProfile() {
  
    var profile = this.fillProfileFromForm();
    if(profile!==undefined){
    this.profileApiService.addProfileById(profile).pipe(
      catchError(error => {
        this.errorMessage = 'Error adding a profile';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        this.handleResponse(response)
        this.refreshScreen();
      }
    );
  }
  }

  updateProfile() {
    var profile = this.fillProfileFromForm();
    if(profile!==undefined){
    this.profileApiService.updateProfileById(profile).pipe(
      catchError(error => {
        this.errorMessage = 'Error updating a profile';
        console.error(error);
        return of([error]);
      })
    ).subscribe(
      (response) => {
        this.handleResponse(response)
        this.refreshScreen();
      }
    );
  }
  }

  fillProfileFromForm(){
    var id = this.isProfileSelected?this.selectedProfile.id:this.generateId();
    var firstName   = this.getFormValue("firstname");
    var lastName    = this.getFormValue("lastname");
    var birthDate   = this.getFormValue("birthDate");
    var permission  = this.getFormValue("permission");
    
    if(firstName==="" || lastName==="" || lastName==="" || birthDate==="" || permission===""){
      this.showMessages('error','Please fill all the fields');
      return undefined;
    }
    return new Profile(id,firstName,lastName,birthDate,permission);
  }
  
  // Helper Functions
  editProfile(){
    this.setFormField('firstname',this.selectedProfile.firstName);
    this.setFormField('lastname',this.selectedProfile.lastName);
    this.setFormField('permission',this.selectedProfile.permission);
    this.setFormField('birthDate',this.selectedProfile.birthDate);
    this.isProfileSelected = true;
  }

  getFormValue(fieldName:string){
    return this.formGroup.get(fieldName)?.value;  
  }

  setFormField(fieldName:string,fieldValue:any){
    this.formGroup.get(fieldName)?.setValue(fieldValue);
  }

  generateId(){
    return Math.random().toString(36).substr(2, 9);
  }

  refreshScreen(){
    this.isProfileSelected = false;
    this.selectedProfile = {};
    this.formGroup = this.initializeForm();
    this.getProfileList();
  }

  formateDate(date:Date){
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  
  getSaveActionLabel(){
    return this.isProfileSelected? 'Modify':'Add';
  }

  selectProfile(profile: any, menu: any, event: any) {
    this.selectedProfile = profile;
    menu.toggle(event);
  }

  showMessages(severity : string,summary:string) {
    this.messages = [
        { severity: severity, summary: summary }
    ];
  }

  handleResponse(response:any){
    if(response.status !=='OK'){
      this.showMessages('error','Error, Please contact the support');  
    }
  }
}

