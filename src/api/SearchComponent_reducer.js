// defining actions
export const ACTIONS = {
  RM_IN: "room increment",
  RM_DC: "room decrement",
  AD_IN: "adults increment",
  AD_DC: "adults decrement",
  CH_IN: "children increment",
  CH_DC: "children decrement",
};

// reducer function, handles manipulation of count for rooms,adults and children
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RM_IN:
      if (state.rooms < 8) {
        if (state.adults <= state.rooms) {
          return { ...state, rooms: state.rooms + 1, adults: state.adults + 1 };
        }
        return { ...state, rooms: state.rooms + 1 };
      } else {
        window.alert("max 8 room can be selected");
        return { ...state };
      }
    case ACTIONS.RM_DC:
      if (state.rooms > 1) {
        if (state.adults >= state.rooms * 3) {
          return { ...state, rooms: state.rooms - 1, adults: state.adults - 3 };
        }
        return { ...state, rooms: state.rooms - 1 };
      } else {
        window.alert("min 1 room required");
        return { ...state };
      }
    case ACTIONS.AD_IN:
      if (state.adults < 12) {
        if (state.adults >= state.rooms * 3) {
          return { ...state, adults: state.adults + 1, rooms: state.rooms + 1 };
        }
        return { ...state, adults: state.adults + 1 };
      } else {
        window.alert("max 12 adults are allowed at a time");
        return { ...state };
      }
    case ACTIONS.AD_DC:
      if (state.adults > 1) {
        if (state.adults <= state.rooms) {
          return { ...state, rooms: state.rooms - 1, adults: state.adults - 1 };
        }
        return { ...state, adults: state.adults - 1 };
      } else {
        window.alert("min 1 adult required");
        return { ...state };
      }
    case ACTIONS.CH_IN:
      if (state.children < 12)
        return { ...state, children: state.children + 1 };
      else {
        window.alert("max 12 children allowed at a time");
        return { ...state };
      }
    case ACTIONS.CH_DC:
      if (state.children > 0) return { ...state, children: state.children - 1 };
      else return { ...state };
    default:
      return { ...state };
  }
};
