import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { NoteDetailTypes } from "./note-context";

// type NoteDetailTypes = {
//   _id: string;
//   title: string;
//   desc: string;
//   priority: string;
//   tags: string;
//   cardColor: string;
//   date: number;
// };

type TrashContextTypes = {
  trashNotes: NoteDetailTypes[];
  setTrashNotes: React.Dispatch<React.SetStateAction<NoteDetailTypes[]>>;
  addToTrashHandler: (note: NoteDetailTypes) => void;
  deleteFromTrashHandler: (note: NoteDetailTypes) => void;
  emptyTrashHandler: () => void;
};

type TrashProviderProps = {
  children: React.ReactNode;
};

export const TrashContext = createContext<TrashContextTypes | null>(null);

export const TrashProvider = ({ children }: TrashProviderProps) => {
  const [trashNotes, setTrashNotes] = useState<NoteDetailTypes[]>([]);
  const addToTrashHandler: TrashContextTypes["addToTrashHandler"] = (note) => {
    setTrashNotes([...trashNotes, note]);
    toast.success("Moved to trash");
  };

  const deleteFromTrashHandler: TrashContextTypes["deleteFromTrashHandler"] = (
    note
  ) => {
    setTrashNotes(trashNotes.filter((trashNote) => trashNote._id !== note._id));
    toast.success(`Note restored`);
  };

  const emptyTrashHandler: TrashContextTypes["emptyTrashHandler"] = () => {
    setTrashNotes([]);
    toast.success("Cleared Trash");
  };

  return (
    <TrashContext.Provider value={{
      trashNotes,
      setTrashNotes,
      addToTrashHandler,
      deleteFromTrashHandler,
      emptyTrashHandler
    }}>{children}</TrashContext.Provider>
  );
};

export const useTrashContext = () => {
  const context = useContext(TrashContext);
  if (context === null) {
    throw new Error("useTrashContext must be used within a trashprovider");
  }
  return context;
};
