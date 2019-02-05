import { Contestant, Group } from '@fancydraw/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { DrawActions, DrawActionTypes } from './draw.actions';
import { Draw } from './draw.model';

export interface DrawState extends EntityState<Draw> {
  // additional entities state properties
  groups: EntityState<Group>,
  contestants: EntityState<Contestant>,
}

export const drawAdapter: EntityAdapter<Draw> = createEntityAdapter<Draw>();
export const groupAdapter: EntityAdapter<Group> = createEntityAdapter<Group>();
export const contestantAdapter: EntityAdapter<Contestant> = createEntityAdapter<Contestant>();

export const initialState: DrawState = drawAdapter.getInitialState({
  // additional entity state properties
  groups: groupAdapter.getInitialState(),
  contestants: contestantAdapter.getInitialState()
});

console.log(initialState);


export function reducer(
  state = initialState,
  action: DrawActions
): DrawState {
  switch (action.type) {
    case DrawActionTypes.DrawAdded: {
      return {
        ...drawAdapter.addOne(action.payload, state),
        groups: state.groups,
        contestants: state.contestants
      };
    }

    case DrawActionTypes.DrawModified: {
      return {
        ...drawAdapter.updateOne({id: action.payload.id, changes: action.payload}, state),
        groups: state.groups,
        contestants: state.contestants
      };
    }

    case DrawActionTypes.DrawRemoved: {
      return {
        ...drawAdapter.removeOne(action.payload.id, state),
        groups: state.groups,
        contestants: state.contestants
      };
    }

    default: {
      return state;
    }
  }
}

export const getDrawState = createFeatureSelector<DrawState>('draw');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = drawAdapter.getSelectors(getDrawState);
