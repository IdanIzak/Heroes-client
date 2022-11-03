import { Component, DoCheck, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})
export class MyHeroesComponent implements OnInit, DoCheck {
   isMyHeroesEmpty?:boolean;
   user:any;
   myHeroes?: Hero[];

  constructor(private heroService: HeroService, private userService: UserService) {}

  ngOnInit(): void {
    this.heroService.myHeroes?.sort((a,b) => {
      return b.currentPower - a.currentPower;
    })

    this.isMyHeroesEmpty = this.heroService.myHeroes.length === 0;

    for(let hero of this.heroService.myHeroes) {
      hero.isHeroCardClicked = false;
      hero.isHeroTrained = false;
    }
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.heroService.myHeroes);
    this.myHeroes = this.heroService.myHeroes;
  }

  ngDoCheck(): void {
    this.user = this.userService.getUser();
    this.heroService.myHeroes = this.user.userHeroes;
    this.isMyHeroesEmpty = this.heroService.myHeroes.length === 0;
    this.myHeroes = this.heroService.myHeroes;
  }
}
