export type StateTypes = {
  sortByDate: "Latest" | "Oldest" | null;
  sortByPriority: string | null;
  sortByTags: string[];
  search: string;
};

export type ActionTypes =
  | {
      type: "SORT_BY_DATE";
      payload: "Latest" | "Oldest";
    }
  | {
      type: "SORT_BY_PRIORITY";
      payload: string;
    }
  | {
      type: "SORT_BY_TAGS";
      payload: string;
    }
  | {
      type: "SEARCH";
      payload: string;
    }
  | {
      type: "CLEAR";
    };

export const filterReducer = (
  state: StateTypes,
  action: ActionTypes
): StateTypes => {
  switch (action.type) {
    case "SORT_BY_DATE":
      return {
        ...state,
        sortByDate: action.payload,
      };

    case "SORT_BY_PRIORITY":
      return {
        ...state,
        sortByPriority: action.payload,
      };
    case "SORT_BY_TAGS":
      return state.sortByTags.includes(action.payload)
        ? {
            ...state,
            sortByTags: state.sortByTags.filter(
              (item) => item !== action.payload
            ),
          }
        : {
            ...state,
            sortByTags: [...state.sortByTags, action.payload],
          };

    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "CLEAR":
      return {
        ...state,
        sortByDate: null,
        sortByPriority: null,
        sortByTags: [],
      };

    default:
      return state;
  }
};
