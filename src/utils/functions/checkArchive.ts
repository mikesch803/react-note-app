type Note = {
  _id: string;
};

type Archives = {
  _id: string;
}[];

export const checkArchive = (archives: Archives, note: Note) =>
  archives.some((archive) => archive._id === note._id);
