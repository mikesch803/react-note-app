import { createContext, useContext, useState } from "react";
import axios from "axios";
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [noteDetail, setNoteDetail] = useState({
    title: "",
    desc: "",
    priority: "low",
    tags: "home",
    cardColor : "var(--BG-BODY)",
    date: new Date().getTime(),
  });
  const [editNoteDetail, setEditNoteDetail] = useState({
    title: "",
    desc: "",
    priority: "low",
    tags: "home",
    cardColor: "var(--BG-BODY)",
  });
  const addNoteHandler = async (note, token) => {
    if (note.title.trim() !== "" && note.desc.trim() !== ""){          
    try {
      const response = await axios.post(
        "/api/notes",
        {
          note,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setNotes(response.data.notes);
      }
      setNoteDetail({
        title: "",
        desc: "",
        priority: "low",
        tags: "home",
        cardColor : "var(--BG-BODY)",
        date: new Date().getTime()
      });
    } catch (err) {
      console.error(err);
    }
}
  };

  const deleteNoteHandler = async (notes, token) => {
    try {
      const response = await axios.delete(`/api/notes/${notes._id}`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setNotes(response.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editNoteHandler = async (notes,id, token) => {
      
    if (notes.title.trim() !== "" && notes.desc.trim() !== ""){    
    try {
      const response = await axios.post(
        `/api/notes/${id}`,
        {
          note:notes,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        setNotes(response.data.notes);
      }
      setNoteDetail({
        title: "",
        desc: "",
        priority: "low",
        tags: "home",
        cardColor : "var(--BG-BODY)",
      });
    } catch (err) {
      console.log(err);
    }
}
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        noteDetail,
        setNoteDetail,
        addNoteHandler,
        editNoteDetail,
        setEditNoteDetail,
        deleteNoteHandler,
        editNoteHandler,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);
