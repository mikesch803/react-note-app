import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
type NoteDetailTypes = {
  _id: string;
  title: string;
  desc: string;
  priority: string;
  tags: string;
  cardColor: string;
  date: number;
};

type ArchiveContextTypes = {
  archives: NoteDetailTypes[];
  setArchives: React.Dispatch<React.SetStateAction<NoteDetailTypes[]>>;
  addToArchiveHandler: (note: NoteDetailTypes, token: string | null) => void;
  unArchiveHandler: (note: NoteDetailTypes, token: string | null) => void;
  deleteArchiveHandler: (note: NoteDetailTypes, token: string | null) => void;
};

type ArchiveProviderProps = {
  children: React.ReactNode;
};

export const ArchiveContext = createContext<ArchiveContextTypes | null>(null);

export const ArchiveProvider = ({ children }: ArchiveProviderProps) => {
  const [archives, setArchives] = useState<NoteDetailTypes[]>([]);

  const addToArchiveHandler: ArchiveContextTypes["addToArchiveHandler"] =
    async (note, token) => {
      try {
        const response = await axios.post(
          `/api/notes/archives/${note._id}`,
          {
            note,
          },
          {
            headers: { authorization: token ?? "" },
          }
        );
        if (response.status === 201) {
          setArchives(response.data.archives);
          toast.success("Archived");
        }
      } catch (err) {
        console.log(err);
      }
    };
  const unArchiveHandler: ArchiveContextTypes["unArchiveHandler"] = async (
    note,
    token
  ) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${note._id}`,
        {},
        {
          headers: { authorization: token ?? "" },
        }
      );
      if (response.status === 201) {
        setArchives(response.data.archives);
        toast.success("Unarchived");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteArchiveHandler: ArchiveContextTypes["deleteArchiveHandler"] =
    async (note, token) => {
      try {
        const response = await axios.delete(
          `/api/archives/delete/${note._id}`,
          {
            headers: {
              authorization: token ?? "",
            },
          }
        );
        if (response.status === 200) {
          setArchives(response.data.archives);
        }
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <ArchiveContext.Provider
      value={{
        addToArchiveHandler,
        archives,
        setArchives,
        unArchiveHandler,
        deleteArchiveHandler,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchiveContext = () => {
  const context = useContext(ArchiveContext);
  if (context === null) {
    throw new Error("useArchiveContext must be used within a archiveprovider");
  }
  return context;
};
