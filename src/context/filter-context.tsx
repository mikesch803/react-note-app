import React, { createContext, useContext, useReducer } from "react";
import {
  filterReducer,
  StateTypes,
  ActionTypes,
} from "../reducer/filterReducer";
import { sortedNotes } from "../utils/functions/sortedNotes";
import { NoteDetailTypes, useNoteContext } from "./note-context";

type FilterContextTypes = {
  state: StateTypes;
  filterDispatch: React.Dispatch<ActionTypes>;
  getFilteredNotes: NoteDetailTypes[];
};

type FilterProviderProps = {
  children: React.ReactNode;
};

export const FilterContext = createContext<FilterContextTypes | null>(null);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { notes } = useNoteContext();

  const [state, filterDispatch] = useReducer(filterReducer, {
    sortByDate: null,
    sortByPriority: null,
    sortByTags: [],
    search: "",
  });

  const getFilteredNotes = sortedNotes(notes, state);

  return (
    <FilterContext.Provider value={{ getFilteredNotes, filterDispatch, state }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error("useFilterContext must be used within a filterprovider");
  }
  return context;
};
