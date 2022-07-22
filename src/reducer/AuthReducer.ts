export type StateTypes = {
  field: Record<string, string>;
  passwordType: string;
};

export type ActionTypes = {
  type: string;
  payload: {
    name: string;
    value: string;
  };
};

export const AuthReducer = (
  state: StateTypes,
  action: ActionTypes
): StateTypes => {
  switch (action.type) {
    case "ADD_FIELD":
      return {
        ...state,
        field: {
          ...state.field,
          [action.payload.name]: action.payload.value,
        },
      };

    case "CHANGE_TYPE":
      return state.passwordType === "text"
        ? {
            ...state,
            passwordType: "password",
          }
        : {
            ...state,
            passwordType: "text",
          };

    default:
      return state;
  }
};
