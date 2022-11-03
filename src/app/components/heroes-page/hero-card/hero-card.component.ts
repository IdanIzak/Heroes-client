import { Component, DoCheck, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit, DoCheck {
  myHeroes: Hero[] = this.heroService.myHeroes;
  allHeroes: Hero[] = this.heroService.allHeroes;
  todayDate = this.heroService.todayDate;
  isMyHeroesEmpty?:boolean;
  allHeroesUrl:boolean = this.router.url.includes('all-heroes');
  myHeroesUrl:boolean = this.router.url.includes('my-heroes');
  heroList: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.heroService.checkRemainingTrainings();
  }

  ngDoCheck(): void {
    this.isMyHeroesEmpty = this.heroService.allHeroes.length === 0;
    this.myHeroes = this.heroService.myHeroes;
    this.allHeroes = this.heroService.allHeroes;

    if(this.allHeroesUrl)
      this.heroList = this.allHeroes
    else if (this.myHeroesUrl)
      this.heroList = this.myHeroes;
  }

  onAddToMyHeroes(hero:Hero) {
    this.heroService.onAddToMyHeroes(hero);
  }

  onTrainHero(hero:Hero) {
    this.heroService.onTrainHero(hero);
  }
}
