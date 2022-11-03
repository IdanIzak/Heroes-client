import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesPageComponent } from './components/heroes-page/heroes-page.component';
import { HeaderComponent } from './components/heroes-page/header/header.component';
import { AllHeroesComponent } from './components/heroes-page/all-heroes/all-heroes.component';
import { MyHeroesComponent } from './components/heroes-page/my-heroes/my-heroes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroCardComponent } from './components/heroes-page/hero-card/hero-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesPageComponent,
    HeaderComponent,
    AllHeroesComponent,
    MyHeroesComponent,
    LoginComponent,
    SignupComponent,
    HeroCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
