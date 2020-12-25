import * as actionTypes from "../actions/editor";
import { SHAPES_CONFIG } from "../../constants";
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
          ...SHAPES_CONFIG[action.shape],
          id: (state.layers || []).length,
          type: action.shape,
        },
      ];
      return {
        ...state,
        layers: layers,
      };
    case actionTypes.UPDATE_SHAPE:
      console.log(action.newAttrs);
      let stateClone = [...state.layers];
      stateClone.splice(action.id, 1, action.newAttrs);
      return { ...state, layers: stateClone };
    default:
      return state;
  }
}
