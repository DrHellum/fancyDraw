import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Draw } from './draw.model';

export enum DrawActionTypes {
  QueryDraws = '[Draw] Query Draws',
  AddDraw = '[Draw] Add Draw',
  AddSuccess = '[Draw] Add Success',
  UpdateDraw = '[Draw] Update Draw',
  UpdateSuccess = '[Draw] Update Success',
  DeleteDraw = '[Draw] Delete Draw',
  DeleteSuccess = '[Draw] Delete Success',
  DrawAdded = '[Draw] Draw Added',
  DrawModified = '[Draw] Draw Modified',
  DrawRemoved = '[Draw] Draw Removed',
  SetSelectedDraw = '[Draw] Set Selected Draw',
  SetDrawnOnContestants = '[Draw] Set Draw On Contestants',
}

export class QueryDraws implements Action {
  readonly type = DrawActionTypes.QueryDraws;

  constructor() {
  }
}

export class AddDraw implements Action {
  readonly type = DrawActionTypes.AddDraw;

  constructor(public payload: { draw: Draw }) {

  }
}

export class AddSuccess implements Action {
  readonly type = DrawActionTypes.AddSuccess;

}

export class UpdateDraw implements Action {
  readonly type = DrawActionTypes.UpdateDraw;

  constructor(public payload: { draw: Update<Draw> }) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = DrawActionTypes.UpdateSuccess;

}

export class DeleteDraw implements Action {
  readonly type = DrawActionTypes.DeleteDraw;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = DrawActionTypes.DeleteSuccess;
}

export class DrawAdded implements Action {
  readonly type = DrawActionTypes.DrawAdded;

  constructor(public payload: Draw) {
    if (!payload.groups) { payload.groups = []; }
    if (!payload.contestants) { payload.contestants = []; }
    if (!payload.raffles) { payload.raffles = []; }
  }
}

export class DrawModified implements Action {
  readonly type = DrawActionTypes.DrawModified;

  constructor(public payload: Draw) {
    if (!payload.groups) { payload.groups = []; }
    if (!payload.contestants) { payload.contestants = []; }
    if (!payload.raffles) { payload.raffles = []; }
  }
}

export class DrawRemoved implements Action {
  readonly type = DrawActionTypes.DrawRemoved;

  constructor(public payload: Draw) {
  }
}

export class SetSelectedDraw implements Action {
  readonly type = DrawActionTypes.SetSelectedDraw;

  constructor(public id: string) {}
}

export class SetDrawnOnContestants implements Action {
  readonly type = DrawActionTypes.SetDrawnOnContestants;

  constructor(public id: string, public drawResult: number[]) {}
}

export type DrawActions =
  QueryDraws
  | AddDraw
  | AddSuccess
  | UpdateDraw
  | UpdateSuccess
  | DeleteDraw
  | DeleteSuccess
  | DrawAdded
  | DrawModified
  | DrawRemoved
  | SetSelectedDraw
  | SetDrawnOnContestants;
