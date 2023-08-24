import { TData } from "../../types";
import { useNotes } from "./notes.util";

type TNotesProps = {
  data: TData[];
};

const Notes = ({ data }: TNotesProps) => {
  const { audioRef, play } = useNotes();

  return (
    <ul className="py-5">
      {data.map((note, index) => (
        <li key={note.front} className="flex justify-between gap-1.5 pb-5">
          <span className="flex-1">{note.front}</span>
          <span className="flex-1">{note.back}</span>
          {note.audio ? (
            <div>
              <button className="px-3 py-2 rounded" onClick={() => play(index)}>
                Play
              </button>
              <audio ref={(element) => (audioRef.current[index] = element!)}>
                <source src={note.audio.url} />
              </audio>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default Notes;
