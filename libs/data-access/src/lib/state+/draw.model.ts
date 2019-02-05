import { Contestant } from './contestant.model';
import { Group } from './group.model';

export interface Draw {
  id?: string;
  name?: string;
  groups?: Group[];
  contestants?: Contestant[];
  created: Date;
}
