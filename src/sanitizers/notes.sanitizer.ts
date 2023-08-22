import { TNote } from "../types";

type TNoteResponse = string[][];

export const sanitizeNotes = (response: TNoteResponse): TNote[] =>
  response.map((note) => ({
    front: note.at(0) || "",
    back: note.at(1) || "",
  }));
