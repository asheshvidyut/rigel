import * as actionTypes from "../actions/layer";
export default function layer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_SHAPE:
      return [
        ...state,
        {
          type: action.shape,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fill: "gray",
          id: state.length,
        },
      ];
    case actionTypes.UPDATE_SHAPE:
      let stateClone = [...state];
      stateClone.splice(action.id, 1, action.newAttrs);
      return stateClone;
    default:
      return state;
  }
}
