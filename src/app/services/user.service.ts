import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCount: string = UUID.UUID();
  userData = {
    id: '',
    username: '',
    password: '',
    userHeroes: []
  };
  user:any;

  constructor() { }

  storeUser(id: string, username: string, password: string, userHeroes: Hero[]) {
    localStorage.setItem(this.userData.username, JSON.stringify({id: id, username: username, password: password, userHeroes: userHeroes}));
  }

  getUser() {
    this.user = localStorage.getItem(this.userData.username);
    return JSON.parse(''+this.user);
  }
}
