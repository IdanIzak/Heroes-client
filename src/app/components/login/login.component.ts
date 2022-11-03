import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit, DoCheck, OnDestroy {
  loginForm!: FormGroup;
  loginFailed: boolean = this.authService.loginFailed;
  loggedinSub:Subscription = new Subscription();
  isLoggedin:boolean = false;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedinSub = this.authService.isloggedin.subscribe({next:(val)=>{
    this.isLoggedin = val
    }, error:(err)=>{
    console.log(err)
    }})

    this.loginForm = this.fb.group({
      username: ['', [this.validatorsService.required]],
      password: ['', [this.validatorsService.required, this.validatorsService.pattern(this.authService.pwPattern)]]
    });
  }

  ngDoCheck(): void {
    this.loginFailed = this.authService.loginFailed;
  }

  onSubmitLogin() {
    this.authService.onSubmitLogin(''+this.loginForm.get('username')?.value, ''+this.loginForm.get('password')?.value);

   }

  invalidPasswordMessage() {
    return this.authService.invalidPasswordMessage(this.loginForm);
  }

  invalidUsernameMessage() {
    return this.authService.invalidUsernameMessage(this.loginForm);
  }

  ngOnDestroy(): void {
    if(this.loggedinSub) this.loggedinSub.unsubscribe();
  }
}
