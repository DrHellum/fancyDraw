import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Draw } from './draw.model';

export enum DrawActionTypes {
  LoadDraws = '[Draw] Load Draws',
  AddDraw = '[Draw] Add Draw',
  UpdateDraw = '[Draw] Update Draw',
  UpdateSuccess = '[Draw] Update Success',
  DeleteDraw = '[Draw] Delete Draw',
  DrawAdded = '[Draw] Draw Added',
  DrawModified = '[Draw] Draw Modified',
  DrawRemoved = '[Draw] Draw Removed',
}

export class LoadDraws implements Action {
  readonly type = DrawActionTypes.LoadDraws;

  constructor() {
  }
}

export class AddDraw implements Action {
  readonly type = DrawActionTypes.AddDraw;

  constructor(public payload: { draw: Draw }) {
  }
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

export class DrawAdded implements Action {
  readonly type = DrawActionTypes.DrawAdded;

  constructor(public payload: Draw) {
  }
}

export class DrawModified implements Action {
  readonly type = DrawActionTypes.DrawModified;

  constructor(public payload: Draw) {
  }
}

export class DrawRemoved implements Action {
  readonly type = DrawActionTypes.DrawRemoved;

  constructor(public payload: Draw) {
  }
}

export type DrawActions =
  LoadDraws
  | AddDraw
  | UpdateDraw
  | UpdateSuccess
  | DeleteDraw
  | DrawAdded
  | DrawModified
  | DrawRemoved;
