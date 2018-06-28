export class Pet {
  constructor(
    public userId: string,
    public name: string,
    public species: string,
    public element: string,
    public story: string,
    public weight: number, // will be set when choosing pet
    public height: number, // will be set when choosing pet
    public pictures: string[], // 4 pictures represent for 4 evolution
    public curPic: string,
    public level: number,
    public hungerTime: number[], // 2 numbers, first one is current, second one is total
    public experience: number[], // 2 numbers, first one is current, seconde one is total to reach to the next level
    public power: number,
    public leaveTime: number,
    public noOfLives: number,
  ) {}
}
