import * as actionTypes from "../actions/editor";
import { SHAPES_CONFIG } from "../../constants";
export default function editor(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SHAPE_ID:
      return {
        ...state,
        selectedId: action.shapeId,
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
          ...action.config,
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
      stateClone.splice(action.shapeId, 1, action.newAttrs);
      return { ...state, layers: stateClone };
    case actionTypes.DISABLE_HOVER:
      return { ...state, selectOnHover: action.val };
    case actionTypes.SET_IS_DRAWING:
      return { ...state, isDrawing: action.val };
    case actionTypes.SET_SELECTED_PENCIL:
      return { ...state, selectedPencil: action.val };
    case actionTypes.SET_EDITOR_SCALE:
      return { ...state, scale: action.val };
    case actionTypes.SET_LAYERS:
      return { ...state, layers: action.val };
    case actionTypes.PUT_TO_TOP:
      let layersClone = [...state.layers];
      let selectedLayer = layersClone.splice(action.shapeId, 1)[0];
      layersClone.push(selectedLayer);
      return {
        ...state,
        layers: layersClone.map((layer, index) => {
          layer.id = index;
          return layer;
        }),
      };
    default:
      return state;
  }
}
