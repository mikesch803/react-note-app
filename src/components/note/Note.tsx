import {
  ArchiveIcon,
  EditIcon,
  RestoreIcon,
  TrashIcon,
  UnarchiveIcon,
} from "../../assests/icons";
import {
  useArchiveContext,
  useAuthContext,
  useNoteContext,
  useTrashContext,
} from "../../context";
import { checkArchive, checkTrash } from "../../utils/functions";
import "./Note.css";
import { NoteProps } from "./Note.types";
export function Note({ note, setEditNoteBtn }: NoteProps) {
  const {
    deleteNoteHandler,
    setNoteDetail,
    setEditNoteDetail,
    addNoteHandler,
  } = useNoteContext();
  const {
    addToArchiveHandler,
    unArchiveHandler,
    archives,
    deleteArchiveHandler,
  } = useArchiveContext();
  const { trashNotes, addToTrashHandler, deleteFromTrashHandler } =
    useTrashContext();
  const { token } = useAuthContext();
  return (
    <div className="note-container" style={{ backgroundColor: note.cardColor }}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.desc}</p>
      <div className="note-footer">
        <div className="note-date">
          Created on {new Date().toLocaleDateString()}
          <span className="note-chip">{note.priority}</span>
          <span className="note-chip">{note.tags}</span>
        </div>
        {!checkTrash(trashNotes, note) ? (
          <div className="note-icons ft-grey">
            {!checkArchive(archives, note) && (
              <button
                className="btn"
                onClick={() => {
                  setEditNoteDetail(note);
                  setNoteDetail(note);
                  setEditNoteBtn(true);
                }}
              >
                <EditIcon />
              </button>
            )}
            {!checkArchive(archives, note) ? (
              <button
                className="btn "
                onClick={() => addToArchiveHandler(note, token)}
              >
                <ArchiveIcon />
              </button>
            ) : (
              <button
                className="btn "
                onClick={() => unArchiveHandler(note, token)}
              >
                <UnarchiveIcon />
              </button>
            )}
            {checkArchive(archives, note) ? (
              <button
                className="btn "
                onClick={() => {
                  deleteArchiveHandler(note, token);
                  addToTrashHandler(note);
                }}
              >
                <TrashIcon />
              </button>
            ) : (
              <button
                className="btn "
                onClick={() => {
                  deleteNoteHandler(note, token);
                  addToTrashHandler(note);
                }}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        ) : (
          <div className="note-icons ft-grey">
            <button
              className="btn"
              onClick={() => deleteFromTrashHandler(note)}
            >
              <TrashIcon />
            </button>
            <button
              className="btn"
              onClick={() => {
                addNoteHandler(note, token);
                deleteFromTrashHandler(note);
              }}
            >
              <RestoreIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
