import { Contestant, Group } from '@fancydraw/data-access';


export interface RaffleGroup extends Group {
   members: Contestant[]
}

export interface RaffleContestant extends Contestant {
  drawColor: string;
}

export interface Raffle {
  groups: RaffleGroup[];
  contestantPool: RaffleContestant[]
}
