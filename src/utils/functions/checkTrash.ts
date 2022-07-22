type NoteTypes = {
  _id: string;
};

type TrashesTypes = {
  _id: string;
}[];

export const checkTrash = (trashes: TrashesTypes, note: NoteTypes) =>
  trashes.some((trash) => trash._id === note._id);
