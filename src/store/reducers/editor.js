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
          options: action.options,
        },
      ];
      return {
        ...state,
        layers: layers,
      };
    case actionTypes.DELETE_SHAPE:
      let clone = [...state.layers];
      clone.splice(action.shapeId, 1);
      return {
        ...state,
        layers: clone.map((layer, index) => {
          layer.id = index;
          return layer;
        }),
      };
    case actionTypes.UPDATE_SHAPE:
      let stateClone = [...state.layers];
      stateClone.splice(action.id, 1, action.newAttrs);
      return { ...state, layers: stateClone };
    default:
      return state;
  }
}
