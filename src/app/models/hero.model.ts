export interface Hero {
  name: string,
  ability: string,
  id: number,
  startingPower: number,
  currentPower: number,
  remainingTrainings: number,
  startedTrainingDate: Date,
  suitColors: string,
  isHeroCardClicked: boolean,
  isHeroTrained: boolean,
  resetRemainingTrainingsTime: number,
}
