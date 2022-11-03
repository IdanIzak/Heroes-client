import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHeroesComponent } from './components/heroes-page/all-heroes/all-heroes.component';
import { MyHeroesComponent } from './components/heroes-page/my-heroes/my-heroes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeroesPageGuard } from './guards/heroes-page.guard';

const routes: Routes = [
  {path: '', redirectTo: '/my-heroes', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'all-heroes', component: AllHeroesComponent, canActivate: [HeroesPageGuard]},
  {path: 'my-heroes', component: MyHeroesComponent, canActivate: [HeroesPageGuard]},
  {path: '**', redirectTo: '/my-heroes'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
