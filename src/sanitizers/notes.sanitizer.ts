import { INote } from "../types";

type TNoteResponse = string[][];

export const sanitizeNotes = (response: TNoteResponse): INote[] =>
  response.map((note) => ({
    front: note.at(0) || "",
    back: note.at(1) || "",
  }));
