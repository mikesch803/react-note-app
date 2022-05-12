export const filterReducer = (state, action) => {
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

        case "CLEAR":
            return {...state, sortByDate:null, sortByPriority: null, sortByTags:[]}

      default:
        return state;
    }
  };