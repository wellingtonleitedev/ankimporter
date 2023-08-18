import { AudioHTMLAttributes, useRef } from "react";
import { INote } from "../../types";

type TNotesProps = {
  data: Array<
    INote & {
      url?: string;
    }
  >;
};

const Notes = ({ data }: TNotesProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const onClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <ul className="p-5">
      {data.map((note) => (
        <div className="flex justify-between pb-5">
          <li>{note.front}</li>
          <li>{note.back}</li>
          <button onClick={onClick}>Play</button>
          <audio ref={audioRef}>
            <source src={`http://localhost:3000/public/${note.url}`} />
          </audio>
        </div>
      ))}
    </ul>
  );
};

export default Notes;
