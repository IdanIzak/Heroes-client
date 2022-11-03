import { Component, DoCheck, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.scss']
})
export class AllHeroesComponent implements OnInit, DoCheck {
  allHeroes = this.heroService.allHeroes;
  isAllHeroesEmpty?:boolean;
  username: string = '';
  heroChosenIdSub:Subscription = new Subscription();
  heroChosenId?:number;
  isHeroAddedToMyHeroes: boolean = this.heroService.isHeroAddedToMyHeroes;

  constructor(private heroService: HeroService, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.allHeroes.sort((a,b) => {
      return b.currentPower - a.currentPower;
    })
    this.username = this.userService.getUser().username;
    this.heroService.isHeroAddedToMyHeroes = false;


    this.heroChosenIdSub = this.heroService.heroChosenId.subscribe({next:(val)=>{
      this.heroChosenId = val
      }, error:(err)=>{
      console.log(err)
      }})

    // removing my heroes from all heroes
    let myHeroesId:any[] = [];
    for(let i=0; i<this.heroService.myHeroes.length; i++) {
      myHeroesId.push(this.heroService.myHeroes[i].id)
    }
    for(let i=0; i<this.heroService.allHeroes.length; i++) {
      if(myHeroesId.includes(this.heroService.allHeroes[i].id)) {
        this.heroService.allHeroes.splice(i, 1);
        i--;
      }
    }
     //this.heroService.allHeroes = this.heroService.allHeroes.filter(el => !this.heroService.myHeroes.includes(el));
  }

  ngDoCheck(): void {
    this.isHeroAddedToMyHeroes = this.heroService.isHeroAddedToMyHeroes;
    this.isAllHeroesEmpty = this.heroService.allHeroes.length === 0;
  }
}

