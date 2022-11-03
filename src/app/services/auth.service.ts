import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginFailed: boolean = false;
  pwPattern: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$';
  isloggedin = new BehaviorSubject<any>(false);

  constructor(private userService: UserService, private router: Router, private heroService: HeroService) {}

  signup(username:string, password:string) {
    this.userService.userData.id = this.userService.usersCount;
    this.userService.userData.username = username;
    this.userService.userData.password = password;
    this.userService.userData.userHeroes = [];
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.userService.userData.userHeroes);
    this.router.navigate(['login']);
  }

  passwordMismatchMessage(signupForm: FormGroup) {
    if(signupForm.get('repeatPassword')?.errors?.['required'])
      return 'You must repeat the password.'
    if(signupForm.get('password') !== signupForm.get('repeatPassword'))
      return 'The two passwords must be identical.';
    return null;
  }

  invalidUsernameMessage(form: FormGroup) {
    if(form.get('username')?.errors?.['required'])
      return "You must enter a username.";
    return null;
  }

  invalidPasswordMessage(form: FormGroup) {
    if(form.get('password')?.errors?.['required'])
      return "You must enter a password.";
    if(form.get('password')?.errors?.['pattern'])
      return "Password must contain at least 8 characters, including 1 big character, 1 digit and 1 special character.";
    return null;
  }

  onSubmitLogin(username:string, password:string) {
    this.userService.userData.username = username;
    this.userService.userData.password = password;
    const user = this.userService.getUser();

    if(!user) {
      this.loginFailed = true;
      return;
    }
    this.userService.userData.id = user.id;
    this.userService.userData.userHeroes = user.userHeroes;

    if(user.username == ''+this.userService.userData.username
      && user.password == ''+this.userService.userData.password)  // if the user's data is equal to the login data
        this.login(user);
    else {
      this.isloggedin.next(false);
      this.loginFailed = true;
    }
  }

  login(user:any) {
    this.isloggedin.next(true)
    this.loginFailed = false;
    this.heroService.myHeroes = user.userHeroes;
    if(this.heroService.myHeroes.length === 0)
      this.router.navigate(['/all-heroes']);
    else
      this.router.navigate(['/my-heroes']);
  }
}
