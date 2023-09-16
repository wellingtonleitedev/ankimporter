import { TData } from "../../types";
import { icons } from "../../assets";
import { useNotes } from "./notes.util";

type TNotesProps = {
  data: TData[];
};

const Notes = ({ data }: TNotesProps) => {
  const { audioRef, edittingNoteId, onSubmit, play } = useNotes();

  if (!data?.length) {
    return (
      <div className="flex justify-center py-12">
        <h2 className="text-2xl font-bold">Upload a file</h2>
      </div>
    );
  }

  return (
    <ul className="py-5">
      {data.map((note, index) => (
        <li key={note.front}>
          <form
            className="bg-zinc-800 flex gap-5 items-center mb-5 p-2 rounded"
            onSubmit={onSubmit}
          >
            <input name="uuid" type="hidden" value={note.uuid} />
            {edittingNoteId === note.uuid ? (
              <>
                <input
                  name="front"
                  className="p-2 border-e flex-1"
                  defaultValue={note.front.trim()}
                />
                <input
                  name="back"
                  className="p-2 flex-1"
                  defaultValue={note.back.trim()}
                />
              </>
            ) : (
              <>
                <span className="p-2 border-e flex-1">{note.front}</span>
                <span className="p-2 flex-1">{note.back}</span>
              </>
            )}

            <div>
              <>
                <button
                  className="bg-slate-50 mr-1 p-2 rounded-full disabled:opacity-50"
                  onClick={() => play(index)}
                  disabled={!note.audio}
                  type="button"
                >
                  <img src={icons.play} />
                </button>

                <button
                  className="bg-slate-50 mr-1 p-2 rounded-full disabled:opacity-50"
                  type="submit"
                >
                  <img src={icons.pencil} />
                </button>

                {note.audio ? (
                  <audio
                    ref={(element) => (audioRef.current[index] = element!)}
                  >
                    <source src={note.audio.url} />
                  </audio>
                ) : null}
              </>
            </div>
          </form>
        </li>
      ))}
    </ul>
  );
};

export default Notes;
