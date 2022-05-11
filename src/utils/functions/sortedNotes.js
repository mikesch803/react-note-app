export const sortedNotes = (notes, state) => {
  let filterNotes = notes;
  if (state.sortByDate && state.sortByDate === "Latest") {
    return (filterNotes = filterNotes.sort((a, b) => b.date - a.date));
  }
  if (state.sortByDate && state.sortByDate === "Oldest") {
    return (filterNotes = filterNotes.sort((a, b) => a.date - b.date));
  }
  if (state.sortByPriority) {
    return (filterNotes = filterNotes.filter(
      (item) => item.priority === state.sortByPriority
    ));
  }
  if (state.sortByTags.length !== 0 && state.sortByTags) {
    return (filterNotes = filterNotes.filter((item) =>
      state.sortByTags.includes(item.tags)
    ));
  }
  return filterNotes;
};
