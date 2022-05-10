import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [noteDetail, setNoteDetail] = useState({
    title: "",
    desc: "",
    priority: "Low",
    tags: "Home",
    cardColor: "var(--BG-BODY)",
  });
  const [editNoteDetail, setEditNoteDetail] = useState({
    title: "",
    desc: "",
    priority: "Low",
    tags: "Home",
    cardColor: "var(--BG-BODY)",
  });

  const addNoteHandler = async (note, token) => {
    if (note.title !== "" && note.desc !== ""){          
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
        toast.success('Note added')
      }
      setNoteDetail({
        title: "",
        desc: "",
        priority: "Low",
        tags: "Home",
        cardColor: "var(--BG-BODY)",
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
      
    if (noteDetail.title !== "" && noteDetail.desc !== ""){    
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
        toast.success('Note updated')
      }
      setNoteDetail({
        title: "",
        desc: "",
        priority: "Low",
        tags: "Home",
        cardColor: "var(--BG-BODY)",
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
