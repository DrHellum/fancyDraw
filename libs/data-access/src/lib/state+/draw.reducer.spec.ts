import { Draw, DrawAdded, DrawModified, DrawRemoved } from '@fancydraw/data-access';
import { reducer, initialState } from './draw.reducer';

describe('Draw Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  it('drawAdded should add entity to state', () => {
    const draw: Draw = {id: "xxx", name: "Draw1", created: new Date()};
    const action = new DrawAdded(draw);

    const result = reducer(initialState, action);

    expect(result.ids).toContain("xxx");
    expect(result.entities["xxx"]).toEqual(draw);

  });

  it('drawModified should replace entity in state', () => {
    const originalDraw: Draw = {id: "xxx", name: "Draw1", created: new Date()};
    const newDraw: Draw = {id: "xxx", name: "Draw2", created: new Date()};

    const action = new DrawModified(newDraw);

    const result = reducer({...initialState, ids: ["xxx"], entities: {xxx: originalDraw}}, action);

    expect(result.ids).toContain("xxx");
    expect(result.entities["xxx"]).toEqual(newDraw);

  });

  it('drawRemoved should remove entity in state', () => {
    const originalDraw: Draw = {id: "xxx", name: "Draw1", created: new Date()};

    const action = new DrawRemoved(originalDraw);

    const result = reducer({...initialState, ids: ["xxx"], entities: {xxx: originalDraw}}, action);

    expect(result.ids.length).toEqual(0);
    expect(result.entities["xxx"]).toBeUndefined();

  });
});
