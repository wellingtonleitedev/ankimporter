import { icons } from "../../assets";
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
        <li
          className="bg-zinc-800 flex gap-5 items-center mb-5 p-2 rounded"
          key={note.front}
        >
          <span className="p-2 border-e flex-1">{note.front}</span>
          <span className="p-2 flex-1">{note.back}</span>

          <div>
            <>
              <button
                className="bg-slate-50 mr-1 p-2 rounded-full disabled:opacity-50"
                disabled={!note.audio}
                onClick={() => play(index)}
              >
                <img src={icons.play} />
              </button>

              {note.audio ? (
                <audio ref={(element) => (audioRef.current[index] = element!)}>
                  <source src={note.audio.url} />
                </audio>
              ) : null}
            </>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Notes;
