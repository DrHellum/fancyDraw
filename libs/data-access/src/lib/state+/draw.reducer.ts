import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DrawActions, DrawActionTypes } from './draw.actions';
import { Draw } from './draw.model';

export interface DrawState extends EntityState<Draw> {
  // additional entities state properties
  selectedDrawId?: string;
}

export const drawAdapter: EntityAdapter<Draw> = createEntityAdapter<Draw>();


export const initialState: DrawState = drawAdapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: DrawActions
): DrawState {
  switch (action.type) {
    case DrawActionTypes.DrawAdded: {
      return {
        ...drawAdapter.addOne(action.payload, state),
      };
    }

    case DrawActionTypes.DrawModified: {
      return {
        ...drawAdapter.updateOne({id: action.payload.id, changes: action.payload}, state),
      };
    }

    case DrawActionTypes.DrawRemoved: {
      return {
        ...drawAdapter.removeOne(action.payload.id, state),
      };
    }

    case DrawActionTypes.SetSelectedDraw: {
      return {
        ...state,
        selectedDrawId: action.id
      }
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

export const getSelectedDraw = createSelector(
  getDrawState,
  (state) => state.entities[state.selectedDrawId]
);
