import { DoCheck, Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService implements DoCheck {
  todayDate = new Date();
  myHeroes: Hero[] = [];
  isMyHeroesEmpty: boolean = this.myHeroes.length === 0;
  allHeroes: Hero[] = this.resetAllHeroes();
  isHeroAddedToMyHeroes: boolean = false;
  tomorrowTrainingsStart = new Date().getTime()+(1*24*60*60*1000);
  now = new Date().getTime();
  heroChosenId = new Subject<number>;
  user:any;

  constructor(private userService:UserService) {}

  ngDoCheck(): void {
    this.user = this.userService.getUser();
    this.myHeroes = this.user.userHeroes;
  }

  getAllHeroes() {
    return this.allHeroes;
  }

  getMyHeroes() {
    return this.myHeroes;
  }

  onAddToMyHeroes(hero:Hero){
    hero.isHeroCardClicked = false;
    hero.isHeroTrained = false;
    this.heroChosenId.next(hero.id)
    this.myHeroes = this.userService.userData.userHeroes;
    this.myHeroes.push(hero);
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.myHeroes);

    for(let j=0; j<this.allHeroes.length; j++) {
      if(this.allHeroes[j] === hero)
        this.allHeroes.splice(j,1);
    }
    this.isHeroAddedToMyHeroes = true;

  }

  onTrainHero(hero:Hero) {
    if(hero.remainingTrainings > 0) {
      hero.isHeroCardClicked = true;
      hero.resetRemainingTrainingsTime = new Date().getTime()+(1*24*60*60*1000);
      if(hero.startingPower === hero.currentPower) {
        hero.startedTrainingDate = new Date();
      }
      hero.currentPower += Math.floor(Math.random()*(hero.currentPower*10/100));
      hero.remainingTrainings--;
      hero.isHeroTrained = true;
    }

    for(let myHeroes of this.myHeroes) {
      if((myHeroes.id !== hero.id) || (hero.remainingTrainings === 0)) {
        myHeroes.isHeroCardClicked = false;
        myHeroes.isHeroTrained = false;
      }
    }
    for(let j=0; j<this.myHeroes.length; j++) {
      if(this.myHeroes[j].id === hero.id)
      this.myHeroes[j] = hero;
    }
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.myHeroes);
  }

  checkRemainingTrainings() {
    this.now=new Date().getTime();
      for(let i=0; i<this.myHeroes.length; i++) {
        if(this.myHeroes[i].resetRemainingTrainingsTime < this.now) {
          this.myHeroes[i].remainingTrainings = 5;
          this.myHeroes[i].isHeroCardClicked = false;
          this.myHeroes[i].isHeroTrained = false;
        }
      }
    this.userService.storeUser(this.userService.userData.id, this.userService.userData.username, this.userService.userData.password, this.myHeroes);
   }

  resetAllHeroes() {
    this.allHeroes = [{
      name: 'Hero-A',
      ability: 'attacker',
      id: 1,
      startingPower: 500,
      currentPower: 500,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'blue',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },
    {
      name: 'Hero-B',
      ability: 'defender',
      id: 2,
      startingPower: 100,
      currentPower: 100,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'red',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },
    {
      name: 'Hero-C',
      ability: 'attacker',
      id: 3,
      startingPower: 200,
      currentPower: 200,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'green',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },
    {
      name: 'Hero-D',
      ability: 'attacker',
      id: 4,
      startingPower: 150,
      currentPower: 150,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'yellow',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },
    {
      name: 'Hero-E',
      ability: 'attacker',
      id: 5,
      startingPower: 420,
      currentPower: 420,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'black',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },
    {
      name: 'Hero-F',
      ability: 'attacker',
      id: 6,
      startingPower: 500,
      currentPower: 500,
      remainingTrainings: 5,
      startedTrainingDate: this.todayDate,
      suitColors: 'white',
      isHeroCardClicked: false,
      isHeroTrained: false,
      resetRemainingTrainingsTime: 0
    },]
  return this.allHeroes;
  }
}
