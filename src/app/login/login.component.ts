import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  isRegisterClicked: boolean = false;
  LoginForm!: FormGroup;
  sub$?: Subscription;
  submitted: boolean = false;
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(private service: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({    
      emailId: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  getControl(key: string): AbstractControl {
    return this.LoginForm.get(key) as AbstractControl;
  }

  get f(): { [controlName: string]: AbstractControl } {
    return this.LoginForm.controls;
  }
  onSubmit(): void {
   
    console.log(this.f['emailId'].value);
    console.log(this.f['password'].value);

      this.sub$ = this.service.Login(
      
        this.f['emailId'].value,
        this.f['password'].value,
              
      ).subscribe({
        next: (data) => {
          console.log(data);
          // sessionStorage.setItem("token", data.access_token);
        },
        error: (err) => {
          console.error(err.status);
          // this.statusCode = err.status;
          // console.log("Status Codr is ", this.statusCode);
          // this.duplicateStatus = true;
        }
      });

      // this.formValid = true;
    //}
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }

}
