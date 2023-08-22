import { TAudio, TNote } from "../types";

type TAudioResponse = { name: string }[];
type TNoteResponse = string[][];

export const sanitizeAudios = (response: TAudioResponse): TAudio[] =>
  response.map((audio) => ({
    url: `http://localhost:3333/public/${audio.name}`,
    name: audio.name,
  }));

export const sanitizeNotes = (response: TNoteResponse): TNote[] =>
  response.map((note) => ({
    front: note.at(0) || "",
    back: note.at(1) || "",
  }));
