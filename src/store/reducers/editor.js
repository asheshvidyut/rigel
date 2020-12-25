import * as actionTypes from "../actions/editor";
export default function editor(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SHAPE_ID:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case actionTypes.UPDATE_SELECTED_SHAPE_ID:
      return {
        ...state,
        selectedId: (state.layers || []).length - 1,
      };
    case actionTypes.ADD_SHAPE:
      let layers = [
        ...(state.layers || []),
        {
          type: action.shape,
          x: 50,
          y: 100,
          width: 100,
          height: 100,
          fill: "gray",
          id: (state.layers || []).length,
        },
      ];
      return {
        ...state,
        layers: layers,
      };
    case actionTypes.UPDATE_SHAPE:
      let stateClone = [...state.layers];
      stateClone.splice(action.id, 1, action.newAttrs);
      return { ...state, layers: stateClone };
    default:
      return state;
  }
}
