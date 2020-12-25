import * as actionTypes from "../actions/editor";
export default function editor(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SHAPE_ID:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    default:
      return state;
  }
}
