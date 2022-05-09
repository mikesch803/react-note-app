import { createContext, useContext, useState } from "react";

export const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
  const [trashNotes, setTrashNotes] = useState([]);

  const addToTrashHandler = (note) => {
    setTrashNotes([...trashNotes, note]);
  };

  const restoreFromTrashHandler = (note) => {
    setTrashNotes(trashNotes.filter((trashNote) => trashNote._id === note._id));
    setTrashNotes(trashNotes.filter((trashNote) => trashNote._id !== note._id));
  };

  const deleteFromTrashHandler = (note) => {
    setTrashNotes(trashNotes.filter((trashNote) => trashNote._id !== note._id));
  };

  const emptyTrashHandler = () => {
    setTrashNotes([]);
  };

  return (
    <TrashContext.Provider
      value={{
        trashNotes,
        addToTrashHandler,
        restoreFromTrashHandler,
        deleteFromTrashHandler,
        emptyTrashHandler,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

export const useTrashContext = () => useContext(TrashContext);
