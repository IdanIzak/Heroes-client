import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HeroService } from 'src/app/services/hero.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username?: string = this.userService.userData.username;
  loggedinSub:Subscription = new Subscription();
  isLoggedIn:boolean = false;
  isMyHeroesEmpty:boolean = true;

  constructor(private heroService: HeroService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedinSub = this.authService.isloggedin.subscribe({next:(val)=>{
      this.isLoggedIn = val
      }, error:(err)=>{
      console.log(err)
      }})

      this.isMyHeroesEmpty = this.heroService.myHeroes.length === 0
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  logout(){
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.heroService.myHeroes);
    this.heroService.myHeroes = [];
    this.heroService.allHeroes = this.heroService.resetAllHeroes();
    this.authService.isloggedin.next(false);
  }

  ngOnDestroy(): void {
    if(this.loggedinSub) this.loggedinSub.unsubscribe();
  }
}
