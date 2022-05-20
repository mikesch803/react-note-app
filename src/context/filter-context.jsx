import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";
import { sortedNotes } from "../utils/functions/sortedNotes";
import { useNoteContext } from "./note-context";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { notes } = useNoteContext();

  const [state, filterDispatch] = useReducer(filterReducer, {
    sortByDate: null,
    sortByPriority: null,
    sortByTags: [],
    search:null
  });

  const getFilteredNotes = sortedNotes(notes, state);

  return (
    <FilterContext.Provider value={{ getFilteredNotes, filterDispatch, state }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
