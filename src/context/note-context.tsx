import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export type NoteDetailTypes = {
  _id: string;
  title: string;
  desc: string;
  priority: string;
  tags: string;
  cardColor: string;
  date: number;
};

type NoteContextTypes = {
  notes: NoteDetailTypes[];
  setNotes: React.Dispatch<React.SetStateAction<NoteDetailTypes[]>>;
  noteDetail: NoteDetailTypes;
  setNoteDetail: React.Dispatch<React.SetStateAction<NoteDetailTypes>>;
  addNoteHandler: (note: NoteDetailTypes, token: string | null) => void;
  editNoteDetail: Omit<NoteDetailTypes, "date">;
  setEditNoteDetail: React.Dispatch<
    React.SetStateAction<Omit<NoteDetailTypes, "date">>
  >;
  deleteNoteHandler: (note: NoteDetailTypes, token: string | null) => void;
  editNoteHandler: (
    note: NoteDetailTypes,
    id: string,
    token: string | null
  ) => void;
};

type NoteProviderProps = {
  children: React.ReactNode;
};

export const NoteContext = createContext<NoteContextTypes | null>(null);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  
  const [noteDetail, setNoteDetail] = useState<NoteDetailTypes>({
    _id: "",
    title: "",
    desc: "",
    priority: "low",
    tags: "home",
    cardColor: "var(--BG-BODY)",
    date: new Date().getTime(),
  });
  const [notes, setNotes] = useState<NoteDetailTypes[]>([]);
  const [editNoteDetail, setEditNoteDetail] = useState({
    _id: "",
    title: "",
    desc: "",
    priority: "low",
    tags: "home",
    cardColor: "var(--BG-BODY)",
  });
  const addNoteHandler: NoteContextTypes["addNoteHandler"] = async (
    note,
    token
  ) => {
    if (note.title.trim() !== "" && note.desc.trim() !== "") {
      try {
        const response = await axios.post(
          "/api/notes",
          {
            note,
          },
          {
            headers: {
              authorization: token ?? "",
            },
          }
        );
        if (response.status === 201) {
          setNotes(response.data.notes);
        }
        setNoteDetail({
          _id: "",
          title: "",
          desc: "",
          priority: "low",
          tags: "home",
          cardColor: "var(--BG-BODY)",
          date: new Date().getTime(),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteNoteHandler: NoteContextTypes["deleteNoteHandler"] = async (
    notes,
    token
  ) => {
    try {
      const response = await axios.delete(`/api/notes/${notes._id}`, {
        headers: {
          authorization: token ?? "",
        },
      });
      if (response.status === 200) {
        setNotes(response.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editNoteHandler: NoteContextTypes["editNoteHandler"] = async (
    notes,
    id,
    token
  ) => {
    if (notes.title.trim() !== "" && notes.desc.trim() !== "") {
      try {
        const response = await axios.post(
          `/api/notes/${id}`,
          {
            note: notes,
          },
          {
            headers: {
              authorization: token ?? "",
            },
          }
        );
        if (response.status === 201) {
          setNotes(response.data.notes);
        }
        setNoteDetail({
          _id: "",
          title: "",
          desc: "",
          priority: "low",
          tags: "home",
          cardColor: "var(--BG-BODY)",
          date: notes.date,
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

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === null) {
    throw new Error("useNoteContext must be used within a noteprovider");
  }
  return context;
};
