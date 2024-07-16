export type DockState = {
  show: boolean;
};
type DockAction = {
  type: "SHOW_DOCK" | "HIDE_DOCK";
};

const initialState: DockState = {
  show: false,
};
export const dockReducer = (
  state: DockState = initialState,
  action: DockAction,
) => {
  switch (action.type) {
    case "SHOW_DOCK":
      return { ...state, show: true };
    case "HIDE_DOCK":
      return { ...state, show: false };
    default:
      return state;
  }
};
