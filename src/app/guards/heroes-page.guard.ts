import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesPageGuard implements CanActivate {
  loggedinSub:Subscription = new Subscription();
  isLoggedIn:boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loggedinSub = this.authService.isloggedin.subscribe({next:(val)=>{
        this.isLoggedIn = val
        }, error:(err)=>{
        console.log(err)
        }})

      if(this.isLoggedIn)
        return true;
    return this.router.createUrlTree(['/login']);
   }

   ngOnDestroy(): void {
     if(this.authService.isloggedin) this.authService.isloggedin.unsubscribe();
   }
}
