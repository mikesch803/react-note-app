import { NoteDetailTypes } from "../../context";
import { StateTypes } from "../../reducer/filterReducer";

export const sortedNotes = (notes: NoteDetailTypes[], state: StateTypes) => {
  let filterNotes = [...notes];
  if (state.sortByDate && state.sortByDate === "Latest") {
    filterNotes = filterNotes.sort((a, b) => b.date - a.date);
  }
  if (state.sortByDate && state.sortByDate === "Oldest") {
    filterNotes = filterNotes.sort((a, b) => a.date - b.date);
  }
  if (state.sortByPriority) {
    filterNotes = filterNotes.filter(
      (item) => item.priority === state.sortByPriority
    );
  }
  if (state.sortByTags.length !== 0 && state.sortByTags) {
    filterNotes = filterNotes.filter((item) =>
      state.sortByTags.includes(item.tags)
    );
  }
  if (state.search) {
    filterNotes = filterNotes.filter((item) =>
      item.title.toLowerCase().match(state.search.toLowerCase())
    );
  }

  return filterNotes;
};
