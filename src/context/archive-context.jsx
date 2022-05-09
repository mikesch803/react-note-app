import { createContext, useContext, useState } from "react";
import axios from "axios";
export const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archives, setArchives] = useState([]);

  const addToArchiveHandler = async (note, token) => {
    try {
      const response = await axios.post(
        `/api/notes/archives/${note._id}`,
        {
          note,
        },
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 201) {
        setArchives(response.data.archives);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unArchiveHandler = async (note, token) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${note._id}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 201) {
        setArchives(response.data.archives);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteArchiveHandler = async (note, token) => {
    try {
      const response = await axios.delete(`/api/archives/delete/${note._id}`, {
        headers: {
          authorization: token,
        },
      });
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

export const useArchiveContext = () => useContext(ArchiveContext);
