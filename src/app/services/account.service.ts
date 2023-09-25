import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../login/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   private user!: User;
   private baseUrl = "https://localhost:44349/api/Register";
   private authHeaders = HttpHeaders ;
  // private baseUrl = "http://localhost:55736/api";
  constructor(private http: HttpClient) {
    // this.authHeaders = new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // });
   }

  Register(FirstName : string , LastName : string , Gender : string , DateOfBirth : Date , MobileNumber : string ,EmailId: string,Password : string): Observable<any> {
    this.user = new User();
    this.user.FirstName = FirstName;
    this.user.LastName = LastName;
    this.user.Gender = Gender;
    this.user.DateOfBirth = (DateOfBirth);
    this.user.MobileNumber = MobileNumber;
    this.user.EmailId = EmailId;
    this.user.Password = Password;
    console.log("User is ", this.user);
    return this.http.post(`${this.baseUrl}/Register`, this.user);
  }

  Login(EmailId : string, Password : string){
    this.user = new User();
    this.user.EmailId = EmailId;
    this.user.Password = Password;
    console.log(this.user);
    
    return this.http.post(`${this.baseUrl}/Login`, this.user);

  }
}
