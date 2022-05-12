import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
export const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
  const [trashNotes, setTrashNotes] = useState([]);
  const addToTrashHandler = (note) => {
    setTrashNotes([...trashNotes, note]);
    toast.success("Moved to trash");
  };

  const deleteFromTrashHandler = (note) => {
    setTrashNotes(trashNotes.filter((trashNote) => trashNote._id !== note._id));
    toast.success("Note deleted");
  };

  const emptyTrashHandler = () => {
    setTrashNotes([]);
    toast.success("Cleared Trash");
  };

  return (
    <TrashContext.Provider
      value={{
        trashNotes,
        setTrashNotes,
        addToTrashHandler,
        deleteFromTrashHandler,
        emptyTrashHandler,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

export const useTrashContext = () => useContext(TrashContext);
